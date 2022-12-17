import "../../app/globals.css";
import "./posts.css";
import type { ReactNode } from "react";
import Head from "next/head";
import { Theme } from "../../app/components/theme";

type TBlogPostHeader = {
  author: string;
  date: Date;
  edited: Date;
  description: string;
  keywords: string;
};

type TBlogDate = {
  date: Date;
  children: ReactNode;
};

function BlogDate({ date, children }: TBlogDate) {
  if (!date) return null;
  return (
    <>
      {children}{" "}
      <time dateTime={date.toISOString()}>{date.toDateString()}</time>
    </>
  );
}

export function BlogPostHeader({
  author,
  date,
  edited,
  description,
  keywords,
}: TBlogPostHeader) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <link rel="canonical" href="https://pgarciacamou.dev/posts/testing" />
        <title>Next.js Pure CSS dark mode switch.</title>
      </Head>
      <Theme />
      <header>
        <p>
          Author: {author}
          <br />
          <BlogDate date={date}>Created at: </BlogDate>
          <br />
          <BlogDate date={edited}>Edited on: </BlogDate>
        </p>
      </header>
    </>
  );
}
