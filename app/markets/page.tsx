"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { 
  ArrowRight, 
  Shield, 
  Globe, 
  Zap, 
  BarChart3, 
  Building2, 
  Coins, 
  Lock 
} from "lucide-react";

export default function MarketsLanding() {
  return (
    <div className="relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Upfrica <span className="text-white/40">Markets</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <div className="relative group cursor-pointer py-2">
              <span className="hover:text-white transition-colors flex items-center gap-1">
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
              <div className="absolute top-full left-0 w-64 bg-[#0a0a0a] border border-white/5 rounded-2xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="text-black w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold">FlowPay</p>
                    <p className="text-[10px] text-white/40">Fiat-to-USDC Settlements</p>
                  </div>
                </Link>
                <Link href="/markets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors mt-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <BarChart3 className="text-black w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Upfrica Markets</p>
                    <p className="text-[10px] text-white/40">RWA Tokenization Platform</p>
                  </div>
                </Link>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <Link href="/productss" className="text-xs font-bold text-white hover:text-white/60 transition-colors flex items-center justify-between">
                    View All Products
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
            <Link href="#assets" className="hover:text-white transition-colors">Assets</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">Login</Link>
            <Link 
              href="/signup" 
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/90 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">
              Institutional Grade Capital Markets
            </span>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
              TOKENIZE <br />
              <span className="text-white/20">REAL WORLD</span> <br />
              ASSETS.
            </h1>
            <p className="text-xl text-white/40 max-w-2xl mb-12 leading-relaxed">
              Upfrica Markets is the premier institutional platform for tokenizing and trading real-world assets. 
              From prime real estate to private equity, we bridge the gap between traditional finance and digital liquidity.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                href="/markets/dashboard" 
                className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                Explore Assets
                <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 bg-white/5">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">Fully Compliant & Regulated</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-5xl font-bold mb-2">$1.2B+</p>
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Assets Tokenized</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">45k+</p>
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Verified Investors</p>
          </div>
          <div>
            <p className="text-5xl font-bold mb-2">12.4%</p>
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Avg. Annual Yield</p>
          </div>
        </div>
      </section>

      {/* Asset Types Section */}
      <section id="assets" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-4">Diversify with RWAs</h2>
            <p className="text-white/40 max-w-xl">Access institutional-grade assets that were previously out of reach.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real Estate",
                desc: "Fractional ownership of prime commercial and residential properties.",
                icon: Building2,
                color: "text-blue-500"
              },
              {
                title: "Private Equity",
                desc: "Invest in high-growth companies before they go public.",
                icon: Zap,
                color: "text-amber-500"
              },
              {
                title: "Debt Funds",
                desc: "Stable returns through institutional-grade fixed income instruments.",
                icon: Coins,
                color: "text-emerald-500"
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[40px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-all`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 tracking-tight">Institutional Grade <br /> Security.</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Smart Contract Audits",
                  desc: "All tokenization contracts are audited by top-tier security firms.",
                  icon: Lock
                },
                {
                  title: "Global Compliance",
                  desc: "Automated KYC/AML onboarding for investors across 150+ countries.",
                  icon: Globe
                },
                {
                  title: "Escrow Settlement",
                  desc: "Secure funds handling via Escrow.com integration for all trades.",
                  icon: Shield
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10">
            <img 
              src="https://picsum.photos/seed/security/1000/1000" 
              alt="Security" 
              className="object-cover w-full h-full opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-10 left-10">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Verified Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-xl font-bold">SOC2 Type II Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-black" />
            </div>
            <span className="font-bold">Upfrica Markets</span>
          </div>
          <p className="text-sm text-white/20">© 2026 Upfrica Markets. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
