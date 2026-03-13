import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, CheckCircle2, Lock, Activity, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AnimatedStat } from "../components/AnimatedStat";
import ImageSlider from "../components/ImageSlider";

export default function Payments() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabs = [
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
      title: "Smart FX & Currency",
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
      title: "Payouts & Settlements",
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

  const faqs = [
    {
      q: "Which countries can I accept payments from?",
      a: "UpFrica supports 190+ countries through our licensed payment partners including Paystack and Payaza Africa."
    },
    {
      q: "What currencies do you support?",
      a: "We support 30+ fiat currencies plus USDC, USDT, and DAI stablecoins with automatic conversion."
    },
    {
      q: "How long does settlement take?",
      a: "Most settlements complete in real-time or T+1 depending on payment method and destination country."
    },
    {
      q: "Is my money safe?",
      a: "All payment processing is handled by internationally licensed and regulated partners. UpFrica does not hold client funds directly."
    },
    {
      q: "Do I need technical knowledge to integrate?",
      a: "No. We offer a no-code payment link option and a full REST API for developers. Both are available from your dashboard."
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Global Payments Infrastructure | UpFrica</title>
      <meta name="description" content="Accept, send, and settle payments across 190+ countries. One API for every payment method, currency, and country." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {['$', '€', '£', '₦', '₵', 'KSh'].map((sym, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl font-bold"
              initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 0] }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
            >
              {sym}
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Move Money Anywhere. <span className="text-indigo-400">Instantly.</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                One payment infrastructure for receiving, sending, converting, and settling money across 190+ countries — powered by globally licensed payment partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/onboarding">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Start Accepting Payments
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Link>
                <Link href="/developers">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 text-white border border-neutral-700 font-semibold rounded-xl hover:bg-neutral-700 transition-all">
                    View API Docs
                  </a>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-neutral-400 mb-16">
                <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> 190+ Countries</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3"/> Real-Time Settlement</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Lock className="w-3 h-3"/> PCI Compliant Partners</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3"/> 30+ Currencies</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> Fraud Protection</span>
              </div>

              <ImageSlider 
                slides={[
                  { url: "https://picsum.photos/seed/payments_hero1/1200/600", note: "Seamless Cross-Border Settlements" },
                  { url: "https://picsum.photos/seed/payments_hero2/1200/600", note: "Real-Time FX Conversion at Mid-Market Rates" },
                  { url: "https://picsum.photos/seed/payments_hero3/1200/600", note: "Multi-Currency Payouts & Automated Routing" }
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
            <AnimatedStat prefix="$" value={2.4} decimals={1} suffix="B+" label="Payments Processed" />
            <AnimatedStat value={190} suffix="+" label="Countries" />
            <AnimatedStat value={0.5} decimals={1} suffix="%" label="Average FX Spread" />
            <AnimatedStat value={12} suffix="ms" label="Settlement Speed" />
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Payments Infrastructure</h2>
          <p className="text-neutral-600 text-lg">One API. Every payment method. Every currency. Every country.</p>
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

      {/* How It Works Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Live in minutes. Not months.</h2>
            <p className="text-neutral-600">Start processing global payments today without the traditional banking headaches.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Create Account</h3>
              <p className="text-neutral-600">Sign up, complete KYC verification via our regulated identity partners, get approved in minutes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">Get API Keys</h3>
              <p className="text-neutral-600">Access your dashboard, generate live or test API keys, and integrate with our clean REST API.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Go Live</h3>
              <p className="text-neutral-600">Accept payments, send transfers, and automate settlements from day one. No bank meetings. No paperwork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-12">Payments powered by globally regulated partners</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-neutral-200 rounded-2xl bg-white">
            <div className="text-xl font-bold text-neutral-900 mb-2">Paystack</div>
            <p className="text-sm text-neutral-500">Powering seamless card and mobile money collections across Africa.</p>
          </div>
          <div className="p-6 border border-neutral-200 rounded-2xl bg-white">
            <div className="text-xl font-bold text-neutral-900 mb-2">Payaza</div>
            <p className="text-sm text-neutral-500">Enabling global USD-first payment processing and cross-border settlements.</p>
          </div>
          <div className="p-6 border border-neutral-200 rounded-2xl bg-white">
            <div className="text-xl font-bold text-neutral-900 mb-2">Transak</div>
            <p className="text-sm text-neutral-500">Bridging fiat and crypto with compliant on/off ramps in 150+ countries.</p>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="bg-neutral-900 text-white py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-neutral-400">No hidden fees. Scale your payments globally with confidence.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-3xl font-bold mb-6">1.5%<span className="text-lg text-neutral-400 font-normal"> /tx</span></div>
              <ul className="space-y-3 mb-8 text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 0% setup fee</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Up to $10,000/month</li>
              </ul>
            </div>
            <div className="bg-indigo-600 p-8 rounded-2xl border border-indigo-500 relative transform md:-translate-y-4 shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-bold mb-2">Business</h3>
              <div className="text-3xl font-bold mb-6">1.2%<span className="text-lg text-indigo-200 font-normal"> /tx</span></div>
              <ul className="space-y-3 mb-8 text-indigo-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> 0% setup fee</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Up to $100,000/month</li>
              </ul>
            </div>
            <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
              <h3 className="text-xl font-bold mb-2">Institutional</h3>
              <div className="text-3xl font-bold mb-6">Custom</div>
              <ul className="space-y-3 mb-8 text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Volume discounts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Dedicated support</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Link href="/pricing">
              <a className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium">
                See Full Pricing <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Link>
          </div>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to accept global payments?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join businesses across Africa and beyond using UpFrica to move money globally.
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
