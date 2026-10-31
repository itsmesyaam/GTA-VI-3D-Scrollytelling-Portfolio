'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HeroViceCanvas } from '../components/HeroViceCanvas';
import { HudRadarNav } from '../components/HudRadarNav';
import { PlayerStatsHUD } from '../components/PlayerStatsHUD';
import { TheArsenal } from '../components/TheArsenal';
import { MissionDossierGrid } from '../components/MissionDossierGrid';
import { CareerTrackRecord } from '../components/CareerTrackRecord';
import { CredentialsClearance } from '../components/CredentialsClearance';
import { SecureDispatch } from '../components/SecureDispatch';
import { CustomCursor } from '../components/CustomCursor';
import { SectorId } from '../types/portfolio';
import { HERO_IDENTITY } from '../data/portfolioData';

export default function Home() {
  const [activeSector, setActiveSector] = useState<SectorId>('01-hq');

  // Sector scroll-state observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1,
    };

    const sectorElements: { id: SectorId; element: HTMLElement | null }[] = [
      { id: '01-hq', element: document.getElementById('hq-sector') },
      { id: '02-arsenal', element: document.getElementById('arsenal') },
      { id: '03-heists', element: document.getElementById('heists') },
      { id: '04-track-record', element: document.getElementById('track-record') },
      { id: '05-comms', element: document.getElementById('comms') },
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sectorElements.find((s) => s.element === entry.target);
          if (match) {
            setActiveSector(match.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectorElements.forEach((s) => {
      if (s.element) observer.observe(s.element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavigateToSector = (sectorId: SectorId) => {
    setActiveSector(sectorId);
    let targetEl: HTMLElement | null = null;

    if (sectorId === '01-hq') targetEl = document.getElementById('hq-sector');
    if (sectorId === '02-arsenal') targetEl = document.getElementById('arsenal');
    if (sectorId === '03-heists') targetEl = document.getElementById('heists');
    if (sectorId === '04-track-record') targetEl = document.getElementById('track-record');
    if (sectorId === '05-comms') targetEl = document.getElementById('comms');

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#07070C] text-white selection:bg-[#FF2A85] selection:text-white">
      {/* Custom HUD Targeting Reticle */}
      <CustomCursor />

      {/* Floating HUD Status Bar & Bottom-Left Radar Navigation */}
      <HudRadarNav
        activeSector={activeSector}
        onNavigateToSector={handleNavigateToSector}
      />

      {/* SECTOR 01: HEADQUARTERS & 3D SPLINE HERO */}
      <div id="hq-sector" className="relative w-full min-h-screen">
        <HeroViceCanvas
          activeSector={activeSector}
          onExploreClick={() => handleNavigateToSector('02-arsenal')}
        />
      </div>

      {/* HIGH-IMPACT TELEMETRY (Player Stats HUD) */}
      <div className="relative z-10 bg-gradient-to-b from-transparent via-[#07070C] to-[#07070C]">
        <PlayerStatsHUD />
      </div>

      {/* SECTOR 02: THE ARSENAL (Tech Stack & Wanted-Star Ratings) */}
      <div className="relative z-10">
        <TheArsenal />
      </div>

      {/* SECTOR 03: HEISTS & MAJOR OPERATIONS (Mission Dossier Bento & Safe Modal) */}
      <div className="relative z-10">
        <MissionDossierGrid />
      </div>

      {/* SECTOR 04: TRACK RECORD (Configurable Privacy Flag: Domain vs Unredacted) */}
      <div className="relative z-10">
        <CareerTrackRecord />
      </div>

      {/* CREDENTIALS & CLEARANCE (Education & Certifications) */}
      <div className="relative z-10">
        <CredentialsClearance />
      </div>

      {/* SECTOR 05: SECURE COMMS (Encrypted Dispatch Terminal) */}
      <div className="relative z-10 pb-28">
        <SecureDispatch />
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-[#07070C]/90 py-8 px-6 text-center font-mono text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10FFA0]" />
            <span className="text-gray-300">
              SYAM S // PRINCIPAL SYSTEMS ARCHITECT & TPM
            </span>
          </div>

          <div className="text-gray-400">
            LEONIDA SECTOR // KOCHI, IN • ALL ARCHITECTURAL ASSETS ZERO-TRUST HARDENED
          </div>

          <div className="text-[#FF2A85]">
            © {new Date().getFullYear()} SYAM S. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}
