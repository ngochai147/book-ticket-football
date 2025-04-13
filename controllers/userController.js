import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Thêm import jwt
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const {
      nickname,
      firstName,
      lastName,
      email,
      repeatEmail,
      password,
      repeatPassword,
      language,
      securityAnswer,
      acceptTerms,
      acceptNewsletter,
    } = req.body;

    if (
      !nickname ||
      !firstName ||
      !lastName ||
      !email ||
      !repeatEmail ||
      !password ||
      !repeatPassword ||
      !securityAnswer ||
      acceptTerms === undefined
    ) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (email !== repeatEmail) {
      return res.status(400).json({ message: "Emails do not match" });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!acceptTerms) {
      return res.status(400).json({ message: "You must accept the terms of use" });
    }

    const existingNickname = await User.findOne({ nickname });
    if (existingNickname) {
      return res.status(400).json({ message: "Nickname already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const correctEstebanAndradaAge = 34; // Tính đến 11/04/2025
    if (parseInt(securityAnswer) !== correctEstebanAndradaAge) {
      return res.status(400).json({ message: "Incorrect answer for Esteban Andrada's age" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nickname,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      preferredLanguage: language || "English",
      estebanAndradaAge: parseInt(securityAnswer),
      acceptedTerms: acceptTerms,
      receiveNewsletters: acceptNewsletter || false,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    if (!nickname || !password) {
      return res.status(400).json({ message: "Nickname and password are required" });
    }

    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(401).json({ message: "Invalid nickname or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid nickname or password" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // Token hết hạn sau 30 ngày
    );

    res.json({
      message: "Login successful",
      user: {
        nickname: user.nickname,
        id: user._id,
        email: user.email,
      },
      token, // Trả về token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByToken = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header Authorization: Bearer <token>
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password"); // Không trả về password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        user: {
          nickname: user.nickname,
          id: user._id,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
