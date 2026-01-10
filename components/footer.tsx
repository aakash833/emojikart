import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/50 py-4 pl-0 md:pl-72 overflow-x-hidden">
      <div className="container mx-auto px-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-foreground">
            Terms & Conditions
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
        <div className="text-muted-foreground">
          © {new Date().getFullYear()} Emoji Keyboard
        </div>
      </div>
    </footer>
  );
}
