import {
  hasConsented,
  setUserCookie,
  deleteAnonUserCookie,
  deleteAnonUserLocalStorage,
  getUserCookie,
  deleteUserCookie,
  setUserToken,
  setUser,
  setAnonUserId,
} from "../utils/storage";
import * as api from "../api/user";
import { initAnonUser } from "./anonService";
import { logError } from "../utils/logging";

// Registers a user with the provided name, email, and password
// If the user has consented to cookies, the user token is stored in a cookie
export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.registerUser(name, email, password);

    if (hasConsented()) {
      setUserCookie(response.token);
    }

    setUserToken(response.token);

    clearAnonUser();
  } catch (error) {
    logError("registerUser", error);
  }
};

// Authenticates a user with the provided email and password
// If the user has consented to cookies, the user token is stored in a cookie
export const authUser = async (email: string, password: string) => {
  try {
    const response = await api.loginUser(email, password);

    if (hasConsented()) {
      setUserCookie(response.token);
    }

    setUserToken(response.token);

    clearAnonUser();
  } catch (error) {
    logError("authUser", error);
  }
};

// Utils

// Logs out the user by clearing the user store and cookie
export const logoutUser = () => {
  setUser(null);
  deleteUserCookie();

  // Initialize an anonymous user
  initAnonUser();
};

// Initializes the user store with the user token from the cookie
// Returns true if the user token is found in the cookie, otherwise false
export const initUser = async () => {
  const token = getUserCookie();
  if (token) {
    setUserToken(token);
  }
};

// Clears the anonymous user from the store and persistant storage
export const clearAnonUser = () => {
  deleteAnonUserCookie();
  deleteAnonUserLocalStorage();
  setAnonUserId(null);
};
