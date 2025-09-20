const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { MdFileUnknown } = require("react-icons/md");
const { iconMap } = require("./iconMap.cjs");

const folderName = process.env.THEME_NAME || "sakura";
const outDir = path.join(__dirname, "..", "icons", folderName);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const colorMap = {
  js: "#FFE600",
  jsx: "#FFE600",
  ts: "#00FFFF",
  tsx: "#00FFFF",
  html: "#FF3CAC",
  css: "#FF3CAC",
  scss: "#FF3CAC",
  less: "#FF3CAC",
  json: "#39FF14",
  json5: "#39FF14",
  yaml: "#39FF14",
  yml: "#39FF14",
  md: "#D946EF",
  markdown: "#D946EF",
  py: "#FF3131",
  go: "#FF3131",
  rs: "#FF3131",
  php: "#FF3131",
  dart: "#FF3131",
  java: "#FF3131",
  src: "#A9A9A9",
  lib: "#A9A9A9",
  components: "#A9A9A9",
  public: "#A9A9A9",
  assets: "#A9A9A9",
  styles: "#A9A9A9",
  config: "#00CFC1",
  scripts: "#00CFC1",
  default: "#E5E5E5",
  node_modules: "#A9A9A9",
  icons: "#39FF14",
};

let fallbackCount = 0;

for (const [key, Icon] of Object.entries(iconMap)) {
  const Component = typeof Icon === "function" ? Icon : MdFileUnknown;
  const isFallback = Component === MdFileUnknown;
  const color = colorMap[key] || colorMap.default;

  try {
    const innerSvg = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Component, {
        size: 128,
        color,
      })
    );

    const wrappedSvg = innerSvg.startsWith("<svg")
      ? innerSvg
      : `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">${innerSvg}</svg>`;

    const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>\n${wrappedSvg}`;
    fs.writeFileSync(path.join(outDir, `${key}.svg`), fullSvg, "utf8");

    if (isFallback) {
      console.warn(`⚠️ ${key}.svg fallback ile oluşturuldu`);
      fallbackCount++;
    } else {
      console.log(`✔ ${key}.svg (${color})`);
    }
  } catch (err) {
    console.error(`✖ ${key}.svg oluşturulamadı — ${err.message}`);
  }
}

console.log(`🎨 Tamamlandı. Fallback kullanılan ikon sayısı: ${fallbackCount}`);
