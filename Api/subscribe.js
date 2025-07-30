// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// --- IMPORTANT ---
// You will need to get your Firebase Admin SDK credentials (a JSON file)
// and add them as Environment Variables in your Vercel project settings.
// Vercel will automatically make them available here.
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }
} catch (error) {
  console.error('Firebase admin initialization error', error.stack);
}

const db = admin.firestore();

// This is the main function that will be executed by Vercel
module.exports = async (req, res) => {
  // We only want to handle POST requests to this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { email } = req.body;

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // Add the new email to the 'subscriptions' collection in Firestore
    await db.collection('subscriptions').add({
      email: email,
      subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send a success response
    return res.status(200).json({ message: 'Successfully subscribed!' });

  } catch (error) {
    console.error('Error in subscription function:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};