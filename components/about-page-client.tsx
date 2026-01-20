"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Search, Heart, Shield, Globe, Users, Sparkles, CheckCircle } from "lucide-react";

export function AboutPageClient() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          About EmojiKart - Your Free Online Emoji Keyboard
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover the story behind EmojiKart and how we're revolutionizing digital communication through emojis.
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500" />
              What We Do
            </h2>
            <p className="text-foreground mb-4">
              EmojiKart is a comprehensive, free online emoji keyboard that provides access to over 3,900 emojis 
              from the latest Unicode standard. Our platform enables users to instantly copy and paste emojis 
              across all their digital communications. Whether you're composing tweets, sending messages, writing 
              emails, or creating social media posts, our emoji keyboard helps you express yourself more effectively 
              and add personality to your text-based conversations.
            </p>
            <p className="text-foreground mb-4">
              We've built EmojiKart to be the most user-friendly emoji tool on the web. Our platform is designed 
              with accessibility in mind, ensuring that everyone can easily find and use the perfect emoji for any 
              situation. From smileys and emotions to animals, food, travel, and symbols, we've organized thousands 
              of emojis into intuitive categories that make browsing effortless.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Our Mission
            </h2>
            <p className="text-foreground mb-4">
              Our mission is to make emoji communication accessible, enjoyable, and meaningful for everyone. We 
              believe that emojis are more than just decorative symbols—they're a universal language that bridges 
              cultural and linguistic barriers. Emojis enhance digital communication by adding emotion, context, 
              and personality to text-based conversations, making them more engaging and expressive.
            </p>
            <p className="text-foreground mb-4">
              At EmojiKart, we're committed to providing a free, high-quality service that helps millions of users 
              worldwide communicate more effectively. We understand that in today's digital age, emojis have become 
              an essential part of how we express ourselves online. That's why we've created a platform that's not 
              only functional but also continuously updated with the latest emojis and features.
            </p>
            <p className="text-foreground mb-4">
              We're passionate about creating an inclusive digital communication tool that serves everyone—from 
              students and professionals to content creators and social media enthusiasts. Our goal is to remove 
              barriers to emoji usage and make it as simple as clicking a button.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-card border rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2">Extensive Emoji Library</h3>
                <p className="text-sm text-muted-foreground">
                  Access over 3,900 emojis organized into 9 main categories, including the latest Unicode emojis 
                  released in 2025.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <Zap className="w-5 h-5 text-yellow-500 mb-2" />
                <h3 className="font-semibold mb-2">One-Click Copy & Paste</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly copy any emoji to your clipboard with a single click. No apps or downloads required—works 
                  directly in your browser.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <Search className="w-5 h-5 text-blue-500 mb-2" />
                <h3 className="font-semibold mb-2">Smart Search Functionality</h3>
                <p className="text-sm text-muted-foreground">
                  Find emojis quickly using our intelligent search feature. Search by name, emotion, or keyword to 
                  discover the perfect emoji.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <Globe className="w-5 h-5 text-indigo-500 mb-2" />
                <h3 className="font-semibold mb-2">Universal Compatibility</h3>
                <p className="text-sm text-muted-foreground">
                  Works seamlessly on all devices—desktop computers, tablets, and mobile phones. Compatible with 
                  all major browsers and operating systems.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <Shield className="w-5 h-5 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2">Privacy-First Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Your privacy matters. We don't collect personal information, and all preferences are stored 
                  locally in your browser.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <Users className="w-5 h-5 text-purple-500 mb-2" />
                <h3 className="font-semibold mb-2">No Registration Required</h3>
                <p className="text-sm text-muted-foreground">
                  Start using EmojiKart immediately without creating an account. Completely free forever with no 
                  hidden costs or premium tiers.
                </p>
              </div>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>✅ Dark mode support for comfortable viewing in any lighting condition</li>
              <li>✅ Customizable emoji sizes (S, M, L, XL, XXL) for better visibility</li>
              <li>✅ Recent emojis tracking to quickly access your frequently used emojis</li>
              <li>✅ Category-based browsing for easy navigation</li>
              <li>✅ Regular updates with new emojis as they're released</li>
              <li>✅ Mobile-responsive design optimized for touch interactions</li>
              <li>✅ Fast loading times and smooth performance</li>
              <li>✅ Support for all major platforms including Twitter, Facebook, Instagram, WhatsApp, Slack, and more</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use EmojiKart</h2>
            <p className="text-foreground mb-4">
              Using EmojiKart is incredibly simple and intuitive. Here's a step-by-step guide to get you started:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-3 text-foreground">
              <li>
                <strong>Browse by Category:</strong> Use the sidebar to navigate through our 9 main emoji categories. 
                Click on any category to view all emojis in that group. Categories include Smileys & Emotion, People & 
                Body, Animals & Nature, Food & Drink, Activities, Travel & Places, Objects, Symbols, and Flags.
              </li>
              <li>
                <strong>Search for Emojis:</strong> Use the search bar at the top to find specific emojis. Simply type 
                keywords like "happy", "love", "food", or "celebration" and our smart search will show you relevant 
                emojis instantly.
              </li>
              <li>
                <strong>Copy Emojis:</strong> Click on any emoji to automatically copy it to your clipboard. You'll 
                see a confirmation popup indicating that the emoji has been copied successfully.
              </li>
              <li>
                <strong>Paste Anywhere:</strong> Paste the copied emoji wherever you need it—Twitter, Facebook, 
                Instagram, WhatsApp, email, documents, or any other application that supports emojis. Simply use 
                Ctrl+V (or Cmd+V on Mac) or right-click and select "Paste".
              </li>
              <li>
                <strong>Customize Your Experience:</strong> Adjust emoji sizes using the size selector in the sidebar. 
                Toggle between light and dark modes using the theme button in the header. All preferences are saved 
                automatically in your browser.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              Privacy & Security
            </h2>
            <p className="text-foreground mb-4">
              At EmojiKart, we take your privacy and security seriously. We've designed our platform with privacy 
              as a core principle, ensuring that your personal information remains protected. Here's what you need 
              to know:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
              <li>
                <strong>No Personal Data Collection:</strong> We don't collect, store, or share any personal 
                information. You can use EmojiKart completely anonymously without providing any personal details.
              </li>
              <li>
                <strong>Local Storage Only:</strong> Your preferences (theme, emoji size, recent emojis) are stored 
                locally in your browser using localStorage. This data never leaves your device and is not transmitted 
                to our servers.
              </li>
              <li>
                <strong>No Tracking Cookies:</strong> We don't use tracking cookies or analytics that identify 
                individual users. Any analytics we use are completely anonymized and aggregated.
              </li>
              <li>
                <strong>Secure Connection:</strong> Our website uses HTTPS encryption to ensure all data transmitted 
                between your browser and our servers is secure.
              </li>
              <li>
                <strong>Third-Party Services:</strong> We may use third-party services like Google AdSense for 
                advertising. These services have their own privacy policies, and we recommend reviewing them. 
                You can opt out of personalized ads through your browser settings.
              </li>
            </ul>
            <p className="text-foreground mb-4">
              For more detailed information about our privacy practices, please review our{" "}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline cursor-pointer font-semibold"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Quality</h2>
            <p className="text-foreground mb-4">
              EmojiKart is committed to providing the highest quality emoji experience. We regularly update our 
              emoji library to include the latest Unicode emojis as they're released. Our team works diligently to 
              ensure that all emojis are properly categorized, searchable, and display correctly across different 
              platforms and devices.
            </p>
            <p className="text-foreground mb-4">
              We also provide educational content through our blog, covering topics like emoji meanings, trends, 
              usage tips, and best practices. Our goal is not just to provide emojis, but to help users understand 
              how to use them effectively in their digital communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-500" />
              Get in Touch
            </h2>
            <p className="text-foreground mb-4">
              We love hearing from our users! Whether you have feedback, suggestions for new features, questions 
              about using EmojiKart, or just want to say hello, we'd love to hear from you. Your input helps us 
              improve the platform and make it even better for everyone.
            </p>
            <p className="text-foreground mb-4">
              Visit our{" "}
              <Link href="/contact" className="text-primary hover:underline cursor-pointer font-semibold">
                contact page
              </Link>{" "}
              to reach out to us. We typically respond to all inquiries within 24-48 hours.
            </p>
          </section>

          <section className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Using Emojis?</h2>
            <p className="text-foreground mb-6">
              Join millions of users who trust EmojiKart for their emoji needs. Start expressing yourself better 
              today with our free, easy-to-use emoji keyboard.
            </p>
            <Button asChild size="lg" className="cursor-pointer">
              <Link href="/">Start Using Emoji Keyboard Now</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
