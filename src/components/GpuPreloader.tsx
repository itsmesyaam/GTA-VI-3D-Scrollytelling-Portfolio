import React, { useEffect, useState } from 'react';
import { soundEngine } from '../audio/soundEngine';

interface GpuPreloaderProps {
  onEnter: () => void;
}

export const GpuPreloader: React.FC<GpuPreloaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setIsReady(true);
      }
      setProgress(current);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    soundEngine.init();
    soundEngine.playClickSfx();
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05050A] text-white p-6 select-none transition-opacity duration-700">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,133,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Cinematic Card */}
      <div className="relative max-w-lg w-full text-center space-y-6">
        {/* Palm Silhouette Icon */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-[#FF2A85] opacity-25 blur-lg animate-pulse" />
          <svg viewBox="0 0 100 100" className="w-14 h-14 fill-[#FF2A85] drop-shadow-[0_0_12px_#FF2A85]">
            <path d="M50 90 C 49 65 47 45 48 35 C 44 28 35 25 20 28 C 30 35 38 42 45 48 C 30 45 15 50 8 60 C 22 58 35 55 46 54 C 47 62 48 78 50 90 Z" />
            <path d="M52 35 C 56 28 65 25 80 28 C 70 35 62 42 55 48 C 70 45 85 50 92 60 C 78 58 65 55 54 54 C 53 62 52 78 50 90 C 51 65 53 45 52 35 Z" />
            <path d="M50 35 C 50 20 45 8 38 2 C 45 10 48 20 50 35 Z" />
            <path d="M50 35 C 50 20 55 8 62 2 C 55 10 52 20 50 35 Z" />
          </svg>
        </div>

        <div>
          <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold drop-shadow-[0_2px_15px_rgba(255,42,133,0.6)]">
            SYAM S
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00F0FF] mt-1">
            TECHNICAL PROJECT MANAGER & SYSTEMS ARCHITECT
          </p>
        </div>

        {/* Loading Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>WAKING YOUR GRAPHICS CARD</span>
            <span className="text-[#FF2A85] font-bold">{progress}%</span>
          </div>

          <div className="h-2 w-full bg-white/10 rounded-none overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] transition-all duration-100 shadow-[0_0_12px_#00F0FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest leading-relaxed">
          A REAL-TIME 3D FILM, BUILT ON YOUR DEVICE — LEONIDA EDITION
        </p>

        {/* Action Button */}
        <div className="pt-2">
          {isReady ? (
            <button
              onClick={handleStart}
              className="px-8 py-3.5 bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] text-white font-display text-lg uppercase tracking-widest font-bold shadow-[0_0_25px_rgba(255,42,133,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              [ ENTER VICE CITY // START FILM ]
            </button>
          ) : (
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest animate-pulse">
              INITIALIZING WEBGL PIPELINES...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
