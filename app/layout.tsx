import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";

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
      <body className="w-full h-screen flex flex-col">
        <ConditionalHeader />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
