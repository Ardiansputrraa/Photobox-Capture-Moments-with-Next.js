import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — generates a fully static site in the `out/` directory.
   * This is compatible with Netlify, GitHub Pages, and any CDN host without
   * needing a Node.js server.
   *
   * All pages in this app are client-side only (no server data fetching),
   * so static export works perfectly.
   */
  output: "export",

  /**
   * Adds trailing slashes so /photobox → /photobox/index.html.
   * Required for correct routing on static hosts.
   */
  trailingSlash: true,
};

export default nextConfig;
