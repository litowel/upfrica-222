import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, Activity, CheckCircle2, ChevronDown, ChevronUp, Lock, Globe, Zap } from "lucide-react";
import { useState } from "react";
import { AnimatedStat } from "../components/AnimatedStat";
import ImageSlider from "../components/ImageSlider";

export default function TreasuryMarketing() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs = [
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

  const faqs = [
    {
      q: "Does UpFrica hold my funds?",
      a: "No. All custody is handled through Safe Global's non-custodial multi-signature infrastructure. You always own your assets."
    },
    {
      q: "How is yield generated?",
      a: "Through automated DeFi strategies powered by Pionex — battle-tested, transparent, and non-custodial."
    },
    {
      q: "Can I have multiple treasury accounts for different entities?",
      a: "Yes. UpFrica supports multi-entity treasury consolidation with separate accounts and reporting per entity."
    },
    {
      q: "What reporting formats are supported?",
      a: "CSV, PDF, and Excel exports. Board-ready dashboards available in-app at any time."
    },
    {
      q: "Is there a minimum balance required?",
      a: "No minimum balance. Start with any amount and scale as your organization grows."
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Institutional Treasury Management | UpFrica</title>
      <meta name="description" content="Automate your treasury operations. Multi-sig custody, automated yield, cash flow management, and real-time reporting — all in one platform." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        {/* Subtle animated flowing lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 C1150,200 1350,0 1500,100"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1, x: [0, -500, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
                <stop offset="50%" stopColor="#4f46e5" stopOpacity="1" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Your Treasury. Automated. <span className="text-indigo-400">Optimized. Secured.</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Stop letting capital sit idle. UpFrica gives businesses and institutions a complete treasury operating system — with multi-signature custody, automated yield generation, and real-time cash flow intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/onboarding">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Open Treasury Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Link>
                <Link href="/contact">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 text-white border border-neutral-700 font-semibold rounded-xl hover:bg-neutral-700 transition-all">
                    Book a Demo
                  </a>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-neutral-400 mb-16">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3"/> Multi-Sig Custody</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> 4-12% APY</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> Safe Global Powered</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3"/> Real-Time Reporting</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> Multi-Currency</span>
              </div>

              <ImageSlider 
                slides={[
                  { url: "https://picsum.photos/seed/treasury_hero1/1200/600", note: "Multi-Signature Institutional Custody" },
                  { url: "https://picsum.photos/seed/treasury_hero2/1200/600", note: "Automated DeFi Yield Generation (4-12% APY)" },
                  { url: "https://picsum.photos/seed/treasury_hero3/1200/600", note: "Real-Time Cash Flow & Audit Reporting" }
                ]} 
                className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-700/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Stats Bar */}
      <section className="bg-neutral-900 py-16 border-y border-neutral-800 -mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <AnimatedStat prefix="$" value={12} suffix="M+" label="Treasury Managed" />
            <AnimatedStat value={12} suffix="%" label="Average APY" />
            <AnimatedStat value={100} suffix="%" label="Non-Custodial" />
            <AnimatedStat value={99.9} suffix="%" label="Platform Uptime" decimals={1} />
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Institutional Treasury Management</h2>
          <p className="text-neutral-600 text-lg">Stop letting capital sit idle. UpFrica puts your treasury to work — automatically.</p>
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

      {/* Comparison Table Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">UpFrica Treasury vs Traditional Banking</h2>
            <p className="text-neutral-600">See why modern organizations are moving their treasury operations to UpFrica.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-neutral-200 font-semibold text-neutral-500 uppercase tracking-wider text-sm">Feature</th>
                  <th className="p-4 border-b border-neutral-200 font-semibold text-neutral-500 uppercase tracking-wider text-sm">Traditional Bank</th>
                  <th className="p-4 border-b-2 border-indigo-600 font-bold text-indigo-600 uppercase tracking-wider text-sm bg-indigo-50/50 rounded-t-xl">UpFrica Treasury</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-neutral-100">
                  <td className="p-4 font-medium text-neutral-900">Setup Time</td>
                  <td className="p-4 text-neutral-600">Weeks</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30">Minutes</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="p-4 font-medium text-neutral-900">Yield on Idle Cash</td>
                  <td className="p-4 text-neutral-600">0.1-0.5%</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30">4-12% APY</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="p-4 font-medium text-neutral-900">FX Conversion Fee</td>
                  <td className="p-4 text-neutral-600">3-5%</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30">0.5%</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="p-4 font-medium text-neutral-900">Multi-Currency Support</td>
                  <td className="p-4 text-neutral-600">Limited</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30">30+ currencies</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="p-4 font-medium text-neutral-900">Real-Time Reporting</td>
                  <td className="p-4 text-neutral-600">Monthly statements</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30">Real-time</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="p-4 font-medium text-neutral-900">Multi-Sig Security</td>
                  <td className="p-4 text-neutral-600">No</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30">Yes</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-neutral-900 rounded-bl-xl">API Access</td>
                  <td className="p-4 text-neutral-600">No</td>
                  <td className="p-4 font-semibold text-indigo-700 bg-indigo-50/30 rounded-br-xl">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Built for every type of organization</h2>
          <p className="text-neutral-600">Tailored treasury solutions for your specific operational needs.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">Startups & SMEs</h3>
            <p className="text-neutral-600">Automate payroll, manage multi-currency revenue, earn yield on reserves.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">Enterprises</h3>
            <p className="text-neutral-600">Consolidate multi-entity treasury, enforce spending policies, board-level reporting.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">Investment Funds</h3>
            <p className="text-neutral-600">Manage LP capital, automate distributions, tokenize fund units.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">NGOs & Foundations</h3>
            <p className="text-neutral-600">Receive donor funds globally, manage grant disbursements, full audit trail.</p>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Institutional security. Not optional.</h2>
            <p className="text-neutral-400">Your capital is protected by the same infrastructure used by the world's largest financial institutions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
              <Shield className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Multi-Signature Wallets</h3>
              <p className="text-sm text-neutral-400">Powered by Safe Global. Every transaction requires M-of-N approvals.</p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
              <Lock className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Hardware Wallet Support</h3>
              <p className="text-sm text-neutral-400">Compatible with Ledger and Trezor for cold storage of large holdings.</p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
              <Building2 className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Role-Based Access</h3>
              <p className="text-sm text-neutral-400">Set granular permissions — who can view, approve, or execute transactions.</p>
            </div>
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700">
              <Activity className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Full Audit Trail</h3>
              <p className="text-sm text-neutral-400">Every action logged, timestamped, and exportable for regulators or auditors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <h2 className="text-2xl font-bold mb-12">Treasury powered by industry-leading partners</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {['Safe Global', 'Pionex', 'Thirdweb'].map((partner) => (
            <div key={partner} className="px-6 py-3 bg-white border border-neutral-200 rounded-xl text-lg font-bold text-neutral-800 shadow-sm">
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
              <button 
                className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:bg-neutral-50"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-neutral-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-indigo-600 rounded-3xl p-12 sm:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Automate your treasury today</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Take control of your capital with institutional-grade security and automated yield.
          </p>
          <Link href="/onboarding">
            <a className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
              Open Treasury Account
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
