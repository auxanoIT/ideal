import fs from 'node:fs/promises';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('data/industry-editorial-images.json','utf8'));
const tiles=[];
await fs.mkdir('public/image/industry-solutions/editorial',{recursive:true});
for(const [slug,sections] of Object.entries(manifest)) for(const [section,image] of Object.entries(sections)) {
  const dest=`public/image/industry-solutions/editorial/${slug}-${section}.webp`;
  await sharp(`public/image/${image.source}.webp`).resize({width:960,withoutEnlargement:true}).webp({quality:74,effort:6}).toFile(dest);
  const index=tiles.length;
  const label=Buffer.from(`<svg width="220" height="26"><rect width="220" height="26" fill="white"/><text x="4" y="17" font-size="10">${slug} / ${section}</text></svg>`);
  const tile=await sharp(dest).resize(220,140,{fit:'contain',background:'white'}).extend({bottom:26,background:'white'}).composite([{input:label,top:140,left:0}]).png().toBuffer();
  tiles.push({input:tile,left:(index%6)*220,top:Math.floor(index/6)*166});
  console.log(`${slug}/${section}: ${Math.round((await fs.stat(dest)).size/1024)} KB`);
}
await sharp({create:{width:1320,height:Math.ceil(tiles.length/6)*166,channels:3,background:'white'}}).composite(tiles).png().toFile(process.env.TEMP+'/industry-editorial-review.png');
