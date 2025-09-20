# Sprinkle Icons

![License](https://img.shields.io/github/license/kgnio/sprinkle-icons)
![Stars](https://img.shields.io/github/stars/kgnio/sprinkle-icons)
![Issues](https://img.shields.io/github/issues/kgnio/sprinkle-icons)
![Last Commit](https://img.shields.io/github/last-commit/kgnio/sprinkle-icons)

**Sprinkle Icons** is a tool that allows you to **generate custom VSCode file icons** using your own SVGs.  
Ideal for developers who want to create personalized file icon themes for their editor.

---

## ✨ Features

- 🎨 Use your **own SVG icons** to build a unique file icon theme  
- 🧩 Supports **file extensions** and **file name patterns**  
- ⚡ Lightweight and fast generation  
- 🔧 Outputs a ready-to-use **VSCode icon theme extension**  
- 📂 Customizable structure (`icons/`, `file-icon-theme.json`)  
- 🖌️ Easy to integrate into your existing theme or publish to Marketplace  

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/kgnio/sprinkle-icons.git
cd sprinkle-icons
npm install
```

---

## ⚙️ Usage

1. Put your SVG icons in the `icons/` folder:

```
icons/
├── js.svg
├── ts.svg
├── json.svg
├── css.svg
└── md.svg
```

2. Map file extensions in `config.json`:

```json
{
  "js": "js.svg",
  "ts": "ts.svg",
  "json": "json.svg",
  "css": "css.svg",
  "md": "md.svg"
}
```

3. Run the generator:

```bash
npm run build
```

4. The script will generate:

```
dist/
├── file-icon-theme.json
├── icons/...
```

5. Link or package the theme in VSCode:

- Open VSCode → Extensions → Install from VSIX
- Or symlink `dist/` to your local extensions folder  

---

## 📂 Example `file-icon-theme.json`

```json
{
  "iconDefinitions": {
    "_js": { "iconPath": "./icons/js.svg" },
    "_ts": { "iconPath": "./icons/ts.svg" }
  },
  "fileExtensions": {
    "js": "_js",
    "ts": "_ts"
  },
  "fileNames": {
    "package.json": "_json"
  }
}
```

---

## 🛠️ Development

```bash
npm run dev   # watch mode, regenerates on icon/config changes
npm run lint  # check code style
```

---

## 🚀 Publishing to Marketplace

1. Install `vsce`:
```bash
npm install -g @vscode/vsce
```

2. Package extension:
```bash
vsce package
```

3. Publish:
```bash
vsce publish
```

---

## 📜 License

Licensed under the **MIT License** – free to use, customize, and share.

---

## ⭐ Contribute

PRs, new features, and icon ideas are welcome!  
If you use Sprinkle Icons in your project, consider giving it a ⭐ to support development.
