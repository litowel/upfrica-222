import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Building2, Code2, LineChart, CheckCircle2, Lock, Activity } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ImageSlider from "../components/ImageSlider";

// Helper for count up animation
function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function AnimatedStat({ value, suffix, label, prefix = "" }: { value: number, suffix: string, label: string, prefix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Home() {
  const [activePaymentTab, setActivePaymentTab] = useState(0);
  const [activeTreasuryTab, setActiveTreasuryTab] = useState(0);
  const [activeAssetTab, setActiveAssetTab] = useState(0);

  const paymentTabs = [
    {
      title: "Accept Payments Globally",
      description: "Receive payments from 190+ countries using local methods, cards, bank transfers, and stablecoins settled in your preferred currency.",
      benefits: [
        "Automatic FX conversion at mid-market rates",
        "Local payment methods (M-Pesa, SEPA, ACH, SWIFT)",
        "Real-time payment confirmation",
        "Multi-currency settlement (USD, EUR, GBP, USDC)",
        "Fraud detection and chargeback protection"
      ]
    },
    {
      title: "Send Money Anywhere Instantly",
      description: "Pay suppliers, employees, and partners globally with bank-level speed at a fraction of wire transfer costs.",
      benefits: [
        "Same-day international transfers",
        "0.5% FX spread vs 3-5% at traditional banks",
        "Bulk payroll for 1 to 10,000 recipients",
        "Automated reconciliation and reporting",
        "Full audit trail for compliance"
      ]
    },
    {
      title: "Smart FX Conversion",
      description: "Access institutional FX rates with automated hedging. Never lose value on currency conversion again.",
      benefits: [
        "Mid-market FX rates in real-time",
        "Automated hedging against currency risk",
        "30+ fiat currencies supported",
        "Stablecoin-fiat bridge (USDC, USDT, DAI)",
        "FX forwards and scheduled conversions"
      ]
    },
    {
      title: "Automated Settlements",
      description: "Define settlement rules once. UpFrica automatically routes, converts, and settles funds on your schedule.",
      benefits: [
        "Rule-based settlement automation",
        "Split payments to multiple accounts",
        "T+0 and T+1 settlement options",
        "Webhook notifications on every settlement",
        "ISO 20022 compliant messaging"
      ]
    }
  ];

  const treasuryTabs = [
    {
      title: "Institutional-Grade Custody",
      description: "Multi-signature wallets powered by Safe Global — same infrastructure used by institutions managing billions.",
      benefits: [
        "M-of-N multi-signature authorization",
        "Hardware wallet support (Ledger, Trezor)",
        "Role-based access control",
        "Transaction policy enforcement",
        "Cold storage for long-term holdings"
      ]
    },
    {
      title: "Automated Yield on Idle Assets",
      description: "Idle cash earns yield automatically through DeFi strategies powered by Pionex — no lock-up periods.",
      benefits: [
        "4–12% APY on stablecoin holdings",
        "Automated rebalancing strategies",
        "Non-custodial — you always own your assets",
        "Real-time yield dashboard",
        "Instant withdrawal, no lock-up"
      ]
    },
    {
      title: "Intelligent Cash Flow Automation",
      description: "Set rules for how capital moves. UpFrica monitors accounts and routes funds to optimize liquidity, yield, and FX exposure.",
      benefits: [
        "Automated sweep accounts",
        "Minimum balance enforcement",
        "Scheduled fund movements",
        "Multi-entity consolidation",
        "Real-time cash position dashboard"
      ]
    },
    {
      title: "Treasury Reporting & Audit",
      description: "Every transaction is logged and reportable. Export audit-ready reports for your board or regulators in one click.",
      benefits: [
        "Real-time balance sheet view",
        "Exportable CSV, PDF, Excel reports",
        "Transaction-level audit trail",
        "Multi-currency P&L tracking",
        "Board-ready treasury dashboards"
      ]
    }
  ];

  const assetTabs = [
    {
      title: "Tokenize Any Real-World Asset",
      description: "Convert real estate, infrastructure, private equity, or commodities into on-chain tokens via Thirdweb.",
      benefits: [
        "Real estate, infrastructure, private equity",
        "ERC-20 / ERC-1400 security tokens",
        "Built-in investor KYC/whitelist controls",
        "Automated dividend and yield distribution",
        "Secondary market trading enabled"
      ]
    },
    {
      title: "Automated Trading Strategies",
      description: "Deploy capital into automated market-making and algorithmic trading powered by Pionex — 24/7.",
      benefits: [
        "Grid trading, DCA, and rebalancing bots",
        "24/7 automated execution",
        "Risk limits and stop-loss controls",
        "Multi-asset portfolio management",
        "Full performance analytics"
      ]
    },
    {
      title: "Smart Escrow for High-Value Transactions",
      description: "Execute M&A, real estate, and large B2B deals with programmable escrow — funds release only when all conditions are met.",
      benefits: [
        "Programmable release conditions",
        "Multi-party authorization",
        "Dispute resolution framework",
        "Legal document attachment",
        "Full audit trail for due diligence"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Amara O.",
      role: "CFO, West Africa Trade Group",
      quote: "UpFrica replaced 4 separate tools for us — payments, treasury, FX, and compliance. We now manage $2M+ monthly with a 2-person finance team."
    },
    {
      name: "James K.",
      role: "Founder, Nairobi SaaS Startup",
      quote: "The developer API is the cleanest I've used in African fintech. We went live in 3 days. The white-label option saved us 6 months of infrastructure work."
    },
    {
      name: "Dr. Fatima A.",
      role: "Investment Director, Pan-African Infrastructure Fund",
      quote: "The tokenization infrastructure and multi-sig custody gave our institutional LPs the confidence they needed. This is the missing layer in African capital markets."
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-neutral-50 to-white opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                All Systems Operational — <Link href="/status"><a className="underline hover:text-emerald-800 ml-1">API Status: Live</a></Link> <span className="mx-1 text-emerald-300">|</span> Payments · Treasury · KYC · Yield
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                The Financial Operating System for the <span className="text-indigo-600">Global Economy</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Move, manage, and multiply capital across 190+ countries — with institutional-grade treasury, payments, and asset management infrastructure built for emerging market complexity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/onboarding">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Start Banking
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Link>
                <Link href="/developers">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-900 border border-neutral-200 font-semibold rounded-xl hover:bg-neutral-50 transition-all">
                    Developer API
                  </a>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-neutral-500 mb-16">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3"/> 256-bit AES Encryption</span>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> 190+ Countries Supported</span>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3"/> Multi-Signature Custody</span>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> 99.9% Uptime SLA</span>
                <span className="hidden sm:inline text-neutral-300">|</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> KYC/AML Compliant</span>
              </div>

              <ImageSlider 
                slides={[
                  { url: "https://picsum.photos/seed/finance1/1200/600", note: "Global Payments Infrastructure across 190+ Countries" },
                  { url: "https://picsum.photos/seed/dashboard/1200/600", note: "Institutional Treasury Management & Yield Generation" },
                  { url: "https://picsum.photos/seed/global/1200/600", note: "Real-World Asset Tokenization & Smart Escrow" }
                ]} 
                className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-200/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Stats Bar */}
      <section className="bg-neutral-900 py-16 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <AnimatedStat value={100} suffix="k+" label="Transactions Secured" />
            <AnimatedStat value={190} suffix="+" label="Countries & Territories" />
            <AnimatedStat value={12} suffix="ms" label="Average Settlement Time" />
            <AnimatedStat value={99.9} suffix="%" label="Platform Uptime" />
          </div>
        </div>
      </section>

      {/* Payments Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Payments Infrastructure</h2>
          <p className="text-neutral-600 text-lg">One API. Every payment method. Every currency. Every country.</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-2">
            {paymentTabs.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActivePaymentTab(idx)}
                className={`text-left px-6 py-4 rounded-xl font-semibold transition-all ${activePaymentTab === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{paymentTabs[activePaymentTab].title}</h3>
              <p className="text-neutral-600 mb-8 text-lg">{paymentTabs[activePaymentTab].description}</p>
              <div className="space-y-4">
                {paymentTabs[activePaymentTab].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                    <span className="text-neutral-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <img 
                src={`https://picsum.photos/seed/payments${activePaymentTab}/600/600`} 
                alt="Payments illustration" 
                className="w-full h-auto object-cover rounded-xl shadow-md border border-neutral-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treasury Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Institutional Treasury Management</h2>
          <p className="text-neutral-600 text-lg">Stop letting capital sit idle. UpFrica puts your treasury to work — automatically.</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm order-2 md:order-1 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 w-full">
              <img 
                src={`https://picsum.photos/seed/treasury${activeTreasuryTab}/600/600`} 
                alt="Treasury illustration" 
                className="w-full h-auto object-cover rounded-xl shadow-md border border-neutral-100"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{treasuryTabs[activeTreasuryTab].title}</h3>
              <p className="text-neutral-600 mb-8 text-lg">{treasuryTabs[activeTreasuryTab].description}</p>
              <div className="space-y-4">
                {treasuryTabs[activeTreasuryTab].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                    <span className="text-neutral-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-2 order-1 md:order-2">
            {treasuryTabs.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveTreasuryTab(idx)}
                className={`text-left px-6 py-4 rounded-xl font-semibold transition-all ${activeTreasuryTab === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Management Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Asset Management</h2>
          <p className="text-neutral-600 text-lg">Tokenize, trade, and manage real-world assets with institutional infrastructure.</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col gap-2">
            {assetTabs.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveAssetTab(idx)}
                className={`text-left px-6 py-4 rounded-xl font-semibold transition-all ${activeAssetTab === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{assetTabs[activeAssetTab].title}</h3>
              <p className="text-neutral-600 mb-8 text-lg">{assetTabs[activeAssetTab].description}</p>
              <div className="space-y-4">
                {assetTabs[activeAssetTab].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                    <span className="text-neutral-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <img 
                src={`https://picsum.photos/seed/asset${activeAssetTab}/600/600`} 
                alt="Asset Management illustration" 
                className="w-full h-auto object-cover rounded-xl shadow-md border border-neutral-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Section / Demo Dashboard */}
      <section className="bg-neutral-900 text-white py-24 rounded-3xl mx-4 sm:mx-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Institutions</h2>
              <p className="text-neutral-400 text-lg mb-8">
                Manage capital, tokenize assets, and execute large-scale transactions with our institutional suite.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span className="text-neutral-300">Tokenized Real Estate & Infrastructure</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span className="text-neutral-300">Automated Market Making</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span className="text-neutral-300">Escrow for M&A Transactions</span>
                </li>
              </ul>
              <Link href="/institutional">
                <a className="text-indigo-400 font-medium hover:text-indigo-300 flex items-center gap-2">
                  Explore Institutional Solutions <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 relative">
              <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider border border-indigo-400">
                [ LIVE DEMO ]
              </div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-sm text-neutral-400">TREASURY DASHBOARD — DEMO</h3>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded font-medium">+12.4% YTD</span>
              </div>
              <div className="text-4xl font-mono mb-2">$12,450,000.00</div>
              <div className="text-sm text-neutral-500 mb-8">USDC / USD COMPOSITE</div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Real Estate Fund A</span>
                  <span className="text-white">$4,200,000</span>
                </div>
                <div className="w-full bg-neutral-700 h-1 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[35%]"></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Liquid Stablecoins</span>
                  <span className="text-white">$8,250,000</span>
                </div>
                <div className="w-full bg-neutral-700 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[65%]"></div>
                </div>
              </div>
              <div className="mt-6 text-[10px] text-neutral-500 text-right italic">
                *Sample data for illustration purposes only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer API Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Build on UpFrica</h2>
          <p className="text-neutral-600">
            Launch your own fintech application in minutes using our white-label API and developer tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <Code2 className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold mb-3">Developer Sandbox</h3>
            <p className="text-neutral-600 mb-6">
              Get instant access to test API keys, mock wallets, and simulated payment flows.
            </p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs text-neutral-300 mb-6">
              <div className="flex gap-2 mb-2">
                <span className="text-purple-400">POST</span>
                <span>/v1/payments/create</span>
              </div>
              <div className="pl-4 border-l border-neutral-700">
                <span className="text-blue-400">amount</span>: 1000,<br/>
                <span className="text-blue-400">currency</span>: "USD",<br/>
                <span className="text-blue-400">recipient</span>: "wallet_123"
              </div>
            </div>
            <Link href="/developers">
              <a className="text-indigo-600 font-medium hover:text-indigo-700">Read Documentation &rarr;</a>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <Building2 className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold mb-3">White-Label App Builder</h3>
            <p className="text-neutral-600 mb-6">
              No-code solution to launch your own branded fintech platform. We handle the infrastructure, you handle the brand.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
                Custom Domain Support
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
                Built-in KYC/KYB
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
                Revenue Sharing
              </li>
            </ul>
            <Link href="/developers">
              <a className="text-indigo-600 font-medium hover:text-indigo-700">Start Building &rarr;</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Bar */}
      <section className="py-12 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-6 text-center">Built on battle-tested infrastructure</h4>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['Safe Global', 'Thirdweb', 'Pionex', 'Transak', 'Didit KYC', 'Paystack', 'Payaza', 'Neon'].map((partner) => (
              <div key={partner} className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 hover:bg-white transition-all grayscale hover:grayscale-0 cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leaders</h2>
            <p className="text-neutral-600">See how organizations are transforming their financial operations with UpFrica.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
                <div className="text-indigo-200 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.41 14.594C16.643 13.922 16.76 13.21 16.76 12.486V3H24V12.486C24 16.22 22.513 19.8 19.82 22.44L14.017 21ZM0 21L2.393 14.594C2.626 13.922 2.743 13.21 2.743 12.486V3H9.983V12.486C9.983 16.22 8.496 19.8 5.803 22.44L0 21Z" />
                  </svg>
                </div>
                <p className="text-neutral-700 mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-neutral-900">{t.name}</div>
                  <div className="text-sm text-neutral-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-neutral-400 mt-8 italic">Testimonials are illustrative of expected customer outcomes.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-indigo-600 rounded-3xl p-12 sm:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to automate your finances?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and individuals using UpFrica to manage their global capital.
          </p>
          <Link href="/onboarding">
            <a className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
              Create Free Account
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
