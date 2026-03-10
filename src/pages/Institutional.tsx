import { Building, Landmark, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Institutional() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-neutral-900 text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            Institutional Capital Infrastructure
          </h1>
          <p className="text-xl text-neutral-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Secure, compliant, and automated treasury management for funds, governments, and enterprises.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <a className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors">
                Contact Sales
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <Landmark className="w-12 h-12 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Treasury Management</h3>
            <p className="text-neutral-600 mb-6">
              Optimize working capital with automated yield strategies. Access money market funds and stablecoin yields.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle2 size={16} className="text-green-600" /> Multi-signature security
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle2 size={16} className="text-green-600" /> Real-time reporting
              </li>
            </ul>
          </div>

          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <Building className="w-12 h-12 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Tokenized Assets</h3>
            <p className="text-neutral-600 mb-6">
              Issue and trade tokenized real estate, infrastructure, and private equity. Access global liquidity.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle2 size={16} className="text-green-600" /> Regulatory compliance
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle2 size={16} className="text-green-600" /> Automated dividends
              </li>
            </ul>
          </div>

          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <Briefcase className="w-12 h-12 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Escrow Services</h3>
            <p className="text-neutral-600 mb-6">
              Secure large transactions for M&A, asset purchases, and procurement.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle2 size={16} className="text-green-600" /> Smart contract escrow
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle2 size={16} className="text-green-600" /> Milestone-based release
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
