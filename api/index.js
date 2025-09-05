const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Create transporter function
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'bookiyaapp@gmail.com',
      pass: 'mouunxdxxyxsqifz'
    }
  });
};

// Partner registration route
app.post('/api/partner', async (req, res) => {
  try {
    const { shopName, ownerName, shopAddress, mapsLink, contactNumber, altContactNumber, email } = req.body;
    
    const transporter = createTransporter();
    
    const mailOptions = {
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
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Registration sent!' });
  } catch (error) {
    console.error('Partner registration error:', error);
    res.status(500).json({ success: false, message: 'Error sending registration.' });
  }
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const transporter = createTransporter();
    
    const mailOptions = {
      from: email,
      to: 'bookiyaapp@gmail.com',
      subject: `Contact Form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Error sending message.' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export the serverless function
module.exports = serverless(app);
