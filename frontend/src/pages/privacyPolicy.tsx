const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl text-[var(--color-dark-brown)] mb-4">Privacy Policy</h1>
      <p className="text-[var(--color-muted-gray-brown)] mb-6">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className="text-2xl text-[var(--color-dark-brown)] mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We collect information that you provide directly to us, such as when you create an account, place an order, or contact us for support.
      </p>

      <h2 className="text-2xl text-[var(--color-dark-brown)] mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To process your orders and transactions.</li>
        <li>To improve our website and services.</li>
        <li>To communicate with you about updates and promotions.</li>
      </ul>

      <h2 className="text-2xl text-[var(--color-dark-brown)] mb-2">3. Data Security</h2>
      <p className="mb-4">
        We take appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-2xl text-[var(--color-dark-brown)] mb-2">4. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal data. Contact us if you wish to make any changes.
      </p>

      <h2 className="text-2xl text-[var(--color-dark-brown)] mb-2">5. Changes to This Policy</h2>
      <p className="mb-6">
        We may update this policy from time to time. Please check this page periodically for any changes.
      </p>

      <p className="text-center text-[var(--color-muted-gray-brown)]">
        If you have any questions, please <a href="/contact" className="text-[var(--color-soft-blue)] underline">contact us</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;