import bcrypt from "bcryptjs";
import { Admin } from "models";
import { AppError } from "utils/error";
import { generateToken } from "utils/func";

export const registerAdmin = async (
  name: string,
  email: string,
  password: string
) => {
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    throw new AppError("Admin already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: admin.id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin.id),
  };
};

export const authAdmin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new AppError("Invalid credentials", 401);
  }

  return {
    _id: admin.id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin.id),
  };
};
