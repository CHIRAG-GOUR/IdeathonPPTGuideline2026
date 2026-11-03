import type { NextConfig } from "next";

// This app lives in the `level-2/` folder of the Level 1 repo.
// Use this config file's own folder as the root (not process.cwd(), which is the
// repo root when Vercel evaluates the config).
const projectRoot = __dirname;

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
