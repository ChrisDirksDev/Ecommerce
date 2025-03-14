import axios from "./axiosConfig";
import { authHeader } from "../utils";
import { AnonUser } from "../types";

export const getAnonUser = async (): Promise<AnonUser> => {
  try {
    const response = await axios.get("/anon", authHeader());
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving anon user");
  }
};
