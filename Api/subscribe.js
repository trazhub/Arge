const admin = require('firebase-admin');

// This function will decode the Base64 key from Vercel's environment variables
function getPrivateKey() {
  const base64Key = process.env.FIREBASE_PRIVATE_KEY;
  if (!base64Key) {
    throw new Error('FIREBASE_PRIVATE_KEY environment variable is not set.');
  }
  // Create a buffer from the Base64 string and convert it back to a regular string
  return Buffer.from(base64Key, 'base64').toString('utf-8');
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Use the decoded private key
        privateKey: getPrivateKey(),
      }),
    });
  }
} catch (error) {
  console.error('Firebase admin initialization error:', error.message);
  // This will help us see the error clearly in the Vercel logs
  module.exports = (req, res) => {
    res.status(500).json({ message: 'Server configuration error. Could not connect to the database.' });
  };
  return;
}

const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    await db.collection('subscriptions').add({
      email: email,
      subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Error in subscription function:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};
