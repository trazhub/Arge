// This is a simplified test function. It does NOT connect to Firebase.
// Its only purpose is to check if the Vercel function is running correctly.

module.exports = async (req, res) => {
  // Check if the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { email } = req.body;

    // Check if an email was provided in the request
    if (!email) {
      return res.status(400).json({ message: 'No email provided.' });
    }

    // If everything is okay, send a simple success message back.
    // This proves the function is working.
    return res.status(200).json({ message: `Successfully received email: ${email}` });

  } catch (error) {
    // This will catch any other unexpected errors
    console.error('Error in test function:', error);
    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};
