'use client';

import React from 'react';
import { ShieldCheck, GraduationCap, Award, CheckCircle2, Lock } from 'lucide-react';
import { CLEARANCE_CREDENTIALS } from '../data/portfolioData';

export const CredentialsClearance: React.FC = () => {
  return (
    <section id="credentials" className="relative py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            <Lock className="w-4 h-4 text-[#FF2A85]" />
            ACCREDITATIONS // LEVEL 5 CLEARANCE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold">
            CREDENTIALS & CLEARANCE
          </h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-1">
            FORMAL COMPUTER SCIENCE DEGREE & INDUSTRY CERTIFICATIONS
          </p>
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/30 px-3 py-1.5 clip-notch">
          <ShieldCheck className="w-4 h-4 text-[#FFD700]" />
          <span>ALL CREDENTIALS CRYPTOGRAPHICALLY VERIFIED</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLEARANCE_CREDENTIALS.map((cred) => {
          const isEdu = cred.category === 'EDUCATION';
          return (
            <div
              key={cred.id}
              className={`relative bg-[#0C0E16]/85 backdrop-blur-xl border ${
                isEdu ? 'border-[#FF2A85]/50' : 'border-[#00F0FF]/30'
              } p-6 clip-notch shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:border-[#10FFA0]/60 transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  {isEdu ? (
                    <GraduationCap className="w-3.5 h-3.5 text-[#FF2A85]" />
                  ) : (
                    <Award className="w-3.5 h-3.5 text-[#00F0FF]" />
                  )}
                  {cred.category}
                </span>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-white/5 text-[#10FFA0] border border-[#10FFA0]/30 font-bold">
                  {cred.clearanceLevel}
                </span>
              </div>

              <h3 className="font-display text-xl uppercase tracking-wide text-white group-hover:text-[#00F0FF] transition-colors mb-2">
                {cred.title}
              </h3>

              <div className="text-xs font-sans text-gray-300 mb-4 leading-relaxed">
                {cred.issuer}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px]">
                <span className="text-gray-400">{cred.validity}</span>
                <span className="text-[#FF8A00] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#10FFA0]" />
                  {cred.verificationBadge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
