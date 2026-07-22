
# 🎨 Boardy (miro-clone). Warning: the project is under development and some of the features listed below are not yet available

> A real-time collaborative whiteboard built with Next.js, React-Konva, and Liveblocks.

Draw, move, resize, and collaborate with your team on an infinite canvas. Perfect for brainstorming, planning, and visual collaboration.

<img width="1852" height="1034" alt="Screenshot 2026-07-22 at 16-49-40 Create Next App" src="https://github.com/user-attachments/assets/9be8b60d-1620-475e-9bf5-fd39c4d11563" />

<img width="1828" height="970" alt="Screenshot 2026-07-22 at 16-45-28 Create Next App" src="https://github.com/user-attachments/assets/07df186c-f10a-49bc-8360-e3f1bf73a8f7" />

<img width="1828" height="970" alt="Screenshot 2026-07-22 at 16-44-39 Create Next App" src="https://github.com/user-attachments/assets/fd017617-1736-4ee1-bab7-6d460ac83d6b" />

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌍 **Infinite Canvas** | Pan and zoom freely around an endless workspace |
| 🖌️ **Drawing Tools** | Create rectangles and ellipses |
| ✋ **Layer Manipulation** | Move and resize shapes with drag handles |
| 👥 **Real-time Collaboration** | See other users' cursors and selections live |
| 👤 **User Presence** | Know who's in the room with avatar indicators |
| 🔐 **Authentication** | Secure sign-in with Clerk |

---

## 🛠️ Tech Stack
| Technology | Purpose |
|------------|---------|
| <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&style=flat" /> | Framework |
| <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&style=flat" /> | UI Library |
| <img src="https://img.shields.io/badge/Konva-10-0D0D0D?logo=konva&style=flat" /> | Canvas rendering |
| <img src="https://img.shields.io/badge/Liveblocks-5A1EFF?logo=liveblocks&style=flat" /> | Real-time sync |
| <img src="https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&style=flat" /> | Authentication |
| <img src="https://img.shields.io/badge/Convex-000000?logo=convex&style=flat" /> | Backend / Database |
| <img src="https://img.shields.io/badge/Zustand-000000?logo=zustand&style=flat" /> | State management |
| <img src="https://img.shields.io/badge/Tailwind-38BDF8?logo=tailwind&style=flat" /> | Styling |

---

## 🚀 Getting Started

### 1️⃣ Clone the project

```bash
git clone https://github.com/your-username/miro-clone.git
cd miro-clone
```

### 2️⃣ Install dependencies

This project uses **Bun** ⚡ (recommended):

```bash
bun install
```

Or with npm:

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env.local` file in the project root:

```env
# ═══════════════════════════════════════════════════════
# Clerk Authentication 🔐
# ═══════════════════════════════════════════════════════
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-url...
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://your-url...

# ═══════════════════════════════════════════════════════
# Liveblocks ⚡
# ═══════════════════════════════════════════════════════
LIVEBLOCKS_SECRET_KEY=sk_dev_...

# ═══════════════════════════════════════════════════════
# Convex 💾
# ═══════════════════════════════════════════════════════
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=dev:your-one...
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-project.convex.site
```

📋 **Get your free API keys:**

| Service | Website |
|---------|---------|
| Clerk | [clerk.com](https://clerk.com) |
| Liveblocks | [liveblocks.io](https://liveblocks.io) |
| Convex | [convex.dev](https://convex.dev) |

### 4️⃣ Run the development server

```bash
bun run dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

### Creating a Board

1. 🔑 Sign in with Clerk
2. ➕ Click **"New Board"** on the dashboard
3. ✏️ Give your board a name

### Drawing on the Canvas

1. 🖌️ Select a tool from the toolbar (rectangle or ellipse)
2. 🖱️ Click and drag on the canvas to draw
3. ✅ Release to place the shape

### Moving Shapes

1. 👆 Click a shape to select it
2. ✋ Drag the shape to move it

### Resizing Shapes

1. 👆 Click a shape to select it
2. ↔️ Drag the corner handles to resize

### Panning the Canvas

| Action | Result |
|--------|--------|
| 🖱️ Middle mouse button drag | Pan canvas |
| 🖱️ Right mouse button drag | Pan canvas |
| 📜 Scroll wheel | Zoom in/out |

### Collaboration

🔗 Share your board URL with others. They'll see:

- 👀 Your cursor position in real-time
- ⬜ Which shapes you have selected
- 👤 Your avatar in the users list

---

## 📁 Project Structure

```
miro-clone/
├── app/                    # 📄 Next.js pages
│   ├── (dashboard)/       # 🏠 Home / board list
│   ├── board/[boardId]/   # 🎨 Canvas workspace
│   ├── sign-in/           # 🔐 Auth pages
│   └── api/               # 🌐 API routes
├── components/            # 🧩 UI components
├── lib/                   # 🔧 Utilities
├── store/                 # 📦 Zustand stores
├── convex/                # 💾 Backend functions
└── types/                 # 📝 TypeScript types
```

---

## 📦 Available Scripts

```bash
bun run dev    # ⚡ Start dev server (http://localhost:3000)
bun run build  # 🏗️  Build for production
bun run lint   # 🔍 Run linter
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

---

## 📄 License

MIT License — free to use for learning or building your own apps.

---

<div align="center">

Made with ❤️ using Next.js, Konva, and Liveblocks

</div>
