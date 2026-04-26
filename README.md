# DevDocs

> A colorful, responsive documentation site template — deployable to GitHub Pages in minutes.

## 🚀 Quick Deploy

```bash
# 1. Create the folder (use the PowerShell script below)
# 2. Push to GitHub
git remote add origin https://github.com/YOUR_USER/devdocs.git
git push -u origin main

# 3. Go to: Settings → Pages → Source: main / root → Save
# Live at: https://YOUR_USER.github.io/devdocs
```

## 📁 Structure

```
devdocs/
├── index.html          ← Home
├── css/style.css       ← All styles
├── js/
│   ├── main.js         ← Sidebar interactions
│   └── page-shell.js   ← Auto-builds sidebar on every page
└── pages/
    ├── java.html
    ├── python.html
    ├── react.html
    └── ...             ← Add your own here
```

## ✨ Features

- Collapsible sidebar with search filter
- Active page highlighting
- Fully responsive (mobile + desktop)
- Colorful language-coded accents
- Zero build tools — pure HTML/CSS/JS

## ➕ Adding a Page

1. Copy `pages/java.html` → `pages/mypage.html`
2. Edit the `<template id="__content__">` section
3. Add your entry to the `pages` array in `js/page-shell.js`
4. Commit and push
