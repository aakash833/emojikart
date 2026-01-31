import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/50 py-4 pl-0 md:pl-72 mt-auto">
      <div className="container mx-auto px-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {/* <Link href="/emoji-generator" className="hover:text-foreground">
            Emoji Generator
          </Link>
          <Link href="/emoji-meanings" className="hover:text-foreground">
            Emoji Meanings
          </Link>
          <Link href="/emoji-trends" className="hover:text-foreground">
            Emoji Trends
          </Link> */}
          <Link href="/gifs" className="hover:text-foreground">
            GIF Search
          </Link>
          <Link href="/gifs/trending" className="hover:text-foreground">
            Trending GIFs
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-foreground">
            Terms & Conditions
          </Link>
          <Link href="/refund-policy" className="hover:text-foreground">
            Refund Policy
          </Link>
        </div>
        <div className="text-muted-foreground">
          © {new Date().getFullYear()} Emoji Keyboard
        </div>
      </div>
    </footer>
  );
}
