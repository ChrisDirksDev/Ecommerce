import { loginAdmin } from "../api/admin";
import { logError } from "../utils/logging";
import {
  deleteAdminCookie,
  deleteAdminToken,
  getAdminCookie,
  hasConsented,
  setAdminCookie,
  setAdminToken,
} from "../utils/storage";

export const initAdmin = async () => {
  const adminCookie = getAdminCookie();
  if (adminCookie) {
    setAdminToken(adminCookie);
  }
};

export const AuthAdmin = async (email: string, password: string) => {
  try {
    const response = await loginAdmin(email, password);

    if (hasConsented()) {
      setAdminCookie(response.token);
    }

    setAdminToken(response.token);
  } catch (error) {
    logError("AuthAdmin", error);
  }
};

export const LogoutAdmin = () => {
  deleteAdminToken();
  deleteAdminCookie();
};
