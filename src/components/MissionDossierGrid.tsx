'use client';

import React, { useState, useEffect } from 'react';
import { Target, X, CheckCircle, ExternalLink, ShieldAlert, Cpu, ArrowUpRight } from 'lucide-react';
import { MISSION_DOSSIERS } from '../data/portfolioData';
import { MissionDossier } from '../types/portfolio';

// Whitelist set to prevent DOM XSS and open redirect injection
const ALLOWED_MISSIONS = new Set(['ai-consult', 'health-core', 'ecom-scale', 'astrologerin']);

export const MissionDossierGrid: React.FC = () => {
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);

  // Safe URL query parameter synchronization with allowlist validation
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const rawMission = params.get('mission');
      if (rawMission && ALLOWED_MISSIONS.has(rawMission)) {
        setSelectedMissionId(rawMission);
      }
    } catch {
      // Fallback on server or unexpected env
    }
  }, []);

  const openMissionModal = (id: string) => {
    if (ALLOWED_MISSIONS.has(id)) {
      setSelectedMissionId(id);
      // Update URL safely without full page reload
      const url = new URL(window.location.href);
      url.searchParams.set('mission', id);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const closeMissionModal = () => {
    setSelectedMissionId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('mission');
    window.history.replaceState({}, '', url.toString());
  };

  const activeMission: MissionDossier | undefined = MISSION_DOSSIERS.find(
    (m) => m.id === selectedMissionId
  );

  return (
    <section id="heists" className="relative py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            <Target className="w-4 h-4 text-[#FF2A85]" />
            SECTOR 03 // MAJOR HEISTS & ENTERPRISE DEPLOYMENTS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold">
            MISSION DOSSIER
          </h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-1">
            CLICK ANY DOSSIER TO DECRYPT DEEP ARCHITECTURAL SCHEMATICS
          </p>
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#10FFA0] bg-[#10FFA0]/10 border border-[#10FFA0]/30 px-3 py-1.5 clip-notch">
          <span className="w-2 h-2 rounded-full bg-[#10FFA0] animate-ping" />
          <span>4 MISSIONS COMPLETED // 100% OPERATIONAL SLA</span>
        </div>
      </div>

      {/* 2x2 Bento Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MISSION_DOSSIERS.map((mission) => (
          <article
            key={mission.id}
            onClick={() => openMissionModal(mission.id)}
            className="group relative cursor-pointer overflow-hidden bg-[#0C0E16]/85 backdrop-blur-xl border border-[#00F0FF]/25 p-7 clip-notch shadow-[0_0_30px_rgba(255,42,133,0.12)] transition-all duration-300 hover:border-[#FF2A85]/80 hover:shadow-[0_0_40px_rgba(255,42,133,0.3)] hover:-translate-y-1"
          >
            {/* Card Top Telemetry */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00F0FF] font-bold">
                {mission.code} // {mission.classification}
              </span>
              <span className="bg-[#FF2A85]/20 text-[#FF2A85] border border-[#FF2A85]/40 px-2.5 py-0.5 text-xs font-mono uppercase font-semibold">
                {mission.roleBadge}
              </span>
            </div>

            {/* Mission Title */}
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white group-hover:text-[#00F0FF] transition-colors mb-4">
              {mission.title}
            </h3>

            {/* Quantified Outcomes / Telemetry Strip */}
            <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-black/40 border border-white/10">
              {mission.primaryMetrics.map((met, mIdx) => (
                <div key={mIdx} className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase text-gray-400">
                    {met.label}
                  </span>
                  <span className="font-display text-lg sm:text-xl font-bold text-white">
                    {met.value}
                  </span>
                  <span className="font-mono text-[9px] text-[#10FFA0]">
                    {met.trend}
                  </span>
                </div>
              ))}
            </div>

            {/* Briefing Snippet */}
            <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed line-clamp-3 mb-6">
              {mission.briefing}
            </p>

            {/* Footer Stack Tags & Action Button */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                {mission.architectureTags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-gray-300 uppercase"
                  >
                    {tag}
                  </span>
                ))}
                {mission.architectureTags.length > 3 && (
                  <span className="px-1.5 py-0.5 font-mono text-[10px] text-gray-400">
                    +{mission.architectureTags.length - 3} MORE
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 font-mono text-xs text-[#00F0FF] group-hover:text-[#FF2A85] transition-colors">
                <span>INSPECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* =========================================================================
          GTA VI MISSION DOSSIER MODAL (Safe State Binding & Allowlist Validation)
          ========================================================================= */}
      {activeMission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300"
          onClick={closeMissionModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0C0E16] border border-[#00F0FF]/40 p-6 sm:p-8 clip-notch shadow-[0_0_60px_rgba(0,240,255,0.3)] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#00F0FF] tracking-widest mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#10FFA0] animate-pulse" />
                  <span>{activeMission.code} // CLASSIFIED BRIEFING</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-white font-black">
                  {activeMission.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="bg-[#FF2A85]/20 text-[#FF2A85] border border-[#FF2A85]/50 px-2.5 py-0.5 font-mono text-xs uppercase font-bold">
                    ROLE: {activeMission.roleBadge}
                  </span>
                  <span className="bg-white/10 text-gray-300 border border-white/20 px-2 py-0.5 font-mono text-xs uppercase">
                    STATUS: {activeMission.status}
                  </span>
                </div>
              </div>

              <button
                onClick={closeMissionModal}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Mission Dossier"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quantified Metrics Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {activeMission.primaryMetrics.map((met, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 bg-black/60 border border-[#00F0FF]/25 clip-notch"
                >
                  <span className="font-mono text-[10px] uppercase text-gray-400 block mb-1">
                    {met.label}
                  </span>
                  <span className="font-display text-2xl font-black text-white block">
                    {met.value}
                  </span>
                  <span className="font-mono text-[10px] text-[#10FFA0]">
                    {met.trend}
                  </span>
                </div>
              ))}
            </div>

            {/* Executive Briefing */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF8A00] mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#FF8A00]" />
                EXECUTIVE BRIEFING & ARCHITECTURAL SCOPE
              </h4>
              <p className="text-gray-300 font-sans text-sm leading-relaxed bg-white/5 p-4 border-l-2 border-[#FF8A00]">
                {activeMission.briefing}
              </p>
            </div>

            {/* Architectural Deliverables */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] mb-3">
                KEY ARCHITECTURAL DELIVERABLES & GOVERNANCE
              </h4>
              <ul className="space-y-2">
                {activeMission.architecturalDelivery.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-gray-300 font-sans"
                  >
                    <CheckCircle className="w-4 h-4 text-[#10FFA0] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">
                SYSTEM STACK & DEPLOYED PROTOCOLS
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeMission.stack.map((item, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 bg-white/5 border border-white/20 font-mono text-xs text-white uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Close Button in Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={closeMissionModal}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FF2A85] to-[#FF8A00] text-white font-mono text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_20px_#FF2A85] transition-all"
              >
                CLOSE DOSSIER [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
