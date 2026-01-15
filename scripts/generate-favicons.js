// Script to generate favicon files from SVG
// Run: node scripts/generate-favicons.js
// Requires: sharp (npm install sharp --save-dev)

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

// Use favicon.svg as source (has transparent bg and border)
const svgPath = path.join(__dirname, "../public/favicon.svg");
const publicPath = path.join(__dirname, "../public");

async function generateFavicons() {
  try {
    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error(`SVG file not found at ${svgPath}`);
      console.log("Using icon.svg as fallback...");
      const fallbackPath = path.join(__dirname, "../public/icon.svg");
      if (!fs.existsSync(fallbackPath)) {
        console.error("No SVG favicon found!");
        return;
      }
      svgPath = fallbackPath;
    }

    const svgBuffer = fs.readFileSync(svgPath);

    for (const { size, name } of sizes) {
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .png({
          quality: 100,
          compressionLevel: 6, // Lower compression for better color preservation
          palette: true, // Use palette mode for better color preservation
        })
        .toFile(path.join(publicPath, name));
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico from 32x32 PNG
    const favicon32Path = path.join(publicPath, "favicon-32x32.png");
    if (fs.existsSync(favicon32Path)) {
      await sharp(favicon32Path)
        .resize(32, 32)
        .toFile(path.join(publicPath, "favicon.ico"));
      console.log("✅ Generated favicon.ico");
    }

    console.log("\n🎉 All favicons generated successfully!");
    console.log("📝 Files generated:");
    sizes.forEach(({ name }) => console.log(`   - ${name}`));
    console.log("   - favicon.ico");
  } catch (error) {
    console.error("❌ Error generating favicons:", error.message);
    if (error.message.includes("sharp")) {
      console.log("\n💡 Tip: Install sharp by running: npm install sharp --save-dev");
    }
  }
}

generateFavicons();
