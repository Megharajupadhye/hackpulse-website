import { google } from 'googleapis';

/**
 * Appends a row of data to the hackpulse-DB Google Sheet.
 * @param rowData An array of strings corresponding to the columns in your sheet.
 */
export async function saveToGoogleSheet(rowData: string[]) {
  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!serviceAccountJson || !sheetId) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_SHEET_ID must be set');
    }

    const credentials = JSON.parse(serviceAccountJson);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
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