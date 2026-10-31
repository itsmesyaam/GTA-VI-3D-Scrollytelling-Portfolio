'use client';

import React from 'react';
import { Award, Zap, Activity, Users, ShieldCheck, Gauge } from 'lucide-react';
import { PLAYER_STATS } from '../data/portfolioData';

export const PlayerStatsHUD: React.FC = () => {
  const statCards = [
    {
      label: 'LEADERSHIP HORIZON',
      value: PLAYER_STATS.experienceYears,
      metricDetail: 'Cross-Functional Squad Leadership',
      description: '4+ years driving complex engineering roadmaps across AI, health-tech, and scalable web platforms.',
      badge: 'PROVEN SENIORITY',
      color: 'border-[#00F0FF]/30 text-[#00F0FF]',
      accentBg: 'bg-[#00F0FF]/10',
      icon: Users,
    },
    {
      label: 'PIPELINE ACCELERATION',
      value: PLAYER_STATS.releaseVelocityBoost,
      metricDetail: 'Delivery Velocity Enhancement',
      description: 'Streamlined release cadences from ideation to production with automated testing and PRD specs.',
      badge: 'MISSION PASSED // +40% VELOCITY',
      color: 'border-[#FF2A85]/40 text-[#FF2A85]',
      accentBg: 'bg-[#FF2A85]/10',
      icon: Zap,
    },
    {
      label: 'SPRINT COMPRESSION',
      value: PLAYER_STATS.sprintCompression,
      metricDetail: 'Standardized PRD / BRD Flow',
      description: 'Reduced iteration cycles and developer ambiguity by writing developer-ready architectural documentation.',
      badge: 'ZERO SCOPE CREEP',
      color: 'border-[#FF8A00]/40 text-[#FF8A00]',
      accentBg: 'bg-[#FF8A00]/10',
      icon: Gauge,
    },
    {
      label: 'ORGANIC GROWTH & WEB VITALS',
      value: PLAYER_STATS.organicGrowth,
      metricDetail: 'Sub-Second Page Experience',
      description: 'Optimized Core Web Vitals, SSR caching, and edge performance, driving 45% uplift in organic discovery.',
      badge: 'PERFORMANCE HARDENED',
      color: 'border-[#10FFA0]/40 text-[#10FFA0]',
      accentBg: 'bg-[#10FFA0]/10',
      icon: Activity,
    },
    {
      label: 'CONCURRENCY ARCHITECTURE',
      value: PLAYER_STATS.concurrency,
      metricDetail: '1M+ Concurrent User Peak Capacity',
      description: 'Designed distributed microservice layers, vector caching, and load-balanced API gateways.',
      badge: 'SCALE TESTED',
      color: 'border-[#00F0FF]/40 text-[#00F0FF]',
      accentBg: 'bg-[#00F0FF]/10',
      icon: Award,
    },
    {
      label: 'TRANSACTION RELIABILITY',
      value: PLAYER_STATS.transactionReliability,
      metricDetail: 'Financial & Telehealth Uptime',
      description: 'Hardened Razorpay webhook idempotency, distributed Redis locks, and zero-loss database migrations.',
      badge: 'ENTERPRISE SLA',
      color: 'border-[#FFD700]/40 text-[#FFD700]',
      accentBg: 'bg-[#FFD700]/10',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="player-stats" className="relative py-12 px-6 max-w-7xl mx-auto">
      {/* Section Header with Rockstar Mission Passed Motif */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 bg-[#00F0FF] animate-ping" />
            TELEMETRY // SECTOR 01 METRICS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold">
            HIGH-IMPACT TELEMETRY
          </h2>
        </div>

        {/* Rockstar 'Mission Passed' KPI Banner */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FF8A00]/15 border border-[#FF8A00]/60 rounded-none shadow-[0_0_20px_rgba(255,138,0,0.3)] clip-notch">
          <Award className="w-5 h-5 text-[#FFD700] animate-bounce" />
          <div className="flex flex-col">
            <span className="font-display text-base uppercase text-[#FFD700] tracking-wider font-bold">
              MISSION PASSED
            </span>
            <span className="font-mono text-[10px] text-gray-300 uppercase">
              RESPECT +40% RELEASE VELOCITY EARNED
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <article
              key={idx}
              className={`relative overflow-hidden bg-[#0C0E16]/80 backdrop-blur-xl border ${card.color} p-6 clip-notch shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] group`}
            >
              {/* Background ambient corner glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {card.label}
                </span>
                <span className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold border ${card.color} ${card.accentBg}`}>
                  {card.badge}
                </span>
              </div>

              {/* Stat Value */}
              <div className="flex items-baseline gap-3 my-2">
                <div className="p-2.5 rounded-none bg-white/5 border border-white/10 group-hover:border-[#00F0FF]/50 transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl uppercase font-black text-white tracking-wide">
                    {card.value}
                  </div>
                  <div className="font-mono text-[11px] text-[#00F0FF] uppercase tracking-wider font-semibold">
                    {card.metricDetail}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs font-sans text-gray-300 leading-relaxed">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
