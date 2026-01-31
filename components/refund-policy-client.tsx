"use client";

import Link from "next/link";
import { RefreshCw, Shield, Clock, Mail, CheckCircle, AlertCircle, FileText, HelpCircle } from "lucide-react";

export function RefundPolicyClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Link href="/" className="text-primary hover:underline cursor-pointer">
            ← Back to Home
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-foreground">
            Refund & Return Policy
          </h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-8">
            <p className="text-foreground mb-0">
              At EmojiKart, we are committed to providing you with the best possible experience. This Refund and Return 
              Policy explains our policies regarding refunds, returns, and customer satisfaction. Please read this 
              policy carefully to understand your rights and our procedures.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              1. Service Nature and Refund Eligibility
            </h2>
            <p className="text-foreground mb-4">
              EmojiKart is a free online service that provides access to an emoji keyboard and related tools. 
              Our core service is completely free to use, with no charges for accessing emojis, copying them, 
              or using our website features.
            </p>
            <p className="text-foreground mb-4">
              <strong>Free Service:</strong> Since EmojiKart is a free service, there are typically no payments 
              to refund. However, if you have made any payments for premium features, donations, or other 
              services (if applicable), the following refund policy applies.
            </p>
            <p className="text-foreground mb-4">
              <strong>Premium Features (if applicable):</strong> If we offer premium features or paid services 
              in the future, you may be eligible for a refund under certain circumstances as outlined below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-500" />
              2. Refund Eligibility Criteria
            </h2>
            <p className="text-foreground mb-4">
              You may be eligible for a refund if:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Service Not Provided:</strong> You paid for a service that was not delivered as promised</li>
              <li><strong>Technical Issues:</strong> You experienced significant technical problems that prevented 
              you from using paid features, and we were unable to resolve them within 7 days</li>
              <li><strong>Duplicate Charges:</strong> You were charged multiple times for the same service</li>
              <li><strong>Unauthorized Charges:</strong> A charge was made without your authorization</li>
              <li><strong>Service Cancellation:</strong> You cancelled a subscription within the cancellation period</li>
            </ul>
            <p className="text-foreground mb-4">
              <strong>Not Eligible for Refund:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Free services (no payment was made)</li>
              <li>Change of mind after using paid services</li>
              <li>Failure to use the service after purchase</li>
              <li>Technical issues resolved within 7 days</li>
              <li>Violation of our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-500" />
              3. Refund Request Process
            </h2>
            <p className="text-foreground mb-4">
              To request a refund, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-3 text-foreground">
              <li>
                <strong>Contact Us:</strong> Send an email to{" "}
                <a href="mailto:support@emojikart.com" className="text-primary hover:underline">
                  support@emojikart.com
                </a>{" "}
                with the subject line "Refund Request" or use our{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact form
                </Link>
              </li>
              <li>
                <strong>Provide Information:</strong> Include the following details in your request:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Your name and email address</li>
                  <li>Date of purchase or transaction</li>
                  <li>Transaction ID or receipt number</li>
                  <li>Reason for refund request</li>
                  <li>Any relevant documentation or screenshots</li>
                </ul>
              </li>
              <li>
                <strong>Review Period:</strong> We will review your request within 5-7 business days</li>
              <li>
                <strong>Response:</strong> We will notify you of our decision via email</li>
              <li>
                <strong>Processing:</strong> If approved, refunds will be processed within 10-14 business days</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-purple-500" />
              4. Refund Processing Time
            </h2>
            <p className="text-foreground mb-4">
              Once your refund request is approved:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Processing Time:</strong> 10-14 business days from approval date</li>
              <li><strong>Payment Method:</strong> Refunds will be issued to the original payment method</li>
              <li><strong>Bank Processing:</strong> Additional 3-5 business days may be required for bank processing</li>
              <li><strong>Notification:</strong> You will receive an email confirmation when the refund is processed</li>
            </ul>
            <p className="text-foreground mb-4">
              <strong>Note:</strong> Processing times may vary depending on your payment provider and bank. 
              International transactions may take longer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-500" />
              5. Subscription Cancellations
            </h2>
            <p className="text-foreground mb-4">
              If you have an active subscription:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li><strong>Cancellation:</strong> You can cancel your subscription at any time through your account 
              settings or by contacting us</li>
              <li><strong>Effective Date:</strong> Cancellation takes effect at the end of your current billing period</li>
              <li><strong>No Partial Refunds:</strong> We do not provide partial refunds for unused subscription time</li>
              <li><strong>Access:</strong> You will retain access to paid features until the end of your billing period</li>
              <li><strong>Auto-Renewal:</strong> Cancelling prevents future charges but does not refund current period</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              6. Special Circumstances
            </h2>
            <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Technical Issues</h3>
            <p className="text-foreground mb-4">
              If you experience technical issues that prevent you from using paid services:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Contact our support team immediately</li>
              <li>We will attempt to resolve the issue within 7 days</li>
              <li>If unresolved, you may be eligible for a full refund</li>
              <li>Documentation of the issue may be required</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Duplicate Charges</h3>
            <p className="text-foreground mb-4">
              If you notice duplicate charges:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Contact us immediately with transaction details</li>
              <li>We will investigate and process a refund for duplicate charges</li>
              <li>Refunds for duplicates are typically processed within 3-5 business days</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Unauthorized Charges</h3>
            <p className="text-foreground mb-4">
              If you believe a charge was unauthorized:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Contact us immediately</li>
              <li>We will investigate the charge</li>
              <li>If confirmed unauthorized, a full refund will be processed</li>
              <li>We may require additional verification for security purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-green-500" />
              7. Customer Satisfaction Guarantee
            </h2>
            <p className="text-foreground mb-4">
              At EmojiKart, your satisfaction is our priority. We are committed to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Providing high-quality, reliable services</li>
              <li>Responding to customer concerns promptly</li>
              <li>Resolving issues fairly and transparently</li>
              <li>Maintaining open communication throughout the refund process</li>
              <li>Continuously improving our services based on feedback</li>
            </ul>
            <p className="text-foreground mb-4">
              If you are not satisfied with our service, please contact us. We will work with you to find a 
              solution that meets your needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              8. Non-Refundable Items
            </h2>
            <p className="text-foreground mb-4">
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>Free services and features</li>
              <li>Donations or voluntary contributions</li>
              <li>Services used in violation of our Terms of Service</li>
              <li>Services cancelled after the cancellation period</li>
              <li>Third-party fees or charges (payment processing fees, etc.)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              9. Dispute Resolution
            </h2>
            <p className="text-foreground mb-4">
              If you are not satisfied with our refund decision:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-foreground">
              <li>Contact us to discuss your concerns - we're happy to review your case</li>
              <li>Provide any additional information or documentation that may be relevant</li>
              <li>We will conduct a thorough review and provide a detailed response</li>
              <li>If you remain unsatisfied, you may contact your payment provider to dispute the charge</li>
            </ol>
            <p className="text-foreground mb-4">
              We are committed to resolving disputes fairly and amicably. Most issues can be resolved through 
              direct communication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-500" />
              10. Policy Updates
            </h2>
            <p className="text-foreground mb-4">
              We may update this Refund and Return Policy from time to time. Changes will be posted on this 
              page with an updated "Last updated" date. We encourage you to review this policy periodically 
              to stay informed about our refund procedures.
            </p>
            <p className="text-foreground mb-4">
              Your continued use of our services after policy changes constitutes acceptance of the updated policy. 
              If you do not agree with any changes, you may discontinue use of paid services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-500" />
              11. Contact Us
            </h2>
            <p className="text-foreground mb-4">
              If you have questions about this Refund and Return Policy or need to request a refund, please 
              contact us:
            </p>
            <div className="bg-card border rounded-lg p-6 mb-4">
              <p className="text-foreground mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:support@emojikart.com" className="text-primary hover:underline">
                  support@emojikart.com
                </a>
              </p>
              <p className="text-foreground mb-2">
                <strong>Contact Form:</strong>{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  emojikart.com/contact
                </Link>
              </p>
              <p className="text-foreground">
                <strong>Response Time:</strong> We aim to respond to all refund requests within 5-7 business days.
              </p>
            </div>
          </section>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800 mt-8">
            <h3 className="text-xl font-semibold mb-3">Your Satisfaction Matters</h3>
            <p className="text-foreground mb-0">
              At EmojiKart, we stand behind our services and are committed to ensuring your satisfaction. 
              If you have any concerns or questions about refunds, returns, or our services, please don't 
              hesitate to{" "}
              <Link href="/contact" className="text-primary hover:underline cursor-pointer font-semibold">
                contact us
              </Link>
              . We're here to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
