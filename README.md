# 🌴 GTA VI (Vice City / Leonida) Real-Time 3D Film // Syam S

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-00F0FF?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-FF2A85?style=for-the-badge)](https://github.com/darkroomengineering/lenis)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

> **A real-time 3D interactive film inspired by `genzwebdeveloper.com` with a GTA VI (Vice City / Leonida) aesthetic for Syam S (Technical Project Manager & Systems Architect).**  
> Built as a single continuous `100vw x 100vh` Three.js WebGL canvas synchronized with Lenis smooth scrolling and GSAP ScrollTrigger across **9 screenplay chapters**.

---

## 🎬 9 Screenplay Chapters

1. **01 Sunrise — EXT. LEONIDA KEYS — SUNRISE**
   - Camera skims low over shimmering ocean waves toward the distant Vice City skyline silhouetted against a rising sun.
   - Title: `SYAM S // TECHNICAL PROJECT MANAGER & SYSTEMS ARCHITECT`
2. **02 The Crossing — EXT. VICE CAUSEWAY — MORNING**
   - Camera sweeps across a suspension bridge with traffic light trails.
   - Verified impact telemetry (`4+ YEARS`, `+40% VELOCITY`, `30% FASTER SPRINTS`, `+45% REACH`, `99.95% RELIABILITY`, `1M+ USERS`).
3. **03 The Skill Zone — EXT. DOWNTOWN VICE — DAY**
   - Camera banks between glass skyscrapers and holographic grid planes.
   - 4 Interactive modules: *Delivery & Methodologies*, *Architecture & Security*, *AI & Developer Velocity*, *Analytics & Insights*.
4. **04 What We Offer — EXT. BAYFRONT MARINA — LATE AFTERNOON**
   - Sunset water reflections over marina structures.
   - Services: *AI Consultation & RAG Engines*, *Full-Stack & Cloud Systems*, *Zero-to-One MVP Delivery*, *Technical Product Leadership*.
5. **05 Selected Works — EXT. ABOVE THE CLOUDS — GOLDEN HOUR**
   - Camera ascends above golden-hour clouds with floating monolithic portals.
   - Flagship operations: *AI-Powered Real-Time Consultation Platform*, *Enterprise Doctor Booking & Healthcare Platform*, *Scalable E-Commerce Ecosystem*, *Astrologerin Mobile App*.
6. **06 Freefall — EXT. VICE SKY — SUNSET**
   - 90-degree vertical dive straight down into the neon city canyon.
   - Kinetic typography: `ENGINEERED FOR SCALE // BUILT FOR SPEED`.
7. **07 The War Room — INT. PENTHOUSE, OCEAN DRIVE — NIGHT**
   - Nighttime penthouse view overlooking neon city grid with a rotating 3D architectural holographic table.
   - Academic credentials (B.Tech in CSE) & certifications (Claude Certified Architect Prep, Red Hat Specialist, Cloud Compliance, BI & Analytics).
8. **08 Book a Call — INT. PENTHOUSE TERRACE — NIGHT**
   - Night terrace view with floating synthwave particles.
   - Interactive sanitized dispatch terminal with 30-second rate-limit cooldown and direct mailto client trigger.
9. **09 That's a Wrap — INT. SOUNDSTAGE 9**
   - Spotlight in a dark soundstage illuminating a spinning 3D star emblem.
   - Cinema credits (`DIRECTED & ENGINEERED BY SYAM S`) + `[ BACK TO SUNRISE // REPLAY FILM ]` button.

---

## ⚡ Tech Stack & Architecture

- **Rendering Engine**: Three.js (Procedural Ocean Waves, 80+ Skyscrapers, Suspension Bridge, Traffic Trails, Cloud Particles, War Room Table, Star Emblem)
- **Camera Choreography**: `THREE.CatmullRomCurve3` Spline Interpolation with mouse parallax
- **Smooth Scrolling**: Lenis (`lenis`) + GSAP `ScrollTrigger`
- **Audio Synthesizer**: Web Audio API (Zero external audio files, procedural D Minor synth pad + click SFX)
- **Build System**: Vite (with `base: './'` for zero-config GitHub Pages and custom domain deployments)
- **Styling**: Tailwind CSS + Custom Chamfered Notches (`clip-notch`)

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🔒 Security Hardening

- **Content-Security-Policy (CSP)** meta tag in `index.html` allowing `blob:` and `self` only.
- **Client-Side Input Sanitization**: Stripping `<` and `>` tags, strict length boundaries, honeypot bot trap disarm.
- **Rate-Limiting Cooldown**: 30-second cooldown between dispatch submissions.
- **Zero URL Parameter Sinks**: No `innerHTML` or dynamic string execution.

---

## 📜 License

Created for Syam S. All rights reserved.
