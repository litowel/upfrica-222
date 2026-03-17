"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Coins, 
  Zap, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ChevronDown,
  History as HistoryIcon,
  LayoutGrid,
  List,
  BarChart3,
  PieChart,
  DollarSign,
  Calendar,
  Download,
  ShoppingCart,
  ArrowLeftRight
} from "lucide-react";

const activities = [
  {
    id: "1",
    type: "Buy Order",
    asset: "Lagos Prime Commercial",
    amount: "$12,734.40",
    tokens: 120,
    date: "2026-03-15 14:42:01",
    status: "Filled",
    icon: ShoppingCart,
    color: "text-emerald-500"
  },
  {
    id: "2",
    type: "Withdrawal",
    asset: "USDC Wallet",
    amount: "$5,000.00",
    tokens: null,
    date: "2026-03-12 09:15:30",
    status: "Completed",
    icon: ArrowUpRight,
    color: "text-white/40"
  },
  {
    id: "3",
    type: "Sell Order",
    asset: "Nairobi Logistics Hub",
    amount: "$2,100.00",
    tokens: 8,
    date: "2026-03-10 16:22:12",
    status: "Filled",
    icon: ArrowLeftRight,
    color: "text-red-500"
  },
  {
    id: "4",
    type: "KYC Update",
    asset: "Account Verification",
    amount: null,
    tokens: null,
    date: "2026-03-05 11:00:00",
    status: "Verified",
    icon: ShieldCheck,
    color: "text-blue-500"
  },
  {
    id: "5",
    type: "Deposit",
    asset: "USDC Wallet",
    amount: "$10,000.00",
    tokens: null,
    date: "2026-03-01 10:30:45",
    status: "Completed",
    icon: Coins,
    color: "text-emerald-500"
  }
];

export default function History() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Activity History</h1>
          <p className="text-white/40">A complete log of your platform interactions and trades.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Download History
          </button>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold">Recent Activity</h3>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Last 30 Days
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search activity..." 
                className="pl-12 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-xs font-medium transition-all"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Activity Type</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Asset / Target</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Amount / Tokens</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Date & Time</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Status</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activities.map((activity) => (
                <tr key={activity.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <p className="font-bold">{activity.type}</p>
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold text-white/40">{activity.asset}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="space-y-1">
                      {activity.amount && <p className="font-bold font-mono">{activity.amount}</p>}
                      {activity.tokens && <p className="text-xs text-white/20 font-mono">{activity.tokens} tokens</p>}
                      {!activity.amount && !activity.tokens && <p className="text-white/20">--</p>}
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono text-white/40">{activity.date}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'Filled' || activity.status === 'Completed' || activity.status === 'Verified' 
                          ? 'bg-emerald-500' 
                          : 'bg-amber-500'
                      }`} />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{activity.status}</span>
                    </div>
                  </td>
                  <td className="py-6 text-right">
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-white/20" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
