const fs = require("fs");
const path = require("path");
const manifest = require("../iconManifest.json");

const theme = {
  $schema: "vscode://schemas/icon-theme",
  iconDefinitions: {},
  fileExtensions: {},
  folderNames: {},
};

// Ortamdan tema ismini al
const folderName = process.env.THEME_NAME || "sakura";
const iconDir = `../icons/${folderName}`;

// Belirtilen kategoriyi işleyip iconDefinitions’a ekle
function processCategory(categoryName, mapTo = null) {
  const items = manifest[categoryName];
  items.forEach((item) => {
    // key'i item ismi olarak ata
    const key = item; // örn: "js", ".babelrc" vb

    theme.iconDefinitions[key] = {
      iconPath: `../icons/${folderName}/${item}.svg`,
    };

    if (mapTo === "fileExtensions") {
      theme.fileExtensions[item] = key;
    } else if (mapTo === "folderNames") {
      theme.folderNames[item] = key;
    }
  });
}

// Kategorileri işle
processCategory("fileTypes", "fileExtensions");
processCategory("folders", "folderNames");

// Ekstra kategoriler (sadece icon tanımı yapılır)
processCategory("languages");
processCategory("statuses");
processCategory("vcs");
processCategory("editorActions");
processCategory("miscellaneous");

// folderNamesExpanded eşitle
theme.folderNamesExpanded = { ...theme.folderNames };

// JSON çıktısını kaydet
const out = path.join(__dirname, "..", "themes", `${folderName}.json`);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(theme, null, 2), "utf8");

console.log(`✅ themes/${folderName}.json oluşturuldu.`);
