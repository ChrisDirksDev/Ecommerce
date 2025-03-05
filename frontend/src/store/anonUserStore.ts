import { create } from "zustand";

interface AnonState {
  anonUserId: string | null;
  setAnonUserId: (anonUserId: string | null) => void;
}

const useAnonUserStore = create<AnonState>((set) => ({
  anonUserId: null,
  setAnonUserId: (anonUserId: string | null) => set({ anonUserId }),
}));

export default useAnonUserStore;
