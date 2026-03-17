"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/dashboard/transactions");
      const data = await res.json();
      setTransactions(data.transactions);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="animate-pulse space-y-4">
    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-white rounded-2xl border border-black/5" />)}
  </div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white border border-black/5 focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white border border-black/5 px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-all">
            <Filter className="w-5 h-5" />
            Filters
          </button>
          <button className="flex-1 sm:flex-none bg-black text-white px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/5">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">Transaction</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">Type</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">Provider</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">Amount</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">USDC Value</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">Status</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40">Date</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-black/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-black/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tx.type === 'PAYMENT' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        {tx.type === 'PAYMENT' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{tx.reference || "No Reference"}</p>
                        <p className="text-xs text-black/40">ID: {tx.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-black/60">{tx.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      tx.provider === 'PAYAZA' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {tx.provider}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-black">{tx.amount.toLocaleString()} {tx.currency}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-black">${tx.usdcAmount?.toLocaleString() || "0.00"}</p>
                    <p className="text-[10px] font-bold text-black/20">@ {tx.rate || "0.00"}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {tx.status === 'COMPLETED' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : tx.status === 'PENDING' ? (
                        <Clock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-xs font-bold ${
                        tx.status === 'COMPLETED' ? 'text-emerald-500' : 
                        tx.status === 'PENDING' ? 'text-amber-500' : 'text-red-500'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-black/60">{new Date(tx.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-black/20">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-black/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5 text-black/40" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-black/5 rounded-[32px] flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-black/10" />
            </div>
            <h3 className="text-xl font-bold text-black">No transactions found</h3>
            <p className="text-sm text-black/40 mt-2 max-w-xs mx-auto">
              We couldn't find any transactions matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
