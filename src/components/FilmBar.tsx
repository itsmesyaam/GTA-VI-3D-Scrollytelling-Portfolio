import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface FilmBarProps {
  currentChapterSlug: string;
  isChaptersOpen: boolean;
  onToggleChapters: () => void;
}

export const FilmBar: React.FC<FilmBarProps> = ({
  currentChapterSlug,
  isChaptersOpen,
  onToggleChapters,
}) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(!soundEngine.getMutedState());

  const handleToggleSound = () => {
    const isNowPlaying = soundEngine.toggleMute();
    setIsAudioActive(isNowPlaying);
  };

  const handleChaptersClick = () => {
    soundEngine.playClickSfx();
    onToggleChapters();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 px-4 sm:px-8 flex items-center justify-between pointer-events-auto bg-[#05050A]/70 backdrop-blur-md border-b border-white/10 select-none">
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <span className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white">
          SYAM S
        </span>
        <span className="hidden md:inline-block font-mono text-[10px] text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-0.5 uppercase tracking-widest">
          LEONIDA 3D FILM
        </span>
      </div>

      {/* Center Live Chapter Indicator */}
      <div className="hidden sm:flex items-center gap-2 max-w-md text-center">
        <span className="w-2 h-2 rounded-full bg-[#10FFA0] animate-ping shrink-0" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-200 truncate">
          {currentChapterSlug}
        </span>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/15 hover:border-[#FF2A85] text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-all"
          title="Toggle Ambient Soundtrack"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-4 h-4 text-[#10FFA0] animate-pulse" />
              <span className="hidden sm:inline">SOUND: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400" />
              <span className="hidden sm:inline">SOUND: OFF</span>
            </>
          )}
        </button>

        {/* Chapters Drawer Toggle */}
        <button
          onClick={handleChaptersClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF2A85]/20 border border-[#FF2A85]/50 hover:bg-[#FF2A85] text-white text-xs font-mono font-bold uppercase tracking-widest transition-all"
        >
          {isChaptersOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>[ CHAPTERS ]</span>
        </button>
      </div>
    </header>
  );
};
