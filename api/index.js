// Simple test to verify serverless function works
module.exports = (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel!' });
};
