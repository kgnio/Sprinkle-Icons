const fs = require("fs");
const path = require("path");
const { iconMap } = require("./iconMap.cjs"); // iconMap modülünü path'e göre güncelle
const manifest = require("../iconManifest.json"); // manifest path'ini de ayarla
const { MdFileUnknown } = require("react-icons/md");

// Hangi alanlardan alacağız
const manifestKeys = [
  "fileTypes",
  "folders",
  "languages",
  "editorActions",
  "statuses",
  "vcs",
  "miscellaneous",
];

const missing = [];

for (const section of manifestKeys) {
  for (const key of manifest[section]) {
    if (!(key in iconMap)) {
      missing.push(key);
    }
  }
}

console.log(`🎯 Toplam eksik key: ${missing.length}`);
if (missing.length === 0) {
  console.log("✅ iconMap tüm manifest öğelerini kapsıyor.");
  process.exit(0);
}

// Otomatik patch oluştur
const autoMap = {};
missing.forEach((key) => {
  autoMap[key] = "MdFileUnknown";
});

// patch dosyası oluştur
const outPath = path.join(__dirname, "iconMapPatch.js");

const patchContent = `// 🔧 iconMap içindeki eksik key'ler için otomatik oluşturulmuştur
const { MdFileUnknown } = require("react-icons/md");

module.exports.iconMapPatch = {
${Object.entries(autoMap)
  .map(([key, icon]) => `  "${key}": ${icon},`)
  .join("\n")}
};
`;

fs.writeFileSync(outPath, patchContent, "utf8");
console.log(`✅ Eksik key'ler için patch dosyası oluşturuldu: ${outPath}`);
