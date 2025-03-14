// components/CookieBanner.tsx
import { acceptCookies, declineCookies } from "../services/cookieService";
import useCookieStore from "../store/cookieStore";

const CookieBanner = () => {
  const { hasConsented } = useCookieStore();

  if (hasConsented) return null; // Hide if already accepted/declined

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-dark-brown)] text-white p-6 flex justify-between items-center shadow-lg rounded-t-lg">
      <p className="text-sm md:text-base">
        We use cookies to improve your experience. By continuing, you agree to our
        <a href="/privacy-policy" className="underline hover:text-[var(--color-soft-pink)] transition-colors"> Privacy Policy</a>.
      </p>
      <div className="flex gap-4">
        <button
          className="bg-[var(--color-soft-blue)] hover:bg-[var(--color-warm-gold)] text-[var(--color-dark-brown)] px-6 py-3 rounded-md transition-all duration-300"
          onClick={acceptCookies}
        >
          Accept
        </button>
        <button
          className="bg-[var(--color-soft-pink)] hover:bg-[var(--color-muted-gray-brown)] text-white px-6 py-3 rounded-md transition-all duration-300"
          onClick={declineCookies}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
