import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Building2, Code2, LineChart } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-neutral-50 to-white opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Live: Global Treasury Infrastructure
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                The Financial Operating System for the <span className="text-indigo-600">Global Economy</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl leading-relaxed">
                UpFrica provides automated treasury, payments, and asset management infrastructure for individuals, businesses, and institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Globe}
            title="Global Payments"
            description="Accept payments from 190+ countries. Automated FX conversion and settlement."
          />
          <FeatureCard 
            icon={Shield}
            title="Secure Treasury"
            description="Multi-signature wallets powered by Safe Global. Institutional-grade security."
          />
          <FeatureCard 
            icon={Zap}
            title="Automated Yield"
            description="Earn yield on idle assets with automated strategies powered by Pionex."
          />
        </div>
      </section>

      {/* Institutional Section */}
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
            <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-sm text-neutral-400">TREASURY BALANCE</h3>
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

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
