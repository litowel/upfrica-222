"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Zap,
  Shield,
  Loader2,
  X
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { toast } from "react-hot-toast";

const data = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 2000 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 1890 },
  { name: "Sat", revenue: 2390 },
  { name: "Sun", revenue: 3490 },
];

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentProvider, setPaymentProvider] = useState("PAYAZA");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch("/api/payments/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount,
          currency: "NGN",
          provider: paymentProvider,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to initiate payment");

      toast.success(`Payment initiated via ${paymentProvider}!`);
      
      // Simulate webhook success for demo purposes
      setTimeout(async () => {
        const webhookUrl = paymentProvider === 'PAYAZA' 
          ? '/api/payments/payaza/webhook' 
          : '/api/payments/paystack/webhook';
        
        const webhookData = paymentProvider === 'PAYAZA' ? {
          transaction_reference: data.reference,
          amount: paymentAmount,
          currency: "NGN",
          customer_email: stats.userEmail, // We'll need to add this to stats
          status: "success"
        } : {
          event: "charge.success",
          data: {
            reference: data.reference,
            amount: parseFloat(paymentAmount) * 100,
            currency: "NGN",
            customer: { email: stats.userEmail }
          }
        };

        const signatureHeader = paymentProvider === 'PAYAZA' ? 'x-payaza-signature' : 'x-paystack-signature';

        await fetch(webhookUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            [signatureHeader]: "simulated_signature"
          },
          body: JSON.stringify(webhookData),
        });

        toast.success("Payment settled in USDC!");
        fetchStats();
      }, 3000);

      setIsPaymentModalOpen(false);
      setPaymentAmount("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white rounded-3xl border border-black/5" />)}
    </div>
    <div className="h-96 bg-white rounded-3xl border border-black/5" />
  </div>;

  return (
    <div className="space-y-8">
      {/* Header with Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-black/40 mt-1">Welcome back, {stats?.businessName || "Merchant"}.</p>
        </div>
        <button 
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black/80 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
        >
          <Plus className="w-5 h-5" />
          Receive Payment
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <p className="text-sm font-bold text-black/40 uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-2xl font-bold text-black mt-1">₦{stats?.totalRevenue?.toLocaleString() || "0"}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-bold text-black/40 bg-black/5 px-2 py-1 rounded-full">Settled</span>
          </div>
          <p className="text-sm font-bold text-black/40 uppercase tracking-wider">USDC Balance</p>
          <h3 className="text-2xl font-bold text-black mt-1">${stats?.walletBalance?.toLocaleString() || "0.00"}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-bold text-black/40 bg-black/5 px-2 py-1 rounded-full">Live</span>
          </div>
          <p className="text-sm font-bold text-black/40 uppercase tracking-wider">Active Transactions</p>
          <h3 className="text-2xl font-bold text-black mt-1">{stats?.activeTransactions || "0"}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-black" />
            </div>
            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">KYB Verified</span>
          </div>
          <p className="text-sm font-bold text-black/40 uppercase tracking-wider">Account Status</p>
          <h3 className="text-2xl font-bold text-black mt-1">{stats?.kybStatus || "PENDING"}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-black">Revenue Overview</h3>
              <p className="text-sm text-black/40">Daily performance of your fiat collections.</p>
            </div>
            <select className="bg-black/5 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#999', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#999', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#000" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
          <h3 className="text-xl font-bold text-black mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {stats?.recentTransactions?.length > 0 ? (
              stats.recentTransactions.map((tx: any) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'PAYMENT' ? 'bg-emerald-50' : 'bg-blue-50'
                    }`}>
                      {tx.type === 'PAYMENT' ? (
                        <ArrowDownLeft className={`w-5 h-5 ${tx.type === 'PAYMENT' ? 'text-emerald-500' : 'text-blue-500'}`} />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-black">{tx.type}</p>
                        {tx.provider && (
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                            tx.provider === 'PAYAZA' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {tx.provider}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-black/40">{new Date(tx.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-black">
                      {tx.type === 'PAYMENT' ? '+' : '-'}{tx.amount} {tx.currency}
                    </p>
                    <p className="text-xs text-black/40">{tx.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="w-12 h-12 text-black/10 mb-4" />
                <p className="text-sm font-bold text-black/40">No recent activity</p>
                <p className="text-xs text-black/20">Your transactions will appear here.</p>
              </div>
            )}
          </div>
          <button className="w-full mt-8 py-4 rounded-2xl bg-black/5 text-sm font-bold text-black hover:bg-black/10 transition-all">
            View All Transactions
          </button>
        </div>
      </div>
      
      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-black/40" />
            </button>

            <div className="mb-8">
              <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black tracking-tight">Receive Payment</h3>
              <p className="text-black/40 mt-2">Collect fiat from your customers instantly.</p>
            </div>

            <form onSubmit={handleInitiatePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1">Amount (NGN)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-black/20">₦</span>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-10 pr-5 py-5 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 outline-none text-xl font-bold text-black"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1">Payment Gateway</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider("PAYAZA")}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentProvider === "PAYAZA" 
                        ? "border-black bg-black text-white" 
                        : "border-black/5 bg-white text-black hover:border-black/20"
                    }`}
                  >
                    <Shield className={`w-5 h-5 ${paymentProvider === "PAYAZA" ? "text-white" : "text-black/40"}`} />
                    <span className="text-xs font-bold">Payaza (Main)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider("PAYSTACK")}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentProvider === "PAYSTACK" 
                        ? "border-black bg-black text-white" 
                        : "border-black/5 bg-white text-black hover:border-black/20"
                    }`}
                  >
                    <Zap className={`w-5 h-5 ${paymentProvider === "PAYSTACK" ? "text-white" : "text-black/40"}`} />
                    <span className="text-xs font-bold">Paystack</span>
                  </button>
                </div>
              </div>

              <button
                disabled={isProcessing}
                type="submit"
                className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-black/80 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-black/10 mt-4"
              >
                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Generate Link
                    <ArrowUpRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
