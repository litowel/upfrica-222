import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ImageSlider from "../components/ImageSlider";

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Are there any hidden fees?",
      a: "No. UpFrica operates on a transparent pricing model. You only pay the transaction fees listed on your plan. There are no setup fees, monthly minimums, or hidden charges."
    },
    {
      q: "How do I upgrade from Starter to Business?",
      a: "You can upgrade your plan at any time directly from your UpFrica dashboard. Your new rates will take effect immediately upon upgrading."
    },
    {
      q: "What happens if I exceed my monthly volume limit?",
      a: "If you exceed your plan's volume limit, you will automatically be charged the transaction fee of the next tier for the remainder of the month. We will notify you before this happens."
    },
    {
      q: "Do you offer custom pricing for high-volume businesses?",
      a: "Yes. Our Institutional plan is designed for enterprises processing over $500,000 per month. Contact our sales team to discuss custom rates and dedicated support."
    },
    {
      q: "Are there fees for holding funds in my Treasury account?",
      a: "No. Holding funds is completely free. In fact, you can earn yield on your idle balances through our automated DeFi strategies."
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Pricing | UpFrica</title>
      <meta name="description" content="Simple, transparent pricing for individuals, businesses, and institutions. Start free, scale as you grow." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        <img src="https://picsum.photos/seed/pricing_bg/1920/1080" alt="Pricing Background" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" referrerPolicy="no-referrer" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Pricing that <span className="text-indigo-400">scales with you</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                No hidden fees. No surprises. Start free and upgrade as your volume grows.
              </p>
              
              <ImageSlider 
                slides={[
                  { url: "https://picsum.photos/seed/pricing_1/1200/600", note: "Transparent Pricing Models" },
                  { url: "https://picsum.photos/seed/pricing_2/1200/600", note: "Scale Seamlessly as You Grow" },
                  { url: "https://picsum.photos/seed/pricing_3/1200/600", note: "No Hidden Fees, Ever" }
                ]}
                className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-700/50 mt-12"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Starter Plan */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-neutral-900">Starter</h3>
            <p className="text-neutral-500 mb-6">Perfect for new businesses and startups.</p>
            <div className="text-4xl font-bold mb-2 text-neutral-900">Free</div>
            <div className="text-sm text-neutral-500 mb-8">No monthly fee</div>
            
            <div className="mb-8">
              <div className="text-lg font-bold text-neutral-900 mb-1">1.5%</div>
              <div className="text-sm text-neutral-500">per transaction</div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-neutral-700">Up to $10,000/month volume</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-neutral-700">Basic treasury account</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-neutral-700">Standard KYC</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-neutral-700">Email support</span>
              </li>
            </ul>
            
            <Link href="/onboarding">
              <a className="w-full block text-center px-6 py-3 bg-neutral-100 text-neutral-900 font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                Start Free
              </a>
            </Link>
          </div>

          {/* Business Plan */}
          <div className="bg-indigo-600 p-8 rounded-2xl border border-indigo-500 shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2 text-white">Business</h3>
            <p className="text-indigo-200 mb-6">For growing companies scaling globally.</p>
            <div className="text-4xl font-bold mb-2 text-white">$49<span className="text-lg font-normal text-indigo-200">/mo</span></div>
            <div className="text-sm text-indigo-200 mb-8">Billed monthly</div>
            
            <div className="mb-8">
              <div className="text-lg font-bold text-white mb-1">1.2%</div>
              <div className="text-sm text-indigo-200">per transaction</div>
            </div>

            <ul className="space-y-4 mb-8 flex-1 text-white">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Up to $500,000/month volume</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Full treasury suite</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Advanced KYC/KYB</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>
            
            <Link href="/onboarding">
              <a className="w-full block text-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                Start Business
              </a>
            </Link>
          </div>

          {/* Institutional Plan */}
          <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold mb-2 text-white">Institutional</h3>
            <p className="text-neutral-400 mb-6">For enterprises and high-volume platforms.</p>
            <div className="text-4xl font-bold mb-2 text-white">Custom</div>
            <div className="text-sm text-neutral-400 mb-8">Tailored to your needs</div>
            
            <div className="mb-8">
              <div className="text-lg font-bold text-white mb-1">Custom</div>
              <div className="text-sm text-neutral-400">fee structure</div>
            </div>

            <ul className="space-y-4 mb-8 flex-1 text-neutral-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>Unlimited volume</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>White-label options</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>Custom SLA</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>24/7 support</span>
              </li>
            </ul>
            
            <Link href="/contact">
              <a className="w-full block text-center px-6 py-3 bg-neutral-800 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors">
                Contact Sales
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale globally?</h2>
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
