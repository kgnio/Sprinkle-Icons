const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const folderName = process.env.THEME_NAME || "sakura";
const themePath = path.join(ROOT, "themes", `${folderName}.json`);

if (!fs.existsSync(themePath)) {
  console.error("❌ Tema dosyası bulunamadı:", themePath);
  process.exit(1);
}

const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));

// fileExtensions ve folderNames varsa, expanded bloğunu senkronize et
theme.folderNamesExpanded = { ...theme.folderNames };

fs.writeFileSync(themePath, JSON.stringify(theme, null, 2), "utf8");
console.log("✅ Tema normalize edildi:", themePath);
