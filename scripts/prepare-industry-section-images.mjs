import sharp from 'sharp';
import fs from 'node:fs/promises';
const sources = {
  deployment:'service-pillars/data-centre-rack-and-stack-deployment-nigeria',
  support:'service-pillars/smart-hands-data-centre-technical-support-nigeria',
  hardware:'operation-teams/enterprise-hardware-procurement-nigeria',
  network:'service-details/network-cabling-rack',
  security:'service-pillars/data-centre-security-access-control-nigeria',
  assessment:'service-pillars/data-centre-infrastructure-audit-inspection-nigeria',
  lifecycle:'service-pillars/ideal-solutions-data-centre-project-coordination-nigeria',
  execution:'service-pillars/ideal-solutions-live-data-centre-deployment-nigeria',
  visibility:'service-details/data-centre-monitoring',
  remote:'operation-teams/remote-team-onsite-support-nigeria',
  connectivity:'service-details/consumables-patch-cables',
  access:'service-details/door-access-credentials',
  partnership:'operation-teams/system-integrator-field-delivery-nigeria',
};
await fs.mkdir('public/image/industry-solutions',{recursive:true});
const tiles=[];
for (const [name,source] of Object.entries(sources)) {
  const dest=`public/image/industry-solutions/${name}.webp`;
  await sharp(`public/image/${source}.webp`).resize({width:960,withoutEnlargement:true}).webp({quality:74,effort:6}).toFile(dest);
  const info=await fs.stat(dest);
  console.log(`${name}: ${Math.round(info.size/1024)} KB`);
  tiles.push({input:await sharp(dest).resize(240,160,{fit:'contain',background:'#fff'}).png().toBuffer(),left:(tiles.length%4)*240,top:Math.floor(tiles.length/4)*160});
}
await sharp({create:{width:960,height:Math.ceil(tiles.length/4)*160,channels:3,background:'#fff'}}).composite(tiles).png().toFile(process.env.TEMP+'/industry-image-review.png');
