/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // app/ directory
  },
  /**
   * These apply to both pages/ and app/ directories, but MDX currently doesn't
   * work with app/ directory.
   */
  pageExtensions: [
    "js",
    "ts",
    "jsx",
    "tsx",
    "mdx" /* render MDX files inside `pages/` */,
  ],
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // code syntax highlighting via Prism
    // remarkPlugins: [require("remark-prism")],
  },
});

module.exports = withMDX(nextConfig);
