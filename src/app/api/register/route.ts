import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEET_TAB = process.env.GOOGLE_SHEET_TAB || 'Registrations';

async function appendToSheet(row: string[]) {
  if (!GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets ID is missing. Set GOOGLE_SHEET_ID in environment variables.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // The replace function fixes newline characters which often break in production
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${GOOGLE_SHEET_TAB}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received registration fields:', Object.keys(body)); // Debugging: Check if fields match frontend
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

    await appendToSheet(row);
    return NextResponse.json({ success: true, message: 'Registration successful' });

  } catch (err: any) {
    console.error('Register API error:', err);
    return NextResponse.json(
      { error: err.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
