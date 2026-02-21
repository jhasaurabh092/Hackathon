# 🏦 SaveForge — Money Adventure Game

An educational, decision-based financial game for kids aged 8–14. Players learn **saving, investing, fraud detection, and smart budgeting** through 15 interactive story chapters across 3 levels.

---

## 🚀 Quick Start (Development)

```bash
# 1. Install dependencies (skip if already done by Vite setup)
npm install

# 2. Start the dev server
npm run dev
```

Open your browser at **http://localhost:5173**

---

## 🏗️ Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

---

## 📁 Project Structure

```
hackathon1/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              ← React entry point
    ├── App.jsx               ← Root component (routes login ↔ game)
    ├── index.css             ← Global design system + animations
    ├── data/
    │   └── chapters.js       ← All 15 chapter definitions (scenarios + choices)
    ├── context/
    │   └── GameContext.jsx   ← Player state, unlock logic, money logic, localStorage
    └── components/
        ├── LoginPage.jsx / .css
        ├── GameScreen.jsx / .css
        ├── HUD.jsx / .css          ← Sticky bar (balance, level, pending)
        ├── LevelMap.jsx / .css     ← 3 levels with chapter grids
        ├── ChapterCard.jsx / .css  ← Locked 🔒 / Playable / Done ✅
        ├── ChapterModal.jsx / .css ← Scenario + choices + result
        ├── Leaderboard.jsx / .css  ← GET /leaderboard
        └── GameOver.jsx / .css     ← Final score + auto-submit
```

---

## 🎮 Game Rules

| Rule | Detail |
|------|--------|
| Starting money | ₹100 |
| Level completion bonus | +₹50 |
| Pending returns | Flushed to balance at level end |
| Money floor | ₹0 (never goes negative) |
| Chapter unlock | Sequential (Ch N needs Ch N-1 done) |
| Level unlock | All 5 chapters of previous level done |

### Money Ratings (End of Game)
| Final Balance | Rating |
|---|---|
| ₹300+ | 🏆 Money Master! |
| ₹200–₹299 | 🌟 Smart Saver! |
| ₹100–₹199 | 👍 On the Right Track! |
| Below ₹100 | 💪 Keep Learning! |

---

## 🔌 Backend API

The frontend consumes these endpoints. If not available, the game still works offline (API errors are silently caught).

| Method | Endpoint | Body | Purpose |
|--------|----------|------|---------|
| `POST` | `/login?username=NAME` | — | Register player |
| `POST` | `/score` | `{ username, score }` | Submit final score |
| `GET` | `/leaderboard` | — | Fetch ranked scores |

### Leaderboard Response Format
```json
[
  { "username": "Aarav", "score": 320 },
  { "username": "Priya", "score": 280 }
]
```

Or wrapped: `{ "scores": [...] }`

---

## 🌐 Deployment Guide

### Option A: Netlify (Recommended)
1. Run `npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. Done! You get a live URL instantly.

### Option B: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Option C: GitHub Pages
```bash
# Add to vite.config.js: base: '/your-repo-name/'
npm run build
# Push dist/ to gh-pages branch
```

### Option D: Any Static Host
Upload the contents of `dist/` to any web server (Apache, Nginx, S3, etc.)

---

## ⚙️ Vite Config for Backend Proxy (Development)

If your backend runs on a different port (e.g., `http://localhost:8000`), add a proxy in `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:8000',
      '/score': 'http://localhost:8000',
      '/leaderboard': 'http://localhost:8000',
    }
  }
})
```

---

## 🧪 Testing Checklist

- [ ] Login with a name → enters game
- [ ] Chapter 1 is playable; Chapter 2 is 🔒 locked
- [ ] After completing Ch 1 → Ch 2 unlocks
- [ ] "Long-term invest" choice adds to Pending (⏳), not balance directly
- [ ] Completing all 5 chapters of a level → +₹50 bonus + pending flushed
- [ ] Level 2 unlocks only after all Level 1 chapters done
- [ ] Chapter 15 completion → Game Over screen
- [ ] Game Over → score auto-submitted to `/score`
- [ ] Leaderboard shows ranked scores from `/leaderboard`
- [ ] 🔄 Reset button restarts the game
- [ ] Refreshing browser preserves progress (localStorage)

---

## 🛠️ Tech Stack

- **React 18** (via Vite)
- **Vanilla CSS** (no external UI library)
- **localStorage** for game persistence
- **Google Fonts** — Nunito

---

*Built for the SaveForge Hackathon. Good luck! 🚀*
