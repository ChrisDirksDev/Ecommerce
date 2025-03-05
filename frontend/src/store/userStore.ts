import { create } from "zustand";

interface UserState {
  user: { token: string } | null;
  setUser: (user: { token: string } | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: { token: string } | null) => set({ user }),
}));

export default useUserStore;
