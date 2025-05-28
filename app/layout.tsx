import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clouva",
  description: " Clouva 🔒☁️ — Lightweight Solana wallet in the cloud. Fast login, smooth transfers, and secure storage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
