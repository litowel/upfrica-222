"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Settings, 
  LogOut, 
  Zap, 
  ShieldCheck,
  Menu,
  X,
  BarChart3,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);
    };
    fetchSession();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/login");
  };

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Transactions", icon: ArrowUpRight, href: "/dashboard/transactions" },
    { name: "Settlements", icon: ArrowDownLeft, href: "/dashboard/settlements" },
    { name: "Wallets", icon: Wallet, href: "/dashboard/wallets" },
    { name: "Security", icon: ShieldCheck, href: "/dashboard/security" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Upfrica Markets", icon: BarChart3, href: "/markets" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-black/5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">FlowPay</span>
          </div>

          <nav className="flex-1 space-y-2">
            <div className="px-4 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">Main Menu</p>
            </div>
            {navItems.filter(i => i.name !== "Upfrica Markets").map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-black text-white shadow-lg shadow-black/10" 
                      : "text-black/40 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-black/40"}`} />
                  {item.name}
                </Link>
              );
            })}

            <div className="px-4 py-4 mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">Ecosystem Products</p>
            </div>
            <Link
              href="/markets"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-black/40 hover:bg-black/5 hover:text-black transition-all"
            >
              <BarChart3 className="w-5 h-5 text-black/40" />
              Upfrica Markets
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-black/5 rounded-xl"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-black">
                {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
              </h2>
              <div className="h-6 w-px bg-black/5 mx-2" />
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs font-bold text-black/40 hover:text-black transition-colors">
                  Products
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white border border-black/5 rounded-2xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all mt-2">
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-black/5 transition-colors">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                      <Zap className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-black font-bold text-xs">FlowPay</p>
                      <p className="text-[9px] text-black/40">Fiat-to-USDC Settlements</p>
                    </div>
                  </Link>
                  <Link href="/markets" className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors mt-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                      <BarChart3 className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-black font-bold text-xs">Upfrica Markets</p>
                      <p className="text-[9px] text-black/40">RWA Tokenization Platform</p>
                    </div>
                  </Link>
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <Link href="/productss" className="text-[10px] font-bold text-black hover:text-black/60 transition-colors flex items-center justify-between">
                      View All Products
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-black">{user.businessName || user.name}</p>
              <p className="text-xs text-black/40">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center border border-black/5">
              <span className="text-sm font-bold text-black">
                {(user.name || "U").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
