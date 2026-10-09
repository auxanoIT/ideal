import sharp from 'sharp';

// Keep raster browser and iOS fallbacks aligned with the public brand logo.
const logo = 'public/brand/ideal-globe.png';
await sharp(logo, {density: 300})
  .resize(512, 512, {fit: 'contain', background: {r:255,g:255,b:255,alpha:0}})
  .png()
  .toFile('app/icon.png');
await sharp(logo, {density: 300})
  .resize(148, 148, {fit: 'contain', background: '#faf7f0'})
  .extend({top:16,bottom:16,left:16,right:16,background:'#faf7f0'})
  .png()
  .toFile('public/apple-touch-icon.png');
console.log('Generated Ideal Solutions browser and Apple icons.');
