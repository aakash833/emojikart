/** Extra editorial copy + FAQs per Unicode category (server-safe strings). */

export interface CategoryFAQ {
  q: string;
  a: string;
}

export const categoryDeepParagraphs: Record<string, string[]> = {
  "Smileys & Emotion": [
    "Smileys and emotion glyphs are the fastest way to add tone to short messages. On EmojiKart you are browsing the same Unicode characters that ship with modern phones and desktops—so when you copy a smiling face or a heart-eyes expression, it pastes as real text, not a screenshot. That matters for WhatsApp, Instagram captions, Slack threads, and email clients that accept emoji characters.",
    "Use this category when you need reactions that everyone can read: gratitude, sympathy, excitement, playful sarcasm (paired with words), or quick acknowledgment. Because vendors draw these characters differently, your Apple device might show a glossier smile than Android—and that is normal. For brand work, pick a reference platform and test before publishing campaign mockups.",
    "Writers and community managers often keep a personal shortlist of ten to fifteen emotion emojis to avoid decision fatigue. Combine them with clear sentences: one emoji can reinforce warmth without replacing the actual request or deadline you are communicating.",
  ],
  "People & Body": [
    "People and body emojis cover gestures, professions, families, and everyday human activities. They are ideal for accessibility-friendly signaling—waving hello, thumbs up for approval, or pointing to a task—without uploading custom images that might not load on every network.",
    "When you build onboarding flows or internal documentation, these symbols help international teams bridge language gaps. A raised hand can mean “question” in a webinar chat; a construction worker might illustrate maintenance windows. Always pair ambiguous gestures with text when the stakes are high (HR, incidents, money).",
    "Skin-tone modifiers exist so representation matches your intent. If you are quoting someone else’s message, preserve their choices; if you are authoring fresh content, pick tones deliberately and consistently with your organization’s inclusion guidelines.",
  ],
  "Animals & Nature": [
    "Animals and nature emojis are popular in pet communities, travel content, climate discussions, and seasonal marketing. Copy a cat, dog, tree, or weather symbol when you want an instant visual anchor that still behaves like text inside tweets, bios, or Notion pages.",
    "Gardening creators, wildlife nonprofits, and outdoor brands use this category to signal tone quickly—without licensing stock photos for a single social reply. Remember: the glyph is Unicode, so it inherits the color style of the viewer’s platform.",
    "If you teach young audiences, nature emojis can make flashcards or quizzes friendlier. Pair the emoji with the scientific name in the same line so the learning goal stays explicit.",
  ],
  "Food & Drink": [
    "Food and drink characters are shorthand for menus, lunch polls, recipe blogs, and delivery updates. They read well in push notification previews where space is tight, as long as you still include allergens or dietary warnings in plain language when required.",
    "Restaurants and ghost kitchens can paste Unicode food emojis into SMS campaigns—customers recognize pizza, burger, or boba icons immediately. Combine with your offer text so the promotion stays legally clear (price, terms, unsubscribe info).",
    "Nutrition creators should avoid implying medical claims through emoji alone. A salad bowl does not replace professional dietary advice; use emojis as decoration around evidence-based copy.",
  ],
  Activities: [
    "Activities cover sports, hobbies, music, and games—perfect for league chats, gym buddies, and esports announcements. Because these icons are standardized, you can paste a basketball or controller into Discord topic titles and still keep search indexes readable.",
    "Event planners use activity emojis in agendas (“⚽ kickoff at 10:00”) to scan schedules quickly. Follow up with time zones and links so nobody relies on the icon for logistics.",
    "Fitness professionals can pair workout emojis with explicit movement names. Unicode adds energy; it does not demonstrate form—link to video or written cues for safety.",
  ],
  "Travel & Places": [
    "Travel and places help you describe itineraries, traffic, weather, and landmarks without attaching map screenshots. They are especially handy in group chats when multiple languages are in play—an airplane or train still reads as transit.",
    "Hospitality brands combine hotel, beach, or cityscape emojis with booking details. Keep addresses and confirmation codes in text so customer support can copy them.",
    "If you report delays during incidents, use travel emojis sparingly next to factual updates. Humor can misfire when riders or passengers are stressed.",
  ],
  Objects: [
    "Objects include phones, laptops, keys, mail, and hundreds of daily items. Product teams paste them into release notes (“📱 mobile fix”) while support teams use envelopes or phones to point users toward the right channel.",
    "Educators marking STEM content might use microscopes, tools, or books as visual section headers inside slides—just ensure slide readers still get descriptive headings, not emoji-only titles.",
    "Because object emojis are detailed, they vary more between vendors. Preview on iOS and Android before packaging them into app store screenshots.",
  ],
  Symbols: [
    "Symbols span hearts, stars, arrows, math marks, and warning signs. They are powerful for emphasis—use them to draw attention to calls-to-action, checklist states, or navigation hints in microcopy.",
    "Hearts and sparkles dominate social aesthetics, but overuse dilutes meaning. Rotate symbols or combine with verbs: “Updated ✨” beats “✨✨✨✨✨” with no context.",
    "Security and compliance teams should prefer words for legal statements. Symbols can supplement warnings, but contracts and privacy notices must stand alone in text.",
  ],
  Flags: [
    "Flag emojis represent countries and regions. They are useful for sports, travel, multilingual sites, and cultural celebrations—always alongside respectful copy that explains why the flag appears.",
    "Some platforms combine regional indicator letters to render flags; if a combination shows as two letters instead of a banner, the viewer’s system may lack that sequence. Have a text fallback (“France”) for critical UI.",
    "When discussing geopolitics or conflict, flags carry heavy context. Lead with empathy and verified facts; emojis cannot carry nuance alone.",
  ],
};

