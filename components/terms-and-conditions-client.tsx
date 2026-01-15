"use client";

import Link from "next/link";

export function TermsAndConditionsClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Link href="/" className="text-primary hover:underline cursor-pointer">
            Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Terms and Conditions
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground mb-4">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-foreground mb-4">
              Permission is granted to temporarily use our emoji keyboard for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to reverse engineer any software contained on the
                website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-foreground mb-4">
              The materials on our website are provided on an 'as is' basis. We
              make no warranties, expressed or implied, and hereby disclaim and
              negate all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
            <p className="text-foreground mb-4">
              In no event shall we or our suppliers be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Accuracy of Materials
            </h2>
            <p className="text-foreground mb-4">
              The materials appearing on our website could include technical,
              typographical, or photographic errors. We do not warrant that any
              of the materials on its website are accurate, complete, or
              current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
            <p className="text-foreground mb-4">
              We have not reviewed all of the sites linked to our website and
              are not responsible for the contents of any such linked site. The
              inclusion of any link does not imply endorsement by us of the
              site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
            <p className="text-foreground mb-4">
              We may revise these terms of service for its website at any time
              without notice. By using this website you are agreeing to be bound
              by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
            <p className="text-foreground mb-4">
              These terms and conditions are governed by and construed in
              accordance with applicable laws and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Contact Information
            </h2>
            <p className="text-foreground mb-4">
              If you have any questions about these Terms and Conditions, please
              contact us through our{" "}
              <Link href="/contact" className="text-primary hover:underline cursor-pointer">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
