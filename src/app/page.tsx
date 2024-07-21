import PublicCompaniesHoldings from "@/components/PublicCompaniesHoldings";
import Header from "@/components/Header";
import GlobalChart from "@/components/GlobalChart";
import { Bitcoin, TrendingUp, DollarSign, Zap } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="sm:w-1/2 mb-2 md:mb-0 w-full flex flex-col justify-start h-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-primary">
              CRYPTONITE:{" "}
              <span className="text-[#82CA9D]">Your Crypto Superpower</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Track, analyze, and conquer the crypto market with ease!
            </p>
            <div className="flex space-x-4">
              <Link href={`/coins/trending`}>
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <GlobalChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            icon={<Bitcoin className="w-8 h-8 text-primary" />}
            title="Real-time Tracking"
            description="Monitor your favorite cryptocurrencies with live updates"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-accent" />}
            title="Advanced Analytics"
            description="Gain insights with powerful charts and analysis tools"
          />
          <FeatureCard
            icon={<DollarSign className="w-8 h-8 text-secondary" />}
            title="Portfolio Management"
            description="Manage and optimize your crypto investments effortlessly"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-destructive" />}
            title="Instant Alerts"
            description="Stay informed with customizable price and news alerts"
          />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary">
            Public Companies Crypto Holdings
          </h2>
          <PublicCompaniesHoldings />
        </div>
      </main>

      <footer className="bg-accent py-6 text-center">
        <p className="text-accent-foreground">
          © 2024 Cryptonite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
