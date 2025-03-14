import { User } from "../types";
import { authHeader } from "../utils";
import axios from "./axiosConfig";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(
      "/user/signup",
      {
        name,
        email,
        password,
      },
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error registering user");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await axios.post(
      "/user/login",
      { email, password },
      authHeader()
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in user");
  }
};
