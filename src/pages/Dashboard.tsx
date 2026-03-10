import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, Building2, CreditCard, RefreshCw, Plus, Code2 } from "lucide-react";
import { useRoute, Link } from "wouter";

export default function Dashboard() {
  const [match, params] = useRoute<{ subpage: string }>("/dashboard/:subpage*");
  const subpage = (match && params?.subpage) ? params.subpage : "overview";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 capitalize">
            {subpage === "overview" ? "Treasury Overview" : subpage.replace("-", " ")}
          </h1>
          <p className="text-neutral-500">Welcome back, John. Here's your financial summary.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2">
            <ArrowDownLeft size={16} /> Deposit
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <ArrowUpRight size={16} /> Send
          </button>
        </div>
      </div>

      {subpage === "overview" && <OverviewContent />}
      {subpage === "treasury" && <TreasuryContent />}
      {subpage === "trading" && <TradingContent />}
      {subpage === "developers" && <DevelopersContent />}
      {subpage === "settings" && <div className="p-8 bg-white rounded-xl border border-neutral-200">Settings Panel Placeholder</div>}
    </div>
  );
}

function OverviewContent() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value={124500.00} 
          change={+12.5} 
          icon={Wallet}
          color="indigo"
        />
        <StatCard 
          title="Active Yield" 
          value={4250.00} 
          change={+2.1} 
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard 
          title="Tokenized Assets" 
          value={85000.00} 
          change={0} 
          icon={Building2}
          color="purple"
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Assets & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Asset Allocation */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-6">Asset Allocation</h3>
            <div className="space-y-4">
              <AssetRow name="USDC (Stablecoin)" amount={45000} allocation={36} icon="💵" />
              <AssetRow name="Ethereum" amount={32000} allocation={25} icon="⟠" />
              <AssetRow name="Real Estate Fund A" amount={25000} allocation={20} icon="🏢" />
              <AssetRow name="Bitcoin" amount={22500} allocation={19} icon="₿" />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              <TransactionRow 
                type="Received" 
                entity="Paystack Settlement" 
                amount={+1250.00} 
                date="Today, 10:23 AM" 
                status="Completed"
              />
              <TransactionRow 
                type="Investment" 
                entity="Pionex Grid Bot" 
                amount={-500.00} 
                date="Yesterday" 
                status="Active"
              />
              <TransactionRow 
                type="Sent" 
                entity="Vendor Payment" 
                amount={-240.00} 
                date="Mar 12" 
                status="Completed"
              />
            </div>
          </div>

        </div>

        {/* Right Column - Actions & Cards */}
        <div className="space-y-8">
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-4">Automated Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <RefreshCw size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-900">Convert Fiat to Crypto</div>
                  <div className="text-xs text-neutral-500">Powered by Transak</div>
                </div>
              </button>
              
              <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Building2 size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-900">Invest in Real Estate</div>
                  <div className="text-xs text-neutral-500">Powered by Thirdweb</div>
                </div>
              </button>

              <button className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-900">Start Trading Bot</div>
                  <div className="text-xs text-neutral-500">Powered by Pionex</div>
                </div>
              </button>
            </div>
          </div>

          {/* Virtual Card */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-xl text-white shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-6 bg-white/20 rounded"></div>
              <CreditCard className="text-white/50" />
            </div>
            <div className="font-mono text-xl tracking-widest mb-4">
              •••• •••• •••• 4242
            </div>
            <div className="flex justify-between text-xs text-white/60 uppercase tracking-wider">
              <div>Card Holder</div>
              <div>Expires</div>
            </div>
            <div className="flex justify-between font-medium">
              <div>John Doe</div>
              <div>12/28</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function TreasuryContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <h3 className="font-bold mb-4">Fiat Accounts</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🇺🇸</div>
              <div>
                <div className="font-medium">USD Account</div>
                <div className="text-xs text-neutral-500">Citibank via UpFrica</div>
              </div>
            </div>
            <div className="font-mono font-medium">$12,450.00</div>
          </div>
          <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🇳🇬</div>
              <div>
                <div className="font-medium">NGN Account</div>
                <div className="text-xs text-neutral-500">Access Bank via Paystack</div>
              </div>
            </div>
            <div className="font-mono font-medium">₦4,500,000.00</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <h3 className="font-bold mb-4">Crypto Treasury (Safe Multisig)</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">USDC</div>
              <div>
                <div className="font-medium">USDC Treasury</div>
                <div className="text-xs text-neutral-500">0x742...38f44e</div>
              </div>
            </div>
            <div className="font-mono font-medium">45,000.00 USDC</div>
          </div>
          <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">BTC</div>
              <div>
                <div className="font-medium">Bitcoin Vault</div>
                <div className="text-xs text-neutral-500">bc1q...8z4l</div>
              </div>
            </div>
            <div className="font-mono font-medium">0.45 BTC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradingContent() {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 text-white p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Automated Trading Bots</h2>
        <p className="text-indigo-100 mb-6">Powered by Pionex Algorithms</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 flex items-center gap-2">
            <Plus size={16} /> Create New Bot
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <div className="flex justify-between items-start mb-4">
            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">RUNNING</div>
            <div className="text-green-600 font-medium text-sm">+4.2%</div>
          </div>
          <h3 className="font-bold text-lg mb-1">ETH/USDC Grid</h3>
          <p className="text-sm text-neutral-500 mb-4">Arbitrage Strategy</p>
          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-green-500 h-full w-[65%]"></div>
          </div>
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Invested: $5,000</span>
            <span>Profit: $210</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 opacity-75">
          <div className="flex justify-between items-start mb-4">
            <div className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-bold rounded">PAUSED</div>
            <div className="text-neutral-600 font-medium text-sm">0.0%</div>
          </div>
          <h3 className="font-bold text-lg mb-1">BTC Moon Bot</h3>
          <p className="text-sm text-neutral-500 mb-4">Trend Following</p>
          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-2">
            <div className="bg-neutral-300 h-full w-[0%]"></div>
          </div>
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Invested: $0</span>
            <span>Profit: $0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DevelopersContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">API Keys</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
            Generate New Key
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-200 text-indigo-600">
                <Code2 size={20} />
              </div>
              <div>
                <div className="font-medium font-mono text-sm">upfrica_live_...8x92</div>
                <div className="text-xs text-neutral-500">Production Key • Created Mar 1, 2026</div>
              </div>
            </div>
            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ACTIVE</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-200 text-orange-600">
                <Code2 size={20} />
              </div>
              <div>
                <div className="font-medium font-mono text-sm">upfrica_test_...k2m9</div>
                <div className="text-xs text-neutral-500">Sandbox Key • Created Feb 28, 2026</div>
              </div>
            </div>
            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ACTIVE</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <h3 className="font-bold text-lg mb-4">White-Label App Builder</h3>
        <p className="text-neutral-600 mb-6">
          Configure your branded fintech application.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-neutral-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-colors">
            <div className="font-medium mb-1">Brand Colors</div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600"></div>
              <div className="w-6 h-6 rounded-full bg-black"></div>
            </div>
          </div>
          <div className="p-4 border border-neutral-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-colors">
            <div className="font-medium mb-1">Custom Domain</div>
            <div className="text-sm text-neutral-500">app.yourdomain.com</div>
          </div>
        </div>
        <Link href="/developers/builder">
          <a className="block w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors text-center">
            Launch App Builder
          </a>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, color }: any) {
  const colors: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-neutral-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-1">{formatCurrency(value)}</h3>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className={change >= 0 ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
          {change >= 0 ? "+" : ""}{change}%
        </span>
        <span className="text-neutral-400">vs last month</span>
      </div>
    </div>
  );
}

function AssetRow({ name, amount, allocation, icon }: any) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-lg">
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-neutral-900">{name}</div>
          <div className="text-xs text-neutral-500">{allocation}% of portfolio</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-neutral-900">{formatCurrency(amount)}</div>
      </div>
    </div>
  );
}

function TransactionRow({ type, entity, amount, date, status }: any) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          type === "Received" ? "bg-emerald-50 text-emerald-600" : 
          type === "Sent" ? "bg-neutral-100 text-neutral-600" :
          "bg-indigo-50 text-indigo-600"
        }`}>
          {type === "Received" ? <ArrowDownLeft size={14} /> : 
           type === "Sent" ? <ArrowUpRight size={14} /> :
           <RefreshCw size={14} />}
        </div>
        <div>
          <div className="text-sm font-medium text-neutral-900">{entity}</div>
          <div className="text-xs text-neutral-500">{date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-sm font-medium ${amount > 0 ? "text-emerald-600" : "text-neutral-900"}`}>
          {amount > 0 ? "+" : ""}{formatCurrency(amount)}
        </div>
        <div className="text-xs text-neutral-500">{status}</div>
      </div>
    </div>
  );
}
