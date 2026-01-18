import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Word Search",
  description: "A Game to find words hidden within a word matrix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
