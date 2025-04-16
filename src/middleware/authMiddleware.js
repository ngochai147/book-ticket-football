import jwt from "jsonwebtoken";

// Hàm xác thực token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token in middleware:", token);

  if (!token) {
    return res.status(401).json({ message: "Không có token được cung cấp" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token in middleware:", decoded);
    req.user = decoded;
    if (!req.user.id) {
      return res.status(401).json({ message: "Token không chứa userId" });
    }
    next();
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    return res.status(401).json({ message: `Token không hợp lệ: ${error.message}` });
  }
};