import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// Deterministic web exports of the supplied artwork, not a redrawn logo.
const folder = process.argv[2];
if (!folder) throw new Error('Provide the folder containing the three approved PNGs.');
const mark = path.join(folder, 'ChatGPT Image Oct 9, 2026, 04_47_41 PM-2.png');
const full = path.join(folder, 'ChatGPT Image Oct 9, 2026, 04_47_43 PM-3.png');
await fs.mkdir('public/brand', {recursive:true});
const markBuffer = await sharp(mark).trim().toBuffer();
const fullBuffer = await sharp(full).trim().toBuffer();
await sharp(markBuffer).resize(512,512,{fit:'contain',background:'#ffffff00'}).png().toFile('public/brand/ideal-globe.png');
await sharp(fullBuffer).resize({width:800}).png().toFile('public/brand/ideal-full-logo.png');
for (const [file,size] of [['app/icon.png',512],['public/brand/favicon.png',48],['public/apple-touch-icon.png',180]]) {
  const inset = Math.round(size * .08);
  await sharp(markBuffer).resize(size-inset*2,size-inset*2,{fit:'contain',background:'#ffffff'})
    .flatten({background:'#ffffff'}).extend({top:inset,bottom:inset,left:inset,right:inset,background:'#ffffff'})
    .png().toFile(file);
}
console.log('Prepared supplied full logo, globe, favicon and touch icon.');
