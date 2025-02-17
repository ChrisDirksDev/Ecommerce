import { create } from "zustand";
import axios from "axios";

interface AdminState {
  admin: { token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: JSON.parse(localStorage.getItem("admin") || "null"),

  login: async (email, password) => {
    const { data } = await axios.post(`$/admin/login`, {
      email,
      password,
    });
    localStorage.setItem("admin", JSON.stringify(data));
    set({ admin: data });
  },

  logout: () => {
    localStorage.removeItem("admin");
    set({ admin: null });
  },
}));
