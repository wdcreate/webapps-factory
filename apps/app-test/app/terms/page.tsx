import React from "react";

const TermsOfUse = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-base leading-relaxed">
          By accessing and using this website (“Service”), you accept and agree
          to be bound by these Terms of Use and our Privacy Policy. If you
          disagree with any part of the terms, you may not use our Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Changes to Terms</h2>
        <p className="text-base leading-relaxed">
          We reserve the right to modify or replace these Terms at any time.
          We’ll post updates here and indicate the “Last updated” date. Your
          continued use following changes means you accept the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
        <p className="text-base leading-relaxed">
          Permission is granted to temporarily download one copy of the
          materials (information or software) on this Service for personal,
          non-commercial transitory viewing only. This is a license, not a
          transfer of title.
        </p>
        <ul className="list-disc list-inside space-y-2 mt-4">
          <li>You may not modify or copy materials.</li>
          <li>You may not use the materials for any commercial purpose.</li>
          <li>
            You may not remove any copyright or proprietary notations from the
            materials.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. User Obligations</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain the security of your account credentials.</li>
          <li>
            Not to impersonate any person or entity or misrepresent your
            affiliation.
          </li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Intellectual Property
        </h2>
        <p className="text-base leading-relaxed">
          All content, features, and functionality on the Service (including
          text, graphics, logos, and software) are owned by or licensed to us
          and are protected by copyright, trademark, and other laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
        <p className="text-base leading-relaxed">
          The materials on this Service are provided “as is”. We make no
          warranties, expressed or implied, and disclaim all other warranties
          including but not limited to merchantability, fitness for a particular
          purpose, or non-infringement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-base leading-relaxed">
          In no event shall we or our suppliers be liable for any damages
          arising out of or relating to your use of the Service, including
          direct, indirect, incidental, or consequential damages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
        <p className="text-base leading-relaxed">
          These Terms are governed by and construed in accordance with the laws
          of [Your Jurisdiction], without regard to its conflict of law
          provisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
        <p className="text-base leading-relaxed">
          We may suspend or terminate your access immediately, without prior
          notice, for any reason, including breach of these Terms.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
