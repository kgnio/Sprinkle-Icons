const fs = require("fs");
const path = require("path");
const manifest = require("../iconManifest.json");

const folderName = process.env.THEME_NAME || "sakura";
const iconsDir = path.join(__dirname, "..", "icons", folderName);

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

let count = 0;

for (const category of Object.keys(manifest)) {
  manifest[category].forEach((item) => {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
  <rect width="128" height="128" fill="#eee"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#666">${item}</text>
</svg>`.trim();

    const outPath = path.join(iconsDir, `${item}.svg`);
    fs.writeFileSync(outPath, svg, "utf8");
    console.log(`✔ placeholder for ${item}.svg`);
    count++;
  });
}

console.log(
  `✅ ${count} adet placeholder SVG ${folderName} teması için oluşturuldu.`
);
