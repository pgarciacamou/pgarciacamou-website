/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm"; // vs https://github.com/PaulieScanlon/mdx-embed ?

// Allows adding YAML to the top of an MDX file.
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkHoistFrontmatter from "./unified/plugins/remark-hoist-frontmatter.mjs";
import remarkUnwrapTexts from "remark-unwrap-texts";
import remarkDefaultExport from "./unified/plugins/remark-default-export.mjs";

// Adds estimated reading time to your markdown files using reading-time.
import remarkReadingTime from "remark-reading-time";

// Allows adding highlight + title + line numbers, and more.
// See: https://rehype-pretty-code.netlify.app/
import rehypePrettyCode from "rehype-pretty-code";

// These two dependencies are needed to add links to headings.
import rehypeSlug from "rehype-slug"; // adds ids
import rehypeAutolinkHeadings from "rehype-autolink-headings"; // adds links

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
  // VERCEL_ENV is a system environment variable defined by Vercel while building and running your applications for specific environments (preview and production). To be able to reference it client-side in a Next.js application, you need to add `env`.
  // You can have a constants.js file:
  // export const IS_PRODUCTION = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production";
  // {IS_PRODUCTION && <SomeComponent />}
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    // remarkMdxCodeMeta = https://github.com/remcohaszing/remark-mdx-code-meta
    // remarkGfm = https://github.com/remarkjs/remark-gfm
    remarkPlugins: [
      remarkFrontmatter,
      remarkParseFrontmatter,
      remarkUnwrapTexts,
      remarkReadingTime,
      [remarkDefaultExport, { path: "../../app/components/blog.layout" }],
      remarkGfm,
    ],
    // If you need to create your own plugins, look at: https://github.com/mskelton/mskelton.dev/blob/4b79a701d2e8d980e0065c92366d4541a2477a3a/config/rehype-code-titles.mjs
    rehypePlugins: [
      [
        // https://rehype-pretty-code.netlify.app/
        rehypePrettyCode,
        {
          // Themes:
          // - https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
          // - https://vscodethemes.com/
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          // Feel free to add classNames that suit your docs
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word", "word--highlighted"];
          },
        },
      ],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
