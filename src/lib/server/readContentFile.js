import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readContentFile(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  return readFile(filePath, "utf-8");
}
