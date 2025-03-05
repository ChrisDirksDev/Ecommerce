import useUserStore from "../store/userStore";
import useAnonUserStore from "../store/anonUserStore";

interface requestAuth {
  headers: { Authorization?: string; "x-anon-user-id"?: string };
}

export const authHeader = (): requestAuth => {
  const token = useUserStore.getState().user?.token || "";
  const anonUserId = useAnonUserStore.getState().anonUserId || "";

  const headers: requestAuth["headers"] = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (anonUserId) {
    headers["x-anon-user-id"] = anonUserId;
  }

  return {
    headers,
  };
};
