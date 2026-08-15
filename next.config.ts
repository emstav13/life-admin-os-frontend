import type { NextConfig } from "next";

const isProduction =
  process.env.NODE_ENV === "production";

const securityHeaders = [
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  // Prevent the application from being embedded
  // in an iframe by another origin.
  {
    key: "X-Frame-Options",
    value: "DENY",
  },

  // Control how much referrer information
  // is sent to other origins.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  // Disable browser access to sensitive device APIs
  // that Life AiOS does not need.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=()",
  },

  // Only enable HSTS in production.
  // This forces HTTPS after deployment.
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value:
            "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // =====================================================
  // TURBOPACK
  // =====================================================
  //
  // Explicitly define the frontend as the workspace root.
  // This removes the multiple-lockfile root ambiguity.
  //
  turbopack: {
    root: process.cwd(),
  },

  // =====================================================
  // SECURITY HEADERS
  // =====================================================

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