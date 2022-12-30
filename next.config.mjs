/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

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
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    // remarkMdxCodeMeta = https://github.com/remcohaszing/remark-mdx-code-meta
    // remarkGfm = https://github.com/remarkjs/remark-gfm
    remarkPlugins: [/*remarkMdxCodeMeta,*/ remarkGfm], // require("remark-prism") = code syntax highlighting via Prism
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
