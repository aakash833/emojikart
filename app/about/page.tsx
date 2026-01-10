import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | Free Online Emoji Keyboard",
  description: "Learn about our free online emoji keyboard. Copy and paste emojis instantly for Twitter, Facebook, Instagram, WhatsApp and more.",
  robots: "index, follow",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">About Our Emoji Keyboard</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-foreground mb-4">
              We provide a free, easy-to-use online emoji keyboard with over 3,900 emojis that you can 
              copy and paste instantly. Whether you're tweeting, messaging, emailing, or posting on social 
              media, our emoji keyboard helps you add more expression to your communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-foreground mb-4">
              Our mission is to make emoji communication accessible to everyone. We believe that emojis 
              enhance digital communication by adding emotion, context, and personality to text-based 
              conversations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>✅ Over 3,900 emojis organized by categories</li>
              <li>✅ One-click copy and paste</li>
              <li>✅ Search functionality to find emojis quickly</li>
              <li>✅ Works on all devices - desktop, tablet, and mobile</li>
              <li>✅ Dark mode support</li>
              <li>✅ No registration required</li>
              <li>✅ Completely free to use</li>
              <li>✅ Regular updates with new emojis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Browse emojis by category or use the search bar</li>
              <li>Click on any emoji to copy it to your clipboard</li>
              <li>Paste the emoji wherever you need it - Twitter, Facebook, Instagram, WhatsApp, email, or any app</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="text-foreground mb-4">
              We take your privacy seriously. We don't collect personal information, and all your preferences 
              are stored locally in your browser. Check out our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-foreground mb-4">
              Have feedback, suggestions, or questions? We'd love to hear from you! 
              Visit our <Link href="/contact" className="text-primary hover:underline">contact page</Link> to reach out.
            </p>
          </section>

          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/">Start Using Emoji Keyboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

