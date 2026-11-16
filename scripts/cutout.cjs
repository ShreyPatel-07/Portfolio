/* Prepares the portrait for the intro stage.
 *
 * The supplied photograph already has a transparent background, so there is no
 * segmentation to do here — but it is only 180x221, and the stage renders it at
 * roughly three times that size. This upscales once with Lanczos and a light
 * sharpen so the browser downscales a clean asset instead of magnifying a tiny
 * one. Run with: node scripts/cutout.cjs
 */
const sharp = require("sharp");

const SRC = "public/work/portrait.png";
const OUT = "public/work/portrait-cutout.png";

(async () => {
  const meta = await sharp(SRC).metadata();
  const width = 540;
  const height = Math.round((width * (meta.height ?? 221)) / (meta.width ?? 180));

  const out = await sharp(SRC)
    .resize(width, height, { kernel: "lanczos3", fit: "fill" })
    .sharpen({ sigma: 0.7, m1: 0.6, m2: 1.4 })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`wrote ${OUT} — ${out.width}x${out.height}, ${Math.round(out.size / 1024)} KB`);
})();
