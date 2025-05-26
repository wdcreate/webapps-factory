import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-base leading-relaxed">
          This Cookie Policy explains how [Your Company Name] (“we”, “our”, “us”) uses cookies and similar technologies on our website. By using our site, you consent to the use of cookies as described in this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
        <p className="text-base leading-relaxed">
          Cookies are small text files placed on your device (computer, tablet, mobile) when you visit a website. They help the site recognize your device and remember information about your visit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Strictly Necessary Cookies:</strong> Required for basic site functionality (e.g., page navigation, secure areas).
          </li>
          <li>
            <strong>Performance Cookies:</strong> Collect anonymous information about site usage to help us improve performance.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Remember choices you make (e.g., language, region) to provide enhanced features.
          </li>
          <li>
            <strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads and track ad performance.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. How We Use Cookies</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To remember your preferences and settings.</li>
          <li>To understand how you interact with our site and improve it.</li>
          <li>To provide personalized content and advertising.</li>
          <li>To secure our site and prevent fraudulent activity.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
        <p className="text-base leading-relaxed">
          We may allow third-party service providers (e.g., analytics, advertising partners) to place cookies on your device. These cookies are governed by the respective provider’s privacy and cookie policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Managing Cookies</h2>
        <p className="text-base leading-relaxed">
          You can control or delete cookies via your browser settings. Most browsers allow you to:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>View what cookies are stored.</li>
          <li>Block or delete specific cookies.</li>
          <li>Block all cookies by default (note: this may break some site features).</li>
        </ul>
        <p className="text-sm italic mt-2">
          For more information, visit <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">allaboutcookies.org</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to This Cookie Policy</h2>
        <p className="text-base leading-relaxed">
          We may update this policy from time to time. Any changes will be posted here with a “Last updated” date. Continued use after updates means you accept the new policy.
        </p>
      </section>

    </div>
  );
};

export default CookiePolicy;
