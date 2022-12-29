/** @type {import('next').NextConfig} */
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    // remarkMdxCodeMeta = https://github.com/remcohaszing/remark-mdx-code-meta
    // remarkGfm = https://github.com/remarkjs/remark-gfm
    remarkPlugins: [remarkMdxCodeMeta, remarkGfm], // require("remark-prism") = code syntax highlighting via Prism
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
