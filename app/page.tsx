"use client";
import Link from "next/link";
import { ArrowRight, Zap, Globe, BarChart3, TrendingUp, Lock } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 z-50 bg-black/90 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="text-black w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">UpFrica</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
          <div className="relative group cursor-pointer py-2">
            <span className="hover:text-white transition-colors flex items-center gap-1">
              Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
            <div className="absolute top-full left-0 w-64 bg-[#111] border border-white/10 rounded-2xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link href="/flowpay" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="text-black w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold">FlowPay</p>
                  <p className="text-[10px] text-white/40">Fiat-to-USDC Settlements</p>
                </div>
              </Link>
              <Link href="/markets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors mt-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="text-white w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-bold">Upfrica Markets</p>
                  <p className="text-[10px] text-white/40">RWA Tokenization Platform</p>
                </div>
              </Link>
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link href="/products" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center justify-between">
                  View All Products
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
          <Link href="/institutional" className="hover:text-white transition-colors">Institutional</Link>
          <Link href="/developers" className="hover:text-white transition-colors">Developers</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup" className="bg-emerald-500 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-emerald-400 transition-all">Get Started</Link>
        </div>
      </nav>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          All Systems Operational — API Status: Live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 max-w-4xl">
          The Financial Operating System for the Global Economy
        </h1>
        <p className="text-xl text-white/50 mb-10 max-w-2xl">
          Move, manage, and multiply capital across 190+ countries — with institutional-grade treasury, payments, and asset management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/signup" className="bg-emerald-500 text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-emerald-400 transition-all flex items-center gap-2">
            Start Banking
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/developers" className="border border-white/10 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/5 transition-all">
            Developer API
          </Link>
        </div>
      </main>
      <section className="px-6 py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <Globe className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Global Payments</h3>
            <p className="text-white/50">One API. Every payment method. Every currency. Every country.</p>
          </div>
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <Lock className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Treasury Management</h3>
            <p className="text-white/50">Institutional-grade custody with Safe Global multi-sig wallets.</p>
          </div>
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Asset Tokenization</h3>
            <p className="text-white/50">Tokenize real estate, private equity, and more via Thirdweb.</p>
          </div>
        </div>
      </section>
      <footer className="px-6 py-12 border-t border-white/10 text-center text-sm text-white/30">
        <p className="mb-2">© 2026 UpFrica Financial Systems. All rights reserved.</p>
        <p className="text-white/20 text-xs">Operated by Oskayi Consult Ltd, Ghana.</p>
      </footer>
    </div>
  );
}
