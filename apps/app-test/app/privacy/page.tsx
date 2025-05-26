import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-base leading-relaxed">
          Welcome to TravelEco (“we”, “our”, “us”). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Personal Data:</strong> Name, email address, postal address, phone number.</li>
          <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent.</li>
          <li><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="text-base leading-relaxed">
          We use the information we collect in the following ways:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide, operate, and maintain our website.</li>
          <li>To improve, personalize, and expand our website.</li>
          <li>To understand and analyze how you use our website.</li>
          <li>To communicate with you, including for customer service and updates.</li>
          <li>To detect, prevent, and address technical issues.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
        <p className="text-base leading-relaxed">
          We may share your information with:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Service providers and vendors who perform services on our behalf.</li>
          <li>Compliance with legal obligations or to protect our rights.</li>
          <li>Business transfers such as mergers or acquisitions.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
        <p className="text-base leading-relaxed">
          We use cookies to enhance your browsing experience. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Security</h2>
        <p className="text-base leading-relaxed">
          We implement reasonable security measures to protect your personal information. However, no electronic transmission or storage of information can be guaranteed 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
        <p className="text-base leading-relaxed">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Children’s Privacy</h2>
        <p className="text-base leading-relaxed">
          Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
        <p className="text-base leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
