"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Building2, 
  Coins, 
  Zap, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  MoreHorizontal,
  Plus
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
  Bar
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

const assets = [
  {
    id: "1",
    name: "Lagos Prime Commercial",
    type: "Real Estate",
    value: "$2,450,000",
    yield: "8.4%",
    status: "Active",
    tokens: 120,
    performance: "+12.4%"
  },
  {
    id: "2",
    name: "Tech Growth Fund II",
    type: "Private Equity",
    value: "$1,200,000",
    yield: "14.2%",
    status: "Funding",
    tokens: 450,
    performance: "+18.2%"
  },
  {
    id: "3",
    name: "Nairobi Logistics Hub",
    type: "Real Estate",
    value: "$850,000",
    yield: "9.1%",
    status: "Active",
    tokens: 85,
    performance: "+5.4%"
  }
];

export default function MarketsDashboard() {
  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Portfolio Value", value: "$4,500,000", change: "+12.5%", icon: Coins, color: "text-emerald-500" },
          { label: "Annualized Yield", value: "11.4%", change: "+1.2%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Active Investments", value: "12 Assets", change: "0", icon: Building2, color: "text-white/40" },
          { label: "Trading Volume (24h)", value: "$245,000", change: "-2.4%", icon: Activity, color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-[32px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xs font-bold ${stat.color} bg-white/5 px-3 py-1.5 rounded-full`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/20 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold mb-2">Portfolio Performance</h3>
              <p className="text-sm text-white/40">Consolidated returns across all tokenized assets.</p>
            </div>
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
              {["1D", "1W", "1M", "1Y", "ALL"].map((period) => (
                <button 
                  key={period}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    period === "1M" ? "bg-white text-black" : "text-white/40 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 11, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff20', fontSize: 11, fontWeight: 600 }}
                  dx={-15}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#fff" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
          <h3 className="text-2xl font-bold mb-8">Asset Allocation</h3>
          <div className="space-y-8">
            {[
              { label: "Real Estate", value: 65, color: "bg-blue-500" },
              { label: "Private Equity", value: 20, color: "bg-amber-500" },
              { label: "Fixed Income", value: 10, color: "bg-emerald-500" },
              { label: "Venture Capital", value: 5, color: "bg-purple-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white/40">{item.label}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/5">
            <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:scale-105 transition-all">
              <Plus className="w-4 h-4" />
              Add New Asset
            </button>
          </div>
        </div>
      </div>

      {/* Asset Listings Table */}
      <div className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-2">Institutional Asset Listings</h3>
            <p className="text-sm text-white/40">Live tokenized assets available for trading.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors">
            View All Assets
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Asset Name</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Type</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Total Value</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Target Yield</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Performance</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20">Status</th>
                <th className="pb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assets.map((asset) => (
                <tr key={asset.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-white/40" />
                      </div>
                      <div>
                        <p className="font-bold">{asset.name}</p>
                        <p className="text-xs text-white/20 font-mono">ID: {asset.id}002-X</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">{asset.type}</span>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold">{asset.value}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="font-bold text-emerald-500">{asset.yield}</p>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <p className="font-bold text-emerald-500">{asset.performance}</p>
                    </div>
                  </td>
                  <td className="py-6 pr-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${asset.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{asset.status}</span>
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
