const fs = require("fs");
const path = require("path");

const manifest = require("../iconManifest.json");
const folderName = process.env.THEME_NAME || "sakura";
const iconsDir = path.join(__dirname, "..", "icons", folderName);

// Komut satırından `--json` parametresi geldi mi?
const outputJson = process.argv.includes("--json");

const slots = Object.values(manifest)
  .flat()
  .filter((s) => s && typeof s.name === "string")
  .map((s) => s.name);

const status = slots.map((name) => {
  const filePath = path.join(iconsDir, `${name}.svg`);
  return {
    name,
    exists: fs.existsSync(filePath),
  };
});

if (outputJson) {
  console.log(JSON.stringify(status, null, 2));
  process.exit(0);
}

// Normal terminal çıktısı
const missing = status.filter((s) => !s.exists);
const present = status.filter((s) => s.exists);

console.log(`🎨 Tema: ${folderName}`);
console.log(`📦 Toplam ikon: ${slots.length}`);
console.log(`✅ Mevcut: ${present.length}`);
console.log(`❌ Eksik: ${missing.length}\n`);

if (missing.length) {
  console.log("🚨 Eksik SVG dosyaları:");
  missing.forEach((s) => console.log(`  - ${s.name}.svg`));
} else {
  console.log("🎉 Tüm ikon dosyaları eksiksiz!");
}
