import {
  MissionDossier,
  CompetencyGroup,
  CareerMilestone,
  ClearanceItem,
  PlayerStats,
  SectorWaypoint,
} from '../types/portfolio';

export const HERO_IDENTITY = {
  callsign: 'SYAM S',
  tagline: 'LEONIDA SECTOR // SYSTEMS ARCHITECT & TECHNICAL PROJECT MANAGER',
  role: 'Technical Project Manager | Technical Product Delivery | Systems Architect',
  location: 'Kochi, Kerala, India (IST - UTC+5:30)',
  contact: {
    domain: 'www.syamsuresh.in',
    github: 'itsmesyaam',
    githubUrl: 'https://github.com/itsmesyaam',
    linkedin: 'syamsuresh',
    linkedinUrl: 'https://linkedin.com/in/syamsuresh',
    email: 'syam18official@gmail.com',
    phone: '+91 8301846170',
  },
  executivePositioning:
    'Results-driven Technical Project Manager and Systems Architect with 4+ years of experience leading cross-functional engineering teams across AI pipelines, scalable web platforms, and health-tech systems. Bridges deep engineering competency (Full-Stack Architecture, Python, React, SQL, Cloud CI/CD) with structured Agile delivery, developer-ready specifications (BRD/PRD), and executive stakeholder alignment. Proven track record of accelerating release velocity by up to 40% and deploying enterprise-grade platforms compliant with global security and data privacy standards.',
};

export const SECTOR_WAYPOINTS: SectorWaypoint[] = [
  {
    id: '01-hq',
    sectorNum: '01',
    name: 'HEADQUARTERS',
    tagline: 'Executive Command & Telemetry',
    coordinates: { x: 0, y: 15, z: 25 },
  },
  {
    id: '02-arsenal',
    sectorNum: '02',
    name: 'THE ARSENAL',
    tagline: 'Core Tech & Weapons Stash',
    coordinates: { x: -12, y: 8, z: 10 },
  },
  {
    id: '03-heists',
    sectorNum: '03',
    name: 'HEISTS / OPS',
    tagline: 'High-Impact Production Missions',
    coordinates: { x: 14, y: 12, z: -5 },
  },
  {
    id: '04-track-record',
    sectorNum: '04',
    name: 'TRACK RECORD',
    tagline: 'Delivery History & Impact Dossier',
    coordinates: { x: -8, y: 5, z: -20 },
  },
  {
    id: '05-comms',
    sectorNum: '05',
    name: 'SECURE COMMS',
    tagline: 'Encrypted Dispatch Channel',
    coordinates: { x: 0, y: 2, z: -35 },
  },
];

export const PLAYER_STATS: PlayerStats = {
  experienceYears: '4+ YEARS',
  releaseVelocityBoost: '+40% ACCELERATION',
  sprintCompression: '30% COMPRESSION',
  organicGrowth: '+45% ORGANIC REACH',
  concurrency: '1M+ CONCURRENCY',
  transactionReliability: '99.95% RELIABILITY',
};

