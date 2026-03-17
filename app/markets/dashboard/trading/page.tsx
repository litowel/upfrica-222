"use client";

import { useState } from "react";
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
  Plus,
  Search,
  ChevronDown,
  History,
  LayoutGrid,
  List
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

const chartData = [
  { time: "09:00", price: 102.45 },
  { time: "10:00", price: 103.12 },
  { time: "11:00", price: 102.89 },
  { time: "12:00", price: 104.56 },
  { time: "13:00", price: 105.23 },
  { time: "14:00", price: 104.87 },
  { time: "15:00", price: 106.12 },
];

const orderBook = {
  asks: [
    { price: 106.45, size: 450, total: 47902.5 },
    { price: 106.32, size: 120, total: 12758.4 },
    { price: 106.21, size: 85, total: 9027.85 },
    { price: 106.15, size: 230, total: 24414.5 },
  ],
  bids: [
    { price: 105.95, size: 150, total: 15892.5 },
    { price: 105.82, size: 320, total: 33862.4 },
    { price: 105.71, size: 95, total: 10042.45 },
    { price: 105.65, size: 410, total: 43316.5 },
  ]
};

export default function TradingDesk() {
  const [orderType, setOrderType] = useState("buy");
  const [price, setPrice] = useState("106.12");
  const [quantity, setQuantity] = useState("10");

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Trading Header */}
      <div className="flex items-center justify-between p-6 rounded-[32px] border border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Lagos Prime Commercial</h2>
                <ChevronDown className="w-4 h-4 text-white/20" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/20">LPC-2026-X</p>
            </div>
          </div>
          <div className="h-10 w-px bg-white/5 mx-4" />
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Last Price</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold font-mono">$106.12</span>
              <span className="text-xs font-bold text-emerald-500">+2.45%</span>
            </div>
          </div>
          <div className="h-10 w-px bg-white/5 mx-4" />
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">24h Volume</p>
            <p className="text-lg font-bold font-mono">$1.2M</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white">
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white">
            <List className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white">
            <History className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Chart Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex-1 p-8 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 p-1 rounded-xl bg-white/5 border border-white/5">
                {["1H", "4H", "1D", "1W", "1M"].map((tf) => (
                  <button 
                    key={tf}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      tf === "1H" ? "bg-white text-black" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Live Data</span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 600 }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 600 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a0a0a', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '12px'
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="h-64 p-8 rounded-[40px] border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/20 mb-6">Recent Market Trades</h3>
            <div className="space-y-4 overflow-y-auto h-full pr-2">
              {[
                { price: 106.12, size: 45, time: "15:42:01", type: "buy" },
                { price: 106.11, size: 120, time: "15:41:55", type: "sell" },
                { price: 106.12, size: 12, time: "15:41:42", type: "buy" },
                { price: 106.14, size: 85, time: "15:41:30", type: "buy" },
                { price: 106.10, size: 230, time: "15:41:12", type: "sell" },
              ].map((trade, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-mono">
                  <span className={trade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'}>${trade.price}</span>
                  <span className="text-white/40">{trade.size} tokens</span>
                  <span className="text-white/20">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Book */}
        <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/20 mb-8">Order Book</h3>
          <div className="flex-1 flex flex-col min-h-0">
            {/* Asks */}
            <div className="flex-1 space-y-2 overflow-hidden">
              {orderBook.asks.map((ask, i) => (
                <div key={i} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-red-500/5 origin-right scale-x-0 group-hover:scale-x-100 transition-transform" />
                  <div className="relative flex items-center justify-between text-xs font-mono py-1 px-2">
                    <span className="text-red-500">${ask.price}</span>
                    <span className="text-white/40">{ask.size}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="py-6 text-center border-y border-white/5 my-4">
              <p className="text-xl font-bold font-mono">$106.12</p>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Spread: $0.17 (0.16%)</p>
            </div>

            {/* Bids */}
            <div className="flex-1 space-y-2 overflow-hidden">
              {orderBook.bids.map((bid, i) => (
                <div key={i} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-emerald-500/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                  <div className="relative flex items-center justify-between text-xs font-mono py-1 px-2">
                    <span className="text-emerald-500">${bid.price}</span>
                    <span className="text-white/40">{bid.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution Panel */}
        <div className="p-8 rounded-[40px] border border-white/5 bg-white/[0.02] flex flex-col">
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/5 mb-8">
            <button 
              onClick={() => setOrderType("buy")}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                orderType === "buy" ? "bg-emerald-500 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              BUY
            </button>
            <button 
              onClick={() => setOrderType("sell")}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                orderType === "sell" ? "bg-red-500 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              SELL
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                <span>Price (USD)</span>
                <span>Market: $106.12</span>
              </div>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-mono font-bold transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                <span>Quantity (Tokens)</span>
                <span>Available: 1,240</span>
              </div>
              <input 
                type="text" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-mono font-bold transition-all"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {["25%", "50%", "75%", "100%"].map((p) => (
                <button key={p} className="py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  {p}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Estimated Total</span>
                <span className="font-bold font-mono">${(parseFloat(price) * parseFloat(quantity)).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Trading Fee (0.1%)</span>
                <span className="font-bold font-mono">${(parseFloat(price) * parseFloat(quantity) * 0.001).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Settlement Method</span>
                <span className="font-bold text-emerald-500">Escrow.com</span>
              </div>
            </div>
          </div>

          <button 
            className={`w-full py-5 rounded-2xl font-bold text-lg mt-8 hover:scale-[1.02] transition-all ${
              orderType === 'buy' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
