import Tooltip from "./tooltip";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-ink)] pt-12 pb-8 text-white">
      <div className="container grid grid-cols-1 gap-10 text-center md:grid-cols-[1.2fr_0.8fr_1fr] md:text-left">
        <div>
          <h2 className="text-2xl text-white">Sweet Bites</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Small-batch bakery favorites with a polished online shopping experience built for easy discovery and checkout.
          </p>
        </div>

        <div>
          <h3 className="text-base text-white">Explore</h3>
          <div className="mt-4 flex justify-center gap-5 md:justify-start">
            <a href="/products" className="text-sm font-semibold text-white/70 transition hover:text-[var(--color-warm-gold)]">Shop</a>
            <a href="/cart" className="text-sm font-semibold text-white/70 transition hover:text-[var(--color-warm-gold)]">Cart</a>
            <a href="/privacy-policy" className="text-sm font-semibold text-white/70 transition hover:text-[var(--color-warm-gold)]">Privacy</a>
          </div>
        </div>

        <div>
          <h3 className="text-base text-white">Fresh From The Oven</h3>
          <form className="mt-4 flex overflow-hidden rounded-lg border border-white/15 bg-white/5">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-grow border-0 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:ring-0"
              aria-label="Email address"
            />
            <Tooltip text="This is a dummy feature">
              <button className="btn rounded-none bg-[var(--color-warm-gold)] px-4 py-3 text-white hover:bg-white hover:text-[var(--color-ink)]">
                <EnvelopeIcon className="h-5 w-5" />
                <span className="sr-only sm:not-sr-only">Join</span>
              </button>
            </Tooltip>
          </form>
        </div>
      </div>

      <div className="container mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} Sweet Bites. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
