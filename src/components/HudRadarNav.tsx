'use client';

import React, { useState, useEffect } from 'react';
import { Star, Clock, Crosshair, Zap, Compass, ChevronRight } from 'lucide-react';
import { SECTOR_WAYPOINTS } from '../data/portfolioData';
import { SectorId } from '../types/portfolio';

interface HudRadarNavProps {
  activeSector: SectorId;
  onNavigateToSector: (sectorId: SectorId) => void;
}

export const HudRadarNav: React.FC<HudRadarNavProps> = ({
  activeSector,
  onNavigateToSector,
}) => {
  const [kochiTime, setKochiTime] = useState<string>('');
  const [wantedStars, setWantedStars] = useState<number>(5);
  const [radarExpanded, setRadarExpanded] = useState<boolean>(false);

  // Live Kochi IST Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat([], options);
        setKochiTime(formatter.format(now));
      } catch {
        const d = new Date();
        setKochiTime(d.toTimeString().slice(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Radar mini-map coordinates mapping relative to circular center (50%, 50%)
  const sectorPositions: Record<SectorId, { top: string; left: string }> = {
    '01-hq': { top: '22%', left: '48%' },
    '02-arsenal': { top: '38%', left: '26%' },
    '03-heists': { top: '38%', left: '72%' },
    '04-track-record': { top: '65%', left: '28%' },
    '05-comms': { top: '78%', left: '50%' },
  };

  return (
    <>
      {/* =========================================================================
          TOP-RIGHT STATUS BAR (GTA VI HUD Telemetry)
          ========================================================================= */}
      <header className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto select-none">
        {/* Main Stats HUD Pill */}
        <div className="flex items-center gap-4 px-4 py-2 bg-[#0C0E16]/85 backdrop-blur-xl border border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.15)] clip-notch">
          {/* Live Kochi Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                KOCHI [IST]
              </span>
              <span className="font-mono text-xs font-bold text-white tracking-widest">
                {kochiTime || '12:00:00'}
              </span>
            </div>
          </div>

          <div className="w-[1px] h-6 bg-white/15" />

          {/* Respect / Velocity Bar (+40% Release Velocity) */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3 text-[9px] font-mono uppercase tracking-wider">
              <span className="text-[#FF8A00] flex items-center gap-1 font-bold">
                <Zap className="w-3 h-3 text-[#FF8A00]" />
                VELOCITY
              </span>
              <span className="text-white font-bold tracking-wider">+40% ACCEL</span>
            </div>
            {/* Segmented Respect Bar */}
            <div className="flex items-center gap-1 mt-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-3 sm:w-4 ${
                    i < 5
                      ? 'bg-gradient-to-r from-[#FF8A00] to-[#FF2A85] shadow-[0_0_8px_#FF2A85]'
                      : 'bg-white/10'
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>

          <div className="w-[1px] h-6 bg-white/15" />

          {/* Interactive Wanted-Star Clearance Rating */}
          <div className="flex flex-col items-end">
            <div className="font-mono text-[9px] uppercase text-gray-400 tracking-wider flex items-center gap-1">
              <span>CLEARANCE</span>
              <span className="text-[#FF2A85] font-bold">LVL {wantedStars}</span>
            </div>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setWantedStars(star)}
                  title={`Architecture Clearance Level ${star} of 5`}
                  className="transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      star <= wantedStars
                        ? 'fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_6px_#FFD700]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Micro-status subtitle */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-gray-400 bg-[#07070C]/80 px-2.5 py-0.5 border-r border-[#FF2A85]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10FFA0] animate-pulse" />
          <span>SYS ARCHITECT: SYAM S // 1M+ CONCURRENCY VERIFIED</span>
        </div>
      </header>

      {/* =========================================================================
          BOTTOM-LEFT RADAR MINI-MAP (Leonida Interactive Navigation)
          ========================================================================= */}
      <aside className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 pointer-events-auto select-none">
        <div className="relative bg-[#0C0E16]/85 backdrop-blur-xl border border-[#00F0FF]/30 p-3 shadow-[0_0_30px_rgba(0,240,255,0.15)] clip-notch transition-all duration-300">
          {/* Radar Header / Toggle */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 gap-3">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00F0FF] animate-spin" style={{ animationDuration: '10s' }} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                RADAR // NAV
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#00F0FF] bg-[#00F0FF]/15 px-1.5 py-0.5">
              SECTOR {activeSector.slice(0, 2)}
            </span>
          </div>

          {/* Circular Radar Visualizer Screen */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#00F0FF]/40 bg-[#07070C]/90 overflow-hidden shadow-inner mx-auto">
            {/* Concentric Sonar Rings */}
            <div className="absolute inset-3 rounded-full border border-[#00F0FF]/20" />
            <div className="absolute inset-7 rounded-full border border-[#00F0FF]/25" />
            <div className="absolute inset-11 rounded-full border border-[#00F0FF]/30" />

            {/* Radar Crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#00F0FF]/25" />
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#00F0FF]/25" />

            {/* Sweeping Sonar Beam */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(0, 240, 255, 0.4) 0deg, rgba(0, 240, 255, 0) 65deg, transparent 65deg)',
                animation: 'radarSweep 4s linear infinite',
              }}
            />

            {/* Sector Waypoint Blips */}
            {SECTOR_WAYPOINTS.map((wp) => {
              const isActive = activeSector === wp.id;
              const pos = sectorPositions[wp.id] || { top: '50%', left: '50%' };

              return (
                <button
                  key={wp.id}
                  onClick={() => onNavigateToSector(wp.id)}
                  style={{ top: pos.top, left: pos.left }}
                  title={`${wp.sectorNum}: ${wp.name}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Active Ping Animation */}
                    {isActive && (
                      <span className="absolute w-5 h-5 rounded-full bg-[#FF2A85] opacity-75 animate-ping" />
                    )}
                    {/* Blip Dot */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full border ${
                        isActive
                          ? 'bg-[#FF2A85] border-white shadow-[0_0_10px_#FF2A85]'
                          : 'bg-[#00F0FF] border-[#07070C] hover:bg-white'
                      } transition-colors`}
                    />
                    {/* Sector Number */}
                    <span
                      className={`absolute -top-3 text-[8px] font-mono font-bold ${
                        isActive ? 'text-[#FF2A85]' : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {wp.sectorNum}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Center Player Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white z-10" />
          </div>

          {/* Quick Waypoint Selector List */}
          <div className="mt-2 space-y-1">
            {SECTOR_WAYPOINTS.map((wp) => {
              const isActive = activeSector === wp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => onNavigateToSector(wp.id)}
                  className={`w-full flex items-center justify-between px-2 py-1 text-[10px] font-mono uppercase text-left transition-colors ${
                    isActive
                      ? 'bg-[#FF2A85]/20 text-[#FF2A85] border-l-2 border-[#FF2A85]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-[#00F0FF]">{wp.sectorNum}</span>
                    <span>{wp.name}</span>
                  </span>
                  <ChevronRight className={`w-3 h-3 ${isActive ? 'opacity-100' : 'opacity-30'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
