import type { NextConfig } from "next";

// This app lives in the `level-2/` folder of the Level 1 repo.
// Pin the project root here so Next.js doesn't treat the parent (Level 1) folder,
// which has its own package-lock.json, as the workspace root.
const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
