import { NextResponse } from 'next/server';
import { saveToGoogleSheet } from './googleSheets';

export const runtime = 'nodejs';

export async function POST(request: Request) {
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
      utrNumber,
    } = body;

    if (
      !teamHeadName ||
      !teamHeadPhone ||
      !teamHeadEmail ||
      !p2Name ||
      !p2Phone ||
      !p2Email ||
      !collegeName ||
      !domain ||
      !utrNumber
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    const rowData = [
      teamHeadName,
      teamHeadPhone,
      teamHeadEmail,
      p2Name,
      p2Phone,
      p2Email,
      collegeName,
      domain,
      utrNumber,
      timestamp,
    ];

    try {
      await saveToGoogleSheet(rowData);
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
      return NextResponse.json(
        { error: 'Failed to save registration data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed', details: error.message },
      { status: 500 }
    );
  }
}
