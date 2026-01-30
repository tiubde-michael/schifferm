import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { posts } from "../src/content/blog/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const absPath = (webPath) => path.join(rootDir, "public", webPath.replace(/^\//, ""));

async function generateOgImages() {
  for (const post of posts) {
    if (!post.coverImage || !post.ogImage) continue;
    const coverPath = absPath(post.coverImage);
    const ogPath = absPath(post.ogImage);
    try {
      await sharp(coverPath)
        .resize(1200, 627, {
          fit: "contain",
          background: "#ffffff",
        })
        .png({ quality: 90 })
        .toFile(ogPath);
      console.log(`Generated ${ogPath}`);
    } catch (error) {
      console.error(`Failed for ${post.slug}:`, error.message);
    }
  }
}

generateOgImages();
