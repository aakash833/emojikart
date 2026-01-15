"use client";

import ContactForm from "@/components/contact-form";
import Link from "next/link";

export function ContactPageClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question, suggestion, or feedback? We'd love to hear from you!
        </p>

        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <ContactForm />
        </div>

        <div className="mt-12 space-y-4">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 Email: support@emojikeyboard.com</p>
              <p>
                🌐 Website:{" "}
                <Link href="/" className="text-primary hover:underline cursor-pointer">
                  Home
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong>Q: How do I use the emoji keyboard?</strong>
              </p>
              <p>
                A: Simply click on any emoji to copy it to your clipboard, then
                paste it wherever you need it!
              </p>

              <p>
                <strong>Q: Is this service free?</strong>
              </p>
              <p>A: Yes, our emoji keyboard is completely free to use.</p>

              <p>
                <strong>Q: Do you store my data?</strong>
              </p>
              <p>
                A: We only store your preferences locally in your browser. See
                our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Privacy Policy
                </Link>{" "}
                for more details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