export const MISSION_DOSSIERS: MissionDossier[] = [
  {
    id: 'ai-consult',
    code: 'MISSION 01',
    title: 'AI-Powered Real-Time Consultation Platform',
    roleBadge: 'Lead Architect & Project Lead',
    classification: 'TOP SECRET // AI PIPELINE',
    architectureTags: ['Django', 'React', 'Flutter', 'LangChain', 'RAG', 'Vector Search'],
    primaryMetrics: [
      { label: 'System Concurrency', value: '1M+ Active Users', trend: '+Peak Load Hardened' },
      { label: 'LLM Query Latency', value: '-35%', trend: 'Aggressive Token Cache' },
      { label: 'Inference Cost', value: '-28% OpEx', trend: 'Semantic Caching' },
    ],
    briefing:
      'Engineered and managed end-to-end delivery of an AI consultation engine built for 1M+ user concurrency using Django, React, Flutter, and LangChain/RAG retrieval pipelines. Implemented aggressive token-caching and vector search optimizations, cutting per-query LLM latency by 35% and inference operational costs by 28%.',
    architecturalDelivery: [
      'Designed high-throughput RAG retrieval pipeline with semantic chunking and Redis vector caching',
      'Orchestrated multi-platform sync between Flutter mobile clients and React web dashboards',
      'Implemented automated prompt evaluation benchmarks and token consumption monitors',
      'Built fallback fallback circuit breakers ensuring 99.99% consultation service uptime',
    ],
    stack: ['Python', 'Django', 'LangChain', 'OpenAI API', 'Vector DB', 'Redis', 'React', 'Flutter'],
    status: 'OPERATIONAL',
  },
  {
    id: 'health-core',
    code: 'MISSION 02',
    title: 'Enterprise Doctor Booking & Healthcare Platform',
    roleBadge: 'Systems Analyst & Product Lead',
    classification: 'RESTRICTED // HEALTH-TECH',
    architectureTags: ['HIPAA Compliant', 'DPDP Ready', 'RBAC Policies', 'Encrypted Telehealth', 'WebRTC'],
    primaryMetrics: [
      { label: 'Ecosystem Actors', value: '3-Sided Platform', trend: 'Patients, Doctors, Admins' },
      { label: 'Compliance Level', value: '100% HIPAA/DPDP', trend: 'Audit Verified' },
      { label: 'Consultation Friction', value: '-42%', trend: 'Zero Latency Booking' },
    ],
    briefing:
      'Managed a three-sided digital health platform connecting patients, clinicians, and hospital administrators. Authored full technical documentation covering HIPAA/DPDP privacy workflows, RBAC access policies, and encrypted telehealth data pipelines.',
    architecturalDelivery: [
      'Authored 250+ page technical specification covering role-based access control (RBAC) schemas',
      'Architected end-to-end encrypted WebRTC video consultation streams with zero data leaks',
      'Structured audit log trails for electronic health record (EHR) interactions compliant with global laws',
      'Streamlined doctor scheduling algorithms cutting booking drop-offs by 42%',
    ],
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'WebRTC', 'Supabase Auth', 'Docker', 'AWS'],
    status: 'COMPLETED',
  },
  {
    id: 'ecom-scale',
    code: 'MISSION 03',
    title: 'Scalable E-Commerce Ecosystem',
    roleBadge: 'Technical Delivery Manager',
    classification: 'MISSION CRITICAL // FINTECH',
    architectureTags: ['Razorpay Gateway', 'Supabase RLS', 'Google Authenticator MFA', 'Realtime Sync'],
    primaryMetrics: [
      { label: 'Transaction Uptime', value: '99.95%', trend: 'Zero Payment Drops' },
      { label: 'Checkout Latency', value: '<800ms', trend: 'Edge Cached' },
      { label: 'Inventory Integrity', value: '100%', trend: 'Distributed Locks' },
    ],
    briefing:
      'Directed end-to-end sprint execution, Razorpay payment gateway integration, and inventory synchronization achieving 99.95% transaction reliability. Implemented Google Authenticator MFA and Supabase row-level security (RLS) policies.',
    architecturalDelivery: [
      'Implemented transactional idempotency keys across Razorpay webhooks to prevent duplicate charges',
      'Enforced hardened Row Level Security (RLS) policies protecting customer financial records',
      'Configured multi-factor authentication (MFA) via TOTP / Google Authenticator protocols',
      'Built distributed inventory lock mechanism resolving high-concurrency flash sale race conditions',
    ],
    stack: ['React', 'Node.js', 'Supabase RLS', 'Razorpay SDK', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    status: 'DEPLOYED',
  },
  {
    id: 'astrologerin',
    code: 'MISSION 04',
    title: 'Astrologerin: Planetary Calculations & Geocoding Mobile App',
    roleBadge: 'Product & Delivery Lead',
    classification: 'SPECIAL OPERATION // EPHEMERIS',
    architectureTags: ['Ephemeris Engine', 'Orbital Visualizer', 'Reverse Geocoding', 'Offline Cache'],
    primaryMetrics: [
      { label: 'Ephemeris Accuracy', value: 'Sub-Arcsecond', trend: 'Mathematical Precision' },
      { label: 'Geocoding Latency', value: '<120ms', trend: 'Edge Spatial Indexing' },
      { label: 'Offline Usability', value: '100%', trend: 'Local SQLite Cache' },
    ],
    briefing:
      'Managed mobile application delivery featuring custom ephemeris calculation engines, interactive orbital visualizers, low-latency reverse geocoding microservices, and offline data caching strategies for fluid rendering.',
    architecturalDelivery: [
      'Supervised integration of Swiss Ephemeris astronomical calculation core for precise coordinate mapping',
      'Engineered localized offline caching system permitting full planetary charts without internet connectivity',
      'Architected microservice-based reverse geocoding cluster caching global latitude/longitude pairs',
      'Optimized 60fps mobile UI rendering with hardware-accelerated canvas components',
    ],
    stack: ['Flutter', 'Python', 'FastAPI', 'SQLite', 'C/C++ Astrodynamics Engine', 'Redis'],
    status: 'COMPLETED',
  },
];