export const categoryFaqs: Record<string, CategoryFAQ[]> = {
  "Smileys & Emotion": [
    {
      q: "Why do the same smiley emojis look different on my phone and my laptop?",
      a: "Each platform (Apple, Google, Samsung, etc.) supplies its own emoji artwork while sharing the same Unicode meaning. The character is identical; the illustration style changes.",
    },
    {
      q: "Can I use these emojis in commercial social posts?",
      a: "Unicode characters themselves are not a substitute for licensing photos or logos you paste elsewhere—but using standard emoji glyphs in captions is normal business practice. Always follow the platform’s ad policies.",
    },
    {
      q: "How do I copy an emoji from EmojiKart?",
      a: "Click any emoji in the grid (or use the dedicated emoji detail pages). The glyph copies to your clipboard so you can paste it into apps that accept Unicode text.",
    },
  ],
  "People & Body": [
    {
      q: "Do hand gesture emojis mean the same thing worldwide?",
      a: "Not always. A thumbs-up or OK gesture can be positive in one culture and rude in another. When talking to a global audience, add words to clarify intent.",
    },
    {
      q: "Why are there multiple skin tones?",
      a: "Unicode includes skin-tone modifiers so people can reflect identity respectfully. Choose deliberately and stay consistent with your brand or publication style.",
    },
    {
      q: "Can I paste these into Slack or Microsoft Teams?",
      a: "Yes—if the app allows emoji characters in that field, Unicode pastes work the same as typing from a native picker.",
    },
  ],
  "Animals & Nature": [
    {
      q: "Are these emojis free to use in my newsletter?",
      a: "You can include Unicode emoji characters in email like any other text. Test rendering in major clients because some desktop inboxes show monochrome glyphs.",
    },
    {
      q: "Which emoji should I pick for “outdoors” content?",
      a: "It depends on tone: 🌲 for forests, 🏕️ for camping, 🥾 for hiking stories. Pair the icon with a specific location or season in text.",
    },
    {
      q: "Do animal emojis replace accessibility alt text?",
      a: "No. On the web, meaningful images still need descriptive alt text. Emoji characters are announced by screen readers with their names—do not rely on them alone for crucial instructions.",
    },
  ],
  "Food & Drink": [
    {
      q: "Will food emojis show up in SMS?",
      a: "Most modern phones support them, but very old devices may show boxes. Keep a plain-text fallback for urgent messages.",
    },
    {
      q: "Can restaurants use emojis on printed menus?",
      a: "Yes if your design software embeds a font with color emoji. Proof print contrast so icons remain legible under restaurant lighting.",
    },
    {
      q: "Are nutritional claims OK in emoji form?",
      a: "Regulators care about substance, not icons. An emoji cannot justify health statements—write clear, compliant copy beside any decorative symbols.",
    },
  ],
  Activities: [
    {
      q: "Which emoji fits a youth sports league announcement?",
      a: "Pick the sport-specific ball or pictogram, then include date, field location, and contact info in text so guardians can act on it.",
    },
    {
      q: "Can I use music notes in a podcast title?",
      a: "Unicode music emojis paste into many podcast directories, but always check how each app crops titles on small screens.",
    },
    {
      q: "Do game-controller emojis imply platform support?",
      a: "No. They are decorative shorthand. Specify PlayStation, Xbox, PC, or mobile requirements explicitly.",
    },
  ],
  "Travel & Places": [
    {
      q: "How do I show multi-city trips?",
      a: "Use multiple relevant emojis if you like, but itineraries need times, terminals, and time zones in words—icons cannot replace tickets.",
    },
    {
      q: "Why does my flag sequence show as two letters?",
      a: "Some systems lack a full flag font for that region sequence. Provide the country name in text beside the emoji.",
    },
    {
      q: "Are vehicle emojis accurate to real models?",
      a: "They are generic symbols. Do not use them alone for safety recalls or transportation compliance messaging.",
    },
  ],
  Objects: [
    {
      q: "Can I paste the laptop emoji into a terminal?",
      a: "Terminals may render monochrome or hide color. Expect technical audiences to see plain text; that is fine for logs.",
    },
    {
      q: "Which emoji signals “email us”?",
      a: "✉️ or 📧 are common, but always include the actual address or form link next to them.",
    },
    {
      q: "Do object emojis affect SEO?",
      a: "They can appear in titles and snippets like other Unicode. Write titles for humans first; avoid stuffing unrelated symbols.",
    },
  ],
  Symbols: [
    {
      q: "Is it professional to use hearts in customer email?",
      a: "Depends on brand voice. Many B2C brands do; regulated industries often stay neutral. When unsure, default to words.",
    },
    {
      q: "Can arrows replace WCAG-compliant focus states?",
      a: "No. Accessibility requires visible focus rings and semantic HTML—emoji arrows are not a substitute.",
    },
    {
      q: "Why avoid emoji-only headlines?",
      a: "Search engines and screen readers lose context. Use emojis beside descriptive text, not instead of it.",
    },
  ],
  Flags: [
    {
      q: "How many country flags are available as emoji?",
      a: "Hundreds of regional sequences exist, but rendering depends on device fonts. Keep text country names for clarity.",
    },
    {
      q: "Can I use flags in political advertising?",
      a: "Follow election laws and platform policies. Flags alone do not disclose who paid for an ad—use required disclaimers.",
    },
    {
      q: "What if two communities read the same flag differently?",
      a: "Acknowledge nuance in prose. Emoji cannot carry historical context; thoughtful writing must.",
    },
  ],
};
