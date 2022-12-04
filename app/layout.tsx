import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      {/* <!-- Vercel Analytics - https://vercel.com/docs/concepts/analytics/audiences/quickstart --> */}
      <Analytics />
      {/* <!-- Global tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-M0RXHWHRXM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M0RXHWHRXM');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