export const THE_ARSENAL: CompetencyGroup[] = [
  {
    id: 'delivery',
    title: 'DELIVERY & METHODOLOGIES',
    subtitle: 'High-Velocity Agile Squad Leadership & Governance',
    skills: [
      {
        name: 'Technical Project Management (TPM)',
        proficiencyStars: 5,
        architecturalCapability: 'Cross-functional engineering leadership, roadmapping, critical path alignment',
        tags: ['Scrum', 'Kanban', 'Sprint Planning', 'Velocity Tracking'],
      },
      {
        name: 'PRD & BRD Technical Authoring',
        proficiencyStars: 5,
        architecturalCapability: 'Developer-ready specs, API contracts, entity-relationship diagrams, edge-case coverage',
        tags: ['BRD', 'PRD', 'FRD', 'System Architecture'],
      },
      {
        name: 'Scope, Risk & GTM Management',
        proficiencyStars: 5,
        architecturalCapability: 'Prevented post-kickoff scope bloat by 25%; coordinated synchronized Go-To-Market releases',
        tags: ['GTM Strategy', 'Risk Mitigation', 'UAT', 'Jira/Linear'],
      },
    ],
  },
  {
    id: 'architecture',
    title: 'ARCHITECTURE & SECURITY',
    subtitle: 'Resilient Microservices, RLS & Compliance Hardening',
    skills: [
      {
        name: 'RESTful API & Microservices',
        proficiencyStars: 5,
        architecturalCapability: 'High-throughput contract design, distributed service meshes, idempotent webhook patterns',
        tags: ['Microservices', 'API Gateway', 'REST', 'GraphQL'],
      },
      {
        name: 'Database Architecture & Security',
        proficiencyStars: 5,
        architecturalCapability: 'Supabase/PostgreSQL schema modeling, Row-Level Security (RLS), ACID data migration pipelines',
        tags: ['PostgreSQL', 'Supabase RLS', 'Firebase', 'Data Integrity'],
      },
      {
        name: 'Auth, Compliance & Payments',
        proficiencyStars: 5,
        architecturalCapability: 'DPDP & HIPAA readiness, OAuth2/Auth0, MFA, Razorpay/Stripe enterprise integration',
        tags: ['HIPAA', 'DPDP Act', 'Auth0', 'Razorpay', 'Stripe'],
      },
    ],
  },
  {
    id: 'ai-velocity',
    title: 'AI & DEVELOPER VELOCITY',
    subtitle: 'Next-Gen Orchestration & Automated CI/CD Pipelines',
    skills: [
      {
        name: 'AI Pipeline Orchestration',
        proficiencyStars: 5,
        architecturalCapability: 'LangChain pipelines, Retrieval-Augmented Generation (RAG), vector indexing, latency tuning',
        tags: ['LangChain', 'RAG', 'Vector Search', 'Token Caching'],
      },
      {
        name: 'Modern Dev Tooling & Workflow',
        proficiencyStars: 5,
        architecturalCapability: 'AI-assisted dev cycles (Cursor), n8n workflow automations, Docker containerization',
        tags: ['Cursor', 'n8n', 'Docker', 'Vercel Edge'],
      },
      {
        name: 'Automated CI/CD Workflows',
        proficiencyStars: 5,
        architecturalCapability: 'Zero-downtime canary deployments, GitHub Actions pipelines, sub-second web vitals optimization',
        tags: ['GitHub Actions', 'Vercel', 'Core Web Vitals', 'Testing Suites'],
      },
    ],
  },
  {
    id: 'analytics',
    title: 'ANALYTICS & BUSINESS INTELLIGENCE',
    subtitle: 'Data Modeling, EDA & Executive Reporting Dashboards',
    skills: [
      {
        name: 'Python Data Science (Pandas/NumPy)',
        proficiencyStars: 5,
        architecturalCapability: 'Exploratory data analysis across 500K+ transactional records, statistical profiling',
        tags: ['Python', 'Pandas', 'NumPy', 'EDA'],
      },
      {
        name: 'Advanced SQL Query Architecture',
        proficiencyStars: 5,
        architecturalCapability: 'Complex window functions, CTEs, query plan optimization, indexing strategies',
        tags: ['Window Functions', 'Query Optimization', 'ETL', 'PostgreSQL'],
      },
      {
        name: 'Executive BI (Power BI & Tableau)',
        proficiencyStars: 5,
        architecturalCapability: 'Built 8+ real-time enterprise dashboards saving 15 hours weekly executive overhead',
        tags: ['Power BI', 'Tableau', 'DAX', 'Metric Modeling'],
      },
    ],
  },
];

