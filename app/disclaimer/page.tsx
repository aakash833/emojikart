import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_NAME}`,
  description: `Disclaimer for ${SITE_NAME}: general information only, third-party services, no warranty, and liability limits. Read alongside our Terms and Privacy Policy.`,
  robots: "index, follow",
  openGraph: {
    title: `Disclaimer | ${SITE_NAME}`,
    description: `Important legal disclaimer for ${SITE_NAME} (${SITE_URL}).`,
    type: "website",
    url: `${SITE_URL}/disclaimer`,
  },
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return <EmojiKeyboardClient />;
}
