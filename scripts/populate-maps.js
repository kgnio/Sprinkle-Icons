const fs = require("fs");
const path = require("path");

const folderName = process.env.THEME_NAME || "sakura";
const themePath = path.join(__dirname, "..", "themes", `${folderName}.json`);
const manifestPath = path.join(__dirname, "..", "iconManifest.json");

const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// 1) fileExtensions eşleştir
const fileExtMap = {};
manifest.fileTypes.forEach((name, idx) => {
  const key = name;

  if (theme.iconDefinitions[key]) {
    fileExtMap[name] = key;
  } else {
    console.warn(
      `⚠️ iconDefinitions içinde '${key}' bulunamadı (fileType: ${name})`
    );
  }
});

// folderNames eşleştir (isim bazlı)
const folderMap = {};
manifest.folders.forEach((folderName) => {
  // klasör adına karşılık gelen icon key (örneğin klasör adı ile aynı ise)
  const key = folderName; // veya klasör adına göre ikon anahtarı

  if (theme.iconDefinitions[key]) {
    folderMap[folderName] = key;
  } else {
    console.warn(
      `⚠️ iconDefinitions içinde '${key}' bulunamadı (folder: ${folderName})`
    );
  }
});

// 3) Güncellenmiş eşlemeleri tema objesine yaz
theme.fileExtensions = fileExtMap;
theme.folderNames = folderMap;
theme.folderNamesExpanded = { ...folderMap };

// 4) Kaydet
fs.writeFileSync(themePath, JSON.stringify(theme, null, 2), "utf8");
console.log("✅ fileExtensions ve folderNames başarıyla dolduruldu.");
