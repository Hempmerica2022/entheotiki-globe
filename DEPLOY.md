# Entheotiki Globe — Deployment Guide

## Architecture

- **Framework:** Remix + Vite (build only — no SSR at runtime)
- **3D Engine:** Three.js with custom shaders, atmosphere, textures
- **Server:** Express static file server (`server.js`)
- **Deploy:** GitHub Actions → Hostinger VPS via SSH

## Quick Start (Local)

```bash
nvm use 20          # or: nvm install 20 && nvm use 20
npm install
npm run dev         # opens at http://localhost:5173
```

## Production Build (Local)

```bash
npm run build       # creates build/client/ and build/server/
npm run start       # serves build/client via Express on port 3000
```

## GitHub Secrets Required

Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret

| Secret | Example | Notes |
|--------|---------|-------|
| `HOSTINGER_HOST` | `123.456.789.0` or `entheotiki.org` | Your Hostinger VPS IP or hostname |
| `HOSTINGER_USER` | `u123456789` | SSH username from hPanel |
| `HOSTINGER_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Full private key (generate in hPanel → SSH Access) |
| `HOSTINGER_PORT` | `65002` | SSH port (NOT 22 — check hPanel for your port) |
| `HOSTINGER_APP_DIR` | `/home/u123456789/entheotiki-globe` | Where the app lives on the VPS |

## VPS Setup (One-Time)

SSH into your Hostinger VPS and run:

```bash
# Install Node 20 (if not already)
nvm install 20
nvm use 20

# Install pm2 globally
npm install -g pm2

# Create app directory
mkdir -p ~/entheotiki-globe
cd ~/entheotiki-globe

# First manual deploy (optional — GitHub Actions will do this after)
# Just to verify it works:
npm install
npm run build
pm2 start npm --name entheotiki -- run start
pm2 save

# Set pm2 to start on reboot
pm2 startup
# Follow the command it gives you
```

## How Deploys Work

1. You push to `main` branch on GitHub
2. GitHub Actions runs:
   - `npm ci` (install deps)
   - `npm run build` (remix vite:build → build/client/)
   - Generates `index.html` if missing
   - Packages everything into a tarball
   - SCPs tarball to Hostinger VPS
   - SSHs in, extracts, installs prod deps, restarts via pm2
3. Your globe is live at your domain

## File Structure

```
entheotiki-globe/
├── .github/workflows/deploy-hostinger.yml   ← CI/CD pipeline
├── app/                                      ← Remix source code
│   ├── components/globe/                     ← Three.js globe (the good stuff)
│   │   ├── globe.jsx                         ← Globe renderer (shaders, textures)
│   │   ├── main.jsx                          ← Main orchestrator
│   │   ├── app.jsx                           ← Three.js app class
│   │   ├── textures/                         ← Earth textures, clouds, etc.
│   │   └── utils/shaders.js                  ← GLSL shaders
│   └── routes/home/                          ← Remix route
├── server.js                                 ← Express static server
├── package.json                              ← deps + scripts
├── vite.config.js                            ← Vite/Remix build config
├── tailwind.config.js                        ← Tailwind CSS config
└── postcss.config.cjs                        ← PostCSS config
```

## Troubleshooting

### Globe shows black screen
- Check browser console (F12) for texture loading errors
- Verify `build/client/assets/` has `.png` files (map_indexed, earth_clouds)

### pm2 not found on VPS
```bash
npm install -g pm2
```

### Build fails on GitHub Actions
- Check that `package-lock.json` is committed (required for `npm ci`)
- Check Node version matches `engines.node` in package.json

### Port already in use on VPS
```bash
pm2 list                    # see what is running
pm2 delete entheotiki       # stop old process
pm2 start npm --name entheotiki -- run start
```
