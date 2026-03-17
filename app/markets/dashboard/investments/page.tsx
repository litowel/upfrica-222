"use client";

import { 
  Building2, 
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
  DollarSign
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

const investments = [
  {
    id: "1",
    name: "Lagos Prime Commercial",
    type: "Real Estate",
    invested: "$12,734.40",
    tokens: 120,
    avgPrice: "$106.12",
    currentPrice: "$108.45",
    returns: "+2.2%",
    status: "Active",
    performance: "+12.4%"
  },
  {
    id: "2",
    name: "Tech Growth Fund II",
    type: "Private Equity",
    invested: "$225,000.00",
    tokens: 450,
    avgPrice: "$500.00",
    currentPrice: "$542.12",
    returns: "+8.4%",
    status: "Active",
    performance: "+18.2%"
  },
  {
    id: "3",
    name: "Nairobi Logistics Hub",
    type: "Real Estate",
    invested: "$21,250.00",
    tokens: 85,
    avgPrice: "$250.00",
    currentPrice: "$248.12",
    returns: "-0.75%",
    status: "Active",
    performance: "+5.4%"
  }
];

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];

const pieData = [
  { name: 'Real Estate', value: 65 },
  { name: 'Private Equity', value: 20 },
  { name: 'Fixed Income', value: 10 },
  { name: 'Venture Capital', value: 5 },
];

export default function Investments() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">My Investments</h1>
          <p className="text-white/40">Consolidated view of your institutional asset portfolio.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            New Investment
          </button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-white/20">Total Portfolio Value</p>
            <h3 className="text-5xl font-bold tracking-tight">$258,984.40</h3>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              +12.4%
            </div>
            <span className="text-xs text-white/20 font-bold uppercase tracking-widest">Since Inception</span>
          </div>
        </div>

        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Asset Allocation</h3>
            <div className="flex items-center gap-6">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-40 w-full bg-white/5 rounded-3xl overflow-hidden flex">
            {pieData.map((item, i) => (
              <div 
                key={i} 
                className="h-full transition-all hover:opacity-80 cursor-pointer relative group"
                style={{ width: `${item.value}%`, backgroundColor: COLORS[i] }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white bg-black/50 px-2 py-1 rounded-full">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold">Investment Portfolio</h3>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              3 Assets
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Search portfolio..." 
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
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Invested</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Tokens</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Avg. Price</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Current</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Returns</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {investments.map((inv) => (
                <tr key={inv.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white/40" />
                      </div>
                      <div>
                        <p className="font-bold">{inv.name}</p>
                        <p className="text-xs text-white/20 font-mono">{inv.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono">{inv.invested}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono">{inv.tokens}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono text-white/40">{inv.avgPrice}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold font-mono">{inv.currentPrice}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <div className={`flex items-center gap-2 font-bold font-mono ${inv.returns.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                      {inv.returns.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {inv.returns}
                    </div>
                  </td>
                  <td className="py-6 text-right">
                    <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all">
                      Manage
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
