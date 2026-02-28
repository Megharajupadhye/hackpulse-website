import { google } from 'googleapis';

// The Spreadsheet ID extracted from your URL
const SPREADSHEET_ID = '10pjil9DPt2oIamPXuObVJ2upvhJdqfmZzpSna6Ue5x0';

/**
 * Appends a row of data to the hackpulse-DB Google Sheet.
 * @param rowData An array of strings corresponding to the columns in your sheet.
 */
export async function saveToGoogleSheet(rowData: string[]) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1', // Appends to the bottom of the table in Sheet1
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    throw new Error('Failed to save data to Google Sheet');
  }
}