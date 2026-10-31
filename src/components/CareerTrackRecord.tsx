'use client';

import React, { useState } from 'react';
import { History, Eye, EyeOff, ShieldCheck, Briefcase, Calendar, CheckSquare, Sparkles } from 'lucide-react';
import { CAREER_RECORD } from '../data/portfolioData';

export const CareerTrackRecord: React.FC = () => {
  // Feature flag defaulting to false to prioritize sanitized domain impact
  const [showEmployerNames, setShowEmployerNames] = useState<boolean>(false);

  return (
    <section id="track-record" className="relative py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            <History className="w-4 h-4 text-[#FF8A00]" />
            SECTOR 04 // PROFESSIONAL TIMELINE & REPUTATION
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold">
            CAREER TRACK RECORD
          </h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-1">
            4+ YEARS DRIVING HIGH-VELOCITY TECHNICAL PRODUCT DELIVERY & ARCHITECTURE
          </p>
        </div>

        {/* Privacy Dossier Toggle (SHOW_EMPLOYER_NAMES) */}
        <div className="flex items-center gap-3 bg-[#0C0E16]/90 border border-[#00F0FF]/30 p-2.5 clip-notch shadow-[0_0_20px_rgba(0,240,255,0.1)]">
          <div className="flex flex-col text-right">
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">
              REDACTION PROTOCOL
            </span>
            <span className="font-mono text-xs font-bold text-white uppercase">
              {showEmployerNames ? 'UNREDACTED DOSSIER' : 'ANONYMIZED IMPACT MODE'}
            </span>
          </div>

          <button
            onClick={() => setShowEmployerNames((prev) => !prev)}
            className={`relative flex items-center gap-2 px-3 py-1.5 font-mono text-xs uppercase font-bold transition-all ${
              showEmployerNames
                ? 'bg-[#FF2A85] text-white shadow-[0_0_15px_#FF2A85]'
                : 'bg-white/10 text-[#00F0FF] hover:bg-white/20'
            }`}
            title="Toggle employer names between sanitized domain metrics and unredacted resume names"
          >
            {showEmployerNames ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>UNLOCKED</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>REDACTED</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mode Banner Indicator */}
      <div className="mb-8 p-3 bg-white/5 border-l-2 border-[#00F0FF] flex items-center justify-between text-xs font-mono text-gray-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
          {showEmployerNames ? (
            <span>
              STATUS: <strong className="text-white">FULL RESUME DOSSIER ACTIVE</strong> — Displaying verified employer names & enterprise clients.
            </span>
          ) : (
            <span>
              STATUS: <strong className="text-white">IMPACT EMPHASIS MODE</strong> — Emphasizing quantified technical delivery, architecture scale, and 90-day velocity cycles.
            </span>
          )}
        </div>
        <span className="hidden sm:inline text-gray-500">CONFIG: SHOW_EMPLOYER_NAMES={String(showEmployerNames)}</span>
      </div>

      {/* Chronological Timeline */}
      <div className="relative border-l border-[#00F0FF]/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {CAREER_RECORD.map((item, idx) => {
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#07070C] border-2 border-[#00F0FF] group-hover:border-[#FF2A85] group-hover:shadow-[0_0_12px_#FF2A85] transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] group-hover:bg-[#FF2A85] mx-auto mt-0.5 transition-colors" />
              </div>

              {/* Milestone Card */}
              <div className="bg-[#0C0E16]/85 backdrop-blur-xl border border-white/10 group-hover:border-[#00F0FF]/40 p-6 clip-notch shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all">
                {/* Top Bar: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest font-bold">
                      0{idx + 1} // {item.formalRole}
                    </span>
                    {item.squadSize && (
                      <span className="px-2 py-0.5 bg-white/5 text-gray-400 font-mono text-[10px] uppercase">
                        {item.squadSize}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Primary Heading: Domain Impact vs Employer Name */}
                <div className="mb-4">
                  {showEmployerNames ? (
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white flex items-center gap-2">
                        <span>{item.employerName}</span>
                        <span className="text-sm font-mono text-[#FF2A85] font-normal border border-[#FF2A85]/40 px-2 py-0.5">
                          VERIFIED ORG
                        </span>
                      </h3>
                      <div className="font-mono text-xs text-[#FF8A00] uppercase mt-1">
                        Domain Scope: {item.domainFocus}
                      </div>
                      {item.clientEcosystem && (
                        <div className="text-xs font-mono text-gray-400 mt-0.5">
                          Ecosystem: {item.clientEcosystem}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white flex items-center gap-2">
                        <span>{item.domainFocus}</span>
                        <span className="text-sm font-mono text-[#00F0FF] font-normal border border-[#00F0FF]/30 px-2 py-0.5">
                          CORE COMPETENCY
                        </span>
                      </h3>
                      <div className="font-mono text-xs text-gray-400 uppercase mt-1">
                        CONFIDENTIAL ENTERPRISE ENGAGEMENT // REPUTATION VERIFIED
                      </div>
                    </div>
                  )}
                </div>

                {/* Deliverables Bullet List */}
                <ul className="space-y-2.5 my-4">
                  {item.coreImpactDeliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-sans">
                      <CheckSquare className="w-4 h-4 text-[#10FFA0] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>

                {/* Telemetry Metric Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {item.telemetryMetrics.map((metric, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2.5 py-1 bg-black/40 border border-[#00F0FF]/30 font-mono text-[11px] text-[#00F0FF] uppercase tracking-wider font-semibold"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
