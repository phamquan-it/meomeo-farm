# 🐱 Meo Meo Farm

A fun and minimalist emoji-based farming game built with **React**, **React-Konva**, and **Zustand**.  
You play as a little cat who can plant, water, fertilize, and harvest emoji crops on a colorful pixel-style field.

---

## 🌟 Features

- 🎮 Playable entirely in the browser with no backend
- 🪴 Tile-based farming with emoji plants
- 🐱 Move the cat using arrow keys
- 🧰 Tools: hand, sickle, water, fertilizer, weed remover
- 📦 Zustand-powered global state management
- 🖼 Konva Canvas for fast rendering
- 💻 Static export support (Next.js `output: 'export'`)
- 📱 Console log QR code to support development (fun Easter egg)

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) with App Router
- [React-Konva](https://konvajs.org/docs/react/)
- [Zustand](https://github.com/pmndrs/zustand) for global state
- [TailwindCSS](https://tailwindcss.com/) for styling
- No server needed – completely frontend and exportable

---
## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build & export static site
npm run build
npx next export
