import React from 'react';
import { CHAPTERS } from './ChaptersMenu';

interface CinematicScrubberProps {
  scrollProgress: number; // 0.0 to 1.0
  currentChapterIndex: number;
  onSeekChapter: (index: number) => void;
}

export const CinematicScrubber: React.FC<CinematicScrubberProps> = ({
  scrollProgress,
  currentChapterIndex,
  onSeekChapter,
}) => {
  return (
    <>
      {/* Top & Bottom Cinematic Letterbox Overlay */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#05050A] to-transparent z-30 opacity-80" />
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#05050A] to-transparent z-30 opacity-90" />

      {/* Fixed Bottom Film Progress Scrubber */}
      <nav aria-label="Screenplay Chapters Progress" className="fixed bottom-4 left-4 right-4 sm:left-12 sm:right-12 z-40 flex items-center justify-between gap-2 select-none pointer-events-auto bg-[#05050A]/70 backdrop-blur-md border border-white/10 px-4 py-2 clip-notch">
        {/* Progress Bar Track */}
        <div className="flex-1 flex items-center justify-between gap-1 sm:gap-2">
          {CHAPTERS.map((ch) => {
            const isActive = currentChapterIndex === ch.index;
            const isPassed = currentChapterIndex > ch.index;

            return (
              <button
                key={ch.id}
                onClick={() => onSeekChapter(ch.index)}
                className="group flex-1 flex flex-col items-center gap-1 focus:outline-none"
                title={`${ch.number} ${ch.title}`}
              >
                {/* Visual Bar Segment */}
                <div
                  className={`h-1.5 w-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FF2A85] shadow-[0_0_10px_#FF2A85]'
                      : isPassed
                      ? 'bg-[#00F0FF]/60'
                      : 'bg-white/15 group-hover:bg-white/40'
                  }`}
                />

                {/* Chapter Number Label */}
                <span
                  className={`text-[9px] font-mono font-bold transition-colors ${
                    isActive
                      ? 'text-[#FF2A85]'
                      : isPassed
                      ? 'text-[#00F0FF]'
                      : 'text-gray-500 group-hover:text-gray-300'
                  }`}
                >
                  {ch.number}
                </span>
              </button>
            );
          })}
        </div>

        {/* Global Progress Percentage */}
        <div className="hidden sm:block pl-4 border-l border-white/10 font-mono text-[10px] text-gray-400 font-bold shrink-0">
          {(scrollProgress * 100).toFixed(0)}%
        </div>
      </nav>
    </>
  );
};
