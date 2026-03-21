import Link from "next/link";
import { Heart, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 bg-card/95 backdrop-blur-xl py-8 mt-8 z-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About EmojiKart</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your free online emoji keyboard with thousands of emojis to copy and paste instantly. 
              No registration required, completely free forever.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for better communication
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/emoji-generator" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Emoji Generator
                </Link>
              </li>
              <li>
                <Link href="/emoji-meanings" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Emoji Meanings
                </Link>
              </li>
              <li>
                <Link href="/emoji-trends" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Emoji Trends
                </Link>
              </li>
              <li>
                <Link href="/gifs" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  GIF Search
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-foreground/80 hover:text-foreground hover:underline transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Popular categories — internal links for crawl & rankings */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Emoji categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/smileys-emotion" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Smileys &amp; emotion
                </Link>
              </li>
              <li>
                <Link href="/people-body" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  People &amp; body
                </Link>
              </li>
              <li>
                <Link href="/animals-nature" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Animals &amp; nature
                </Link>
              </li>
              <li>
                <Link href="/food-drink" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Food &amp; drink
                </Link>
              </li>
              <li>
                <Link href="/symbols" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Symbols
                </Link>
              </li>
              <li>
                <Link href="/flags" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Flags
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/80 hover:text-foreground hover:underline transition-colors flex items-center gap-1">
                  Contact Us
                  <Mail className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/gifs/trending" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Trending GIFs
                </Link>
              </li>
              <li>
                <Link href="/gifs/categories" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  GIF Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-foreground/80 hover:text-foreground hover:underline transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            © {currentYear} EmojiKart. All rights reserved. Free online emoji keyboard for everyone.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">Free • No Registration • Privacy-First</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
