// This is a minimal test function to confirm Vercel is running the API route.
// It has no external dependencies.

export default function handler(req, res) {
  // Log that the function was successfully called
  console.log('--- API Function successfully invoked ---');
  console.log('Request Method:', req.method);

  if (req.method === 'POST') {
    const { email } = req.body;
    console.log('Received email:', email);
    
    // Send a simple success response
    res.status(200).json({ message: 'Test successful! Received email: ' + email });
  } else {
    // Handle other request types
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
