import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function DeveloperPricing() {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
          API Pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-neutral-900">
          Scale with your success
        </h1>
        <p className="text-xl text-neutral-600 mb-16 max-w-2xl mx-auto leading-relaxed">
          Our revenue share model aligns our incentives with yours. We only make money when you process transactions.
        </p>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          <PricingTier 
            volume="$0 – $1M" 
            share="25%" 
            description="For early-stage startups and new integrations."
            features={["Sandbox Access", "Standard Support", "Basic Analytics"]}
          />
          <PricingTier 
            volume="$1M – $10M" 
            share="20%" 
            description="For growing platforms with consistent volume."
            features={["Production Access", "Priority Support", "Advanced Analytics", "Dedicated Account Manager"]}
            highlighted
          />
          <PricingTier 
            volume="$10M – $100M" 
            share="15%" 
            description="For scaling businesses expanding globally."
            features={["Custom SLA", "24/7 Support", "Custom Integrations", "Volume Discounts"]}
          />
          <PricingTier 
            volume="$100M+" 
            share="10%" 
            description="For enterprise platforms and institutions."
            features={["Enterprise SLA", "Dedicated Engineering Team", "On-Premise Options", "White-Label Customization"]}
          />
        </div>

        <div className="bg-neutral-50 rounded-2xl p-12 border border-neutral-200 text-left max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to start building?</h3>
              <p className="text-neutral-600 mb-8">
                Get instant access to our sandbox environment and start integrating today. No credit card required.
              </p>
              <div className="flex gap-4">
                <Link href="/developers/signup">
                  <a className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
                    Get API Keys <ArrowRight size={16} />
                  </a>
                </Link>
                <Link href="/developers">
                  <a className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-medium rounded-lg hover:bg-neutral-50 transition-colors">
                    Read Documentation
                  </a>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">No monthly fees</h4>
                  <p className="text-sm text-neutral-500">Pay only for what you use based on transaction volume.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">Automatic volume discounts</h4>
                  <p className="text-sm text-neutral-500">Rates automatically decrease as your volume grows.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">Transparent reporting</h4>
                  <p className="text-sm text-neutral-500">Real-time dashboard to track your usage and fees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingTier({ volume, share, description, features, highlighted }: any) {
  return (
    <div className={`p-8 rounded-2xl border flex flex-col h-full ${highlighted ? 'bg-neutral-900 text-white border-neutral-800 shadow-xl ring-1 ring-indigo-500' : 'bg-white border-neutral-200 shadow-sm'}`}>
      <div className="mb-4">
        <div className={`text-sm font-medium mb-2 ${highlighted ? 'text-indigo-400' : 'text-indigo-600'}`}>Transaction Volume</div>
        <div className="text-lg font-bold">{volume}</div>
      </div>
      
      <div className="mb-6 pb-6 border-b border-neutral-200/10">
        <div className="text-4xl font-bold mb-1">{share}</div>
        <div className={`text-sm ${highlighted ? 'text-neutral-400' : 'text-neutral-500'}`}>Platform Share</div>
      </div>

      <p className={`text-sm mb-8 flex-grow ${highlighted ? 'text-neutral-300' : 'text-neutral-600'}`}>{description}</p>

      <ul className="space-y-3 mt-auto">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check size={16} className={`shrink-0 mt-0.5 ${highlighted ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className={highlighted ? 'text-neutral-300' : 'text-neutral-600'}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
