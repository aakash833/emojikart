"use client";

import Link from "next/link";
import { AlertCircle, Info, Scale, Mail, Shield } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function DisclaimerPageClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Link href="/" className="text-primary hover:underline cursor-pointer">
            ← Back to Home
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-amber-500" />
          <h1 className="text-4xl font-bold text-foreground">Disclaimer</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Last updated: April 5, 2026 · Applies to {SITE_URL}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-foreground mb-0 leading-relaxed">
              {SITE_NAME} provides a free online emoji keyboard, search, educational articles, and related tools
              for personal and commercial communication. The information on this website is offered in good faith
              for general guidance. It is not legal, medical, financial, or professional advice. By using this site,
              you agree to the limitations explained on this page and in our{" "}
              <Link href="/terms-and-conditions" className="text-primary hover:underline">
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Accuracy of emoji meanings and trends
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              Emoji designs and cultural interpretations change over time. Descriptions, “meanings,” trend lists,
              and blog articles reflect common usage at the time of writing—not a guarantee of how every person or
              platform will read a symbol. Always consider context, relationship, and local norms before sending
              messages that matter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              Third-party services (GIFs, analytics, ads)
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              Some features may load content or scripts from third parties (for example, GIF search APIs or
              advertising networks). Those services are governed by their own policies. {SITE_NAME} does not control
              third-party availability, pricing, or data practices. See our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for how we approach data on {SITE_NAME}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-purple-500" />
              No warranty
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              The site and its content are provided “as is” without warranties of any kind, whether express or
              implied, including merchantability, fitness for a particular purpose, or non-infringement. We strive
              for reliable uptime and secure practices but do not guarantee uninterrupted or error-free operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of liability</h2>
            <p className="text-foreground mb-4 leading-relaxed">
              To the fullest extent permitted by law, {SITE_NAME} and its operators shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use of the site,
              including loss of data, revenue, or goodwill—even if advised of the possibility of such damages.
            </p>
          </section>

          <section className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-500" />
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about this disclaimer? Email{" "}
              <a href="mailto:support@emojikart.com" className="text-primary font-medium hover:underline">
                support@emojikart.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
