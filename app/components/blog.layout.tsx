/**
 * @NOTE
 * This file uses MDX (markdown + jsx): https://nextjs.org/docs/advanced-features/using-mdx.
 * Specifically, we can use layouts by exporting a default component: https://nextjs.org/docs/advanced-features/using-mdx#layouts.
 * Read more: https://nextjs.org/blog/markdown
 */
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import {
  ElementType,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Theme } from "../../app/components/theme";

// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
// import "highlight.js/styles/stackoverflow-dark.css";
// import "highlight.js/styles/night-owl.css";
// import "highlight.js/styles/github-dark.css";
// import "highlight.js/styles/base16/default-dark.css";
// import "highlight.js/styles/base16/classic-dark.css";
import "../globals.css";
import "./blog.css";

type TBlogPostLayout = {
  author: string;
  date: Date;
  edited: Date;
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  codeBlocks: { [key: string]: object };
  children: ReactNode;
};

type TBlogPostDate = {
  date: Date;
  children: ReactNode;
};

function BlogPostDate({ date, children }: TBlogPostDate) {
  if (!date) return null;
  const d = new Date(`${date}T00:00:00.000-08:00`);
  return (
    <>
      {children} <time dateTime={d.toISOString()}>{d.toDateString()}</time>
    </>
  );
}

// /**
//  * Extracts the text content from a ReactNode
//  */
// export function getNodeText(node: ReactNode): string {
//   if (!node) return "";
//   if (["string", "number"].includes(typeof node)) return `${node}`;
//   if (Array.isArray(node)) {
//     return node.map((n: ReactNode) => getNodeText(n)).join("");
//   }
//   if (isValidElement(node) && typeof node === "object") {
//     return getNodeText(node.props.children);
//   }
//   return "";
// }

// /**
//  * When 'hasAnchor' is true, Heading extracts the text content from the children
//  * and uses it as an id for the heading element and wraps the children with an
//  * anchor.
//  */
// export type THeading = {
//   as: ElementType;
//   children: ReactNode;
//   hasAnchor?: boolean;
// };
// export function Heading({ as: Tag, children, hasAnchor = true }: THeading) {
//   const id = getNodeText(children)
//     .toLowerCase()
//     .replace(/[^a-z0-9 ]/g, "")
//     .replace(/\s/g, "-");
//   return (
//     <Tag id={id}>
//       {hasAnchor ? (
//         <a href={`#${id}`} className="anchor-link">
//           <span>{children}</span>
//         </a>
//       ) : (
//         children
//       )}
//     </Tag>
//   );
// }

/**
 * Using MDXProvider, we can replace components parsed by MDX:
 * https://nextjs.org/docs/advanced-features/using-mdx#custom-elements
 */
// type TComp = { children?: ReactNode };
const components = {
  // h1: ({ children }: TComp) => <Heading as="h1" children={children} />,
  // h2: ({ children }: TComp) => <Heading as="h2" children={children} />,
  // h3: ({ children }: TComp) => <Heading as="h3" children={children} />,
  // h4: ({ children }: TComp) => <Heading as="h4" children={children} />,
  // h5: ({ children }: TComp) => <Heading as="h5" children={children} />,
  // h6: ({ children }: TComp) => <Heading as="h6" children={children} />,
  // pre: ({ children, fileName }: any) => {
  //   return (
  //     <pre {...(fileName && { "data-file-name": fileName })}>{children}</pre>
  //   );
  // },
  // code: ({ children, className = "" }: any) => {
  //   const isCodeBlock = children.includes("\n"); // blocks have newline characters.
  //   if (!isCodeBlock) {
  //     return <code className="hljs single-line">{children}</code>;
  //   }
  //   const [, language = ""] = className.match(/language-(\S+)/) || [];
  //   const __html = language
  //     ? hljs.highlight(children, { language }).value
  //     : hljs.highlightAuto(children).value;
  //   return (
  //     <code
  //       className={`hljs ${className}`}
  //       dangerouslySetInnerHTML={{ __html }}
  //     />
  //   );
  // },
};

/**
 * MDX layouts: https://nextjs.org/docs/advanced-features/using-mdx#layouts
 */
export function BlogPostLayout({
  author,
  date,
  edited,
  title,
  description,
  keywords,
  children,
  canonicalUrl,
}: TBlogPostLayout) {
  return (
    <MDXProvider components={components}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <link rel="canonical" href={canonicalUrl} />
        <title>{title}</title>
      </Head>
      <Theme />
      <main>
        <br />
        <article>
          <header>
            <p>
              Author: {author}
              <br />
              <BlogPostDate date={date}>Created at: </BlogPostDate>
              <br />
              <BlogPostDate date={edited}>Edited on: </BlogPostDate>
            </p>
          </header>
          {children}
        </article>
      </main>
    </MDXProvider>
  );
}

export default function Layout(props: PropsWithChildren<TBlogPostLayout>) {
  console.log({ props });
  return ({ children }: any) => (
    <BlogPostLayout {...props} children={children} />
  );
}
