// Haptic feedback utility
export function triggerHapticFeedback(intensity: "light" | "medium" | "heavy" = "medium") {
  if (typeof window === "undefined") return;

  // Check if Vibration API is supported
  if ("vibrate" in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 30,
    };

    try {
      navigator.vibrate(patterns[intensity]);
    } catch (error) {
      // Vibration API not available or blocked
      console.debug("Haptic feedback not available");
    }
  }
}

// Haptic feedback for button clicks
export function hapticClick() {
  triggerHapticFeedback("light");
}

// Haptic feedback for emoji copy
export function hapticCopy() {
  triggerHapticFeedback("medium");
}

// Haptic feedback for category change
export function hapticCategoryChange() {
  triggerHapticFeedback("light");
}

