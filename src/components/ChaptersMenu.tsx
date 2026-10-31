import React from 'react';
import { X, Play } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export interface ChapterMeta {
  index: number;
  id: string;
  number: string;
  title: string;
  slugline: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { index: 0, id: 'ch-01', number: '01', title: 'Sunrise', slugline: '01 Sunrise — EXT. LEONIDA KEYS — SUNRISE' },
  { index: 1, id: 'ch-02', number: '02', title: 'The Crossing', slugline: '02 The Crossing — EXT. VICE CAUSEWAY — MORNING' },
  { index: 2, id: 'ch-03', number: '03', title: 'The Skill Zone', slugline: '03 The Skill Zone — EXT. DOWNTOWN VICE — DAY' },
  { index: 3, id: 'ch-04', number: '04', title: 'What We Offer', slugline: '04 What We Offer — EXT. BAYFRONT MARINA — LATE AFTERNOON' },
  { index: 4, id: 'ch-05', number: '05', title: 'Selected Works', slugline: '05 Selected Works — EXT. ABOVE THE CLOUDS — GOLDEN HOUR' },
  { index: 5, id: 'ch-06', number: '06', title: 'Freefall', slugline: '06 Freefall — EXT. VICE SKY — SUNSET' },
  { index: 6, id: 'ch-07', number: '07', title: 'The War Room', slugline: '07 The War Room — INT. PENTHOUSE, OCEAN DRIVE — NIGHT' },
  { index: 7, id: 'ch-08', number: '08', title: 'Book a Call', slugline: '08 Book a Call — INT. PENTHOUSE TERRACE — NIGHT' },
  { index: 8, id: 'ch-09', number: '09', title: "That's a Wrap", slugline: "09 That's a Wrap — INT. SOUNDSTAGE 9" },
];

interface ChaptersMenuProps {
  isOpen: boolean;
  currentChapterIndex: number;
  onClose: () => void;
  onSelectChapter: (index: number) => void;
}

export const ChaptersMenu: React.FC<ChaptersMenuProps> = ({
  isOpen,
  currentChapterIndex,
  onClose,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  const handleSelect = (index: number) => {
    soundEngine.playChapterSfx();
    onSelectChapter(index);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm select-none transition-all">
      <div className="w-full max-w-md h-full bg-[#05050A]/95 border-l border-[#00F0FF]/30 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-widest block">
                SCREENPLAY INDEX
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wider text-white font-bold">
                9 CHAPTERS
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Chapter Links */}
          <div className="space-y-3">
            {CHAPTERS.map((ch) => {
              const isActive = currentChapterIndex === ch.index;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelect(ch.index)}
                  className={`w-full flex items-center justify-between p-3.5 text-left border transition-all ${
                    isActive
                      ? 'bg-[#FF2A85]/20 border-[#FF2A85] text-white shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-[#00F0FF]/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold text-[#00F0FF]">
                      {ch.number}
                    </span>
                    <div>
                      <div className="font-display text-lg uppercase tracking-wide">
                        {ch.title}
                      </div>
                      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                        {ch.slugline.split('—')[1]?.trim() || ch.slugline}
                      </div>
                    </div>
                  </div>

                  <Play className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF2A85] fill-[#FF2A85]' : 'opacity-30'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Credit */}
        <div className="pt-6 border-t border-white/10 text-center font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          LEONIDA 3D FILM // DIRECTED BY SYAM S
        </div>
      </div>
    </div>
  );
};
