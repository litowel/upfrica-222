import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Code, Terminal, Webhook, Box, LayoutTemplate, Activity } from "lucide-react";
import ImageSlider from "../components/ImageSlider";

export default function Developers() {
  const features = [
    { title: "REST API", desc: "Clean, predictable, resource-oriented URLs with JSON responses.", icon: Code },
    { title: "Sandbox Environment", desc: "Test integrations safely with unlimited test data and simulated scenarios.", icon: Terminal },
    { title: "Webhooks", desc: "Real-time event notifications for payments, KYC, and treasury updates.", icon: Webhook },
    { title: "SDKs (JS, Python, PHP)", desc: "Official libraries to get you started in minutes, not hours.", icon: Box },
    { title: "White-Label Builder", desc: "Launch a branded fintech app using our pre-built UI components.", icon: LayoutTemplate },
    { title: "API Status Page", desc: "Transparent, real-time monitoring of all API endpoints and services.", icon: Activity }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Developer API & Documentation | UpFrica</title>
      <meta name="description" content="Build fintech applications on UpFrica's API. Clean REST API, sandbox environment, webhooks, and white-label tools." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Build the Next Generation of <span className="text-indigo-400">African Fintech</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 leading-relaxed">
                Clean REST API. Instant sandbox access. Webhooks for everything. White-label infrastructure so you can launch your own branded fintech app in days — not months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/onboarding">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Get API Keys
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Link>
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 text-white border border-neutral-700 font-semibold rounded-xl hover:bg-neutral-700 transition-all">
                  Read Documentation
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl"
            >
              <div className="flex items-center px-4 py-3 bg-[#2D2D2D] border-b border-neutral-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs text-neutral-400 font-mono">POST /v1/payments/initialize</div>
              </div>
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
                <pre>
                  <code className="text-neutral-300">
<span className="text-pink-400">POST</span> /v1/payments/initialize<br/>
<span className="text-blue-400">Authorization:</span> Bearer YOUR_API_KEY<br/>
<span className="text-blue-400">Content-Type:</span> application/json<br/>
<br/>
&#123;<br/>
  <span className="text-green-400">"amount"</span>: <span className="text-orange-400">1000</span>,<br/>
  <span className="text-green-400">"currency"</span>: <span className="text-yellow-300">"USD"</span>,<br/>
  <span className="text-green-400">"recipient_email"</span>: <span className="text-yellow-300">"user@example.com"</span>,<br/>
  <span className="text-green-400">"description"</span>: <span className="text-yellow-300">"Invoice #1042"</span>,<br/>
  <span className="text-green-400">"callback_url"</span>: <span className="text-yellow-300">"https://yourapp.com/webhook"</span><br/>
&#125;
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developer Visuals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-24">
        <ImageSlider 
          slides={[
            { url: "https://picsum.photos/seed/dev_api/1200/600", note: "Clean REST API with Predictable JSON Responses" },
            { url: "https://picsum.photos/seed/dev_sandbox/1200/600", note: "Interactive Sandbox Environment for Safe Testing" },
            { url: "https://picsum.photos/seed/dev_webhooks/1200/600", note: "Real-Time Webhook Notifications" }
          ]}
          className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-800 bg-neutral-900"
        />
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Developer-First Infrastructure</h2>
          <p className="text-neutral-600">Everything you need to build robust financial applications.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <feat.icon className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-neutral-600 mb-6">{feat.desc}</p>
              <img src={`https://picsum.photos/seed/dev_feat${i}/400/200`} alt={feat.title} className="w-full h-32 object-cover rounded-xl mt-auto" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>

      {/* White-Label Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Launch your own fintech. We handle the infrastructure.</h2>
            <p className="text-neutral-600">Focus on your users. Let UpFrica handle the complex financial plumbing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">You bring</h3>
              <p className="text-neutral-600">Your brand, your customers, your market knowledge.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">UpFrica provides</h3>
              <p className="text-neutral-600">Payments, treasury, KYC, custody, yield — all API-powered.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">Result</h3>
              <p className="text-neutral-600">A fully functional fintech app live in days with revenue sharing built in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-indigo-600 rounded-3xl p-12 sm:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get instant sandbox access</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Start building with test API keys immediately. No credit card required.
          </p>
          <Link href="/onboarding">
            <a className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
              Start Building
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
