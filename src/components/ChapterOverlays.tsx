import React, { useState } from 'react';
import {
  ChevronDown,
  Zap,
  Activity,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Send,
  RotateCcw,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Award,
  CheckCircle2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface ChapterOverlaysProps {
  currentChapterIndex: number;
  onScrollToChapter: (index: number) => void;
}

export const ChapterOverlays: React.FC<ChapterOverlaysProps> = ({
  currentChapterIndex,
  onScrollToChapter,
}) => {
  // Contact Form State for Chapter 08
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'HIGH // AI PIPELINES & 1M+ CONCURRENCY',
    message: '',
    _botTrap: '',
  });
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SENT' | 'COOLDOWN' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();

    // 30-second rate limit cooldown
    if (now - lastSubmitTime < 30000) {
      setFormStatus('COOLDOWN');
      setErrorMessage('Cooldown active: Please wait 30 seconds between dispatches.');
      return;
    }

    // Input sanitization
    const cleanName = formData.name.replace(/[<>]/g, '').trim();
    const cleanEmail = formData.email.replace(/[<>]/g, '').trim();
    const cleanMessage = formData.message.replace(/[<>]/g, '').trim();

    if (cleanName.length < 2 || cleanEmail.length < 5 || cleanMessage.length < 10) {
      setFormStatus('ERROR');
      setErrorMessage('Please provide a valid name, email, and at least 10 characters for your brief.');
      return;
    }

    // Honeypot check
    if (formData._botTrap && formData._botTrap.length > 0) {
      setFormStatus('SENT');
      return;
    }

    setLastSubmitTime(now);
    setFormStatus('SENT');
    soundEngine.playClickSfx();

    // Generate prefilled mailto link
    const subject = encodeURIComponent(`[${formData.scope}] Dispatch from ${cleanName}`);
    const body = encodeURIComponent(
      `Agent / Sender: ${cleanName}\nEmail: ${cleanEmail}\nScope: ${formData.scope}\n\nTactical Brief:\n${cleanMessage}`
    );
    window.open(`mailto:syam18official@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="relative w-full z-20 pointer-events-none">
      {/* =========================================================================
          CHAPTER 01: SUNRISE
          ========================================================================= */}
      <section
        id="chapter-01"
        className="min-h-screen w-full flex flex-col justify-between p-6 sm:p-14 pt-24"
      >
        <div className="max-w-3xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2A85]/20 border border-[#FF2A85]/60 text-[#FF2A85] font-mono text-xs uppercase tracking-widest mb-4 clip-notch">
            <span className="w-2 h-2 rounded-full bg-[#FF2A85] animate-ping" />
            01 SUNRISE // EXT. LEONIDA KEYS — SUNRISE
          </div>
          <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl uppercase font-black tracking-tight text-white leading-none drop-shadow-[0_15px_40px_rgba(255,42,133,0.5)]">
            SYAM S
          </h1>
          <p className="font-mono text-sm sm:text-xl uppercase tracking-[0.2em] text-[#00F0FF] mt-3 font-bold">
            TECHNICAL PROJECT MANAGER & SYSTEMS ARCHITECT
          </p>
          <p className="text-gray-300 font-sans text-sm sm:text-base max-w-xl mt-4 leading-relaxed bg-[#05050A]/60 backdrop-blur-md p-4 border-l-2 border-[#FF2A85]">
            Bridging full-stack engineering, AI pipelines, and structured Agile delivery to ship high-concurrency systems at +40% velocity.
          </p>
        </div>

        <div className="flex items-center justify-between pointer-events-auto">
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-gray-400 bg-[#05050A]/70 px-4 py-2 border border-white/10 clip-notch">
            <span className="w-2 h-2 rounded-full bg-[#10FFA0]" />
            <span>LEONIDA KEYS // LAT 25.7617° N, LONG 80.1918° W</span>
          </div>

          <button
            onClick={() => onScrollToChapter(1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF2A85] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_#FF2A85] hover:shadow-[0_0_30px_#00F0FF] transition-all"
          >
            <span>SCROLL TO CHAPTER 02</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 02: THE CROSSING (Impact Telemetry — NO employer names)
          ========================================================================= */}
      <section
        id="chapter-02"
        className="min-h-screen w-full flex flex-col justify-center p-6 sm:p-14"
      >
        <div className="max-w-6xl w-full mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF]/20 border border-[#00F0FF]/60 text-[#00F0FF] font-mono text-xs uppercase tracking-widest mb-3 clip-notch">
            02 THE CROSSING // EXT. VICE CAUSEWAY — MORNING
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white font-extrabold mb-8">
            IMPACT TELEMETRY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { stat: '4+ YEARS', label: 'CROSS-FUNCTIONAL DELIVERY', desc: 'Leading engineering squads across AI pipelines, web apps, and health-tech.' },
              { stat: '+40% VELOCITY', label: 'PIPELINE ACCELERATION', desc: 'Accelerated release pipelines via automated CI/CD and developer-ready PRD/BRD specs.' },
              { stat: '30% FASTER', label: 'SPRINT COMPRESSION', desc: 'Standardized PRD templates, developer specs, and zero scope bloat post-kickoff.' },
              { stat: '+45% REACH', label: 'ORGANIC GROWTH & VITALS', desc: 'Sub-second Core Web Vitals load times and high-performance SEO architectures.' },
              { stat: '99.95%', label: 'SYSTEM RELIABILITY', desc: 'Transactional reliability across high-concurrency payment and telehealth platforms.' },
              { stat: '1M+ USERS', label: 'CONCURRENCY ARCHITECTURE', desc: 'Distributed microservices, vector search indexing, and resilient caching layers.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#05050A]/85 backdrop-blur-xl border border-[#00F0FF]/30 p-6 clip-notch shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:border-[#FF2A85] transition-all"
              >
                <div className="font-display text-4xl sm:text-5xl font-black text-white mb-1">
                  {item.stat}
                </div>
                <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider font-bold mb-2">
                  {item.label}
                </div>
                <p className="text-gray-400 font-sans text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 03: THE SKILL ZONE (4 Arsenal Modules)
          ========================================================================= */}
      <section
        id="chapter-03"
        className="min-h-screen w-full flex flex-col justify-center p-6 sm:p-14"
      >
        <div className="max-w-6xl w-full mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8A00]/20 border border-[#FF8A00]/60 text-[#FF8A00] font-mono text-xs uppercase tracking-widest mb-3 clip-notch">
            03 THE SKILL ZONE // EXT. DOWNTOWN VICE — DAY
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white font-extrabold mb-8">
            THE ARSENAL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'DELIVERY & METHODOLOGIES',
                color: 'border-[#00F0FF]/40',
                skills: ['Technical Project Management (TPM)', 'Agile / Scrum / Kanban', 'Sprint Planning & Grooming', 'Scope & Risk Management', 'PRD / BRD / FRD Authoring', 'GTM Strategy & UAT Governance'],
              },
              {
                num: '02',
                title: 'ARCHITECTURE & SECURITY',
                color: 'border-[#FF2A85]/40',
                skills: ['RESTful APIs & Microservices', 'Supabase / PostgreSQL Schemas', 'Firebase & Cloudflare Edge', 'Auth0 / OAuth2 / MFA', 'DPDP & HIPAA Compliance Readiness', 'Razorpay & Stripe Gateways'],
              },
              {
                num: '03',
                title: 'AI & DEVELOPER VELOCITY',
                color: 'border-[#10FFA0]/40',
                skills: ['LangChain Orchestration', 'RAG Retrieval Pipelines', 'Token-Caching & Vector Search', 'Cursor & n8n Automations', 'Docker Containerization', 'Automated GitHub Actions CI/CD'],
              },
              {
                num: '04',
                title: 'ANALYTICS & INSIGHTS',
                color: 'border-[#FF8A00]/40',
                skills: ['Python (Pandas, NumPy, EDA)', 'Advanced SQL & Query Optimization', 'Power BI Real-Time Dashboards', 'Tableau Executive Reporting', 'Key KPI Tracking & Modeling', 'ETL Data Migration Integrity'],
              },
            ].map((module) => (
              <div
                key={module.num}
                className={`bg-[#05050A]/85 backdrop-blur-xl border ${module.color} p-6 sm:p-8 clip-notch shadow-[0_0_25px_rgba(0,0,0,0.6)]`}
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
                    MODULE // {module.num}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400">
                    6 CAPABILITIES
                  </span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-4">
                  {module.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {module.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 font-mono text-xs text-gray-300 uppercase tracking-wider hover:border-[#00F0FF] hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 04: WHAT WE OFFER (Services styled like genzwebdeveloper.com)
          ========================================================================= */}
      <section
        id="chapter-04"
        className="min-h-screen w-full flex flex-col justify-center p-6 sm:p-14"
      >
        <div className="max-w-6xl w-full mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10FFA0]/20 border border-[#10FFA0]/60 text-[#10FFA0] font-mono text-xs uppercase tracking-widest mb-3 clip-notch">
            04 WHAT WE OFFER // EXT. BAYFRONT MARINA — LATE AFTERNOON
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white font-extrabold mb-8">
            PRODUCTION SERVICES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'AI Consultation & RAG Engines',
                badge: '1M+ CONCURRENCY',
                desc: 'Real-time LLM pipelines engineered for high throughput with aggressive token caching, vector indexing, and fallback circuit breakers.',
              },
              {
                title: 'Full-Stack & Cloud Systems',
                badge: 'END-TO-END SLA',
                desc: 'End-to-end products built from resilient PostgreSQL/Supabase schemas and RBAC security to fluid 3D/React interfaces with sub-second vitals.',
              },
              {
                title: 'Zero-to-One MVP Delivery',
                badge: '90-DAY EXECUTION',
                desc: 'Translating market demand into production-ready MVPs within 90-day cycles with 100% on-time milestone delivery and custom enterprise API schemas.',
              },
              {
                title: 'Technical Product Leadership',
                badge: 'CROSS-FUNCTIONAL',
                desc: 'Developer-ready BRDs/PRDs, sprint governance, scope change mitigation (-25%), and executive stakeholder alignment.',
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-[#05050A]/85 backdrop-blur-xl border border-white/15 hover:border-[#00F0FF] p-6 sm:p-8 clip-notch transition-all shadow-[0_0_20px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <span className="font-mono text-xs text-[#00F0FF] font-bold">
                    SERVICE 0{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FF2A85]/20 text-[#FF2A85] border border-[#FF2A85]/40 font-mono text-[10px] uppercase font-bold">
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 05: SELECTED WORKS (4 Flagship Case Studies)
          ========================================================================= */}
      <section
        id="chapter-05"
        className="min-h-screen w-full flex flex-col justify-center p-6 sm:p-14"
      >
        <div className="max-w-6xl w-full mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2A85]/20 border border-[#FF2A85]/60 text-[#FF2A85] font-mono text-xs uppercase tracking-widest mb-3 clip-notch">
            05 SELECTED WORKS // EXT. ABOVE THE CLOUDS — GOLDEN HOUR
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white font-extrabold mb-8">
            FLAGSHIP OPERATIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                code: 'MISSION 01',
                title: 'AI-Powered Real-Time Consultation Platform',
                role: 'Lead Architect & Project Lead',
                metric: '1M+ Concurrency // -35% LLM Latency',
                desc: 'Engineered for 1M+ user concurrency with Django, React, Flutter & LangChain/RAG. Cut LLM latency by 35% and operational inference costs by 28%.',
                tags: ['Django', 'React', 'Flutter', 'LangChain', 'RAG', 'Vector Search'],
              },
              {
                code: 'MISSION 02',
                title: 'Enterprise Doctor Booking & Healthcare Platform',
                role: 'Systems Analyst & Product Lead',
                metric: 'HIPAA & DPDP Ready // 3-Sided Portal',
                desc: 'Managed a three-sided digital health platform connecting patients, clinicians, and hospital admins with RBAC policies and encrypted telehealth.',
                tags: ['HIPAA', 'DPDP', 'WebRTC', 'RBAC', 'Next.js', 'PostgreSQL'],
              },
              {
                code: 'MISSION 03',
                title: 'Scalable E-Commerce Ecosystem',
                role: 'Technical Delivery Manager',
                metric: '99.95% Reliability // Razorpay Sync',
                desc: 'End-to-end sprint execution, Razorpay payment gateway integration, and inventory synchronization with Google Authenticator MFA and Supabase RLS.',
                tags: ['Razorpay', 'Supabase RLS', 'MFA', 'React', 'Node.js', 'Redis'],
              },
              {
                code: 'MISSION 04',
                title: 'Astrologerin Mobile Application',
                role: 'Product & Delivery Lead',
                metric: 'Sub-Arcsecond Ephemeris // <120ms Geocoding',
                desc: 'Custom planetary calculation engines, interactive orbital visualizers, low-latency reverse geocoding microservices, and offline data caching.',
                tags: ['Flutter', 'Python', 'FastAPI', 'Ephemeris', 'SQLite', 'Microservices'],
              },
            ].map((work, idx) => (
              <div
                key={idx}
                className="bg-[#05050A]/90 backdrop-blur-xl border border-[#00F0FF]/30 hover:border-[#FF2A85] p-6 sm:p-8 clip-notch transition-all shadow-[0_0_30px_rgba(255,42,133,0.15)]"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold">
                    {work.code}
                  </span>
                  <span className="bg-[#FF2A85]/20 text-[#FF2A85] border border-[#FF2A85]/40 px-2 py-0.5 text-[10px] font-mono uppercase font-semibold">
                    {work.role}
                  </span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-2">
                  {work.title}
                </h3>
                <div className="font-mono text-xs text-[#10FFA0] mb-3 font-semibold">
                  {work.metric}
                </div>
                <p className="text-gray-300 font-sans text-xs leading-relaxed mb-4">
                  {work.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {work.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-[10px] text-gray-300 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 06: FREEFALL (Kinetic Typography & Velocity Callouts)
          ========================================================================= */}
      <section
        id="chapter-06"
        className="min-h-screen w-full flex flex-col justify-center items-center text-center p-6 sm:p-14"
      >
        <div className="max-w-4xl pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2A85]/20 border border-[#FF2A85]/60 text-[#FF2A85] font-mono text-xs uppercase tracking-widest clip-notch">
            06 FREEFALL // EXT. VICE SKY — SUNSET
          </div>

          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase font-black text-white tracking-wider leading-none drop-shadow-[0_15px_35px_rgba(255,42,133,0.6)]">
            ENGINEERED FOR SCALE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF]">
              BUILT FOR SPEED
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-[#05050A]/85 backdrop-blur-md border border-[#00F0FF]/30 clip-notch">
              <div className="font-display text-2xl sm:text-3xl font-black text-white">500K+ RECORDS</div>
              <div className="font-mono text-[10px] text-gray-400 uppercase mt-1">Transactional EDA Analyzed</div>
            </div>
            <div className="p-4 bg-[#05050A]/85 backdrop-blur-md border border-[#FF8A00]/40 clip-notch">
              <div className="font-display text-2xl sm:text-3xl font-black text-white">99.9% INTEGRITY</div>
              <div className="font-mono text-[10px] text-gray-400 uppercase mt-1">SQL Migration Integrity</div>
            </div>
            <div className="p-4 bg-[#05050A]/85 backdrop-blur-md border border-[#10FFA0]/30 clip-notch">
              <div className="font-display text-2xl sm:text-3xl font-black text-white">20+ BRDs / FRDs</div>
              <div className="font-mono text-[10px] text-gray-400 uppercase mt-1">Enterprise Specs Shipped</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 07: THE WAR ROOM (Credentials & Clearance)
          ========================================================================= */}
      <section
        id="chapter-07"
        className="min-h-screen w-full flex flex-col justify-center p-6 sm:p-14"
      >
        <div className="max-w-6xl w-full mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF]/20 border border-[#00F0FF]/60 text-[#00F0FF] font-mono text-xs uppercase tracking-widest mb-3 clip-notch">
            07 THE WAR ROOM // INT. PENTHOUSE, OCEAN DRIVE — NIGHT
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white font-extrabold mb-8">
            CREDENTIALS & CLEARANCE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#05050A]/90 backdrop-blur-xl border border-[#FF2A85]/50 p-6 clip-notch shadow-[0_0_20px_rgba(255,42,133,0.2)]">
              <span className="font-mono text-[10px] text-[#FF2A85] uppercase tracking-widest block mb-2 font-bold">
                ACADEMIC CREDENTIAL
              </span>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-2">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="text-gray-400 text-xs font-sans">
                Mahaguru Institute of Technology (APJ Abdul Kalam Technological University) · Class of 2018 – 2022
              </p>
            </div>

            {[
              { title: 'Anthropic Claude Certified Architect Foundations', issuer: 'Anthropic Certification Program (CCAR-F Prep)', badge: 'AI ARCHITECTURE' },
              { title: 'Red Hat Certified Specialist in Seam', issuer: 'Red Hat Enterprise Linux Ecosystem', badge: 'ENTERPRISE SYSTEMS' },
              { title: 'System Security & Compliant Cloud Architecture', issuer: 'Cloud Compliance Readiness (HIPAA & DPDP)', badge: 'SECURITY CLEARANCE' },
              { title: 'Data Visualization with Power BI & Tableau', issuer: 'Professional BI & Executive Reporting', badge: 'EXECUTIVE TELEMETRY' },
              { title: 'Advanced SQL & Python for Data Science', issuer: 'Data Science & Database Architecture Guild', badge: 'DATA PIPELINES' },
            ].map((cert, cIdx) => (
              <div
                key={cIdx}
                className="bg-[#05050A]/90 backdrop-blur-xl border border-[#00F0FF]/30 p-6 clip-notch hover:border-[#10FFA0] transition-colors shadow-[0_0_20px_rgba(0,0,0,0.6)]"
              >
                <span className="font-mono text-[10px] text-[#10FFA0] uppercase tracking-widest block mb-2 font-bold">
                  {cert.badge}
                </span>
                <h3 className="font-display text-xl uppercase tracking-wide text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-xs font-sans">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 08: BOOK A CALL (Interactive Sanitized Dispatch Terminal)
          ========================================================================= */}
      <section
        id="chapter-08"
        className="min-h-screen w-full flex flex-col justify-center p-6 sm:p-14"
      >
        <div className="max-w-6xl w-full mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10FFA0]/20 border border-[#10FFA0]/60 text-[#10FFA0] font-mono text-xs uppercase tracking-widest mb-3 clip-notch">
            08 BOOK A CALL // INT. PENTHOUSE TERRACE — NIGHT
          </div>
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white font-extrabold mb-8">
            TRANSMIT DISPATCH
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Direct Comms Coordinates */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#05050A]/90 backdrop-blur-xl border border-[#00F0FF]/30 p-6 clip-notch">
                <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-4">
                  DIRECT FREQUENCIES
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#FF2A85]" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">EMAIL</span>
                      <a href="mailto:syam18official@gmail.com" className="text-white hover:text-[#00F0FF] font-bold">
                        syam18official@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#FF8A00]" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">PHONE / SIGNAL</span>
                      <a href="tel:+918301846170" className="text-white hover:text-[#FF8A00] font-bold">
                        +91 8301846170
                      </a>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#10FFA0]" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">BASE LOCATION</span>
                      <span className="text-white font-bold">Kochi, Kerala, India (IST)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400 uppercase">NETWORKS</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/itsmesyaam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 border border-white/15 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/syamsuresh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 border border-white/15 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sanitized Form Terminal */}
            <div className="lg:col-span-7">
              <div className="bg-[#05050A]/90 backdrop-blur-xl border border-[#FF2A85]/40 p-6 sm:p-8 clip-notch">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                  <span className="font-mono text-xs uppercase text-[#FF2A85] tracking-widest font-bold">
                    SATELLITE DISPATCH TERMINAL
                  </span>
                  <span className="font-mono text-[10px] text-gray-400">
                    30-SEC COOLDOWN HARDENED
                  </span>
                </div>

                {formStatus === 'SENT' ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#10FFA0]/10 border border-[#10FFA0] flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-[#10FFA0]" />
                    </div>
                    <h3 className="font-display text-3xl uppercase text-white">
                      DISPATCH COMPILED // UPLINK OPENED
                    </h3>
                    <p className="text-gray-300 font-sans text-xs max-w-md mx-auto leading-relaxed">
                      Your brief has been sanitized and loaded into your mail client for Syam S.
                    </p>
                    <button
                      onClick={() => setFormStatus('IDLE')}
                      className="px-6 py-2 bg-gradient-to-r from-[#FF2A85] to-[#FF8A00] text-white font-mono text-xs uppercase tracking-widest font-bold"
                    >
                      TRANSMIT ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Bot Trap */}
                    <input
                      type="text"
                      name="_botTrap"
                      value={formData._botTrap}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1">
                          AGENT NAME *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your identifier / organization"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 focus:border-[#00F0FF] focus:outline-none text-white text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1">
                          COMMS FREQUENCY (EMAIL) *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="partner@enterprise.org"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 focus:border-[#00F0FF] focus:outline-none text-white text-xs font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1">
                        ENGAGEMENT SCOPE
                      </label>
                      <select
                        name="scope"
                        value={formData.scope}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-[#05050A] border border-white/15 focus:border-[#00F0FF] focus:outline-none text-white text-xs font-sans"
                      >
                        <option value="HIGH // TECHNICAL PROJECT MANAGEMENT & DELIVERY">Technical Project Management & Sprint Acceleration</option>
                        <option value="HIGH // AI PIPELINES & 1M+ CONCURRENCY">AI Pipelines & RAG Architecture (1M+ Concurrency)</option>
                        <option value="MEDIUM // ZERO-TO-ONE 90-DAY MVP ROADMAP">Zero-to-One 90-Day MVP Engineering</option>
                        <option value="EXECUTIVE // ADVISORY & CONSULTING">Executive Technical Advisory & TPM Governance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1">
                        TACTICAL BRIEF / DETAILS *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        placeholder="Project timelines, engineering squad size, technical challenges..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-black/50 border border-white/15 focus:border-[#FF2A85] focus:outline-none text-white text-xs font-sans resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-2.5 bg-red-950/60 border border-red-500/50 text-red-300 font-mono text-xs">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] text-white font-display text-base uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(255,42,133,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>DISPATCH TACTICAL BRIEF // SEND MESSAGE</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 09: THAT'S A WRAP (Rolling Cinema Credits & Replay Film)
          ========================================================================= */}
      <section
        id="chapter-09"
        className="min-h-screen w-full flex flex-col justify-center items-center text-center p-6 sm:p-14 pb-28"
      >
        <div className="max-w-2xl pointer-events-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/60 text-[#FFD700] font-mono text-xs uppercase tracking-widest clip-notch">
            09 THAT'S A WRAP // INT. SOUNDSTAGE 9
          </div>

          <h2 className="font-display text-5xl sm:text-7xl uppercase font-black text-white tracking-wider leading-none">
            THAT'S A WRAP
          </h2>

          <div className="p-6 bg-[#05050A]/85 backdrop-blur-xl border border-white/15 clip-notch space-y-3 font-mono text-xs text-gray-300">
            <div className="text-[#00F0FF] font-bold text-sm">
              DIRECTED & ENGINEERED BY SYAM S
            </div>
            <div className="text-gray-400">
              TECHNICAL PROJECT MANAGER · FULL-STACK SYSTEMS ARCHITECT · AI PIPELINE LEAD
            </div>
            <div className="text-[11px] text-[#FF2A85]">
              LEONIDA REAL-TIME 3D PRODUCTION // ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onScrollToChapter(0)}
              className="px-8 py-4 bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] text-white font-display text-lg uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(255,42,133,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] transition-all flex items-center gap-2 mx-auto transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>[ BACK TO SUNRISE // REPLAY FILM ]</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
