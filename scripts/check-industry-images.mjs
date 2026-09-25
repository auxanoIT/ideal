import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import sharp from 'sharp';

const catalog = {};
new Function('exports', ts.transpileModule(fs.readFileSync('data/industry-catalog.ts','utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText)(catalog);
const editorial = JSON.parse(fs.readFileSync('data/industry-editorial-images.json','utf8'));
for (const industry of catalog.industryProfiles) {
  const heroPath = path.join('public', decodeURIComponent(industry.heroImage.src));
  if (!fs.existsSync(heroPath)) throw new Error(`Missing hero: ${industry.slug}: ${heroPath}`);
  const metadata = await sharp(heroPath).metadata();
  if (!metadata.width || !metadata.height || metadata.format !== 'webp') throw new Error(`Invalid hero: ${heroPath}`);
  for (const section of ['challenge','why']) {
    const entry = editorial[industry.slug]?.[section];
    if (!entry) throw new Error(`Missing ${section} assignment: ${industry.slug}`);
    if (`/image/${entry.source}.webp` === industry.heroImage.src) throw new Error(`Hero reused in ${section}: ${industry.slug}`);
    await sharp(`public/image/industry-solutions/editorial/${industry.slug}-${section}.webp`).metadata();
  }
  console.log(`PASS ${industry.slug}: hero ${metadata.width}x${metadata.height}, both section assets readable`);
}
console.log(`Validated all ${catalog.industryProfiles.length} industry heroes and 38 editorial images.`);
