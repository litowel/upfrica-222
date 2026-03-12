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

      <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-sm">U</div>
              <span className="font-bold text-lg">UpFrica</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The Financial Operating System for the Global Economy. Automated treasury, payments, and asset management.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/solutions"><a className="hover:text-white transition-colors">Solutions</a></Link></li>
              <li><Link href="/institutional"><a className="hover:text-white transition-colors">Institutional</a></Link></li>
              <li><Link href="/pricing"><a className="hover:text-white transition-colors">Pricing</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Developers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/developers"><a className="hover:text-white transition-colors">Documentation</a></Link></li>
              <li><Link href="/developers"><a className="hover:text-white transition-colors">API Reference</a></Link></li>
              <li><Link href="/developers"><a className="hover:text-white transition-colors">Status</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 text-xs text-center">
          © {new Date().getFullYear()} UpFrica Financial Systems. All rights reserved.
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
