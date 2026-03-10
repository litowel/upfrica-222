import { Check } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Simple, transparent pricing</h1>
        <p className="text-xl text-neutral-600 mb-16 max-w-2xl mx-auto">
          Choose the plan that fits your financial scale. No hidden fees.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Starter</h3>
            <div className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-neutral-500">/mo</span></div>
            <p className="text-neutral-600 mb-8 text-sm">Perfect for individuals and freelancers getting started.</p>
            <Link href="/onboarding">
              <a className="block w-full py-3 px-4 bg-neutral-100 text-neutral-900 font-medium rounded-lg hover:bg-neutral-200 transition-colors mb-8">
                Get Started
              </a>
            </Link>
            <ul className="space-y-4 text-left">
              <Feature text="Global USD Account" />
              <Feature text="Crypto Wallet (Safe)" />
              <Feature text="Standard FX Rates" />
              <Feature text="Email Support" />
            </ul>
          </div>

          {/* Business */}
          <div className="bg-neutral-900 text-white p-8 rounded-2xl border border-neutral-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <h3 className="text-lg font-semibold mb-2">Business</h3>
            <div className="text-4xl font-bold mb-6">$49<span className="text-lg font-normal text-neutral-400">/mo</span></div>
            <p className="text-neutral-400 mb-8 text-sm">For startups and growing companies needing automation.</p>
            <Link href="/onboarding">
              <a className="block w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors mb-8">
                Start Free Trial
              </a>
            </Link>
            <ul className="space-y-4 text-left">
              <Feature text="Everything in Starter" light />
              <Feature text="Automated Treasury" light />
              <Feature text="Developer API Access" light />
              <Feature text="Priority Support" light />
              <Feature text="Lower FX Fees" light />
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-6">Custom</div>
            <p className="text-neutral-600 mb-8 text-sm">For large institutions requiring dedicated infrastructure.</p>
            <Link href="/contact">
              <a className="block w-full py-3 px-4 bg-white border border-neutral-200 text-neutral-900 font-medium rounded-lg hover:bg-neutral-50 transition-colors mb-8">
                Contact Sales
              </a>
            </Link>
            <ul className="space-y-4 text-left">
              <Feature text="Dedicated Account Manager" />
              <Feature text="Custom Smart Contracts" />
              <Feature text="White-Label Options" />
              <Feature text="SLA Guarantees" />
              <Feature text="On-Premise Deployment" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text, light }: { text: string, light?: boolean }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <Check size={16} className={light ? "text-indigo-400" : "text-indigo-600"} />
      <span className={light ? "text-neutral-300" : "text-neutral-700"}>{text}</span>
    </li>
  );
}
