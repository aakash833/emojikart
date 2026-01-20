"use client";

import Link from "next/link";
import { FileText, Scale, Shield, AlertTriangle, Globe, Users, Mail } from "lucide-react";

export function TermsAndConditionsClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Link href="/" className="text-primary hover:underline cursor-pointer">
            ← Back to Home
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Scale className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-foreground">
            Terms and Conditions
          </h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-8">
            <p className="text-foreground mb-0">
              Please read these Terms and Conditions carefully before using EmojiKart (the "Service") operated by 
              EmojiKart ("us", "we", or "our"). Your access to and use of the Service is conditioned on your 
              acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others 
              who access or use the Service.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground mb-4">
              By accessing and using EmojiKart (emojikart.com), you accept and agree to be bound by the terms 
              and provisions of this agreement. If you do not agree to abide by the above, please do not use 
              this service.
            </p>
            <p className="text-foreground mb-4">
              These Terms and Conditions constitute a legally binding agreement between you and EmojiKart 
              regarding your use of our website and services. By using our Service, you represent that you are 
              at least 13 years of age (or the minimum age in your jurisdiction) and have the legal capacity 
              to enter into this agreement.
            </p>
            <p className="text-foreground mb-4">
              If you are using the Service on behalf of an organization, you represent and warrant that you 
              have the authority to bind that organization to these Terms, and the terms "you" and "your" 
              will refer to that organization.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              2. Use License and Permitted Uses
            </h2>
            <p className="text-foreground mb-4">
              Subject to your compliance with these Terms, EmojiKart grants you a limited, non-exclusive, 
              non-transferable, revocable license to access and use our Service for personal, non-commercial 
              purposes. This is the grant of a license, not a transfer of title, and under this license you may:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Access and use the emoji keyboard for personal communication purposes</li>
              <li>Copy and paste emojis for use in your personal messages, social media posts, and communications</li>
              <li>Browse and search emojis for your personal use</li>
            </ul>
            <p className="text-foreground mb-4">
              Under this license, you may <strong>NOT</strong>:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Modify, copy, reproduce, or create derivative works of the website, code, or materials</li>
              <li>Use the Service or emojis for any commercial purpose without our express written permission</li>
              <li>Attempt to reverse engineer, decompile, or disassemble any software contained on the website</li>
              <li>Remove any copyright, trademark, or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Use automated systems (bots, scrapers, etc.) to access the Service without permission</li>
              <li>Interfere with or disrupt the Service or servers connected to the Service</li>
              <li>Use the Service in any way that violates applicable laws or regulations</li>
            </ul>
            <p className="text-foreground mb-4">
              This license shall automatically terminate if you violate any of these restrictions and may be 
              terminated by EmojiKart at any time. Upon terminating your viewing of these materials or upon 
              the termination of this license, you must destroy any downloaded materials in your possession 
              whether in electronic or printed format.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              3. Disclaimer of Warranties
            </h2>
            <p className="text-foreground mb-4">
              The materials on EmojiKart are provided on an "as is" and "as available" basis. We make no 
              warranties, expressed or implied, and hereby disclaim and negate all other warranties including, 
              without limitation:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Implied warranties or conditions of merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement of intellectual property or other violation of rights</li>
              <li>That the Service will be uninterrupted, timely, secure, or error-free</li>
              <li>That the results obtained from using the Service will be accurate or reliable</li>
              <li>That any errors in the Service will be corrected</li>
            </ul>
            <p className="text-foreground mb-4">
              We do not warrant or make any representations concerning the accuracy, likely results, or 
              reliability of the use of the materials on our website or otherwise relating to such materials 
              or on any sites linked to this site.
            </p>
            <p className="text-foreground mb-4">
              Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusion may 
              not apply to you. In such cases, our liability will be limited to the maximum extent permitted 
              by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              4. Limitations of Liability
            </h2>
            <p className="text-foreground mb-4">
              In no event shall EmojiKart, its directors, employees, partners, agents, suppliers, or affiliates 
              be liable for any indirect, incidental, special, consequential, or punitive damages, including 
              without limitation:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
              <li>Damages resulting from your use or inability to use the Service</li>
              <li>Damages resulting from any conduct or content of third parties on the Service</li>
              <li>Damages resulting from unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Damages resulting from bugs, viruses, trojan horses, or the like that may be transmitted to or through our Service</li>
              <li>Damages for loss of data or profit, or due to business interruption</li>
            </ul>
            <p className="text-foreground mb-4">
              Our total liability to you for all claims arising from or related to the use of our Service is 
              limited to the amount you paid us, if any, for accessing the Service, or $100, whichever is greater.
            </p>
            <p className="text-foreground mb-4">
              Some jurisdictions do not allow the limitation or exclusion of liability for incidental or 
              consequential damages, so the above limitation may not apply to you. In such cases, our liability 
              will be limited to the maximum extent permitted by applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              5. Accuracy of Materials and Content
            </h2>
            <p className="text-foreground mb-4">
              The materials appearing on EmojiKart could include technical, typographical, or photographic errors. 
              We do not warrant that any of the materials on our website are accurate, complete, or current. 
              We may make changes to the materials contained on our website at any time without notice.
            </p>
            <p className="text-foreground mb-4">
              While we strive to provide accurate emoji information and ensure all emojis display correctly, 
              emoji rendering may vary across different devices, operating systems, and platforms. We are not 
              responsible for how emojis appear on third-party platforms or applications.
            </p>
            <p className="text-foreground mb-4">
              We do not make any commitment to update the materials on our website. The materials may be out of 
              date at any given time, and we are under no obligation to update such materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-500" />
              6. Third-Party Links and Content
            </h2>
            <p className="text-foreground mb-4">
              Our Service may contain links to third-party websites or services that are not owned or controlled 
              by EmojiKart. We have not reviewed all of the sites linked to our website and are not responsible 
              for the contents of any such linked site.
            </p>
            <p className="text-foreground mb-4">
              The inclusion of any link does not imply endorsement by us of the site. Use of any such linked 
              website is at the user's own risk. We strongly advise you to read the terms and conditions and 
              privacy policies of any third-party websites or services that you visit.
            </p>
            <p className="text-foreground mb-4">
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices 
              of any third-party websites or services. You acknowledge and agree that EmojiKart shall not be 
              responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be 
              caused by or in connection with the use of or reliance on any such content, goods, or services 
              available on or through any such websites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" />
              7. User Conduct and Prohibited Uses
            </h2>
            <p className="text-foreground mb-4">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You 
              agree not to use the Service:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate EmojiKart, an EmojiKart employee, another user, or any other person or entity</li>
              <li>In any manner that could disable, overburden, damage, or impair the Service</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
              <li>To use any robot, spider, or other automatic device, process, or means to access the Service for any purpose</li>
              <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful</li>
            </ul>
            <p className="text-foreground mb-4">
              We reserve the right to terminate or suspend your access to the Service immediately, without prior 
              notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-500" />
              8. Modifications to Terms and Service
            </h2>
            <p className="text-foreground mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
              revision is material, we will try to provide at least 30 days notice prior to any new terms taking 
              effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-foreground mb-4">
              We also reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at 
              any time with or without notice. We shall not be liable to you or to any third party for any 
              modification, suspension, or discontinuance of the Service.
            </p>
            <p className="text-foreground mb-4">
              By continuing to access or use our Service after any revisions become effective, you agree to be 
              bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to 
              use the Service.
            </p>
            <p className="text-foreground mb-4">
              We recommend that you review these Terms periodically to stay informed of any updates. The "Last 
              updated" date at the top of this page indicates when these Terms were last revised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-blue-500" />
              9. Intellectual Property Rights
            </h2>
            <p className="text-foreground mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of EmojiKart and its licensors. The Service is protected by copyright, trademark, and 
              other laws. Our trademarks and trade dress may not be used in connection with any product or service 
              without our prior written consent.
            </p>
            <p className="text-foreground mb-4">
              <strong>Emoji Characters:</strong> The emoji characters themselves are part of the Unicode Standard 
              and are not owned by EmojiKart. However, the organization, presentation, search functionality, and 
              user interface of our emoji keyboard are proprietary to EmojiKart.
            </p>
            <p className="text-foreground mb-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly 
              perform, republish, download, store, or transmit any of the material on our Service without our 
              prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-green-500" />
              10. Governing Law and Jurisdiction
            </h2>
            <p className="text-foreground mb-4">
              These Terms and Conditions are governed by and construed in accordance with the laws of the 
              jurisdiction in which EmojiKart operates, without regard to its conflict of law provisions.
            </p>
            <p className="text-foreground mb-4">
              You irrevocably submit to the exclusive jurisdiction of the courts in that location for the 
              resolution of any disputes arising out of or relating to these Terms or the Service. However, 
              we retain the right to bring proceedings against you for breach of these Terms in your country 
              of residence or any other relevant country.
            </p>
            <p className="text-foreground mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be 
              limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain 
              in full force and effect and enforceable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-500" />
              11. Indemnification
            </h2>
            <p className="text-foreground mb-4">
              You agree to defend, indemnify, and hold harmless EmojiKart and its licensee and licensors, and 
              their employees, contractors, agents, officers and directors, from and against any and all 
              claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not 
              limited to attorney's fees), resulting from or arising out of:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Your use and access of the Service</li>
              <li>Your violation of any term of these Terms</li>
              <li>Your violation of any third party right, including without limitation any copyright, property, or privacy right</li>
              <li>Any claim that your use of the Service caused damage to a third party</li>
            </ul>
            <p className="text-foreground mb-4">
              This defense and indemnification obligation will survive these Terms and your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              12. Severability and Waiver
            </h2>
            <p className="text-foreground mb-4">
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining 
              provisions of these Terms will remain in effect. These Terms constitute the entire agreement 
              between us regarding our Service, and supersede and replace any prior agreements we might have 
              between us regarding the Service.
            </p>
            <p className="text-foreground mb-4">
              No waiver by EmojiKart of any term or condition set forth in these Terms shall be deemed a further 
              or continuing waiver of such term or condition or a waiver of any other term or condition, and any 
              failure of EmojiKart to assert a right or provision under these Terms shall not constitute a waiver 
              of such right or provision.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-500" />
              13. Contact Information
            </h2>
            <p className="text-foreground mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
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
                <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours.
              </p>
            </div>
          </section>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 mt-8">
            <h3 className="text-xl font-semibold mb-3">Acknowledgment</h3>
            <p className="text-foreground mb-0">
              By using EmojiKart, you acknowledge that you have read these Terms and Conditions and agree to be 
              bound by them. If you do not agree to these Terms, please do not use our Service. We reserve the 
              right to update, change, or replace any part of these Terms by posting updates and changes to our 
              website. It is your responsibility to check our website periodically for changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
