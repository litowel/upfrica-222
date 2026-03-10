import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, Building2, CreditCard, RefreshCw, Plus, Code2 } from "lucide-react";
import { useRoute, Link, useLocation } from "wouter";
import { usePaystackPayment } from "react-paystack";

export default function Dashboard() {
  const [match, params] = useRoute<{ subpage: string }>("/dashboard/:subpage*");
  const subpage = (match && params?.subpage) ? params.subpage : "overview";
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [isDepositing, setIsDepositing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("upfrica_user");
    if (!storedUser) {
      setLocation("/onboarding");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setBalance(parsedUser.balance || 0);
    }
  }, [setLocation]);

  if (!user) return null;

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: user.email || "user@example.com",
    amount: 50000 * 100, // 50,000 NGN in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onSuccess = async (reference: any) => {
    setIsDepositing(true);
    try {
      // Verify transaction with our backend
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: reference.reference }),
      });
      const data = await res.json();
      
      if (data.status === "success") {
        // Update balance (assuming 1 USD = 1500 NGN for simplicity, or just add the amount)
        const addedAmount = 50000 / 1500;
        setBalance(prev => {
          const newBalance = prev + addedAmount;
          const updatedUser = { ...user, balance: newBalance };
          localStorage.setItem("upfrica_user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          return newBalance;
        }); 
        alert("Deposit successful!");
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during verification.");
    } finally {
      setIsDepositing(false);
    }
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 capitalize">
            {subpage === "overview" ? "Treasury Overview" : subpage.replace("-", " ")}
          </h1>
          <p className="text-neutral-500">Welcome back, {user.name?.split(' ')[0] || 'User'}. Here's your financial summary.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => initializePayment({ onSuccess, onClose })}
            disabled={isDepositing}
            className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowDownLeft size={16} /> {isDepositing ? "Processing..." : "Deposit"}
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <ArrowUpRight size={16} /> Send
          </button>
        </div>
      </div>

      {subpage === "overview" && <OverviewContent balance={balance} />}
      {subpage === "treasury" && <TreasuryContent balance={balance} />}
      {subpage === "trading" && <TradingContent />}
      {subpage === "developers" && <DevelopersContent />}
      {subpage === "settings" && <div className="p-8 bg-white rounded-xl border border-neutral-200">Settings Panel Placeholder</div>}
    </div>
  );
}

function OverviewContent({ balance }: { balance: number }) {
  const hasBalance = balance > 0;

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value={balance} 
          change={hasBalance ? +12.5 : 0} 
          icon={Wallet}
          color="indigo"
        />
        <StatCard 
          title="Active Yield" 
          value={hasBalance ? 4250.00 : 0} 
          change={hasBalance ? +2.1 : 0} 
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard 
          title="Tokenized Assets" 
          value={hasBalance ? 85000.00 : 0} 
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
            {hasBalance ? (
              <div className="space-y-4">
                <AssetRow name="USDC (Stablecoin)" amount={45000} allocation={36} icon="💵" />
                <AssetRow name="Ethereum" amount={32000} allocation={25} icon="⟠" />
                <AssetRow name="Real Estate Fund A" amount={25000} allocation={20} icon="🏢" />
                <AssetRow name="Bitcoin" amount={22500} allocation={19} icon="₿" />
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                <p>No assets allocated yet.</p>
                <p className="text-sm mt-1">Deposit funds to start building your portfolio.</p>
              </div>
            )}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-6">Recent Transactions</h3>
            {hasBalance ? (
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
            ) : (
              <div className="text-center py-8 text-neutral-500">
                <p>No recent transactions.</p>
              </div>
            )}
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

function TreasuryContent({ balance }: { balance?: number }) {
  const hasBalance = (balance || 0) > 0;

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
            <div className="font-mono font-medium">{hasBalance ? "$12,450.00" : "$0.00"}</div>
          </div>
          <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">🇳🇬</div>
              <div>
                <div className="font-medium">NGN Account</div>
                <div className="text-xs text-neutral-500">Access Bank via Paystack</div>
              </div>
            </div>
            <div className="font-mono font-medium">{hasBalance ? "₦4,500,000.00" : "₦0.00"}</div>
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
            <div className="font-mono font-medium">{hasBalance ? "45,000.00 USDC" : "0.00 USDC"}</div>
          </div>
          <div className="flex justify-between items-center p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">BTC</div>
              <div>
                <div className="font-medium">Bitcoin Vault</div>
                <div className="text-xs text-neutral-500">bc1q...8z4l</div>
              </div>
            </div>
            <div className="font-mono font-medium">{hasBalance ? "0.45 BTC" : "0.00 BTC"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradingContent() {
  const [bots, setBots] = useState([
    { id: 'grid-1', name: 'ETH/USDC Grid', strategy: 'Arbitrage Strategy', status: 'RUNNING', profit: 4.2, invested: 5000, profitAmount: 210, progress: 65 },
    { id: 'moon-1', name: 'BTC Moon Bot', strategy: 'Trend Following', status: 'PAUSED', profit: 0.0, invested: 0, profitAmount: 0, progress: 0 },
    { id: 'mm-1', name: 'SOL Market Maker', strategy: 'Market Making', status: 'AVAILABLE', profit: 0.0, invested: 0, profitAmount: 0, progress: 0 }
  ]);
  const [isActivating, setIsActivating] = useState<string | null>(null);

  const activateBot = async (botId: string, name: string) => {
    setIsActivating(botId);
    try {
      const res = await fetch("/api/trading/pionex/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botType: name, amount: 1000 }), // Default $1000 for demo
      });
      const data = await res.json();
      
      if (data.status === "success") {
        setBots(prev => prev.map(bot => 
          bot.id === botId 
            ? { ...bot, status: 'RUNNING', invested: 1000, progress: 10 } 
            : bot
        ));
        alert(`${name} activated successfully!`);
      } else {
        alert(`Failed to activate bot: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while communicating with Pionex.");
    } finally {
      setIsActivating(null);
    }
  };

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
        {bots.map(bot => (
          <div key={bot.id} className={`bg-white p-6 rounded-xl border border-neutral-200 ${bot.status === 'PAUSED' ? 'opacity-75' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`px-2 py-1 text-xs font-bold rounded ${
                bot.status === 'RUNNING' ? 'bg-green-100 text-green-700' : 
                bot.status === 'PAUSED' ? 'bg-neutral-100 text-neutral-600' : 
                'bg-blue-100 text-blue-700'
              }`}>
                {bot.status}
              </div>
              <div className={`${bot.profit > 0 ? 'text-green-600' : 'text-neutral-600'} font-medium text-sm`}>
                {bot.profit > 0 ? '+' : ''}{bot.profit}%
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1">{bot.name}</h3>
            <p className="text-sm text-neutral-500 mb-4">{bot.strategy}</p>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden mb-2">
              <div className={`${bot.status === 'RUNNING' ? 'bg-green-500' : 'bg-neutral-300'} h-full`} style={{ width: `${bot.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mb-4">
              <span>Invested: ${bot.invested}</span>
              <span>Profit: ${bot.profitAmount}</span>
            </div>
            
            {bot.status !== 'RUNNING' && (
              <button 
                onClick={() => activateBot(bot.id, bot.name)}
                disabled={isActivating === bot.id}
                className="w-full py-2 mt-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 disabled:opacity-50 transition-colors"
              >
                {isActivating === bot.id ? "Activating..." : "Activate Bot"}
              </button>
            )}
          </div>
        ))}
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
