import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
  title: "Clouva",
  description: "Clouva 🔒☁️ — Lightweight Solana wallet in the cloud. Fast login, smooth transfers, and secure storage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex-grow pt-16">
          <Toaster />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
