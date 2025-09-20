const fs = require("fs");
const { writeFileSync } = require("fs");

const manifest = JSON.parse(fs.readFileSync("iconManifest.json", "utf-8"));

// AI-benzeri ikon önerileri
const guessIcon = (name) => {
  const lower = name?.toLowerCase?.();
  if (!lower) return "MdInsertDriveFile";

  if (lower.includes("eslint")) return "GiLightningTrio";
  if (lower.includes("config")) return "AiFillSetting";
  if (lower.includes("build") || lower === "dist") return "FaTools";
  if (lower === "node_modules") return "FaNodeJs";
  if (lower === "ts") return "SiTypescript";
  if (lower === "js") return "SiJavascript";
  if (lower === "env") return "BsFillShieldLockFill";
  if (lower.includes("test")) return "VscBeaker";
  if (lower.includes("readme")) return "AiFillBook";
  if (lower.includes("style") || lower === "css") return "FaCss3Alt";
  if (lower === "json") return "AiFillFileText";

  return "MdInsertDriveFile"; // fallback icon
};

const items = [
  ...(manifest.fileTypes || []),
  ...(manifest.folders || []),
  ...(manifest.languages || []),
];

console.log("🧩 Total names:", items.length);

const iconMapEntries = items
  .filter((name) => typeof name === "string")
  .map((name) => `  "${name}": ${guessIcon(name)},`);

const output = `export const iconMap = {\n${iconMapEntries.join("\n")}\n};\n`;

writeFileSync("scripts/iconMapSuggested.cjs", output);
console.log(
  "✅ scripts/iconMapSuggested.cjs generated with ${iconMapEntries.length} entries."
);
