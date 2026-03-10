import { Code2, Terminal, Cpu, Globe, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Developers() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-neutral-900 text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
              <Terminal size={12} />
              <span>v2.4.0 Documentation</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              Build the future of finance with <span className="text-indigo-400 font-mono">UpFrica API</span>
            </h1>
            <p className="text-xl text-neutral-400 mb-10 leading-relaxed">
              Integrate global payments, treasury management, and tokenized assets into your application with a few lines of code.
            </p>
            <div className="flex gap-4">
              <Link href="/developers/signup">
                <a className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Get API Keys
                </a>
              </Link>
              <Link href="/developers/pricing">
                <a className="px-6 py-3 bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
                  View Pricing
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* API Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold">Global Payments</h3>
            <p className="text-neutral-600">
              Accept payments in 135+ currencies. We handle the FX, compliance, and settlement automatically.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold">Compliance as a Service</h3>
            <p className="text-neutral-600">
              Built-in KYC/KYB checks. Don't worry about identity verification—our API handles it for you.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold">White-Label Infrastructure</h3>
            <p className="text-neutral-600">
              Launch your own branded fintech app. Use our pre-built UI components or build your own.
            </p>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Initialize in seconds</h2>
              <p className="text-neutral-600 mb-8 text-lg">
                Our SDK is designed for developer happiness. Type-safe, documented, and easy to debug.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-neutral-900">Install the SDK</h4>
                    <p className="text-sm text-neutral-600 mt-1">Available for Node.js, Python, and Go.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-neutral-900">Get Sandbox Keys</h4>
                    <p className="text-sm text-neutral-600 mt-1">Start testing immediately without verification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-neutral-900">Go Live</h4>
                    <p className="text-sm text-neutral-600 mt-1">Complete KYB and switch to production keys.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-neutral-400 font-mono">server.ts</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-indigo-300">
                  <code>
{`import { UpFrica } from '@upfrica/sdk';

const client = new UpFrica({
  apiKey: process.env.UPFRICA_SECRET_KEY,
});

// Create a treasury wallet
const wallet = await client.wallets.create({
  type: 'safe_multisig',
  owners: ['0x123...', '0x456...'],
  threshold: 2
});

console.log(wallet.address);
// "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