export const CAREER_RECORD: CareerMilestone[] = [
  {
    id: 'lead-tpm',
    period: 'July 2025 – Present',
    domainFocus: 'Enterprise Web & Mobile Delivery',
    employerName: 'Bell & Ring Tech',
    formalRole: 'Technical Project Manager',
    squadSize: '12+ Developers & UI/UX Engineers',
    clientEcosystem: 'B-RAM Nirman Pvt. Ltd. & RAM’s Homes',
    coreImpactDeliverables: [
      'Led 12+ developers and UI/UX designers across rapid 2-week agile sprints deploying enterprise React, TypeScript, and Python platforms',
      'Compressed sprint delivery cycles by 30% through automated CI/CD and developer-ready PRD specifications',
      'Boosted client platform organic reach by 45% by architecting sub-second Core Web Vitals load times',
      'Directed multi-tenant enterprise software initiatives for B-RAM Nirman Pvt. Ltd. and RAM’s Homes with 100% on-time milestone governance',
    ],
    telemetryMetrics: ['12+ Eng Squad', '30% Faster Sprints', '+45% Organic Reach', '<1s Web Vitals'],
  },
  {
    id: 'pm-synapzy',
    period: 'Dec 2024 – Dec 2025',
    domainFocus: 'Zero-to-One MVP Engineering within 90-Day Cycles',
    employerName: 'Synapzy',
    formalRole: 'Project Manager (Co-Founder Track)',
    squadSize: 'Cross-functional founding engineering team',
    clientEcosystem: 'Proprietary B2B SaaS Ecosystem',
    coreImpactDeliverables: [
      'Co-founded and steered zero-to-one technical product roadmap from architectural ideation to high-adoption market launch',
      'Delivered fully functional production MVPs within aggressive 90-day cycles with 100% on-time milestone delivery',
      'Spearheaded custom enterprise API schemas, data pipeline modeling, and robust developer testing suites',
      'Managed stakeholder communications, risk mitigation registers, and GTM release ceremonies',
    ],
    telemetryMetrics: ['90-Day MVP Ship', '100% On-Time Milestones', 'Custom API Schemas', 'Zero Scope Bloat'],
  },
  {
    id: 'ba-sbs',
    period: 'Nov 2022 – Dec 2024',
    domainFocus: 'Systems Analysis & 20+ BRD/FRD Architecture',
    employerName: 'SBS Technologies',
    formalRole: 'Business Analyst / Technical Systems Analyst',
    squadSize: 'Engineering squads & executive leadership',
    clientEcosystem: 'Enterprise Banking & Healthcare Clients',
    coreImpactDeliverables: [
      'Authored 20+ comprehensive BRDs, FRDs, and user story catalogs cutting post-kickoff scope alterations by 25%',
      'Bridged C-suite executives and core engineering teams via structured Jira backlogs, sprint grooming, and UAT signoffs',
      'Maintained 99.9% SQL data migration integrity across high-volume relational schemas during legacy database overhauls',
      'Executed user acceptance testing (UAT) test protocols across 50+ enterprise production releases',
    ],
    telemetryMetrics: ['20+ BRD/FRD Specs', '-25% Scope Creep', '99.9% Migration Integrity', '50+ Releases'],
  },
  {
    id: 'bi-nikolas',
    period: 'Jun 2022 – Nov 2022',
    domainFocus: 'High-Volume 500K+ Record Data & BI Analytics',
    employerName: 'Nikolas Tesla Technologies',
    formalRole: 'Data & BI Analyst',
    squadSize: 'Data intelligence unit',
    clientEcosystem: 'Large-scale retail & e-commerce transactions',
    coreImpactDeliverables: [
      'Executed exploratory data analysis (EDA) using Python (Pandas, NumPy) and SQL across 500K+ transactional records',
      'Constructed 8+ real-time Power BI and Tableau dashboards tracking revenue run-rate, conversion funnels, and churn',
      'Saved 15 hours of weekly executive reporting overhead through automated scheduled ETL queries and dashboard refresh pipelines',
      'Presented data-driven KPI projections to senior leadership, pinpointing inventory bottlenecks',
    ],
    telemetryMetrics: ['500K+ Records', '8+ BI Dashboards', '15 hrs Saved/Week', 'Automated ETL'],
  },
];

