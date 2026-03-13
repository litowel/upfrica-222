import { Link } from "wouter";
import { ArrowRight, Globe, CreditCard, RefreshCw, Zap } from "lucide-react";

export default function Payments() {
  return (
    <div className="min-h-screen bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Global Payments Infrastructure</h1>
          <p className="text-xl text-neutral-600">
            One API. Every payment method. Every currency. Every country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <Globe className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Accept Payments Globally</h3>
            <p className="text-neutral-600 mb-6">
              Receive payments from 190+ countries using local methods, cards, bank transfers, and stablecoins settled in your preferred currency.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Automatic FX conversion at mid-market rates</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Local payment methods (M-Pesa, SEPA, ACH, SWIFT)</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Real-time payment confirmation</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
            <Zap className="w-10 h-10 text-indigo-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Send Money Anywhere Instantly</h3>
            <p className="text-neutral-600 mb-6">
              Pay suppliers, employees, and partners globally with bank-level speed at a fraction of wire transfer costs.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Same-day international transfers</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ 0.5% FX spread vs 3-5% at traditional banks</li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">✓ Bulk payroll for 1 to 10,000 recipients</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/onboarding">
            <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg">
              Start Processing Payments
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
