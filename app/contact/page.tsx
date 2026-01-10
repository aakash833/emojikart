import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Contact Us | Free Online Emoji Keyboard",
  description: "Get in touch with us. We'd love to hear from you about our emoji keyboard service.",
  robots: "index, follow",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question, suggestion, or feedback? We'd love to hear from you!
        </p>

        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows={6}
                required
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        </div>

        <div className="mt-12 space-y-4">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 Email: support@emojikeyboard.com</p>
              <p>🌐 Website: <a href="/" className="text-primary hover:underline">Home</a></p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3 text-muted-foreground">
              <p><strong>Q: How do I use the emoji keyboard?</strong></p>
              <p>A: Simply click on any emoji to copy it to your clipboard, then paste it wherever you need it!</p>
              
              <p><strong>Q: Is this service free?</strong></p>
              <p>A: Yes, our emoji keyboard is completely free to use.</p>
              
              <p><strong>Q: Do you store my data?</strong></p>
              <p>A: We only store your preferences locally in your browser. See our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> for more details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

