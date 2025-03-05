import axios from "./axiosConfig";
import { User } from "../types";

export const loginAdmin = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post("/admin/login", { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid login");
  }
};
