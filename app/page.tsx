import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center relative min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
      <div className="hero-glow"></div>
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">
            Clouva: Your Secure Cloud Wallet Solution
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Experience the future of digital asset management with Clouva.
          <br />
          Seamlessly transfer, store, and manage your assets with top-notch security and user-friendly design.
        </p>
        <Link href="/register">
          <Button className="btn-primary text-md px-8 py-4 rounded-xl">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
