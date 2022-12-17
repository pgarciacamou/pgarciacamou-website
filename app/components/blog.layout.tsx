/**
 * @NOTE
 * This file uses MDX (markdown + jsx): https://nextjs.org/docs/advanced-features/using-mdx.
 * Specifically, we can use layouts by exporting a default component: https://nextjs.org/docs/advanced-features/using-mdx#layouts.
 * Read more: https://nextjs.org/blog/markdown
 */
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import { ElementType, isValidElement, ReactNode } from "react";
import { Theme } from "../../app/components/theme";
import "../globals.css";
import "./blog.css";

type TBlogPostLayout = {
  author: string;
  date: Date;
  edited: Date;
  title: string;
  description: string;
  keywords: string;
  children: ReactNode;
};

type TBlogPostDate = {
  date: Date;
  children: ReactNode;
};

function BlogPostDate({ date, children }: TBlogPostDate) {
  if (!date) return null;
  return (
    <>
      {children}{" "}
      <time dateTime={date.toISOString()}>{date.toDateString()}</time>
    </>
  );
}

/**
 * Extracts the text content from a ReactNode
 */
export function getNodeText(node: ReactNode): string {
  if (!node) return "";
  if (["string", "number"].includes(typeof node)) return `${node}`;
  if (Array.isArray(node)) {
    return node.map((n: ReactNode) => getNodeText(n)).join("");
  }
  if (isValidElement(node) && typeof node === "object") {
    return getNodeText(node.props.children);
  }
  return "";
}

/**
 * When 'hasAnchor' is true, Heading extracts the text content from the children
 * and uses it as an id for the heading element and wraps the children with an
 * anchor.
 */
export type THeading = {
  as: ElementType;
  children: ReactNode;
  hasAnchor?: boolean;
};
export function Heading({ as: Tag, children, hasAnchor = true }: THeading) {
  const id = getNodeText(children)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s/g, "-");
  return (
    <Tag id={id}>
      {hasAnchor ? (
        <a href={`#${id}`} className="anchor-link">
          <span>{children}</span>
        </a>
      ) : (
        children
      )}
    </Tag>
  );
}

/**
 * Using MDXProvider, we can replace components parsed by MDX:
 * https://nextjs.org/docs/advanced-features/using-mdx#custom-elements
 */
type TComp = { children?: ReactNode };
const components = {
  h1: ({ children }: TComp) => <Heading as="h1" children={children} />,
  h2: ({ children }: TComp) => <Heading as="h2" children={children} />,
  h3: ({ children }: TComp) => <Heading as="h3" children={children} />,
  h4: ({ children }: TComp) => <Heading as="h4" children={children} />,
  h5: ({ children }: TComp) => <Heading as="h5" children={children} />,
  h6: ({ children }: TComp) => <Heading as="h6" children={children} />,
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
}: TBlogPostLayout) {
  return (
    <MDXProvider components={components}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <link rel="canonical" href="https://pgarciacamou.dev/posts/testing" />
        <title>{title}</title>
      </Head>
      <Theme />
      <main>
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
