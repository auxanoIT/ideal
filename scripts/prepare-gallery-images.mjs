import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = process.argv[2];
if (!source) throw new Error('Provide the directory containing the approved original photos.');
const files = [
  ['01hh', 'exterior-installation'], ['04k', 'exterior-cabling'], ['06mm', 'installation-team'],
  ['09nn', 'wall-cable-route'], ['11bb', 'enclosure-wiring'], ['12vv', 'indoor-installation'],
  ['12cc', 'enclosure-cover'], ['18xvf', 'gate-track'], ['18zz', 'gate-actuator'],
  ['18waa', 'gate-inspection'], ['19qq', 'overhead-containment'], ['19ww', 'gate-motor'],
  ['19yg', 'gate-team'], ['20y', 'gate-controls'], ['20', 'raised-floor-inspection'],
  ['21', 'raised-floor-work'], ['22', 'overhead-cable-route'],
];
const output = path.resolve('public/image/our-work');
await mkdir(output, { recursive: true });
for (const [suffix, name] of [...files, ['picture1', 'wall-equipment']]) {
  const filename = suffix === 'picture1' ? 'picture1.jpeg' : `WhatsApp Image 2026-10-10 at 21.26.${suffix}.jpeg`;
  await sharp(path.join(source, filename)).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(output, `${name}.webp`));
}
const rackFiles = [
  ['Rack R07-07 front.jpeg', 'ideal-solutions-data-centre-rack-r07-07-front'],
  ['R07-08 front.jpeg', 'ideal-solutions-data-centre-rack-r07-08-front'],
  ['R07-09 Front.jpeg', 'ideal-solutions-data-centre-rack-r07-09-front'],
  ['R07-10 Front.jpeg', 'ideal-solutions-data-centre-rack-r07-10-front'],
  ['Ro7-11 Front.jpeg', 'ideal-solutions-data-centre-rack-r07-11-front'],
  ['R08-07 Front.jpeg', 'ideal-solutions-data-centre-rack-r08-07-front'],
  ['R08-08 Front.jpeg', 'ideal-solutions-data-centre-rack-r08-08-front'],
  ['R08-09.jpeg', 'ideal-solutions-data-centre-rack-r08-09-front'],
  ['R08-10 Front.jpeg', 'ideal-solutions-data-centre-rack-r08-10-front'],
  ['R08-11 Front.jpeg', 'ideal-solutions-data-centre-rack-r08-11-front'],
  ['R08-08 Rear.jpeg', 'ideal-solutions-data-centre-rack-r08-08-rear'],
  ['R08-09 Rear.jpeg', 'ideal-solutions-data-centre-rack-r08-09-rear'],
  ['R08-09 Rear back.jpeg', 'ideal-solutions-data-centre-rack-r08-09-rear-full'],
  ['R08-10 Rear.jpeg', 'ideal-solutions-data-centre-rack-r08-10-rear'],
  ['R08-10 finished Rear.jpeg', 'ideal-solutions-data-centre-rack-r08-10-rear-full'],
  ['R08-11 Rear.jpeg', 'ideal-solutions-data-centre-rack-r08-11-rear'],
  ['R08-11 Rear full.jpeg', 'ideal-solutions-data-centre-rack-r08-11-rear-full'],
  ['R08-.jpeg', 'ideal-solutions-data-centre-rack-row-rear'],
];
for (const [filename, name] of rackFiles) {
  await sharp(path.join(source, filename)).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(output, `${name}.webp`));
}
console.log('Prepared 36 gallery photos. Originals preserved; exported files omit EXIF metadata.');
