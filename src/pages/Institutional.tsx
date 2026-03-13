import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, Globe, Zap, CheckCircle2, FileText, Users, Lock, Activity, HeadphonesIcon } from "lucide-react";
import ImageSlider from "../components/ImageSlider";

export default function Institutional() {
  const solutions = [
    {
      title: "Capital Management",
      desc: "Multi-currency treasury, automated yield, cash flow forecasting, board reporting",
      icon: Building2
    },
    {
      title: "Asset Tokenization",
      desc: "Tokenize any asset class, manage investor whitelists, automate distributions",
      icon: Shield
    },
    {
      title: "Cross-Border Payments",
      desc: "High-volume international transfers, bulk payroll, FX hedging",
      icon: Globe
    },
    {
      title: "Escrow & Structured Finance",
      desc: "M&A escrow, milestone payments, structured transaction management",
      icon: Lock
    }
  ];

  const features = [
    { title: "Dedicated Account Manager", icon: Users },
    { title: "Custom API Rate Limits", icon: Zap },
    { title: "SLA-backed Uptime Guarantee", icon: Activity },
    { title: "Multi-Entity Management", icon: Building2 },
    { title: "Custom Compliance Reporting", icon: FileText },
    { title: "White-Label Options Available", icon: Globe },
    { title: "SSO & Enterprise Auth", icon: Lock },
    { title: "24/7 Priority Support", icon: HeadphonesIcon }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Institutional Solutions | UpFrica</title>
      <meta name="description" content="Purpose-built financial infrastructure for banks, funds, family offices, and large enterprises managing significant capital globally." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Built for Institutions That Move <span className="text-indigo-400">Serious Capital</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                UpFrica's institutional suite gives banks, investment funds, family offices, and large enterprises the infrastructure to manage, move, and multiply capital at scale — with the compliance controls your stakeholders demand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/contact">
                  <a className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25">
                    Contact Institutional Sales
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Link>
                <a href="#" className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 text-white border border-neutral-700 font-semibold rounded-xl hover:bg-neutral-700 transition-all">
                  Download Capabilities Deck
                </a>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-neutral-400 mb-16">
                <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> Bank-Grade Security</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><FileText className="w-3 h-3"/> Full Audit Trail</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> Multi-Jurisdiction</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3"/> High-Volume API</span>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="flex items-center gap-1"><HeadphonesIcon className="w-3 h-3"/> Dedicated Support</span>
              </div>

              <ImageSlider 
                slides={[
                  { url: "https://picsum.photos/seed/institutional1/1200/600", note: "Bank-Grade Security & Compliance Controls" },
                  { url: "https://picsum.photos/seed/institutional2/1200/600", note: "High-Volume API for Enterprise Scale" },
                  { url: "https://picsum.photos/seed/institutional3/1200/600", note: "Dedicated Account Management & 24/7 Support" }
                ]} 
                className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-700/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Institutional Infrastructure</h2>
          <p className="text-neutral-600">A unified platform for your most complex financial operations.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((sol, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <sol.icon className="w-12 h-12 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{sol.title}</h3>
              <p className="text-neutral-600 text-lg mb-8">{sol.desc}</p>
              <img src={`https://picsum.photos/seed/inst_sol${i}/600/300`} alt={sol.title} className="w-full h-48 object-cover rounded-xl mt-auto" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Features Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything an institution needs</h2>
            <p className="text-neutral-600">Built to meet the rigorous demands of enterprise compliance, security, and scale.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-4">
                <feat.icon className="w-8 h-8 text-indigo-600 shrink-0" />
                <h3 className="text-base font-bold text-neutral-900">{feat.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-indigo-600 rounded-3xl p-12 sm:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Talk to our institutional team</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover how UpFrica can streamline your treasury, payments, and asset management operations globally.
          </p>
          <Link href="/contact">
            <a className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
              Contact Sales
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
