"use client";

import Link from "next/link";
import { 
  LayoutDashboard, 
  TrendingUp, 
  Building2, 
  History, 
  Settings, 
  LogOut, 
  BarChart3,
  ShieldCheck,
  Search,
  Bell,
  User,
  Zap,
  Coins,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function MarketsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/markets/dashboard", icon: LayoutDashboard },
    { name: "Asset Listings", href: "/markets/dashboard/assets", icon: Building2 },
    { name: "Trading Desk", href: "/markets/dashboard/trading", icon: Zap },
    { name: "Investments", href: "/markets/dashboard/investments", icon: Coins },
    { name: "Returns", href: "/markets/dashboard/returns", icon: TrendingUp },
    { name: "KYC Status", href: "/markets/dashboard/kyc", icon: ShieldCheck },
    { name: "History", href: "/markets/dashboard/history", icon: History },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">Markets</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Trading Menu</p>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-white text-black" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-white/40"}`} />
                {item.name}
              </Link>
            );
          })}

          <div className="px-4 py-4 mt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Ecosystem Products</p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Zap className="w-5 h-5 text-white/40" />
            Upfrica FlowPay
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <Link
            href="/markets/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-6">
            <div className="relative w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search assets, orders, or documents..." 
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-medium transition-all"
              />
            </div>
            <div className="h-6 w-px bg-white/5 mx-2" />
            <div className="relative group">
              <button className="flex items-center gap-1 text-xs font-bold text-white/40 hover:text-white transition-colors">
                Products
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-[#0a0a0a] border border-white/5 rounded-2xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all mt-2">
                <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="text-black w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs">FlowPay</p>
                    <p className="text-[9px] text-white/40">Fiat-to-USDC Settlements</p>
                  </div>
                </Link>
                <Link href="/markets" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 transition-colors mt-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <BarChart3 className="text-black w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs">Upfrica Markets</p>
                    <p className="text-[9px] text-white/40">RWA Tokenization Platform</p>
                  </div>
                </Link>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <Link href="/productss" className="text-[10px] font-bold text-white hover:text-white/60 transition-colors flex items-center justify-between">
                    View All Products
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-white/5 bg-white/5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">KYC Verified</span>
            </div>
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
              <div className="text-right">
                <p className="text-sm font-bold">Institutional User</p>
                <p className="text-xs text-white/40">ID: 8829-1102</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-white/40" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
