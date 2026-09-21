import sharp from "sharp";
import { resolve } from "node:path";
import { access } from "node:fs/promises";

// Delivery optimisation only; keep the original generated artwork intact.
const assets = [
  [
    "C:/Users/TechKing/.codex/generated_images/01a0812a-3c2f-7c93-8f6b-e5d7045460b7/exec-1a8bb177-ffa9-4ad7-b577-ab0023da301a.png",
    "data-centre-infrastructure-audit-inspection-nigeria.webp",
  ],
  [
    "C:/Users/TechKing/.codex/generated_images/01a0812a-3c2f-7c93-8f6b-e5d7045460b7/exec-8982e655-d09f-4191-8de9-8a85bd0477fc.png",
    "data-centre-rack-and-stack-deployment-nigeria.webp",
  ],
  [
    "public/image/ideal-solutions-data-centre-infrastructure-support.png",
    "smart-hands-data-centre-technical-support-nigeria.webp",
  ],
  [
    "C:/Users/TechKing/.codex/generated_images/01a0812a-3c2f-7c93-8f6b-e5d7045460b7/exec-65d7d83c-82fa-4eae-9874-81440aaca805.png",
    "data-centre-security-access-control-nigeria.webp",
  ],
];

for (const [source, filename] of assets) {
  const destination = resolve("public/image/service-pillars", filename);
  try {
    await access(destination);
    console.log("Already present:", filename);
    continue;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const result = await sharp(source).resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 84 }).toFile(destination);
  console.log(filename, result.width, result.height, result.size);
}
