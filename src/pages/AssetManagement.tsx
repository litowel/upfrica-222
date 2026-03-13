import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, ChevronDown, ChevronUp, Lock, Globe, Zap, Briefcase, TrendingUp, ShieldCheck } from "lucide-react";
import { useState } from "react";
import ImageSlider from "../components/ImageSlider";

export default function AssetManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs = [
    {
      title: "Tokenize Any Real-World Asset",
      description: "Convert illiquid assets like real estate, infrastructure, and private equity into programmable, liquid security tokens.",
      benefits: [
        "ERC-1400 compliant security tokens",
        "Automated dividend and yield distribution",
        "Fractional ownership capabilities",
        "On-chain cap table management",
        "Built-in compliance and transfer restrictions"
      ]
    },
    {
      title: "Automated Trading Strategies",
      description: "Deploy capital across tokenized assets and DeFi protocols using algorithmic trading bots powered by Pionex.",
      benefits: [
        "Grid trading and DCA bots",
        "Arbitrage across global liquidity pools",
        "Custom algorithmic strategy builder",
        "Real-time portfolio rebalancing",
        "Institutional-grade execution speed"
      ]
    },
    {
      title: "Smart Escrow for High-Value Transactions",
      description: "Execute large-scale M&A, real estate, and B2B transactions with programmable smart contracts that remove counterparty risk.",
      benefits: [
        "Milestone-based fund release",
        "Multi-party approval workflows",
        "Automated regulatory compliance checks",
        "Zero counterparty risk",
        "Transparent, immutable transaction records"
      ]
    }
  ];

  const assetClasses = [
    { icon: Building2, title: "Real Estate", desc: "Residential, commercial, industrial properties tokenized for fractional ownership" },
    { icon: Globe, title: "Infrastructure", desc: "Roads, energy, telecoms — tokenized for institutional and retail investors" },
    { icon: Briefcase, title: "Private Equity", desc: "Illiquid PE holdings made liquid through secondary token markets" },
    { icon: Zap, title: "Commodities", desc: "Gold, agricultural products, natural resources on-chain" },
    { icon: TrendingUp, title: "Fixed Income", desc: "Bonds and debt instruments tokenized for global distribution" },
    { icon: ShieldCheck, title: "Investment Funds", desc: "Tokenize fund units for automated LP management and distributions" }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Real-World Asset Management | UpFrica</title>
      <meta name="description" content="Tokenize real estate, manage portfolios, and execute high-value transactions with institutional-grade asset management infrastructure." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                The World's Assets. <span className="text-indigo-400">On-Chain. Accessible.</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Tokenize real estate, infrastructure, and private equity. Automate trading strategies. Execute large-scale transactions with programmable escrow — all from one institutional platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/onboarding">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Explore Asset Tokenization
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Link>
                <Link href="/contact">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 text-white border border-neutral-700 font-semibold rounded-xl hover:bg-neutral-700 transition-all">
                    Talk to Our Team
                  </a>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-neutral-400 mb-16">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3"/> Real Estate & Infrastructure</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Lock className="w-3 h-3"/> ERC-1400 Security Tokens</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Smart Escrow</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Automated Trading</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> Global Investor Access</span>
              </div>

              <ImageSlider 
                slides={[
                  { url: "https://picsum.photos/seed/asset_hero1/1200/600", note: "Tokenize Real Estate & Infrastructure" },
                  { url: "https://picsum.photos/seed/asset_hero2/1200/600", note: "Algorithmic Trading & Portfolio Rebalancing" },
                  { url: "https://picsum.photos/seed/asset_hero3/1200/600", note: "Programmable Smart Escrow for M&A" }
                ]} 
                className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-700/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Asset Management</h2>
          <p className="text-neutral-600 text-lg">Tokenize, trade, and manage real-world assets with institutional infrastructure.</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-2">
            {tabs.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-left px-6 py-4 rounded-xl font-semibold transition-all ${activeTab === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">{tabs[activeTab].title}</h3>
            <p className="text-neutral-600 mb-8 text-lg">{tabs[activeTab].description}</p>
            <div className="space-y-4">
              {tabs[activeTab].benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                  <span className="text-neutral-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asset Classes Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Every asset class. One platform.</h2>
            <p className="text-neutral-600">Unlock liquidity and global distribution for traditionally illiquid assets.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assetClasses.map((ac, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                <ac.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{ac.title}</h3>
                <p className="text-neutral-600">{ac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenization Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">From asset to token in 4 steps</h2>
          <p className="text-neutral-600">A streamlined, compliant process for bringing real-world assets on-chain.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="relative">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">1</div>
            <h3 className="text-lg font-bold mb-2">Asset Verification</h3>
            <p className="text-sm text-neutral-600">Submit asset documentation. Our partners conduct due diligence and legal verification.</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">2</div>
            <h3 className="text-lg font-bold mb-2">Smart Contract Deployment</h3>
            <p className="text-sm text-neutral-600">ERC-20 or ERC-1400 smart contract deployed via Thirdweb with your asset parameters.</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">3</div>
            <h3 className="text-lg font-bold mb-2">Investor Onboarding</h3>
            <p className="text-sm text-neutral-600">Investors complete KYC/AML via Didit. Whitelist controls enforced on-chain.</p>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">4</div>
            <h3 className="text-lg font-bold mb-2">Trading & Distribution</h3>
            <p className="text-sm text-neutral-600">Token listed for secondary trading. Yield and dividends distributed automatically.</p>
          </div>
        </div>
      </section>

      {/* Escrow Section */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Trust, but verify — automatically.</h2>
            <p className="text-neutral-400">Smart escrow removes counterparty risk from your most important transactions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
              <h3 className="text-xl font-bold mb-3 text-indigo-400">M&A Transactions</h3>
              <p className="text-neutral-300">Funds held in escrow until all regulatory approvals and conditions are met on both sides.</p>
            </div>
            <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
              <h3 className="text-xl font-bold mb-3 text-indigo-400">Real Estate Deals</h3>
              <p className="text-neutral-300">Property transfers triggered automatically when title documents and funds are verified.</p>
            </div>
            <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
              <h3 className="text-xl font-bold mb-3 text-indigo-400">Large B2B Contracts</h3>
              <p className="text-neutral-300">Milestone-based payments released as each deliverable is confirmed by both parties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <h2 className="text-2xl font-bold mb-12">Asset management powered by</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {['Thirdweb', 'Pionex', 'Safe Global', 'Didit KYC', 'Sumsub'].map((partner) => (
            <div key={partner} className="px-6 py-3 bg-white border border-neutral-200 rounded-xl text-lg font-bold text-neutral-800 shadow-sm">
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-indigo-600 rounded-3xl p-12 sm:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start tokenizing your assets</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Unlock liquidity and global distribution with institutional-grade infrastructure.
          </p>
          <Link href="/contact">
            <a className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
              Book a Consultation
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
