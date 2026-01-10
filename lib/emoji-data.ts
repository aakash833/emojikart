import data from "@emoji-mart/data";

type EmojiItem = {
  emoji: string;
  name: string;
  keywords?: string[];
  description?: string;
};

export const emojiData: Record<string, EmojiItem[]> = {
  "Smileys & Emotion": [],
  "People & Body": [],
  "Animals & Nature": [],
  "Food & Drink": [],
  Activities: [],
  "Travel & Places": [],
  Objects: [],
  Symbols: [],
  Flags: [],
};

const CATEGORY_MAP: Record<string, keyof typeof emojiData> = {
  nature: "Animals & Nature",
  foods: "Food & Drink",
  activity: "Activities",
  places: "Travel & Places",
  objects: "Objects",
  symbols: "Symbols",
  flags: "Flags",
};

// Keywords that indicate people/body emojis (not smileys)
const PEOPLE_BODY_KEYWORDS = [
  "hand",
  "finger",
  "arm",
  "leg",
  "foot",
  "body",
  "person",
  "man",
  "woman",
  "boy",
  "girl",
  "baby",
  "child",
  "adult",
  "elder",
  "family",
  "couple",
  "kiss",
  "heart_hands",
  "muscle",
  "ear",
  "nose",
  "eye",
  "tongue",
  "lips",
  "brain",
  "bone",
  "tooth",
  "walking",
  "running",
  "dancing",
  "climbing",
  "swimming",
  "biking",
  "wrestling",
  "massage",
  "haircut",
  "selfie",
  "nail_care",
  "writing_hand",
  "pray",
  "wave",
  "point",
  "fist",
  "clap",
  "ok_hand",
  "thumbs",
  "vulcan",
  "spock",
  "robot",
  "vampire",
  "zombie",
  "elf",
  "fairy",
  "mage",
  "superhero",
  "ninja",
  "astronaut",
  "pilot",
  "firefighter",
  "cop",
  "construction_worker",
  "health_worker",
  "teacher",
  "student",
  "judge",
  "farmer",
  "cook",
  "mechanic",
  "scientist",
  "artist",
  "singer",
  "prince",
  "princess",
  "bride",
  "groom",
  "pregnant",
  "breast",
  "feeding",
  "angel",
  "santa",
  "mrs_claus",
  "mx_claus",
  "guardsman",
  "detective",
  "spy",
  "turban",
  "headscarf",
  "tuxedo",
  "veil",
  "crown",
  "footprints",
  "bust",
  "silhouette",
  "hugging",
  "holding_hands",
  "people_holding_hands",
  "two_men",
  "two_women",
  "man_and_woman",
  "deaf",
  "wheelchair",
  "probing_cane",
  "kneeling",
  "standing",
  "levitating",
  "steamy_room",
  "lotus_position",
  "bath",
  "sleeping_accommodation",
];

// Process categories and their emojis
(data as any).categories.forEach((category: any) => {
  if (category.id === "people") {
    // Split "people" category into "Smileys & Emotion" and "People & Body"
    category.emojis.forEach((emojiId: string) => {
      const emoji = (data as any).emojis[emojiId];
      if (!emoji) return;

      // Try multiple methods to get native emoji
      let nativeEmoji = emoji.skins?.[0]?.native || emoji.native;
      
      // If no native, try to construct from unified code
      if (!nativeEmoji && emoji.unified) {
        try {
          const codePoints = emoji.unified.split('-').map((hex: string) => parseInt(hex, 16));
          nativeEmoji = String.fromCodePoint(...codePoints);
        } catch (e) {
          // Ignore if conversion fails
        }
      }
      
      if (!nativeEmoji || nativeEmoji.trim() === "") return;

      const emojiItem = {
        emoji: nativeEmoji,
        name: emoji.id,
        keywords: emoji.keywords || [],
        description: emoji.name || emoji.id.replace(/_/g, ' '),
      };

      // Check if emoji name contains people/body keywords
      const isPeopleBody = PEOPLE_BODY_KEYWORDS.some((keyword) =>
        emoji.id.toLowerCase().includes(keyword.toLowerCase())
      );

      if (isPeopleBody) {
        emojiData["People & Body"].push(emojiItem);
      } else {
        emojiData["Smileys & Emotion"].push(emojiItem);
      }
    });
  } else {
    // Handle other categories normally
    const categoryKey = CATEGORY_MAP[category.id];
    if (!categoryKey) return;

    category.emojis.forEach((emojiId: string) => {
      const emoji = (data as any).emojis[emojiId];
      if (!emoji) return;

      // For flags and other emojis, check skins first, then native property
      let nativeEmoji = null;
      
      // Try to get native emoji from skins array
      if (emoji.skins && emoji.skins.length > 0) {
        // Try first skin (default)
        nativeEmoji = emoji.skins[0].native;
        // If first skin doesn't have native, try others
        if (!nativeEmoji) {
          for (const skin of emoji.skins) {
            if (skin.native) {
              nativeEmoji = skin.native;
              break;
            }
          }
        }
      }
      
      // Fallback to direct native property
      if (!nativeEmoji && emoji.native) {
        nativeEmoji = emoji.native;
      }
      
      // If still no native, try to construct from unified code
      if (!nativeEmoji && emoji.unified) {
        try {
          const codePoints = emoji.unified.split('-').map((hex: string) => parseInt(hex, 16));
          nativeEmoji = String.fromCodePoint(...codePoints);
        } catch (e) {
          // Ignore if conversion fails
        }
      }

      // Only add if we have a valid emoji character
      if (nativeEmoji && nativeEmoji.trim() !== "" && nativeEmoji.length > 0) {
        emojiData[categoryKey].push({
          emoji: nativeEmoji,
          name: emoji.id,
          keywords: emoji.keywords || [],
          description: emoji.name || emoji.id.replace(/_/g, ' '),
        });
      }
    });
  }
});
