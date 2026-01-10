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

const svgPath = path.join(__dirname, "../public/icon.svg");
const publicPath = path.join(__dirname, "../public");

async function generateFavicons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    for (const { size, name } of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicPath, name));
      console.log(`Generated ${name}`);
    }

    console.log("All favicons generated successfully!");
  } catch (error) {
    console.error("Error generating favicons:", error);
  }
}

generateFavicons();
