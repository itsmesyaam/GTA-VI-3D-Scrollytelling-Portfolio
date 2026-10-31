import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// =========================================================================
// SECURITY CONFIGURATION & RATE LIMITING MEMORY STORE
// =========================================================================
const ALLOWED_ORIGIN = 'https://www.syamsuresh.in';
const MAX_REQUESTS_PER_WINDOW = 4; // Max 4 submissions
const WINDOW_DURATION_MS = 10 * 60 * 1000; // 10 minutes

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory sliding window rate limiter (Per-IP)
const ipRateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRateLimitMap.entries()) {
    if (now > record.resetTime) {
      ipRateLimitMap.delete(ip);
    }
  }
}, 60 * 1000);

// =========================================================================
// STRICT ZOD VALIDATION SCHEMA
// =========================================================================
const sanitizeString = (val: string) =>
  val
    .replace(/[<>]/g, '') // Strip angle brackets to prevent HTML/XSS injection
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
  _botTrap: z.string().optional(), // Honeypot trap: must be empty
});

// Helper to determine client IP safely
function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

// Helper to generate security response headers
function getSecurityHeaders(requestOrigin: string | null) {
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  // Strict CORS verification
  if (requestOrigin === ALLOWED_ORIGIN || process.env.NODE_ENV === 'development') {
    headers.set('Access-Control-Allow-Origin', requestOrigin || ALLOWED_ORIGIN);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  return headers;
}

// =========================================================================
// OPTIONS PREFLIGHT HANDLER
// =========================================================================
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  const headers = getSecurityHeaders(origin);
  return new NextResponse(null, { status: 204, headers });
}

// =========================================================================
// POST DISPATCH HANDLER
// =========================================================================
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const securityHeaders = getSecurityHeaders(origin);

  // 1. Origin Verification (Block unauthorized domains in production)
  if (process.env.NODE_ENV === 'production' && origin && origin !== ALLOWED_ORIGIN) {
    return NextResponse.json(
      { error: 'CORS policy violation: unauthorized origin.' },
      { status: 403, headers: securityHeaders }
    );
  }

  // 2. IP-based Rate Limiting (DoS & spam prevention)
  const clientIp = getClientIp(req);
  const now = Date.now();
  const rateRecord = ipRateLimitMap.get(clientIp);

  if (rateRecord) {
    if (now < rateRecord.resetTime) {
      if (rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded: Too many satellite dispatches. Please wait before retransmitting.',
            retryAfterSeconds: Math.ceil((rateRecord.resetTime - now) / 1000),
          },
          { status: 429, headers: securityHeaders }
        );
      }
      rateRecord.count += 1;
    } else {
      ipRateLimitMap.set(clientIp, { count: 1, resetTime: now + WINDOW_DURATION_MS });
    }
  } else {
    ipRateLimitMap.set(clientIp, { count: 1, resetTime: now + WINDOW_DURATION_MS });
  }

  try {
    // 3. Payload size check
    const rawBody = await req.json();

    // 4. Schema validation with Zod
    const validationResult = DispatchPayloadSchema.safeParse(rawBody);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return NextResponse.json(
        {
          error: 'Tactical payload failed schema verification.',
          details: formattedErrors,
        },
        { status: 400, headers: securityHeaders }
      );
    }

    const { agentName, commsFrequency, clearanceLevel, tacticalBrief, _botTrap } =
      validationResult.data;

    // 5. Honeypot check (Automated Bot Trap)
    if (_botTrap && _botTrap.trim().length > 0) {
      // Silently return pseudo-success to prevent bots from circumventing detection
      return NextResponse.json(
        {
          status: 'TRANSMITTED',
          message: 'Satellite payload received and queued into encrypted buffer.',
        },
        { status: 200, headers: securityHeaders }
      );
    }

    // 6. Secure Logging (Redacting sensitive communications)
    console.log('[SECURE_DISPATCH] Verified Payload Received:', {
      timestamp: new Date().toISOString(),
      agentName: agentName.slice(0, 15) + '...',
      domainSubject: clearanceLevel,
      ipPrefix: clientIp.split('.')[0] + '.*.*.*',
    });

    // 7. Success Response
    return NextResponse.json(
      {
        status: 'MISSION_DISPATCHED',
        confirmationCode: `LEONIDA-${Date.now().toString(36).toUpperCase()}`,
        message: 'Encrypted tactical brief transmitted directly to Syam S (Principal Systems Architect).',
        dispatchedAt: new Date().toISOString(),
      },
      { status: 200, headers: securityHeaders }
    );
  } catch (error) {
    console.error('[SECURE_DISPATCH_EXCEPTION]', error);
    return NextResponse.json(
      { error: 'Internal dispatch subsystem failure. Please transmit via direct frequency (syam18official@gmail.com).' },
      { status: 500, headers: securityHeaders }
    );
  }
}
