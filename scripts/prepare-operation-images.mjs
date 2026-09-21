import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const source = "C:/Users/TechKing/.codex/generated_images/01a0812a-3c2f-7c93-8f6b-e5d7045460b7";
const destination = "public/image/operation-teams";
await mkdir(destination, { recursive: true });
const images = [
  ["exec-4c6919c0-3eef-4b0c-a417-994b2525ff32.png", "data-centre-operations-nigeria.webp"],
  ["exec-a5e9b727-711b-4df4-90f4-0b79bd5bf8a9.png", "remote-team-onsite-support-nigeria.webp"],
  ["exec-2cce469e-06eb-4984-98d1-580f75e61589.png", "system-integrator-field-delivery-nigeria.webp"],
  ["exec-011f20ac-cdb6-480c-aeb7-dc0822b57671.png", "enterprise-it-infrastructure-oversight.webp"],
  ["exec-9832f24c-7927-4e54-b8e5-dd563d885688.png", "network-rack-remediation-comparison.webp"],
  ["exec-eef6ded5-4b3b-480f-b16a-456920519c4a.png", "enterprise-hardware-procurement-nigeria.webp"],
];
for (const [input, output] of images) {
  const info = await sharp(join(source, input)).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 84 }).toFile(join(destination, output));
  console.log(output, info.width, info.height, info.size);
}
