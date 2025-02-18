import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc Admin login
// @route POST /api/admin/login
// @access Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
