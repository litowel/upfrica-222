import { ArrowRight, Globe, Zap, Shield, Coins, Building2 } from "lucide-react";
import { Link } from "wouter";
import ImageSlider from "../components/ImageSlider";

export default function Solutions() {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
            Everything you need to manage <span className="text-indigo-600">modern finance</span>
          </h1>
          <p className="text-xl text-neutral-600">
            A complete suite of financial tools for the digital economy.
          </p>
        </div>

        <ImageSlider 
          slides={[
            { url: "https://picsum.photos/seed/sol_1/1200/600", note: "Comprehensive Financial Suite" },
            { url: "https://picsum.photos/seed/sol_2/1200/600", note: "Global Payments & Treasury" },
            { url: "https://picsum.photos/seed/sol_3/1200/600", note: "Automated Trading & Asset Management" }
          ]}
          className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-200/50 mb-24"
        />

        <div className="space-y-24">
          {/* Solution 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Globe size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Global Payments</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Send and receive money globally without friction. We connect local payment rails (Mobile Money, Bank Transfer) with global infrastructure.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                  Instant settlement in USD or Stablecoins
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                  Low transaction fees (starts at 0.5%)
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                  Automated FX conversion
                </li>
              </ul>
              <Link href="/onboarding">
                <a className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-2">
                  Start accepting payments <ArrowRight size={16} />
                </a>
              </Link>
            </div>
            <div className="order-1 md:order-2 bg-neutral-100 rounded-2xl h-80 flex items-center justify-center overflow-hidden shadow-lg">
              <img src="https://picsum.photos/seed/payments_demo/800/600" alt="Payment Demo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* Solution 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-neutral-100 rounded-2xl h-80 flex items-center justify-center overflow-hidden shadow-lg">
              <img src="https://picsum.photos/seed/trading_preview/800/600" alt="Trading Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <Zap size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Automated Trading</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Put your capital to work with automated strategies. Grid trading, arbitrage, and market making bots running 24/7.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                  Powered by Pionex institutional algorithms
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                  Risk management controls
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                  Real-time performance tracking
                </li>
              </ul>
              <Link href="/onboarding">
                <a className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2">
                  Explore strategies <ArrowRight size={16} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
