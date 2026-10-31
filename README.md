# 🌴 GTA VI "Leonida / Vice City" 3D Scrollytelling Portfolio // Syam S

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-00F0FF?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Security Audit](https://img.shields.io/badge/Claude--Code--Audit-Zero--Trust%20Passed-FF2A85?style=for-the-badge)](https://www.syamsuresh.in)

> **Cinematic, High-Conversion 3D Scrollytelling Web Experience for Syam S (Technical Project Manager & Systems Architect).**  
> Fuses interactive 3D camera choreography (`genzwebdeveloper.com` paradigm) with the neon synthwave aesthetic of GTA VI "Vice City / Leonida" (`#FF2A85` electric magenta, `#00F0FF` Vice cyan, `#FF8A00` warm amber, and `#07070C` deep obsidian frosted glass).

---

## ⚡ Core Interactive Paradigms

1. **Interactive 3D Scrollytelling**:
   - Scroll-scrubbed camera choreography along a 3D spline trajectory through a stylized low-poly neon cityscape and retro sunset horizon.
   - 60fps WebGL rendering via Three.js with complete GPU buffer & asset disposal lifecycles to prevent memory leaks.
   - Ambient procedural synthwave pad generator built with the **Web Audio API** (zero external MP3 assets needed).

2. **GTA VI HUD & Micro-Interactions**:
   - **Top-Right Status Bar**: Real-time IST clock (Kochi, India), animated segmented **Respect / Velocity Bar** (+40% Release Velocity), and interactive 5-Star **Wanted Level Architecture Clearance**.
   - **Bottom-Left Radar Mini-Map**: Circular HUD radar with continuous sweeping sonar beam and interactive clickable waypoints (`01: HQ`, `02: ARSENAL`, `03: HEISTS`, `04: TRACK RECORD`, `05: COMMS`).
   - **Bento Card Geometry**: Obsidian frosted glass (`rgba(12, 14, 22, 0.85)`), `backdrop-filter: blur(16px)`, 1px neon borders, and angled chamfered notches (`clip-notch`).
   - **Rockstar "Mission Passed" Badges**: Quantified telemetry indicators celebrating sprint compression, 1M+ user concurrency, and 99.95% transaction uptime.

3. **Privacy & Redaction Feature Flag**:
   - `SHOW_EMPLOYER_NAMES = false` toggle allows instant switching between an anonymized domain-impact portfolio view and an unredacted full enterprise resume dossier.

4. **Zero-Trust Hardened Comms**:
   - Encrypted satellite contact dispatch route (`/api/dispatch`) fortified with server-side **Zod** schema sanitization, sliding-window IP rate limiting, bot honeypot detection, and locked CORS policies.

---

## 🎯 Profile & Verified Resume Dossier

- **Principal**: Syam S
- **Role**: Technical Project Manager | Technical Product Delivery | Systems Architect
- **Base of Operations**: Kochi, Kerala, India (IST - UTC+5:30)
- **Primary Domain**: [www.syamsuresh.in](https://www.syamsuresh.in)
- **GitHub**: [@itsmesyaam](https://github.com/itsmesyaam)
- **LinkedIn**: [@syamsuresh](https://linkedin.com/in/syamsuresh)
- **Email**: [syam18official@gmail.com](mailto:syam18official@gmail.com)
- **Phone**: +91 8301846170

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router, Server-Side Route Handlers, Strict CSP Headers)
- **Runtime**: React 19, TypeScript 5.8
- **3D Graphics**: Three.js, Custom GLSL Shaders, Spline Camera Interpolation
- **Sound Engine**: Web Audio API (Procedural D Minor Synthwave Pad Generator)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer, Custom Chamfered Notches
- **Validation & Security**: Zod, In-Memory Rate Limiting, Claude Code Security Review Methodology
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or pnpm

### Installation
```bash
git clone https://github.com/itsmesyaam/GTA-VI-3D-Scrollytelling-Portfolio.git
cd GTA-VI-3D-Scrollytelling-Portfolio
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Leonida HUD in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🛡️ Security Audit Matrix

Audited against the **Claude Code Application Security** standard:

| Threat Category | Mitigation |
| :--- | :--- |
| **DOM XSS** | Strict allowlist validation (`ALLOWED_MISSIONS = new Set(...)`), zero `dangerouslySetInnerHTML`. |
| **GLSL Shader Injection** | Parameterized uniforms only, zero runtime string interpolations in shader source. |
| **CORS Policy** | Locked to `https://www.syamsuresh.in` in production. |
| **Rate Limiting & DoS** | Sliding-window memory rate limiter (max 4 dispatches per IP per 10 minutes). |
| **Automated Bot Spam** | Invisible honeypot trap field (`_botTrap`) silently disarming bots. |
| **Security Headers** | Strict `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`. |

---

## 📜 License

Created with pride for Syam S. All rights reserved.
