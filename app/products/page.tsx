"use client";

import Link from "next/link";
import { Zap, BarChart3, ArrowRight, Globe, Shield, Wallet, Activity, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function ProductsPage() {
  const products = [
    {
      id: "flowpay",
      name: "Upfrica FlowPay",
      description: "The bridge between African commerce and global liquidity. Accept local fiat and settle instantly in USDC.",
      icon: Zap,
      href: "/",
      color: "bg-black",
      features: ["Fiat-to-USDC Settlements", "Multi-sig Custody (Safe)", "Paystack Integration", "Real-time Reporting"],
      status: "Live"
    },
    {
      id: "markets",
      name: "Upfrica Markets",
      description: "Institutional-grade RWA tokenization platform. Trade prime real estate, equity, and funds on-chain.",
      icon: BarChart3,
      href: "/markets",
      color: "bg-black",
      features: ["RWA Tokenization", "Institutional Trading Desk", "KYC/AML Compliance", "Yield-bearing Assets"],
      status: "Live"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-black/5 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">Upfrica</span>
        </Link>
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

      {/* Hero */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            One Ecosystem. <br />
            <span className="text-black/40">Limitless Finance.</span>
          </h1>
          <p className="text-xl text-black/60 mb-12 max-w-2xl mx-auto">
            Discover the suite of institutional-grade financial products powering the future of African commerce and capital markets.
          </p>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden p-12 rounded-[48px] border border-black/5 bg-white shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-black/[0.02] rounded-bl-[120px] -mr-16 -mt-16 group-hover:bg-black/[0.04] transition-colors" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-12">
                  <div className={`w-16 h-16 ${product.color} rounded-3xl flex items-center justify-center shadow-xl shadow-black/20 group-hover:scale-110 transition-transform`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest">
                    {product.status}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">{product.name}</h2>
                <p className="text-lg text-black/60 mb-8 max-w-md">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-12">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm font-medium text-black/40">
                      <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
                  <Link
                    href={product.href}
                    className="flex items-center gap-2 text-lg font-bold text-black group-hover:gap-4 transition-all"
                  >
                    Explore Platform
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-black/5" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-12 border-t border-black/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <Zap className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight">Upfrica</span>
        </div>
        <p className="text-sm text-black/40">
          &copy; 2026 Upfrica Ecosystem. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
