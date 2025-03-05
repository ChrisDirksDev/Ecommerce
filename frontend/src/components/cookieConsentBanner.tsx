// components/CookieBanner.tsx
import { acceptCookies, declineCookies } from "../services/cookieService";
import useCookieStore from "../store/cookieStore";

const CookieBanner = () => {
  const { hasConsented } = useCookieStore();

  if (hasConsented) return null; // Hide if already accepted/declined

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center">
      <p className="text-sm">
        We use cookies to improve your experience. By continuing, you agree to our
        <a href="/privacy-policy" className="underline"> Privacy Policy</a>.
      </p>
      <div className="flex gap-2">
        <button
          className="bg-blue-500 px-4 py-2 rounded text-white"
          onClick={acceptCookies}
        >
          Accept
        </button>
        <button
          className="bg-gray-500 px-4 py-2 rounded text-white"
          onClick={declineCookies}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
