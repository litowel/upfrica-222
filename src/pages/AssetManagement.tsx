import { Link } from "wouter";
import { ArrowRight, Building2, LineChart, ShieldCheck } from "lucide-react";

export default function AssetManagement() {
  return (
    <div className="min-h-screen bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Real-World Asset Management</h1>
          <p className="text-xl text-neutral-600">
            Tokenize, trade, and manage real-world assets with institutional infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <Building2 className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Tokenize Any Real-World Asset</h3>
            <p className="text-neutral-600 mb-6">
              Convert real estate, infrastructure, private equity, or commodities into on-chain tokens via Thirdweb.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ ERC-20 / ERC-1400 security tokens</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Built-in investor KYC/whitelist controls</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Automated dividend distribution</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <LineChart className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Automated Trading Strategies</h3>
            <p className="text-neutral-600 mb-6">
              Deploy capital into automated market-making and algorithmic trading powered by Pionex — 24/7.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Grid trading, DCA, and rebalancing bots</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ 24/7 automated execution</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Risk limits and stop-loss controls</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <ShieldCheck className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Smart Escrow</h3>
            <p className="text-neutral-600 mb-6">
              Execute M&A, real estate, and large B2B deals with programmable escrow — funds release only when all conditions are met.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Programmable release conditions</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Multi-party authorization</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Dispute resolution framework</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/onboarding">
            <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg">
              Start Managing Assets
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
