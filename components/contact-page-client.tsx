"use client";

import ContactForm from "@/components/contact-form";
import Link from "next/link";
import { Mail, MessageSquare, HelpCircle, Lightbulb, Bug, Heart, Clock, Globe } from "lucide-react";

export function ContactPageClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Contact EmojiKart</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We'd love to hear from you! Whether you have questions, feedback, suggestions, or need support, 
          our team is here to help. Get in touch with us through any of the methods below.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
            <Mail className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">
              For general inquiries, support questions, or feedback, send us an email. We typically respond 
              within 24-48 hours.
            </p>
            <p className="text-foreground font-semibold">support@emojikart.com</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
            <Clock className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Response Time</h3>
            <p className="text-muted-foreground mb-4">
              We aim to respond to all inquiries as quickly as possible. Most emails receive a response 
              within 24-48 hours during business days.
            </p>
            <p className="text-foreground font-semibold">Monday - Friday, 9 AM - 6 PM</p>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-8 shadow-sm mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-500" />
              Send Us a Message
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible. All fields are required 
              to ensure we can provide you with the best assistance.
            </p>
          </div>
          <ContactForm />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              What Can We Help With?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p>Technical support and troubleshooting</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p>Feature requests and suggestions</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p>Bug reports and issues</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p>Partnership and collaboration inquiries</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p>General questions about EmojiKart</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <p>Feedback and testimonials</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" />
              Other Ways to Reach Us
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Website:</strong>{" "}
                <Link href="/" className="text-primary hover:underline cursor-pointer">
                  emojikart.com
                </Link>
              </p>
              <p>
                <strong className="text-foreground">Email:</strong> support@emojikart.com
              </p>
              <p>
                <strong className="text-foreground">Response Time:</strong> 24-48 hours
              </p>
              <p className="text-sm mt-4">
                For urgent matters, please include "URGENT" in your subject line and we'll prioritize 
                your message.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Before You Contact Us
          </h2>
          <p className="text-muted-foreground mb-4">
            To help us assist you more effectively, please check the following resources first:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            <li>
              Visit our <Link href="/about" className="text-primary hover:underline cursor-pointer">About page</Link> for 
              information about features and how to use EmojiKart
            </li>
            <li>
              Check our <Link href="/blog" className="text-primary hover:underline cursor-pointer">Blog</Link> for 
              guides, tips, and emoji-related content
            </li>
            <li>
              Review our <Link href="/privacy-policy" className="text-primary hover:underline cursor-pointer">Privacy Policy</Link> for 
              questions about data handling
            </li>
            <li>
              Read our <Link href="/terms-and-conditions" className="text-primary hover:underline cursor-pointer">Terms and Conditions</Link> for 
              usage guidelines
            </li>
          </ul>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: How do I use the emoji keyboard?
              </p>
              <p>
                A: Using EmojiKart is simple! Browse emojis by category using the sidebar, or use the search 
                bar to find specific emojis. Click on any emoji to copy it to your clipboard, then paste it 
                wherever you need it using Ctrl+V (or Cmd+V on Mac). No registration or downloads required!
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: Is EmojiKart completely free to use?
              </p>
              <p>
                A: Yes! EmojiKart is 100% free to use with no hidden costs, premium tiers, or subscription fees. 
                We believe emoji communication should be accessible to everyone, so we've made our platform 
                completely free forever.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: Do you store my personal data?
              </p>
              <p>
                A: We take your privacy seriously. We don't collect or store any personal information. Your 
                preferences (like theme and emoji size) are stored locally in your browser using localStorage, 
                and this data never leaves your device. For more details, please see our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: Can I use these emojis on social media?
              </p>
              <p>
                A: Absolutely! All emojis from EmojiKart are standard Unicode emojis that work on all major 
                platforms including Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, email, 
                and any other application that supports emojis.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: How often do you add new emojis?
              </p>
              <p>
                A: We regularly update our emoji library to include the latest Unicode emojis as they're released. 
                We typically add new emojis within a few weeks of their official Unicode release. You can check 
                our blog for announcements about new emoji additions.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: I found a bug or issue. How do I report it?
              </p>
              <p>
                A: We appreciate bug reports! Please use the contact form above and select "Bug Report" as the 
                subject. Include as much detail as possible about the issue, including your browser, device, 
                and steps to reproduce the problem. This helps us fix issues faster.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: Can I suggest a new feature?
              </p>
              <p>
                A: We love feature suggestions! Use the contact form and select "Feature Request" as the subject. 
                Describe your idea in detail and explain how it would improve the EmojiKart experience. We review 
                all suggestions and consider them for future updates.
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">
                Q: Do you offer partnerships or collaborations?
              </p>
              <p>
                A: Yes! We're open to partnerships, collaborations, and business inquiries. Please contact us 
                through the form above with "Partnership" in the subject line, and we'll get back to you to 
                discuss opportunities.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800 mt-8">
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">We Value Your Feedback</h3>
              <p className="text-muted-foreground">
                Your feedback helps us improve EmojiKart and make it better for everyone. Whether you have a 
                suggestion, found a bug, or just want to share your experience, we'd love to hear from you. 
                Thank you for being part of the EmojiKart community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
