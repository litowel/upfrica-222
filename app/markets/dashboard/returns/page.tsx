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
  History,
  LayoutGrid,
  List,
  BarChart3,
  PieChart,
  DollarSign,
  Calendar,
  Download
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from "recharts";

const performanceData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];

const returns = [
  {
    id: "1",
    asset: "Lagos Prime Commercial",
    type: "Dividend",
    amount: "$1,245.00",
    date: "2026-03-15",
    status: "Paid",
    method: "USDC Wallet"
  },
  {
    id: "2",
    asset: "Tech Growth Fund II",
    type: "Capital Gain",
    amount: "$4,500.00",
    date: "2026-03-10",
    status: "Paid",
    method: "USDC Wallet"
  },
  {
    id: "3",
    asset: "Nairobi Logistics Hub",
    type: "Dividend",
    amount: "$850.00",
    date: "2026-03-01",
    status: "Paid",
    method: "USDC Wallet"
  },
  {
    id: "4",
    asset: "Solar Energy Bond",
    type: "Interest",
    amount: "$345.00",
    date: "2026-02-28",
    status: "Paid",
    method: "USDC Wallet"
  }
];

export default function Returns() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Returns & Yield</h1>
          <p className="text-white/40">Track your passive income and capital appreciation.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Returns Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/20">Total Returns (YTD)</p>
            <h3 className="text-5xl font-bold tracking-tight">$12,450.00</h3>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              +8.4%
            </div>
            <span className="text-xs text-white/20 font-bold uppercase tracking-widest">vs Last Year</span>
          </div>
        </div>

        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/20">Next Scheduled Payout</p>
            <h3 className="text-5xl font-bold tracking-tight">$2,100.00</h3>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 text-white/40 font-bold text-sm">
              <Calendar className="w-4 h-4" />
              April 1st, 2026
            </div>
          </div>
        </div>

        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/20">Average Monthly Yield</p>
            <h3 className="text-5xl font-bold tracking-tight">$1,850.00</h3>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              +2.1%
            </div>
            <span className="text-xs text-white/20 font-bold uppercase tracking-widest">Avg. Growth</span>
          </div>
        </div>
      </div>

      {/* Returns History Table */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold">Returns History</h3>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Last 12 Months
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search returns..." 
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
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Asset</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Type</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Amount</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Date</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Status</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Method</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {returns.map((ret) => (
                <tr key={ret.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pr-6">
                    <p className="font-bold">{ret.asset}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">{ret.type}</span>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono text-emerald-500">{ret.amount}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono text-white/40">{ret.date}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{ret.status}</span>
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">{ret.method}</p>
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
