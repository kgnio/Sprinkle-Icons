const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const themesDir = path.join(rootDir, "themes");
const packageJsonPath = path.join(rootDir, "package.json");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

if (!fs.existsSync(themesDir)) {
  console.error("❌ 'themes' klasörü bulunamadı.");
  process.exit(1);
}

const themeFiles = fs.readdirSync(themesDir).filter((f) => f.endsWith(".json"));

if (themeFiles.length === 0) {
  console.warn("⚠️ Hiç tema dosyası bulunamadı.");
  process.exit(0);
}

const themes = themeFiles.map((file) => {
  const id = path.basename(file, ".json");
  return {
    id,
    label: id.charAt(0).toUpperCase() + id.slice(1), // Örn: sakura → Sakura
    path: `./themes/${file}`,
  };
});

// VSCode contribution alanını güncelle
packageJson.contributes = packageJson.contributes || {};
packageJson.contributes.iconThemes = themes;

// Yaz
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");
console.log(
  `✅ ${themes.length} tema için contributes.iconThemes güncellendi.`
);
