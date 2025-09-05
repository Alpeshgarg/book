const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve homepage
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  res.send(html);
});

// Partner registration
app.post('/partner', async (req, res) => {
  const { shopName, ownerName, shopAddress, mapsLink, contactNumber, altContactNumber, email } = req.body;
  let transporter = nodemailer.createTransporter({
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

  let transporter = nodemailer.createTransporter({
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

module.exports = app;
