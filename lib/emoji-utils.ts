/**
 * Get Unicode code point from emoji character
 */
export function getUnicodeCode(emoji: string): string {
  if (!emoji) return "";
  
  const codePoints: string[] = [];
  for (let i = 0; i < emoji.length; i++) {
    const code = emoji.codePointAt(i);
    if (code && code > 0xFFFF) {
      // Surrogate pair
      codePoints.push(code.toString(16).toUpperCase().padStart(4, "0"));
      i++; // Skip the next character as it's part of the pair
    } else if (code) {
      codePoints.push(code.toString(16).toUpperCase().padStart(4, "0"));
    }
  }
  
  return codePoints.length > 0 ? `U+${codePoints.join(" ")}` : "";
}

/**
 * Get platform variations for an emoji
 * Returns an array of platform names that support the emoji
 */
export function getPlatformVariations(): Array<{
  name: string;
  displayName: string;
  icon: string;
}> {
  return [
    { name: "apple", displayName: "Apple", icon: "🍎" },
    { name: "google", displayName: "Google", icon: "🔍" },
    { name: "facebook", displayName: "Facebook", icon: "📘" },
    { name: "windows", displayName: "Windows", icon: "🪟" },
    { name: "twitter", displayName: "Twitter", icon: "🐦" },
    { name: "samsung", displayName: "Samsung", icon: "📱" },
    { name: "joypixels", displayName: "JoyPixels", icon: "😊" },
  ];
}

