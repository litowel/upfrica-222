import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">FlowPay</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium hover:text-black/60 transition-colors">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Now Live: Automatic USDC Settlements
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
          Accept Fiat. <br />
          <span className="text-black/40">Settle in USDC.</span>
        </h1>
        <p className="text-xl text-black/60 mb-12 max-w-2xl">
          The bridge between African commerce and global liquidity. Accept NGN, GHS, and more, and get settled instantly in USDC.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-black/80 transition-all flex items-center gap-2 group"
          >
            Start Accepting Payments
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="bg-white border border-black/10 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-black/5 transition-all"
          >
            View Documentation
          </Link>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="px-6 py-24 bg-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Settlement</h3>
            <p className="text-black/60">
              No more waiting for cross-border wire transfers. Receive your funds in USDC on any EVM-compatible chain.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Safe Custody</h3>
            <p className="text-black/60">
              Integrated with Safe (Gnosis Safe) for multi-sig custody. Your assets are secured by the industry standard.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
              <Wallet className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Paystack Powered</h3>
            <p className="text-black/60">
              Seamlessly accept payments via cards, bank transfers, and mobile money with our Paystack integration.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-black/5 text-center text-sm text-black/40">
        &copy; 2026 Upfrica FlowPay. A product of Upfrica. All rights reserved.
      </footer>
    </div>
  );
}
