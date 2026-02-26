import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOOGLE_SHEET_TAB = process.env.GOOGLE_SHEET_TAB || 'Registrations';

async function appendToSheet(row: string[]) {
  // Check for both GOOGLE_SHEET_ID and GOOGLE_SHEETS_ID (common typo)
  const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_ID;

  if (!GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets ID is missing. Set GOOGLE_SHEET_ID in environment variables.');
  }

  let credentials;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    } catch (e: any) {
      throw new Error(`Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON: ${e.message}`);
    }
  } else if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    credentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  } else {
    throw new Error(
      'Google credentials not set. Set GOOGLE_SERVICE_ACCOUNT_JSON or both GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.'
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  try {
    console.log('Appending data to Google Sheet...');
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${GOOGLE_SHEET_TAB}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });
    console.log('Data appended successfully.');
  } catch (error: any) {
    console.error('Google Sheets API Error:', error);
    throw new Error(`Google Sheets Error: ${error.message}`);
  }
}

async function saveToBackupFile(data: object) {
  const backupFilePath = path.join(process.cwd(), 'data', 'registrations.jsonl');
  const backupDir = path.dirname(backupFilePath);

  try {
    await mkdir(backupDir, { recursive: true });
    await appendFile(backupFilePath, JSON.stringify(data) + '\n');
    console.log('Registration data saved to local backup:', backupFilePath);
  } catch (backupErr: any) {
    console.error('FATAL: Failed to write to local backup file. Data is lost.', backupErr);
    throw new Error(`Google Sheets write failed, and local backup also failed. Error: ${backupErr.message}`);
  }
}

export async function POST(request: NextRequest) {
  console.log('POST /api/register called');
  let body;
  try {
    body = await request.json();
  } catch (e: any) {
    console.error('Failed to parse request body as JSON:', e);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
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
      console.warn('Missing required fields in request body');
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

    try {
      console.log('Processing registration for:', teamHeadEmail);
      await appendToSheet(row);
      return NextResponse.json({ success: true, message: 'Registration successful' });
    } catch (sheetsErr: any) {
      console.error('Could not write to Google Sheets, falling back to local backup.', sheetsErr.message);
      await saveToBackupFile({ ...body, timestamp });
      return NextResponse.json({
        success: true,
        message: 'Registration accepted.',
        warning: 'Registration accepted but not written to Google Sheets. A local backup was saved.',
      });
    }
  } catch (err: any) {
    console.error('Register API error:', err);
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 });
  }
}
