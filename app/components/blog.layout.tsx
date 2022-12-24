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
  ReactNode,
  useContext,
  createContext,
} from "react";
import { Theme } from "../../app/components/theme";
import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
// import "highlight.js/styles/stackoverflow-dark.css";
// import "highlight.js/styles/night-owl.css";
import "highlight.js/styles/github-dark.css";
// import "highlight.js/styles/base16/default-dark.css";
import "highlight.js/styles/base16/classic-dark.css";
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
  pre: ({ children, ...props }, more, foo) => {
    console.log({ props, more, foo });
    return <pre>{children}</pre>;
  },
  code: ({ children, className: descriptor = "", ...rest }: any, more, foo) => {
    console.log({ descriptor, rest, more, foo });
    return null;

    const isCodeBlock = children.includes("\n"); // blocks have newline characters
    if (!isCodeBlock) {
      return <code className="hljs single-line">{children}</code>;
    }

    const [className, id] = descriptor.split("#");
    const [, language = ""] = className.match(/language-(.*)/) || [];
    const { codeBlocks }: any = useContext(BlogContext);
    const { title } = codeBlocks[id] || {};

    const __html = language
      ? hljs.highlight(children, { language }).value
      : hljs.highlightAuto(children).value;

    return (
      <>
        {title && (
          <code className="hljs" style={{ backgroundColor: "black" }}>
            {title}
          </code>
        )}
        <code
          className={`hljs ${className}`}
          dangerouslySetInnerHTML={{ __html }}
        />
      </>
    );
  },
};

/**
 * MDX layouts: https://nextjs.org/docs/advanced-features/using-mdx#layouts
 */
const BlogContext = createContext(null);
export function BlogPostLayout({
  author,
  date,
  edited,
  title,
  description,
  keywords,
  children,
  canonicalUrl,
  codeBlocks,
}: TBlogPostLayout) {
  return (
    <MDXProvider components={components}>
      <BlogContext.Provider
        value={{
          author,
          date,
          edited,
          title,
          description,
          keywords,
          children,
          canonicalUrl,
          codeBlocks,
        }}
      >
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
      </BlogContext.Provider>
    </MDXProvider>
  );
}
