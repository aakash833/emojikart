"use client";

import Link from "next/link";
import { Shield, Lock, Eye, Cookie, Users, Globe, FileText } from "lucide-react";

export function PrivacyPolicyClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Link href="/" className="text-primary hover:underline cursor-pointer">
            ← Back to Home
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-green-500" />
          <h1 className="text-4xl font-bold text-foreground">
            Privacy Policy
          </h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800 mb-8">
            <p className="text-foreground mb-0">
              At EmojiKart, we are committed to protecting your privacy and ensuring you have a positive experience 
              on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website emojikart.com. Please read this privacy policy carefully. 
              If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              1. Introduction
            </h2>
            <p className="text-foreground mb-4">
              Welcome to EmojiKart ("we," "our," or "us"). We operate the website emojikart.com (the "Service"). 
              This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of 
              personal data when you use our Service and the choices you have associated with that data.
            </p>
            <p className="text-foreground mb-4">
              We use your data to provide and improve the Service. By using the Service, you agree to the collection 
              and use of information in accordance with this policy. We are committed to protecting your privacy 
              and ensuring you have a positive experience on our website. We believe in transparency and want you 
              to understand how we handle your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-indigo-500" />
              2. Information We Collect
            </h2>
            <p className="text-foreground mb-4">
              We collect minimal information to provide you with the best experience possible. We are committed to 
              data minimization, meaning we only collect what is necessary to operate our service effectively.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
            <p className="text-foreground mb-4">
              When you use EmojiKart, you may voluntarily provide information through our contact form, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Name (if provided in contact form)</li>
              <li>Email address (if provided in contact form)</li>
              <li>Message content (if you contact us)</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-foreground mb-4">
              When you visit our website, we automatically collect certain information about your device and how you 
              interact with our Service:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Browser Information:</strong> Browser type, version, and language settings</li>
              <li><strong>Device Information:</strong> Device type (desktop, mobile, tablet), operating system, and screen resolution</li>
              <li><strong>IP Address:</strong> Your IP address is collected but immediately anonymized for analytics purposes</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths (all anonymized)</li>
              <li><strong>Referral Information:</strong> The website that referred you to EmojiKart (if applicable)</li>
              <li><strong>Local Storage Data:</strong> Your preferences stored locally in your browser (theme, emoji size, recent emojis)</li>
            </ul>
            <p className="text-foreground mb-4">
              <strong>Important:</strong> All automatically collected data is anonymized and aggregated. We cannot 
              identify individual users from this data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-500" />
              3. How We Use Your Information
            </h2>
            <p className="text-foreground mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Service Operation:</strong> To provide, maintain, and improve our emoji keyboard service</li>
              <li><strong>User Experience:</strong> To remember your preferences (theme, emoji size) and provide a personalized experience</li>
              <li><strong>Analytics:</strong> To analyze usage patterns and understand how users interact with our website (all data is anonymized)</li>
              <li><strong>Performance:</strong> To monitor and analyze the performance of our website and identify technical issues</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and security threats</li>
              <li><strong>Communication:</strong> To respond to your inquiries, comments, and questions when you contact us</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
            </ul>
            <p className="text-foreground mb-4">
              We do not sell, rent, or trade your personal information to third parties. We do not use your 
              information for marketing purposes beyond what is necessary to operate our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Cookie className="w-6 h-6 text-orange-500" />
              4. Cookies and Local Storage
            </h2>
            <p className="text-foreground mb-4">
              EmojiKart uses browser local storage (not cookies) to enhance your experience. Local storage allows 
              us to remember your preferences without using cookies that track you across websites.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Local Storage</h3>
            <p className="text-foreground mb-4">
              We use browser local storage to store the following information locally on your device:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Theme Preference:</strong> Your choice of light or dark mode</li>
              <li><strong>Emoji Size:</strong> Your preferred emoji display size (S, M, L, XL, XXL)</li>
              <li><strong>Recent Emojis:</strong> The last 20 emojis you've copied (for quick access)</li>
            </ul>
            <p className="text-foreground mb-4">
              <strong>Important:</strong> All local storage data remains on your device and is never transmitted 
              to our servers. You can clear this data at any time through your browser settings.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Third-Party Cookies</h3>
            <p className="text-foreground mb-4">
              While we do not use tracking cookies ourselves, third-party services we use may set cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Google AdSense:</strong> If we display advertisements, Google AdSense may use cookies 
              to serve personalized ads. You can opt out of personalized advertising through Google's Ad Settings 
              or by using browser extensions that block cookies.</li>
              <li><strong>Analytics Services:</strong> We may use analytics services that use cookies to help us 
              understand how visitors use our website. All analytics data is anonymized.</li>
            </ul>
            <p className="text-foreground mb-4">
              You can control cookies through your browser settings. Most browsers allow you to refuse cookies or 
              alert you when cookies are being sent. However, disabling cookies may affect the functionality of 
              some features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              5. Third-Party Services
            </h2>
            <p className="text-foreground mb-4">
              EmojiKart may use third-party services to help us operate our website and analyze how it is used. 
              These third parties have access to your information only to perform specific tasks on our behalf 
              and are obligated not to disclose or use it for any other purpose.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Google AdSense</h3>
            <p className="text-foreground mb-4">
              Our website may use Google AdSense for advertising. Google uses cookies and similar technologies 
              to serve ads based on your prior visits to our website or other websites. Google's use of 
              advertising cookies enables it and its partners to serve ads to you based on your visit to our 
              site and/or other sites on the Internet.
            </p>
            <p className="text-foreground mb-4">
              You may opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google's Ad Settings
              </a>
              . You can also opt out of some third-party vendors' uses of cookies for personalized advertising 
              by visiting{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.aboutads.info/choices
              </a>
              .
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Analytics Services</h3>
            <p className="text-foreground mb-4">
              We may use analytics services to help us understand how visitors use our website. These services 
              collect information anonymously and report website trends without identifying individual visitors. 
              All analytics data is aggregated and anonymized.
            </p>
            <p className="text-foreground mb-4">
              <strong>Note:</strong> We have no control over and assume no responsibility for the privacy 
              policies or practices of any third-party sites or services. We encourage you to review the privacy 
              policies of any third-party services you interact with.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-green-500" />
              6. Data Security
            </h2>
            <p className="text-foreground mb-4">
              The security of your information is important to us. We implement appropriate technical and 
              organizational security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
            <p className="text-foreground mb-4">
              However, please remember that no method of transmission over the Internet, or method of electronic 
              storage, is 100% secure. While we strive to use commercially acceptable means to protect your 
              personal information, we cannot guarantee its absolute security.
            </p>
            <p className="text-foreground mb-4">
              Our security measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>HTTPS encryption for all data transmission</li>
              <li>Regular security assessments and updates</li>
              <li>Minimal data collection (we only collect what's necessary)</li>
              <li>Anonymization of all analytics data</li>
              <li>Local storage instead of server-side storage for user preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-500" />
              7. Your Rights and Choices
            </h2>
            <p className="text-foreground mb-4">
              You have certain rights regarding your personal information. We respect these rights and are committed 
              to helping you exercise them:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Access:</strong> You can access your stored preferences at any time through your browser's local storage</li>
              <li><strong>Deletion:</strong> You can clear your browser local storage at any time to delete all stored preferences</li>
              <li><strong>Opt-Out:</strong> You can opt out of personalized advertising through Google's Ad Settings or browser extensions</li>
              <li><strong>Information:</strong> You can request information about what data we collect by contacting us</li>
              <li><strong>Correction:</strong> You can update your preferences at any time through the website interface</li>
              <li><strong>Complaints:</strong> You have the right to file a complaint with relevant data protection authorities</li>
            </ul>
            <p className="text-foreground mb-4">
              To exercise any of these rights, please contact us through our{" "}
              <Link href="/contact" className="text-primary hover:underline cursor-pointer">
                contact page
              </Link>
              . We will respond to your request within a reasonable timeframe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-500" />
              8. Children's Privacy
            </h2>
            <p className="text-foreground mb-4">
              EmojiKart is not directed to children under the age of 13 (or the minimum age in your jurisdiction). 
              We do not knowingly collect personal information from children under 13. If you are a parent or 
              guardian and believe that your child has provided us with personal information, please contact us 
              immediately so we can delete such information from our records.
            </p>
            <p className="text-foreground mb-4">
              If we become aware that we have collected personal information from a child under 13 without 
              verification of parental consent, we will take steps to remove that information from our servers 
              promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              9. International Data Transfers
            </h2>
            <p className="text-foreground mb-4">
              Your information may be transferred to and maintained on computers located outside of your state, 
              province, country, or other governmental jurisdiction where data protection laws may differ from 
              those in your jurisdiction.
            </p>
            <p className="text-foreground mb-4">
              If you are located outside the United States and choose to provide information to us, please note 
              that we may transfer your data to the United States and process it there. By using our Service, 
              you consent to the transfer of your information to the United States.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-500" />
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-foreground mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
            <p className="text-foreground mb-4">
              We encourage you to review this Privacy Policy periodically for any changes. Changes to this 
              Privacy Policy are effective when they are posted on this page. Your continued use of our Service 
              after any changes to this Privacy Policy constitutes your acceptance of those changes.
            </p>
            <p className="text-foreground mb-4">
              If we make material changes to this Privacy Policy, we will notify you by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Posting a prominent notice on our website</li>
              <li>Sending an email to the address you provided (if applicable)</li>
              <li>Updating the "Last updated" date at the top of this policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              11. Data Retention
            </h2>
            <p className="text-foreground mb-4">
              We retain your information only for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            <p className="text-foreground mb-4">
              <strong>Local Storage Data:</strong> Your preferences stored in browser local storage remain on 
              your device until you clear your browser data or uninstall the browser. We do not have access to 
              or control over this data.
            </p>
            <p className="text-foreground mb-4">
              <strong>Contact Information:</strong> If you contact us through our contact form, we may retain 
              your message and contact information for up to 2 years to respond to your inquiry and for record-keeping 
              purposes.
            </p>
            <p className="text-foreground mb-4">
              <strong>Analytics Data:</strong> Anonymized analytics data may be retained indefinitely for 
              statistical and improvement purposes, as it cannot be used to identify individual users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-500" />
              12. Contact Us
            </h2>
            <p className="text-foreground mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
              practices, please contact us:
            </p>
            <div className="bg-card border rounded-lg p-6 mb-4">
              <p className="text-foreground mb-2">
                <strong>Email:</strong> support@emojikart.com
              </p>
              <p className="text-foreground mb-2">
                <strong>Website:</strong>{" "}
                <Link href="/contact" className="text-primary hover:underline cursor-pointer">
                  emojikart.com/contact
                </Link>
              </p>
              <p className="text-foreground">
                <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 48 hours.
              </p>
            </div>
            <p className="text-foreground mb-4">
              We are committed to addressing your privacy concerns and will do our best to resolve any issues 
              you may have.
            </p>
          </section>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mt-8">
            <h3 className="text-xl font-semibold mb-3">Your Privacy Matters</h3>
            <p className="text-foreground mb-0">
              At EmojiKart, we believe that privacy is a fundamental right. We are committed to being transparent 
              about our data practices and giving you control over your information. If you have any questions 
              or concerns about how we handle your data, please don't hesitate to{" "}
              <Link href="/contact" className="text-primary hover:underline cursor-pointer font-semibold">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
