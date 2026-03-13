import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Building2, Users } from "lucide-react";
import ImageSlider from "../components/ImageSlider";

export default function About() {
  return (
    <div className="space-y-24 pb-24">
      <title>About UpFrica | Oskayi Consult Ltd</title>
      <meta name="description" content="UpFrica is a financial technology platform operated by Oskayi Consult, a Ghana-incorporated company building global financial infrastructure for Africa and beyond." />

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
                We are building the financial infrastructure <span className="text-indigo-400">Africa deserves</span> — and the world needs.
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-neutral-900">Our Platform</h2>
            <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
              UpFrica is a financial technology platform operated by Oskayi Consult, incorporated in Ghana. We believe that businesses, institutions, and individuals in Africa and emerging markets deserve access to the same quality of financial infrastructure that powers Wall Street and Silicon Valley.
            </p>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Our platform orchestrates best-in-class, internationally licensed and regulated partners to deliver payments, treasury, KYC, custody, and asset management — through one unified API and interface.
            </p>
          </div>
          <div>
            <ImageSlider 
              slides={[
                { url: "https://picsum.photos/seed/office1/800/600", note: "Our Headquarters in Accra, Ghana" },
                { url: "https://picsum.photos/seed/teamwork/800/600", note: "World-Class Engineering & Finance Team" },
                { url: "https://picsum.photos/seed/africa/800/600", note: "Bridging African and Global Capital Markets" }
              ]}
              className="w-full h-80 rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Oskayi Consult Section */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 border border-neutral-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6">
              O
            </div>
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">Oskayi Consults</h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Oskayi Consult is a Ghana-incorporated technology consultancy that designs and operates digital financial infrastructure for African markets and global clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-neutral-600 font-medium">
              <a href="https://www.giideatg.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 hover:text-indigo-600 transition-colors">
                <Globe className="w-5 h-5" />
                www.giideatg.com
              </a>
              <a href="mailto:oskayi@giideatg.com" className="flex items-center justify-center gap-2 hover:text-indigo-600 transition-colors">
                <Users className="w-5 h-5" />
                oskayi@giideatg.com | info@giideatg.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-indigo-50 rounded-3xl p-10 border border-indigo-100 relative overflow-hidden">
            <img src="https://picsum.photos/seed/mission/800/400" alt="Mission" className="absolute inset-0 w-full h-full object-cover opacity-10" referrerPolicy="no-referrer" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-indigo-900">Our Mission</h3>
              <p className="text-lg text-indigo-800 leading-relaxed">
                To make institutional-grade financial infrastructure accessible to every business and individual on the continent and beyond.
              </p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100 relative overflow-hidden">
            <img src="https://picsum.photos/seed/vision/800/400" alt="Vision" className="absolute inset-0 w-full h-full object-cover opacity-10" referrerPolicy="no-referrer" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-emerald-900">Our Vision</h3>
              <p className="text-lg text-emerald-800 leading-relaxed">
                A world where geography is no longer a barrier to financial participation.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-neutral-900">Our Values</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Transparency', 'Security', 'Accessibility', 'Innovation', 'Partnership'].map((value) => (
              <span key={value} className="px-6 py-3 bg-white border border-neutral-200 rounded-xl text-lg font-bold text-neutral-800 shadow-sm">
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Ecosystem Section */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">We don't build alone — we orchestrate the best</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Paystack', 'Payaza', 'Safe Global', 'Thirdweb', 'Pionex', 'Transak', 'Didit', 'Escrow.com', 'OpenSea'].map((partner) => (
              <div key={partner} className="px-8 py-4 bg-neutral-800 border border-neutral-700 rounded-2xl text-xl font-bold text-neutral-300 shadow-sm hover:bg-neutral-700 hover:text-white transition-all cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <div className="bg-indigo-600 rounded-3xl p-12 sm:p-20 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the UpFrica platform</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Get in touch: <a href="mailto:info@giideatg.com" className="underline hover:text-white">info@giideatg.com</a> | <a href="mailto:oskayi@giideatg.com" className="underline hover:text-white">oskayi@giideatg.com</a>
          </p>
          <Link href="/onboarding">
            <a className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
              Get Started
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
