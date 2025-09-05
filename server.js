
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory (includes css, images, js, etc.)
app.use(express.static(__dirname));
// Also serve static files from the public folder if it exists
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Handle partner registration form
app.post('/partner', async (req, res) => {
  const { shopName, ownerName, shopAddress, mapsLink, contactNumber, altContactNumber, email } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bookiyaapp@gmail.com',
      pass: 'mouunxdxxyxsqifz'
    }
  });
  let mailOptions = {
    from: email,
    to: 'bookiyaapp@gmail.com',
    subject: `Shop Registration: ${shopName}`,
    text:
      `Shop Name: ${shopName}\n` +
      `Owner's Name: ${ownerName}\n` +
      `Shop Address: ${shopAddress}\n` +
      `Google Maps Link: ${mapsLink}\n` +
      `Contact Number: ${contactNumber}\n` +
      `Alternate WhatsApp Number: ${altContactNumber}\n` +
      `Email Address: ${email}`
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Registration sent!');
  } catch (error) {
    res.status(500).send('Error sending registration.');
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configure your email transport (use your email and app password)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bookiyaapp@gmail.com',
      pass: 'mouunxdxxyxsqifz' // Gmail app password
    }
  });

  let mailOptions = {
    from: email,
    to: 'bookiyaapp@gmail.com',
    subject: `Contact Form: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent!');
  } catch (error) {
    res.status(500).send('Error sending message.');
  }
});


// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Export the app for Vercel
module.exports = app;

// Only start the server if this file is run directly (not imported as a module)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
