import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImage = path.join(__dirname, "public", "pwa-512x512.png");
const destImage = path.join(__dirname, "src", "assets", "logo.png");

try {
  // Ensure assets directory exists
  const assetsDir = path.dirname(destImage);
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Copy logo image
  fs.copyFileSync(sourceImage, destImage);
  console.log(`✅ Logo image copied from ${sourceImage} to ${destImage}`);
} catch (error) {
  console.error("❌ Error copying logo image:", error);
  process.exit(1);
}
