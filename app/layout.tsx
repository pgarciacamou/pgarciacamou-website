import "../styles/globals.css";
import Analytics from "./analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
