import Tooltip from "./tooltip";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-dark-brown)] text-white pt-10 pb-6 mt-12">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Branding & About */}
        <div>
          <h2 className="tracking-wide text-[var(--color-warm-gold)]">Ecommerce</h2>
          <p className="text-sm mt-3 text-white">
            Discover the best deals and latest trends in one place.
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-[var(--color-warm-gold)]">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-5 mt-3">
            <a href="#" className="link">Facebook</a>
            <a href="#" className="link">Twitter</a>
            <a href="#" className="link">Instagram</a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-[var(--color-warm-gold)]">Stay Updated</h3>
          <form className="mt-3 flex items-center border border-[var(--color-warm-gold)] rounded-lg  overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 flex-grow text-white focus:outline-none rounded-r-none"
            />
            <Tooltip text="This is a dummy feature">
              <button className="bg-[var(--color-warm-gold)] text-[var(--color-dark-brown)] px-4 py-2 hover:bg-[var(--color-dark-brown)] hover:text-[var(--color-warm-gold)] transition cursor-pointer">
                Subscribe
              </button>
            </Tooltip>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center border-t border-[var(--color-muted-gray-brown)] mt-8 pt-4 text-center text-sm text-white font-semibold">
        <p>© {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
        <span className="mx-2 text-[var(--color-muted-gray-brown)]"> | </span>
        <p>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
