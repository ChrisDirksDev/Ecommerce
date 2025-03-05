import axios from "./axiosConfig";
import { authHeader } from "../utils";

export const getAnonUser = async (): Promise<string> => {
  try {
    const response = await axios.get("/anon", authHeader());
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving anon user");
  }
};