export const CLEARANCE_CREDENTIALS: ClearanceItem[] = [
  {
    id: 'edu-btech',
    category: 'EDUCATION',
    title: 'B.Tech in Computer Science & Engineering',
    issuer: 'Mahaguru Institute of Technology (APJ Abdul Kalam Technological University)',
    validity: 'Class of 2018 – 2022',
    clearanceLevel: 'LEVEL 5 // DEGREE CONFERRED',
    verificationBadge: 'VERIFIED ACADEMIC CREDENTIAL',
  },
  {
    id: 'cert-claude',
    category: 'CERTIFICATION',
    title: 'Anthropic Claude Certified Architect Foundations (CCAR-F)',
    issuer: 'Anthropic Certification Program (Cert Prep)',
    validity: 'Current Active',
    clearanceLevel: 'LEVEL 5 // AI ARCHITECTURE',
    verificationBadge: 'PROMPT & AGENT ARCHITECTURE',
  },
  {
    id: 'cert-redhat',
    category: 'CERTIFICATION',
    title: 'Red Hat Certified Specialist in Seam',
    issuer: 'Red Hat Enterprise Linux Ecosystem',
    validity: 'Certified Technical Specialist',
    clearanceLevel: 'LEVEL 4 // ENTERPRISE SYSTEMS',
    verificationBadge: 'INFRASTRUCTURE SPECIALIST',
  },
  {
    id: 'cert-bi',
    category: 'CERTIFICATION',
    title: 'Data Visualization with Power BI & Tableau Software',
    issuer: 'Professional BI Institute',
    validity: 'Certified Specialist',
    clearanceLevel: 'LEVEL 4 // EXECUTIVE TELEMETRY',
    verificationBadge: 'ANALYTICS & METRIC MODELING',
  },
  {
    id: 'cert-sql-python',
    category: 'CERTIFICATION',
    title: 'Advanced SQL & Python for Data Science',
    issuer: 'Data Science & Database Architecture Guild',
    validity: 'Certified Specialist',
    clearanceLevel: 'LEVEL 5 // DATA PIPELINES',
    verificationBadge: 'ALGORITHMS & OPTIMIZATION',
  },
  {
    id: 'cert-cloud-sec',
    category: 'CERTIFICATION',
    title: 'System Security & Compliant Cloud Architecture',
    issuer: 'Cloud & Regulatory Security Program',
    validity: 'HIPAA & DPDP Compliance Readiness',
    clearanceLevel: 'LEVEL 5 // SECURITY CLEARANCE',
    verificationBadge: 'THREAT MODELING & COMPLIANCE',
  },
];
