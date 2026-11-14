
import type { NextConfig } from "next";

function getOrigin(value?: string): string | null {
  if (!value?.trim()) return null;

  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
}

const supabaseOrigin = getOrigin(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);

const gatewayOrigin = getOrigin(
  process.env.NEXT_PUBLIC_LLM_GATEWAY_URL,
);

const connectSources = [
  "'self'",
  supabaseOrigin,
  gatewayOrigin,
].filter((value): value is string => Boolean(value));

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  `connect-src ${connectSources.join(" ")}`,
  "manifest-src 'self'",
  "media-src 'self'",
].join("; ");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
