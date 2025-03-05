import { create } from "zustand";

interface AdminState {
  admin: { token: string } | null;
  setAdmin: (admin: { token: string } | null) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  setAdmin: (admin: { token: string } | null) => set({ admin }),
}));
