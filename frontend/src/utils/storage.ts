import Cookies from "js-cookie";
import useCookieStore from "../store/cookieStore";
import useAnonUserStore from "../store/anonUserStore";
import useUserStore from "../store/userStore";
import useOrderStore from "../store/orderStore";
import { Cart, Order, User } from "../types";
import useCartStore from "../store/cartStore";
import { useAdminStore } from "../store/adminStore";

// Storage keys
const ANON_USER_ID_KEY = "anonUserId";
const USER_TOKEN_KEY = "user";
const ADMIN_TOKEN = "admin";
const COOKIE_CONSENT_KEY = "cookieConsent";

/**
 *  Gets the user token from the cookie
 *
 * @returns {string | undefined} The user token from the cookie
 */
export const getUserCookie = () =>
  JSON.parse(Cookies.get(USER_TOKEN_KEY) || "null");

/**
 * Sets the user token in the cookie
 *
 * @param {string} token The user token
 */
export const setUserCookie = (user: User) =>
  Cookies.set(USER_TOKEN_KEY, JSON.stringify(user), { expires: 30 });

/**
 * Deletes the user token from the cookie
 */
export const deleteUserCookie = () => Cookies.remove(USER_TOKEN_KEY);

/**
 *  Gets the user token from the store
 *
 * @returns {string | undefined} The user token
 */
export const getUserToken = () => useUserStore.getState().user?.token;

/**
 * Sets the user in the store
 *
 * @param {object} user The user object
 */
export const setUser = (user: User | null) =>
  useUserStore.getState().setUser(user);
/**
 * Removes the user token from the store
 */
export const removeUserToken = () => useUserStore.getState().setUser(null);

/**
 *  Gets whether the user token exists in the store
 *
 * @returns {boolean} True if the user token exists, otherwise false
 */
export const hasUserToken = () => !!getUserToken();

/**
 *  Gets the anon user id from the cookie
 *
 * @returns {string | undefined} The anon user id from the cookie
 */
export const getAnonUserCookie = () => Cookies.get(ANON_USER_ID_KEY);

export const setAnonUserCookie = (anonUserId: string) =>
  Cookies.set(ANON_USER_ID_KEY, anonUserId, { expires: 365 });
/**
 *  Gets the anon user id from local storage
 *
 * @returns {string | null} The anon user id from local storage
 */
export const getAnonUserLocalStorage = () =>
  localStorage.getItem(ANON_USER_ID_KEY);

/**
 *  Deletes the anon user id from the cookie
 */
export const deleteAnonUserCookie = () => Cookies.remove(ANON_USER_ID_KEY);

/**
 *  Deletes the anon user id from local storage
 */
export const deleteAnonUserLocalStorage = () =>
  localStorage.removeItem(ANON_USER_ID_KEY);

/**
 *  Gets the anon user id from the store
 *
 * @returns {string | null} The anon user id
 */
export const getAnonUserId = () => useAnonUserStore.getState().anonUserId;

/**
 * Sets the anon user id in the store
 *
 * @param {string} anonUserId The anon user id
 */
export const setAnonUserId = (anonUserId: string | null) =>
  useAnonUserStore.getState().setAnonUserId(anonUserId);

/**
 * Removes the anon user id from the store
 */
export const removeAnonUserId = () =>
  useAnonUserStore.getState().setAnonUserId(null);

/**
 *  Gets whether the anon user id exists in the store
 *
 * @returns {boolean} True if the anon user id exists, otherwise false
 */
export const hasAnonUserId = () => !!useAnonUserStore.getState().anonUserId;

/**
 *  Gets the cookie consent from the cookie
 *
 * @returns the cookie consent from the cookie
 */
export const getConsentCookie = () => Cookies.get(COOKIE_CONSENT_KEY);

/**
 * Sets the cookie consent in the cookie
 *
 * @param consent the cookie consent
 */
export const setConsentCookie = (consent: boolean) =>
  Cookies.set(COOKIE_CONSENT_KEY, consent.toString(), { expires: 365 });

/**
 *  Gets the cookie consent from the store
 *
 * @returns the cookie consent from the store
 */
export const hasConsented = () => useCookieStore.getState().hasConsented;

/**
 * Sets the cookie consent in the store
 *
 * @param consent the cookie consent
 */
export const setConsent = (consent: boolean) =>
  useCookieStore.getState().setConsent(consent);

/**
 *  Gets the orders from the store
 *
 * @returns {Order[]} The orders
 */
export const getOrders = () => useOrderStore.getState().orders;

/**
 * Sets the orders in the store
 *
 * @param {Order[]} orders The orders
 */
export const setOrders = (orders: Order[]) =>
  useOrderStore.getState().setOrders(orders);

/**
 *  Gets the cart from the store
 *
 * @returns {Cart} The cart
 */
export const getCart = () => useCartStore.getState().cart;

/**
 * Sets the cart in the store
 *
 * @param {Cart} cart The cart
 */
export const setCart = (cart: Cart) => useCartStore.getState().setCart(cart);

export const setAdminToken = (token: string) =>
  useAdminStore.getState().setAdmin({ token });
export const deleteAdminToken = () => useAdminStore.getState().setAdmin(null);

export const setAdminCookie = (token: string) =>
  Cookies.set(ADMIN_TOKEN, token, { expires: 1 });

export const getAdminToken = () => useAdminStore.getState().admin?.token;

export const getAdminCookie = () => Cookies.get(ADMIN_TOKEN);

export const deleteAdminCookie = () => Cookies.remove(ADMIN_TOKEN);
