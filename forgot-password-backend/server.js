const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cấu hình Nodemailer (sử dụng Gmail làm ví dụ)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Email của bạn
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password) của Gmail
  },
});

// Endpoint để xử lý yêu cầu forgot password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Giả lập lấy username từ cơ sở dữ liệu
    // Trong thực tế, bạn sẽ truy vấn database để lấy username dựa trên email
    const newUsername = `user_${Math.random().toString(36).substring(2, 10)}`; // Tạo username ngẫu nhiên

    // Nội dung email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your New Username',
      text: `Hello,\n\nYour new password is: ${newUsername}\n\nPlease use this username to log in and reset your password if needed.\n\nBest regards,\nYour App Team`,
      html: `
        <h2>Your New Username</h2>
        <p>Hello,</p>
        <p>Your new username is: <strong>${newUsername}</strong></p>
        <p>Please use this username to log in and reset your password if needed.</p>
        <p>Best regards,<br>Your App Team</p>
      `,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'New username sent to your email' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});