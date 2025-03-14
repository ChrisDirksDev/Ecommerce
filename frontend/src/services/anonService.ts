import { v4 as uuidv4 } from "uuid";
import {
  getAnonUserCookie,
  getAnonUserLocalStorage,
  hasConsented,
  setAnonUserCookie,
  setAnonUserId,
} from "../utils/storage";
import { getAnonUser } from "../api/anon";
import { logError } from "../utils/logging";

export const initAnonUser = async () => {
  try {
    const anonUserId = getAnonUserCookie() || getAnonUserLocalStorage();

    if (anonUserId) {
      setAnonUserId(anonUserId);
      return;
    }

    const newAnonUserId = uuidv4();
    // We put the id in the store here immediatly so that its availible
    // to be pulled in by the auth header in the api calls
    setAnonUserId(newAnonUserId);

    const response = await getAnonUser();

    if (hasConsented()) {
      setAnonUserCookie(response.uuid);
    }

    setAnonUserId(response.uuid);
  } catch (error) {
    logError("initAnonUser", error);
  }
};
