import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HelpDesk AI | Support workspace",
  description: "A development foundation for grounded, trustworthy customer support.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
