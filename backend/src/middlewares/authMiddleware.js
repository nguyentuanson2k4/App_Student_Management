// @ts-nocheck
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const { User } = db;

// authorization - xác minh user là ai
export const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy access token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT error:", error.message);
    return res
      .status(403)
      .json({ message: "Access token không hợp lệ hoặc đã hết hạn" });
  }
};
