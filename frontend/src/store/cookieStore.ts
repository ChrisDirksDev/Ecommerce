import { create } from "zustand";

interface CookieState {
  hasConsented: boolean;
  setConsent: (consent: boolean) => void;
}

const useCookieStore = create<CookieState>((set) => ({
  hasConsented: false,
  setConsent: (consent: boolean) => {
    set({ hasConsented: consent });
  },
}));

export default useCookieStore;
