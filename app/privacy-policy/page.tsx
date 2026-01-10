import AdUnit from "@/components/ad-unit";
import { AdSenseAd } from "@/components/adsense-ad";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Free Online Emoji Keyboard",
  description:
    "Privacy Policy for our free online emoji keyboard. Learn how we protect your data and privacy.",
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-4">
          <a href="/" className="text-primary hover:underline">
            Home
          </a>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Privacy Policy
        </h1>
        <AdUnit />
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-foreground mb-4">
              Welcome to our Free Online Emoji Keyboard. We are committed to
              protecting your privacy and ensuring you have a positive
              experience on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p className="text-foreground mb-4">
              We collect minimal information to provide you with the best
              experience:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address (anonymized)</li>
              <li>Usage data and analytics</li>
              <li>Preferences stored locally in your browser</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-foreground mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Improve our website functionality</li>
              <li>Analyze usage patterns</li>
              <li>Provide personalized emoji recommendations</li>
              <li>Ensure website security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Cookies and Local Storage
            </h2>
            <p className="text-foreground mb-4">
              We use browser local storage to remember your preferences (theme,
              recently copied emojis). We do not use tracking cookies.
              Third-party services (like Google AdSense) may use cookies for
              advertising purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-foreground mb-4">
              Our website uses Google AdSense for advertising. Google may use
              cookies and collect data according to their privacy policy. We
              have no control over third-party privacy practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-foreground mb-4">
              We implement appropriate security measures to protect your
              information. However, no method of transmission over the internet
              is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p className="text-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your stored preferences</li>
              <li>Clear your browser local storage</li>
              <li>Opt-out of personalized ads</li>
              <li>Contact us with privacy concerns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-foreground mb-4">
              Our service is not directed to children under 13. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-foreground mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-foreground mb-4">
              If you have questions about this Privacy Policy, please contact us
              through our
              <a href="/contact" className="text-primary hover:underline ml-1">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
