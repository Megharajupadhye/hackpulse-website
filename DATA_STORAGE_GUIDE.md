## Where registration data is stored

### Primary storage (Google Sheets)
Your registration submissions are written to **Google Sheets** by the API route:

- `src/app/api/register/route.ts`

It appends a new row to:

- **Spreadsheet**: `GOOGLE_SHEET_ID`
- **Tab**: `GOOGLE_SHEET_TAB` (defaults to `Sheet1`)
- **Range**: `<TAB>!A1:J` (append)

The columns written are:

1. Timestamp (ISO)
2. Participant 1 Name
3. Participant 1 Phone
4. Participant 1 Email
5. Participant 2 Name
6. Participant 2 Phone
7. Participant 2 Email
8. College Name
9. Domain
10. Payment Screenshot URL

### Payment screenshot storage (local)
When you upload a screenshot, it is saved locally to:

- `public/uploads/`

And the form stores the URL like:

- `/uploads/<filename>.jpg`

The upload API route is:

- `src/app/api/upload/route.ts`

## How to view the stored data

### 1) View registrations in Google Sheets
1. Open the Google Sheet whose ID matches `GOOGLE_SHEET_ID`.
2. Open the tab that matches `GOOGLE_SHEET_TAB` (default: **`Sheet1`**).
3. New registrations appear as new rows.

### 2) If Sheets fails: view the local backup file
If you see this warning in the API response:

- `Registration accepted but not written to Google Sheets...`

Then a local backup is appended to:

- `data/registrations.jsonl`

You can open this file and each line is one JSON record (JSONL).

### 2) Make sure the service account can write
Your app authenticates using:

- `GOOGLE_SERVICE_ACCOUNT_JSON` (service account credentials JSON string)

To allow writing:
1. In `GOOGLE_SERVICE_ACCOUNT_JSON`, find the service account email (usually `...@....iam.gserviceaccount.com`).
2. Share your Google Sheet with that email as **Editor**.

### 3) Confirm env variables
Check your `.env.local` has:

- `GOOGLE_SHEET_ID=...`
- `GOOGLE_SERVICE_ACCOUNT_JSON=...` (a JSON string)
- `GOOGLE_SHEET_TAB=Registrations` (optional, but must match the real tab name)

If these are missing/invalid, the API will still return `success: true` but includes:

- `warning: "Registration accepted but not written to Google Sheets."`

In that case, **the registration is not saved to Sheets**, so fixing env + sharing is required.

## Quick test
1. Run the app locally.
2. Submit the registration form.
3. Check:
   - The browser network response from `POST /api/register` (look for `warning`).
   - The `GOOGLE_SHEET_TAB` tab in Google Sheets.
   - `public/uploads/` for the uploaded screenshot file.
   - `data/registrations.jsonl` if Sheets is failing.
