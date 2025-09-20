const readline = require("readline");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("🖼  Klasör/Tema ismi nedir?: ", (input) => {
  const name = input.trim();

  if (!name) {
    console.error("⛔ Geçerli bir klasör ismi girmelisin.");
    rl.close();
    return;
  }

  const iconPath = path.join(__dirname, "..", "icons", name);
  const themePath = path.join(__dirname, "..", "themes", `${name}.json`);
  const ENV = { ...process.env, THEME_NAME: name };

  if (!fs.existsSync(iconPath)) {
    fs.mkdirSync(iconPath, { recursive: true });
    console.log(`📂 icons/${name} oluşturuldu`);
  }

  if (!fs.existsSync(themePath)) {
    fs.writeFileSync(themePath, "{}", "utf8");
    console.log(`🎨 themes/${name}.json oluşturuldu`);
  }

  try {
    console.log("📦 Manifest taranıyor...");
    execSync("npm run scan:manifest", { stdio: "inherit", env: ENV });

    console.log("📁 Placeholder ikonlar üretiliyor...");
    execSync("npm run gen:placeholders", { stdio: "inherit", env: ENV });

    console.log("🎨 Gerçek ikon SVG’leri oluşturuluyor...");
    execSync("npm run gen:icons", { stdio: "inherit", env: ENV });

    console.log("🌸 Tema oluşturuluyor...");
    execSync("npm run gen:theme", { stdio: "inherit", env: ENV });

    console.log("🧼 Tema normalize ediliyor...");
    execSync("npm run normalize-theme", { stdio: "inherit", env: ENV });

    console.log("✅ İkon kontrolü yapılıyor...");
    execSync("npm run check-icons", { stdio: "inherit", env: ENV });

    console.log("🗂 fileExtensions/folderNames dolduruluyor...");
    execSync("npm run populate-maps", { stdio: "inherit", env: ENV });

    console.log(`🎉 ${name} tamamlandı!`);
  } catch (err) {
    console.error("❌ Bir hata oluştu:", err.message);
  } finally {
    rl.close();
  }
});
