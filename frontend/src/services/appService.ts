import { hasUserToken } from "../utils/storage";
import { initAdmin } from "./adminService";
import { initAnonUser } from "./anonService";
import { fetchCart } from "./cartService";
import { initCookieConsent } from "./cookieService";
import { initUser } from "./userService";

export const initApp = async () => {
  initCookieConsent();
  await initAdmin();
  await initUser();

  if (!hasUserToken()) {
    initAnonUser();
  }

  await fetchCart();
};
