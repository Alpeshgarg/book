// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Note: Static files are handled by Vercel routing in vercel.json

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Partner registration
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

// Contact form
app.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

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

// Homepage route (static file served by Vercel)
app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/index.html"></head><body>Redirecting...</body></html>');
});

// ✅ Export for Vercel
module.exports = app;

// Local run
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
