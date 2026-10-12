# StreamForge - OBS Studio 1080p Live Overlay & Control Platform

StreamForge is a high-performance, transparent overlay system and live stream companion engineered specifically for OBS Studio, Twitch, and YouTube live streaming.

## 🌟 Key Features

- **OBS-Native 1080p Canvas (`/overlay`)**: Full-screen 1920×1080 transparent canvas with zero scrollbars and minimal CPU/GPU overhead.
- **7 Live Broadcast Widgets**:
  1. `IdentityWidget`: Streamer handle, "Building in Public" title with live glow, and "DSA × AI/ML" badge.
  2. `MissionWidget`: Dynamic active stream challenge / question with smooth fade transitions.
  3. `SessionWidget`: Real-time elapsed stream timer (`HH:MM:SS`) and active topic status.
  4. `ProgressWidget`: Factual daily checklist progress bar calculated strictly from today's tasks.
  5. `NowBuildingWidget`: Current active project name, description, and tech stack tags.
  6. `CTAWidget`: Viewable Call-to-Action banner with companion link destination and animated indicator.
  7. `SocialLinksWidget`: Unobtrusive bottom-corner profile links (GitHub, Portfolio, etc.).
- **Host Control Dashboard (`/dashboard`)**:
  - Live task creation, category filtering (DSA, AI/ML, Project, Academic), and completion toggle.
  - Project manager with inline editing and active toggle.
  - CTA and session topic customizer with dynamic accent color palette.
  - Interactive widget visibility switches with live 16:9 canvas preview simulator.
  - Stream viewer interaction analytics tracker.
- **Live Audience Companion (`/companion`)**:
  - Interactive viewer portal allowing viewers to view current tasks, active projects, click tracked links, and connect.
- **Local Storage Persistence**:
  - Instant synchronization across tabs via Zustand `streamforge-storage` localStorage persistence.

---

## 🚀 OBS Studio Setup (OBS Studio 32.2.2)

To add StreamForge into OBS Studio:

1. Launch **OBS Studio 32.2.2**.
2. In the **Sources** dock of your active scene, click **`+`** (Add Source) and select **Browser**.
3. Name the source (e.g., `StreamForge Overlay`) and click **OK**.
4. In the **Browser Source Properties** dialog:
   - **URL**: `http://localhost:5173/overlay` (or your deployed Vercel URL `/overlay`)
   - **Width**: `1920`
   - **Height**: `1080`
   - **Custom CSS**: Leave empty or keep `body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }`
   - **Shutdown source when not visible**: ✅ **Checked** *(recommended for performance)*
   - **Refresh browser when scene becomes active**: ✅ **Checked** *(optional)*
5. Click **OK**.
6. The transparent overlay is now positioned pixel-perfect over your stream screen!

---

## 🛠️ Development & Production Commands

```bash
# Start local development server (host on port 5173)
npm run dev

# Run TypeScript compiler checks and production Vite build
npm run build

# Preview production build locally
npm run preview

# Run Oxlint code analysis
npm run lint
```
