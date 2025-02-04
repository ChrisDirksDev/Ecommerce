import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface AdminState {
  admin: { token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: JSON.parse(localStorage.getItem("admin") || "null"),

  login: async (email, password) => {
    const { data } = await axios.post(`${API_URL}/admin/login`, {
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
