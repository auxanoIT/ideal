import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/image/ideal-standard", { recursive: true });
const result = await sharp("C:/Users/TechKing/.codex/generated_images/01a0812a-3c2f-7c93-8f6b-e5d7045460b7/exec-b5c797ee-277e-4bb8-a36c-ed2d89c72ecb.png")
  .resize({ width: 1536, withoutEnlargement: true })
  .webp({ quality: 88 })
  .toFile("public/image/ideal-standard/ideal-solutions-isometric-data-centre-execution-method.webp");
console.log(result);
