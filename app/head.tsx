import { isProduction } from "./utils/env";

type THead = {
  url?: string;
  canonicalUrl: string;
};

export default function RootHead({ canonicalUrl, url = canonicalUrl }: THead) {
  return (
    <>
      <title>Pablo Garcia</title>
      <meta name="description" content="Software Engineer." />
      <meta name="generator" content="https://nextjs.org/" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      {/* Open Graph */}
      <meta property="og:title" content="Pablo Garcia" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="/images/pgarciacamou-card.jpg" />
      <meta property="og:description" content="Software Engineer." />
      <meta property="og:site_name" content="Pablo Garcia" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pgarciacamou" />
      <meta name="twitter:site:id" content="177402166" />
      <meta name="twitter:title" content="Pablo Garcia" />
      <meta name="twitter:description" content="Software Engineer." />
      <meta name="twitter:creator" content="@pgarciacamou" />
      <meta name="twitter:creator:id" content="177402166" />
      <meta name="twitter:image:src" content="/images/pgarciacamou-card.jpg" />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#4ec9b0"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#181818" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#181818" />
      <meta name="color-scheme" content="dark light" />

      {/* Crawlers / Robots */}
      <link
        rel="canonicalUrl"
        href={canonicalUrl || "https://pgarciacamou.dev/"}
      />
      <meta name="robots" content={isProduction() ? "all" : "none"} />
    </>
  );
}
