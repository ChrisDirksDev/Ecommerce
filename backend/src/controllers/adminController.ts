import asyncHandler from "express-async-handler";
import * as service from "services/adminService";

export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await service.registerAdmin(name, email, password);

  res.status(201).json(admin);
});

// @desc Admin login
// @route POST /api/admin/login
// @access Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await service.authAdmin(email, password);

  res.json(admin);
});
