'use client';

import React, { useState } from 'react';
import { Star, Terminal, Layers, Cpu, Database, CheckCircle2, Sliders } from 'lucide-react';
import { THE_ARSENAL } from '../data/portfolioData';

export const TheArsenal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'FULL WEAPONS LOCKER' },
    { id: 'delivery', label: 'DELIVERY & METHODOLOGY' },
    { id: 'architecture', label: 'ARCHITECTURE & SECURITY' },
    { id: 'ai-velocity', label: 'AI & VELOCITY' },
    { id: 'analytics', label: 'ANALYTICS & BI' },
  ];

  const filteredGroups =
    activeCategory === 'all'
      ? THE_ARSENAL
      : THE_ARSENAL.filter((group) => group.id === activeCategory);

  return (
    <section id="arsenal" className="relative py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            <Terminal className="w-4 h-4 text-[#FF2A85]" />
            SECTOR 02 // TECHNICAL LOADOUT
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold">
            THE ARSENAL
          </h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-1">
            FULL-STACK CAPABILITIES & WANTED-STAR PROFICIENCY MATRIX
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all clip-notch ${
                activeCategory === cat.id
                  ? 'bg-[#FF2A85] text-white shadow-[0_0_15px_#FF2A85] font-bold'
                  : 'bg-[#0C0E16]/80 text-gray-400 border border-white/10 hover:border-[#00F0FF]/50 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Groups & Weapon Perks */}
      <div className="space-y-10">
        {filteredGroups.map((group) => (
          <div key={group.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#FF8A00] rotate-45" />
              <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                {group.title}
              </h3>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
              <span className="font-mono text-[11px] text-[#00F0FF] uppercase tracking-wider">
                {group.subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {group.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#0C0E16]/85 backdrop-blur-xl border border-[#00F0FF]/25 p-5 clip-notch shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[#FF2A85]/70 transition-all duration-300 group"
                >
                  {/* Top Bar with Wanted Stars */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                      PERK 0{idx + 1}
                    </span>
                    {/* 5-Star Wanted Level Meter */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= skill.proficiencyStars
                              ? 'fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_4px_#FFD700]'
                              : 'text-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Skill Title */}
                  <h4 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-[#00F0FF] transition-colors mb-2">
                    {skill.name}
                  </h4>

                  {/* Capability Details */}
                  <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                    {skill.architecturalCapability}
                  </p>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {skill.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-gray-300 uppercase tracking-wider group-hover:border-[#00F0FF]/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
