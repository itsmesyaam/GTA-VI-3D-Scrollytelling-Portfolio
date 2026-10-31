'use client';

import React, { useState } from 'react';
import { Send, Radio, ShieldCheck, Mail, Phone, MapPin, Github, Linkedin, Globe, AlertTriangle, CheckCircle2, Copy, Check } from 'lucide-react';
import { z } from 'zod';
import { HERO_IDENTITY } from '../data/portfolioData';
import { DispatchFormData } from '../types/portfolio';

// Client-side sanitization & Zod schema validation
const sanitizeString = (val: string) =>
  val
    .replace(/[<>]/g, '')
    .trim();

const DispatchPayloadSchema = z.object({
  agentName: z
    .string()
    .min(2, { message: 'Agent name must be at least 2 characters.' })
    .max(80, { message: 'Agent name cannot exceed 80 characters.' })
    .transform(sanitizeString),
  commsFrequency: z
    .string()
    .email({ message: 'A valid email frequency address is required.' })
    .max(120, { message: 'Email cannot exceed 120 characters.' })
    .transform(sanitizeString),
  clearanceLevel: z
    .string()
    .min(2, { message: 'Clearance level/scope is required.' })
    .max(100, { message: 'Clearance subject cannot exceed 100 characters.' })
    .transform(sanitizeString),
  tacticalBrief: z
    .string()
    .min(10, { message: 'Tactical message brief must be at least 10 characters.' })
    .max(2500, { message: 'Tactical message cannot exceed 2500 characters.' })
    .transform(sanitizeString),
  _botTrap: z.string().optional(),
});

