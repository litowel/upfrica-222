"use client";

import { useState, useEffect } from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Shield, Copy, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Wallets() {
  const [wallets, setWallets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const res = await fetch("/api/dashboard/wallets");
      const data = await res.json();
      setWallets(data.wallets);
    } catch (error) {
      toast.error("Failed to fetch wallets");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
    {[1, 2].map(i => <div key={i} className="h-64 bg-white rounded-[40px] border border-black/5" />)}
  </div>;

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Your Wallets</h1>
          <p className="text-black/40 mt-1">Manage your fiat and crypto balances.</p>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-black/80 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {wallets.map((wallet) => (
          <div 
            key={wallet.id} 
            className={`relative overflow-hidden p-10 rounded-[40px] border border-black/5 shadow-xl transition-all hover:scale-[1.02] ${
              wallet.currency === 'USDC' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  wallet.currency === 'USDC' ? 'bg-white/10' : 'bg-black/5'
                }`}>
                  <Wallet className={`w-7 h-7 ${wallet.currency === 'USDC' ? 'text-white' : 'text-black'}`} />
                </div>
                <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                  wallet.currency === 'USDC' ? 'bg-white/10 text-white/60' : 'bg-black/5 text-black/40'
                }`}>
                  {wallet.type}
                </div>
              </div>

              <div className="mb-12">
                <p className={`text-sm font-bold uppercase tracking-[0.2em] mb-2 ${
                  wallet.currency === 'USDC' ? 'text-white/40' : 'text-black/40'
                }`}>
                  {wallet.currency} Balance
                </p>
                <h2 className="text-5xl font-bold tracking-tighter">
                  {wallet.currency === 'USDC' ? '$' : '₦'}{wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
              </div>

              <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    wallet.currency === 'USDC' ? 'bg-emerald-400' : 'bg-blue-400'
                  }`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    wallet.currency === 'USDC' ? 'text-white/40' : 'text-black/40'
                  }`}>
                    Active
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className={`p-3 rounded-xl transition-colors ${
                    wallet.currency === 'USDC' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                  <button className={`p-3 rounded-xl transition-colors ${
                    wallet.currency === 'USDC' ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}>
                    <ArrowDownLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safe Custody Section */}
      <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black">Safe Custody</h3>
            <p className="text-black/40">Multi-sig wallet for enterprise-grade security.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-black/5 p-6 rounded-2xl border border-black/5">
              <label className="text-xs font-bold uppercase tracking-widest text-black/40 block mb-2">Safe Address</label>
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono font-bold text-black flex-1 truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-black/40" />
                </button>
                <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-black/40" />
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-black/80 transition-all">
                Withdraw to Safe
              </button>
              <button className="flex-1 bg-white border border-black/10 py-4 rounded-2xl font-bold hover:bg-black/5 transition-all">
                Manage Owners
              </button>
            </div>
          </div>
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col justify-center text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Safe Balance</p>
            <h4 className="text-3xl font-bold text-emerald-900">$12,450.00</h4>
            <p className="text-xs text-emerald-600 mt-2">USDC on Polygon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
