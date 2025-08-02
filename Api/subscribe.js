const { google } = require('googleapis');

// This is the main function that will be executed by Vercel
module.exports = async (req, res) => {
  // 1. Check if it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { email } = req.body;

    // 2. Validate the email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // 3. Check for Environment Variables
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
        console.error('Missing one or more required environment variables.');
        return res.status(500).json({ message: 'Server configuration error.' });
    }

    // 4. Authenticate with Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'A1'; 

    // 5. Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[email, new Date().toLocaleString()]],
      },
    });

    // 6. Send success response
    return res.status(200).json({ message: 'Successfully subscribed!' });

  } catch (error) {
    // 7. Catch and log any errors
    console.error('--- ERROR IN GOOGLE SHEETS FUNCTION ---');
    console.error('Error Message:', error.message);
    console.error('Full Error Object:', error);
    console.error('--- END OF ERROR ---');
    return res.status(500).json({ message: 'An error occurred while subscribing. Please check server logs.' });
  }
};