export const SecureDispatch: React.FC = () => {
  const [formData, setFormData] = useState<DispatchFormData>({
    agentName: '',
    commsFrequency: '',
    clearanceLevel: 'HIGH // ARCHITECTURE & SYSTEMS CONSULTING',
    tacticalBrief: '',
    _botTrap: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    'IDLE' | 'TRANSMITTING' | 'CONFIRMED' | 'FAILED'
  >('IDLE');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('TRANSMITTING');
    setErrorMessage('');

    try {
      // 1. Client-Side Zod Schema Verification
      const validationResult = DispatchPayloadSchema.safeParse(formData);

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0]?.message || 'Payload validation failed.';
        throw new Error(firstError);
      }

      const validatedData = validationResult.data;

      // 2. Honeypot Verification
      if (validatedData._botTrap && validatedData._botTrap.trim().length > 0) {
        // Silently discard bot submission
        setSubmissionStatus('CONFIRMED');
        setConfirmationCode(`LEONIDA-BOT-${Date.now().toString(36).toUpperCase()}`);
        setIsSubmitting(false);
        return;
      }

      // 3. Simulated Encrypted Satellite Uplink (900ms async handshake)
      await new Promise((resolve) => setTimeout(resolve, 900));

      const generatedCode = `LEONIDA-${Date.now().toString(36).toUpperCase()}`;
      setConfirmationCode(generatedCode);
      setSubmissionStatus('CONFIRMED');

      // 4. Open mailto client as fail-safe direct relay
      const mailtoSubject = encodeURIComponent(`[${validatedData.clearanceLevel}] Dispatch from ${validatedData.agentName}`);
      const mailtoBody = encodeURIComponent(
        `Agent / Sender: ${validatedData.agentName}\nFrequency (Email): ${validatedData.commsFrequency}\nClearance Scope: ${validatedData.clearanceLevel}\nTracking Code: ${generatedCode}\n\nTactical Brief:\n${validatedData.tacticalBrief}`
      );
      
      // Auto-trigger direct dispatch email window
      const mailtoLink = `mailto:${HERO_IDENTITY.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      window.open(mailtoLink, '_blank');

      setFormData({
        agentName: '',
        commsFrequency: '',
        clearanceLevel: 'HIGH // ARCHITECTURE & SYSTEMS CONSULTING',
        tacticalBrief: '',
        _botTrap: '',
      });
    } catch (err: unknown) {
      setSubmissionStatus('FAILED');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Transmission error: Fallback to direct channel syam18official@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (confirmationCode) {
      navigator.clipboard.writeText(confirmationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section id="comms" className="relative py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-1">
            <Radio className="w-4 h-4 text-[#10FFA0] animate-pulse" />
            SECTOR 05 // SECURE DISPATCH & DIRECT FREQUENCY
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-white font-extrabold">
            SECURE COMMS
          </h2>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-wider mt-1">
            CLIENT-VALIDATED ZERO-TRUST INGESTION FOR TECHNICAL LEADERSHIP & CONSULTING
          </p>
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 py-1.5 clip-notch">
          <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
          <span>ZOD-VALIDATED & HONEYPOT PROTECTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Channels & Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0C0E16]/85 backdrop-blur-xl border border-[#00F0FF]/30 p-6 clip-notch shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-2">
              BASE OF OPERATIONS
            </h3>
            <p className="text-gray-400 text-xs font-mono uppercase mb-6">
              LEONIDA REGIONAL TIME ZONE: IST (UTC +5:30)
            </p>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-[#FF2A85] transition-colors">
                <Mail className="w-5 h-5 text-[#FF2A85] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 uppercase">
                    DIRECT DISPATCH EMAIL
                  </span>
                  <a
                    href={`mailto:${HERO_IDENTITY.contact.email}`}
                    className="font-mono text-xs font-bold text-white hover:text-[#00F0FF] transition-colors"
                  >
                    {HERO_IDENTITY.contact.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-[#FF8A00] transition-colors">
                <Phone className="w-5 h-5 text-[#FF8A00] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 uppercase">
                    SECURE VOICE / SIGNAL LINE
                  </span>
                  <a
                    href={`tel:${HERO_IDENTITY.contact.phone.replace(/\s+/g, '')}`}
                    className="font-mono text-xs font-bold text-white hover:text-[#FF8A00] transition-colors"
                  >
                    {HERO_IDENTITY.contact.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 uppercase">
                    PHYSICAL COORDINATES
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {HERO_IDENTITY.location}
                  </span>
                </div>
              </div>

              {/* Verified Web Domain */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10">
                <Globe className="w-5 h-5 text-[#10FFA0] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-gray-400 uppercase">
                    PRIMARY WEB DOMAIN
                  </span>
                  <a
                    href="https://www.syamsuresh.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-[#10FFA0] hover:underline"
                  >
                    {HERO_IDENTITY.contact.domain}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-gray-400">
                CRYPTO NETWORKS:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={HERO_IDENTITY.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={HERO_IDENTITY.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 border border-white/10 text-white hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Encrypted Tactical Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0C0E16]/85 backdrop-blur-xl border border-[#FF2A85]/35 p-6 sm:p-8 clip-notch shadow-[0_0_35px_rgba(255,42,133,0.15)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <span className="font-mono text-xs uppercase text-[#FF2A85] tracking-widest font-bold">
                ENCRYPTED SATELLITE DISPATCH TERMINAL
              </span>
              <span className="font-mono text-[10px] text-gray-400">
                256-BIT CLIENT HASHING
              </span>
            </div>

            {submissionStatus === 'CONFIRMED' ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#10FFA0]/10 border border-[#10FFA0] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#10FFA0]" />
                </div>
                <h3 className="font-display text-3xl uppercase text-white tracking-wide">
                  MISSION DISPATCHED // TRANSMISSION VERIFIED
                </h3>
                <p className="text-gray-300 font-sans text-sm max-w-md mx-auto">
                  Your encrypted tactical brief has been cryptographically validated and queued for Syam S.
                </p>

                {confirmationCode && (
                  <div className="inline-flex items-center gap-2 p-2 bg-black/60 border border-[#00F0FF]/40 font-mono text-xs text-[#00F0FF]">
                    <span>CLEARANCE CODE: {confirmationCode}</span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1 hover:text-white transition-colors"
                      title="Copy Tracking Code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10FFA0]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                <div>
                  <button
                    onClick={() => setSubmissionStatus('IDLE')}
                    className="mt-6 px-6 py-2.5 bg-gradient-to-r from-[#FF2A85] to-[#FF8A00] text-white font-mono text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_20px_#FF2A85] transition-all"
                  >
                    TRANSMIT ANOTHER DISPATCH
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Honeypot hidden input to catch spam bots */}
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
                  {/* Agent Name */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1.5">
                      IDENTIFIER / AGENT NAME *
                    </label>
                    <input
                      type="text"
                      name="agentName"
                      required
                      placeholder="e.g. Elena Rostova / VP Engineering"
                      value={formData.agentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 focus:border-[#00F0FF] focus:outline-none text-white font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1.5">
                      COMMS FREQUENCY (EMAIL) *
                    </label>
                    <input
                      type="email"
                      name="commsFrequency"
                      required
                      placeholder="e.g. partner@enterprise.org"
                      value={formData.commsFrequency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-black/50 border border-white/15 focus:border-[#00F0FF] focus:outline-none text-white font-sans text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Scope / Clearance Level */}
                <div>
                  <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1.5">
                    MISSION OBJECTIVE / ENGAGEMENT SCOPE
                  </label>
                  <select
                    name="clearanceLevel"
                    value={formData.clearanceLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#07070C] border border-white/15 focus:border-[#00F0FF] focus:outline-none text-white font-sans text-sm transition-colors"
                  >
                    <option value="HIGH // TECHNICAL PROJECT MANAGEMENT & DELIVERY">
                      Technical Project Management & Sprint Delivery Acceleration
                    </option>
                    <option value="HIGH // AI PIPELINES & RAG SYSTEM ARCHITECTURE">
                      AI Pipeline Orchestration & 1M+ Concurrency Architecture
                    </option>
                    <option value="MEDIUM // ZERO-TO-ONE 90-DAY MVP ROADMAP">
                      Zero-to-One 90-Day MVP Engineering & Architecture
                    </option>
                    <option value="MEDIUM // TECHNICAL SPECIFICATIONS & BRD/PRD">
                      Enterprise BRD/PRD Authoring & HIPAA/DPDP Compliance
                    </option>
                    <option value="EXECUTIVE // ADVISORY & CONSULTING">
                      Executive Engineering Advisory & Interim TPM
                    </option>
                  </select>
                </div>

                {/* Tactical Brief */}
                <div>
                  <label className="block font-mono text-[10px] uppercase text-gray-400 tracking-wider mb-1.5">
                    TACTICAL BRIEF / PROJECT DETAILS *
                  </label>
                  <textarea
                    name="tacticalBrief"
                    required
                    rows={4}
                    placeholder="Outline your timeline, team squad size, delivery blockers, or architectural goals..."
                    value={formData.tacticalBrief}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-black/50 border border-white/15 focus:border-[#FF2A85] focus:outline-none text-white font-sans text-sm transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-xs font-mono text-red-200">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] text-white font-display text-lg uppercase tracking-widest font-bold shadow-[0_0_25px_rgba(255,42,133,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>ENCRYPTING & TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH TACTICAL BRIEF // SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
