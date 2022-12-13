import "./globals.css";
import Analytics from "./analytics";
import { Theme } from "./components/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Theme />
        <div id="app">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
