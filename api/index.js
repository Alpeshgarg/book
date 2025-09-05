// Basic Vercel serverless function
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Simple API test endpoint
      res.status(200).json({ 
        message: 'Bookiya API is working!', 
        timestamp: new Date().toISOString() 
      });
      return;
    }

    if (req.method === 'POST') {
      const { url } = req;
      
      if (url === '/contact') {
        await handleContact(req, res);
        return;
      }
      
      if (url === '/partner') {
        await handlePartner(req, res);
        return;
      }
    }

    // Default response
    res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function handleContact(req, res) {
  try {
    const nodemailer = require('nodemailer');
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

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Error sending message.' });
  }
}

async function handlePartner(req, res) {
  try {
    const nodemailer = require('nodemailer');
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
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Registration sent!' });
  } catch (error) {
    console.error('Partner error:', error);
    res.status(500).json({ success: false, message: 'Error sending registration.' });
  }
}
