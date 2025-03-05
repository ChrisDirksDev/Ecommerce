import { hasUserToken } from "../utils/storage";
import { initAdmin } from "./adminService";
import { initAnonUser } from "./anonService";
import { initCookieConsent } from "./cookieService";
import { initUser } from "./userService";

export const initApp = async () => {
  await initCookieConsent();
  await initAdmin();
  await initUser();

  if (!hasUserToken()) {
    initAnonUser();
  }
};
