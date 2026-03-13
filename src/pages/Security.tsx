import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Lock, Server, FileCheck, Key, EyeOff, Activity, Globe, CheckCircle2 } from "lucide-react";
import ImageSlider from "../components/ImageSlider";

export default function Security() {
  const pillars = [
    {
      title: "Asset Custody",
      desc: "Multi-sig via Safe Global. You always own your assets. We never hold funds.",
      icon: Shield
    },
    {
      title: "Data Encryption",
      desc: "256-bit AES encryption at rest. TLS 1.3 in transit. Zero-knowledge where possible.",
      icon: Lock
    },
    {
      title: "Identity Verification",
      desc: "KYC/AML via Didit — globally regulated identity partners.",
      icon: FileCheck
    },
    {
      title: "Compliance",
      desc: "All financial services delivered through licensed and regulated partner integrations.",
      icon: Server
    }
  ];

  const features = [
    { title: "End-to-End Encryption", icon: Key },
    { title: "Role-Based Access Control", icon: EyeOff },
    { title: "Immutable Audit Logs", icon: FileCheck },
    { title: "Regular Penetration Testing", icon: Shield },
    { title: "99.9% Uptime SLA", icon: Activity },
    { title: "24/7 Incident Response", icon: Server },
    { title: "Local Data Residency", icon: Globe },
    { title: "GDPR Compliant", icon: Lock }
  ];

  return (
    <div className="space-y-24 pb-24">
      <title>Security & Compliance | UpFrica</title>
      <meta name="description" content="How UpFrica protects your assets and data through multi-signature custody, encrypted infrastructure, and regulated partner integrations." />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-900 to-neutral-900 opacity-70"></div>
        <img src="https://picsum.photos/seed/security_bg/1920/1080" alt="Security Background" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" referrerPolicy="no-referrer" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Security is not a feature. <span className="text-indigo-400">It is the foundation.</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Your funds and data are protected by industry-leading infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Security Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-neutral-200 shadow-xl flex flex-col hover:shadow-2xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <pillar.icon className="w-16 h-16 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">{pillar.title}</h3>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">{pillar.desc}</p>
              <img src={`https://picsum.photos/seed/pillar${i}/600/300`} alt={pillar.title} className="w-full h-40 object-cover rounded-xl mt-auto" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>

      {/* Security Visuals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-24">
        <ImageSlider 
          slides={[
            { url: "https://picsum.photos/seed/sec_enc/1200/600", note: "Military-Grade 256-bit AES Encryption" },
            { url: "https://picsum.photos/seed/sec_audit/1200/600", note: "Continuous Third-Party Security Audits" },
            { url: "https://picsum.photos/seed/sec_comp/1200/600", note: "Global KYC/AML Regulatory Compliance" }
          ]}
          className="w-full h-64 md:h-96 rounded-2xl shadow-2xl border border-neutral-200"
        />
      </section>

      {/* Security Features Grid */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Security Controls</h2>
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

      {/* Responsible Disclosure Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-neutral-900 rounded-3xl p-12 sm:p-20 text-white border border-neutral-800">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Found a vulnerability?</h2>
          <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
            We take security seriously. If you discover a vulnerability in UpFrica, please report it responsibly to: <a href="mailto:security@giideatg.com" className="text-indigo-400 hover:text-indigo-300 underline">security@giideatg.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
