const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cấu hình SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Endpoint để xử lý yêu cầu forgot username
app.post('/api/forgot-username', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Giả lập lấy username từ cơ sở dữ liệu
    const username = `user_${Math.random().toString(36).substring(2, 10)}`;

    const msg = {
      to: email,
      from: '20102004hinh@gmail.com', // Thay bằng email đã xác minh trên SendGrid
      subject: 'Your Username',
      text: `Hello,\n\nYour username is: ${username}\n\nPlease use this username to log in. If you also need to reset your password, you can use the "Forgot Password" option.\n\nBest regards,\nYour App Team`,
      html: `
        <h2>Your Username</h2>
        <p>Hello,</p>
        <p>Your username is: <strong>${username}</strong></p>
        <p>Please use this username to log in. If you also need to reset your password, you can use the "Forgot Password" option.</p>
        <p>Best regards,<br>Your App Team</p>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Username sent to your email' });
  } catch (error) {
    console.error('Error sending email for forgot username:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

// Endpoint để xử lý yêu cầu forgot password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const newUsername = `user_${Math.random().toString(36).substring(2, 10)}`;
    const msg = {
      to: email,
      from: '20102004hinh@gmail.com', // Thay bằng email đã xác minh trên SendGrid
      subject: 'Your New Username',
      text: `Hello,\n\nYour new username is: ${newUsername}\n\nPlease use this username to log in and reset your password if needed.\n\nBest regards,\nYour App Team`,
      html: `
        <h2>Your New Username</h2>
        <p>Hello,</p>
        <p>Your new username is: <strong>${newUsername}</strong></p>
        <p>Please use this username to log in and reset your password if needed.</p>
        <p>Best regards,<br>Your App Team</p>
      `,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'New username sent to your email' });
  } catch (error) {
    console.error('Error sending email for forgot password:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

// Khởi động server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});