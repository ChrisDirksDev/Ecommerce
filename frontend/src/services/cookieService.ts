import {
  getConsentCookie,
  setConsent,
  setConsentCookie,
} from "../utils/storage";

export const initCookieConsent = () => {
  const cookieConsent = getConsentCookie() === "true";
  setConsent(cookieConsent);
};

export const acceptCookies = () => {
  setConsentCookie(true);
  setConsent(true);
};

export const declineCookies = () => {
  setConsentCookie(false);
  setConsent(false);
};
