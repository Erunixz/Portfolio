import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,

  outputFileTracingIncludes: { "/api/resume-request": ["./private/**/*"] },

  async redirects() {
    return [
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/work/:slug", destination: "/projects/:slug", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/research", destination: "/experience", permanent: false },
      { source: "/resume", destination: "/contact", permanent: false },
      { source: "/notes/:path*", destination: "/", permanent: false },
    ]
  },
}

export default nextConfig
