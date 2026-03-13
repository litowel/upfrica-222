import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, Shield, Globe, Coins, LayoutDashboard, Code, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Solutions", href: "/solutions" },
    { name: "Institutional", href: "/institutional" },
    { name: "Developers", href: "/developers" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  const isDashboard = location.startsWith("/dashboard");
  const isAuth = location.startsWith("/onboarding") || location.startsWith("/login") || location.startsWith("/kyc");

  if (isDashboard) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  if (isAuth) {
    return <div className="min-h-screen bg-neutral-50 font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-500/30">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <a className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
                  U
                </div>
                <span className="font-bold text-xl tracking-tight text-neutral-900">UpFrica</span>
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="text-sm font-medium text-neutral-600 hover:text-indigo-600 transition-colors">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <a className="text-sm font-medium text-neutral-600 hover:text-neutral-900">Log in</a>
              </Link>
              <Link href="/onboarding">
                <a className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md">
                  Get Started
                </a>
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-neutral-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className="block text-base font-medium text-neutral-600 hover:text-indigo-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
                <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
                  <Link href="/login">
                    <a className="block text-center py-2 text-neutral-600 font-medium">Log in</a>
                  </Link>
                  <Link href="/onboarding">
                    <a className="block text-center py-2 bg-indigo-600 text-white font-medium rounded-lg">
                      Get Started
                    </a>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="bg-neutral-900 text-neutral-400 py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">U</div>
              <span className="font-bold text-xl tracking-tight">UpFrica</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The Financial Operating System for the Global Economy. Automated treasury, payments, and asset management.
            </p>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 bg-neutral-800 px-3 py-1.5 rounded-md w-fit">
                🔒 Partner-Regulated
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 bg-neutral-800 px-3 py-1.5 rounded-md w-fit">
                🛡️ KYC via Didit
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 bg-neutral-800 px-3 py-1.5 rounded-md w-fit">
                🌐 Ghana Incorporated
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 bg-neutral-800 px-3 py-1.5 rounded-md w-fit">
                📋 Audit Ready
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link></li>
              <li><Link href="/solutions"><a className="hover:text-white transition-colors">Solutions</a></Link></li>
              <li><Link href="/institutional"><a className="hover:text-white transition-colors">Institutional</a></Link></li>
              <li><Link href="/pricing"><a className="hover:text-white transition-colors">Pricing</a></Link></li>
              <li><Link href="/treasury"><a className="hover:text-white transition-colors">Treasury</a></Link></li>
              <li><Link href="/payments"><a className="hover:text-white transition-colors">Payments</a></Link></li>
              <li><Link href="/asset-management"><a className="hover:text-white transition-colors">Asset Management</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Developers</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/developers"><a className="hover:text-white transition-colors">Documentation</a></Link></li>
              <li><Link href="/developers"><a className="hover:text-white transition-colors">API Reference</a></Link></li>
              <li><Link href="/status"><a className="hover:text-white transition-colors">API Status</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/security"><a className="hover:text-white transition-colors">Security & Compliance</a></Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-800">
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 text-center">Powered by licensed & regulated partners</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {['Paystack', 'Payaza', 'Safe Global', 'Thirdweb', 'Pionex', 'Transak', 'Didit KYC', 'Escrow.com', 'OpenSea'].map((partner) => (
                <a key={partner} href="#" className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-medium text-neutral-400 hover:text-white hover:border-neutral-500 hover:bg-neutral-800 transition-all grayscale hover:grayscale-0">
                  {partner}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-[11px] leading-relaxed text-neutral-500 text-justify">
            UpFrica is a financial technology platform operated by Oskayi Consult, a company incorporated in Ghana (<a href="https://www.giideatg.com" target="_blank" rel="noreferrer" className="hover:text-neutral-300 underline">www.giideatg.com</a>). All payment, treasury, KYC, custody, trading, and asset management services on this platform are delivered through internationally licensed and regulated integration partners. UpFrica and Oskayi Consult do not hold client funds directly. Regulatory coverage and compliance obligations are fulfilled by our licensed partners in their respective jurisdictions. For enquiries: <a href="mailto:oskayi@giideatg.com" className="hover:text-neutral-300">oskayi@giideatg.com</a> | <a href="mailto:info@giideatg.com" className="hover:text-neutral-300">info@giideatg.com</a>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} UpFrica Financial Systems. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("upfrica_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Treasury", href: "/dashboard/treasury", icon: Building2 },
    { name: "Trading", href: "/dashboard/trading", icon: Coins },
    { name: "Developers", href: "/dashboard/developers", icon: Code },
    { name: "Settings", href: "/dashboard/settings", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 fixed h-full hidden md:flex flex-col">
        <div className="p-6 border-b border-neutral-100">
          <Link href="/">
            <a className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                U
              </div>
              <span className="font-bold text-xl tracking-tight text-neutral-900">UpFrica</span>
            </a>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}>
                  <item.icon size={18} />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">{user?.name || "User"}</p>
              <p className="text-xs text-neutral-500 truncate">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
