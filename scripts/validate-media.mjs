import { existsSync, readFileSync, statSync } from "node:fs";
import assert from "node:assert/strict";
const phones = [
  "01-find-map",
  "02-find-list",
  "03-on-the-way",
  "04-arrived",
  "05-scan-capture",
  "06-scanning",
  "07-ai-suggestions",
  "08-review-items",
  "09-inline-edit",
  "10-add-item",
  "11-photo-apples",
  "12-submitting",
  "13-brand-splash",
  "14-volunteer-dashboard",
  "15-onsite-check",
  "16-next-neighbor-verified",
];
const ui = [
  ...phones.map((p) => "phone-" + p),
  "flat-14-report-submitted",
  "flat-15-thanks",
  "flat-16-apple-added",
];
const videos = [
  "01-reality-nyc",
  "02-human-need-walk",
  "03-finding-way-phone-up",
  "04a-fridge-discovery",
  "05-open-fridge",
  "06-take-corn",
  "07a-remaining-food",
  "08-volunteer-onsite-check",
  "09-next-neighbor",
  "10-the-next-neighbor-film",
];
let bytes = 0;
for (const name of ui)
  for (const ext of ["png", "webp"]) {
    const path = `public/assets/ui/${name}.${ext}`;
    assert.ok(existsSync(path), path);
    assert.ok(statSync(path).size > 0);
    bytes += statSync(path).size;
  }
for (const [i, name] of videos.entries()) {
  for (const path of [
    `public/assets/video/${name}.mp4`,
    `public/assets/images/${name}.jpg`,
    ...(i < 9 ? [`public/assets/video/${name}-mobile.mp4`] : []),
  ]) {
    assert.ok(existsSync(path), path);
    assert.ok(statSync(path).size > 0);
    bytes += statSync(path).size;
  }
}
const source =
  readFileSync("src/cinematic/StoryApp.tsx", "utf8") +
  readFileSync("src/cinematic/Interactions.tsx", "utf8");
for (const id of [
  "opening",
  "reality",
  "need",
  "finding",
  "arrival",
  "open",
  "take",
  "contribute",
  "check",
  "neighbor",
  "film",
])
  assert.ok(source.includes(`id="${id}"`), id);
console.log(
  `Validated 16 full device mockups + 3 supporting screens, 10 videos, 9 mobile variants, 10 stills, and all 10 scenes plus opening. Delivery assets: ${(bytes / 1024 / 1024).toFixed(1)} MiB.`,
);
