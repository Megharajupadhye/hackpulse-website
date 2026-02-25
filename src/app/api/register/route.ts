import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const GOOGLE_SHEET_TAB = process.env.GOOGLE_SHEET_TAB || 'Registrations';

async function appendToLocalBackup(row: string[]) {
  const outDir = path.join(process.cwd(), 'data');
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, 'registrations.jsonl');
  const record = {
    timestamp: row[0],
    participant1: { name: row[1], phone: row[2], email: row[3] },
    participant2: { name: row[4], phone: row[5], email: row[6] },
    collegeName: row[7],
    domain: row[8],
    screenshotUrl: row[9],
  };
  await appendFile(outPath, `${JSON.stringify(record)}\n`, 'utf8');
}

async function appendToSheet(row: string[]) {
  if (!GOOGLE_SHEET_ID || GOOGLE_SHEET_ID === 'REPLACE_WITH_YOUR_SHEET_ID' || !GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Google Sheets not configured. Set GOOGLE_SHEET_ID in .env.local (get it from your sheet URL).');
  }
  let credentials: object;
  try {
    credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON);
  } catch {
    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_JSON');
  }
  const auth = new google.auth.GoogleAuth({
    credentials: credentials as never,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    // Must match an existing tab name. If your tab is "Sheet1", set GOOGLE_SHEET_TAB=Sheet1
    range: `${GOOGLE_SHEET_TAB}!A1:J`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      teamHeadName,
      teamHeadPhone,
      teamHeadEmail,
      p2Name,
      p2Phone,
      p2Email,
      collegeName,
      domain,
      screenshotUrl,
    } = body;

    if (
      !teamHeadName ||
      !teamHeadPhone ||
      !teamHeadEmail ||
      !collegeName ||
      !domain ||
      !screenshotUrl
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      String(teamHeadName),
      String(teamHeadPhone),
      String(teamHeadEmail),
      String(p2Name || ''),
      String(p2Phone || ''),
      String(p2Email || ''),
      String(collegeName),
      String(domain),
      String(screenshotUrl),
    ];

    // Try to write to Google Sheets; if it fails, still allow registration to succeed
    try {
      await appendToSheet(row);
      return NextResponse.json({ success: true });
    } catch (sheetError) {
      console.error('Google Sheets append failed (continuing):', sheetError);
      try {
        await appendToLocalBackup(row);
      } catch (backupErr) {
        console.error('Local backup append failed:', backupErr);
      }
      return NextResponse.json({
        success: true,
        warning:
          'Registration accepted but not written to Google Sheets. Check GOOGLE_SHEET_TAB / sharing; a local backup may have been written to data/registrations.jsonl.',
      });
    }
  } catch (err) {
    console.error('Register API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Registration failed' },
      { status: 500 }
    );
  }
}
