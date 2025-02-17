import axios from "axios";
import { create } from "zustand";
import { loginUser } from "../utils/api";

interface UserState {
  user: { token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),

  login: async (email, password) => {
    const user = await loginUser(email, password);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
