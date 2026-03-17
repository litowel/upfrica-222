"use client";

import { useState, useEffect } from "react";
import { 
  ArrowDownLeft, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search,
  Download,
  Zap
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Settlements() {
  const [settlements, setSettlements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettlements();
  }, []);

  const fetchSettlements = async () => {
    try {
      const res = await fetch("/api/dashboard/settlements");
      const data = await res.json();
      setSettlements(data.settlements);
    } catch (error) {
      toast.error("Failed to fetch settlements");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="animate-pulse space-y-4">
    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-3xl border border-black/5" />)}
  </div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Settlement History</h1>
          <p className="text-black/40 mt-1">Track your USDC payouts to your wallet.</p>
        </div>
        <button className="bg-black text-white px-6 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
          <Download className="w-5 h-5" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {settlements.length > 0 ? (
          settlements.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <Zap className="w-7 h-7 text-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-black">${s.amount.toLocaleString()} USDC</h3>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        s.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <p className="text-xs text-black/40 mt-1">Settled on {new Date(s.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-xl">
                    <code className="text-xs font-mono font-bold text-black/60 truncate max-w-[120px] md:max-w-[200px]">
                      {s.txHash || "Pending Hash..."}
                    </code>
                    {s.txHash && (
                      <a 
                        href={`https://polygonscan.com/tx/${s.txHash}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-black/20" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-black/20 uppercase tracking-widest">Transaction Hash</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white py-24 rounded-[40px] border border-black/5 text-center">
            <div className="w-20 h-20 bg-black/5 rounded-[32px] flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-black/10" />
            </div>
            <h3 className="text-xl font-bold text-black">No settlements yet</h3>
            <p className="text-sm text-black/40 mt-2 max-w-xs mx-auto">
              Once you start receiving payments, your USDC settlements will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
