// components/CookieBanner.tsx
import { acceptCookies, declineCookies } from "../services/cookieService";
import useCookieStore from "../store/cookieStore";

const CookieBanner = () => {
  const { hasConsented } = useCookieStore();

  if (hasConsented) return null; // Hide if already accepted/declined

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-white/10 bg-[var(--color-ink)] p-5 text-white shadow-2xl md:flex-row md:items-center md:justify-between">
      <p className="text-sm leading-6 text-white/80 md:text-base">
        We use cookies to improve your experience. By continuing, you agree to our
        <a href="/privacy-policy" className="font-semibold text-white underline hover:text-[var(--color-warm-gold)] transition-colors"> Privacy Policy</a>.
      </p>
      <div className="flex gap-3">
        <button
          className="btn bg-white px-5 py-2 text-[var(--color-ink)] hover:bg-[var(--color-warm-gold)] hover:text-white"
          onClick={acceptCookies}
        >
          Accept
        </button>
        <button
          className="btn border-white/20 bg-transparent px-5 py-2 text-white hover:border-white"
          onClick={declineCookies}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
