export type SectorId = '01-hq' | '02-arsenal' | '03-heists' | '04-track-record' | '05-comms';

export interface SectorWaypoint {
  id: SectorId;
  sectorNum: string;
  name: string;
  tagline: string;
  coordinates: { x: number; y: number; z: number };
}

export interface PlayerStats {
  experienceYears: string;
  releaseVelocityBoost: string;
  sprintCompression: string;
  organicGrowth: string;
  concurrency: string;
  transactionReliability: string;
}

export interface MissionDossier {
  id: string;
  code: string;
  title: string;
  roleBadge: string;
  classification: string;
  architectureTags: string[];
  primaryMetrics: {
    label: string;
    value: string;
    trend: string;
  }[];
  briefing: string;
  architecturalDelivery: string[];
  stack: string[];
  status: 'COMPLETED' | 'OPERATIONAL' | 'DEPLOYED';
}

export interface CompetencyGroup {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    proficiencyStars: number; // 1 to 5
    architecturalCapability: string;
    tags: string[];
  }[];
}

export interface CareerMilestone {
  id: string;
  period: string;
  domainFocus: string;
  employerName: string;
  formalRole: string;
  squadSize?: string;
  clientEcosystem?: string;
  coreImpactDeliverables: string[];
  telemetryMetrics: string[];
}

export interface ClearanceItem {
  id: string;
  category: 'EDUCATION' | 'CERTIFICATION';
  title: string;
  issuer: string;
  validity: string;
  clearanceLevel: string;
  verificationBadge: string;
}

export interface DispatchFormData {
  agentName: string;
  commsFrequency: string; // Email
  clearanceLevel: string; // Subject / Project Scope
  tacticalBrief: string; // Message body
  _botTrap?: string; // Honeypot field
}
