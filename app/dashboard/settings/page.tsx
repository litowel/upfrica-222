"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Briefcase
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [kybData, setKybData] = useState({
    registrationNumber: "",
    taxId: "",
    website: "",
    industry: "",
  });

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const res = await fetch("/api/auth/session");
    const data = await res.json();
    setUser(data.user);
  };

  const handleKybSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/kyb/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kybData),
      });

      if (!res.ok) throw new Error("Failed to submit KYB");

      toast.success("KYB data submitted for verification!");
      fetchSession();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Profile Section */}
      <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm">
        <h2 className="text-2xl font-bold text-black mb-8">Business Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1">Business Name</label>
            <div className="px-5 py-4 rounded-2xl bg-black/5 text-black font-medium border border-black/5">
              {user?.businessName}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1">Email Address</label>
            <div className="px-5 py-4 rounded-2xl bg-black/5 text-black font-medium border border-black/5">
              {user?.email}
            </div>
          </div>
        </div>
      </div>

      {/* KYB Verification Section */}
      <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-xl shadow-black/5">
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg ${
              user?.kybStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-500' : 
              user?.kybStatus === 'PENDING' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'
            }`}>
              {user?.kybStatus === 'VERIFIED' ? <CheckCircle2 className="w-8 h-8" /> : 
               user?.kybStatus === 'PENDING' ? <Clock className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">KYB Verification</h2>
              <p className="text-black/40 mt-1">Verify your business to unlock higher settlement limits.</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            user?.kybStatus === 'VERIFIED' ? 'bg-emerald-50 text-emerald-500' : 
            user?.kybStatus === 'PENDING' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'
          }`}>
            {user?.kybStatus}
          </div>
        </div>

        {user?.kybStatus === 'PENDING' && (
          <form onSubmit={handleKybSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Registration Number
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. RC-123456"
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 outline-none text-black font-medium"
                  value={kybData.registrationNumber}
                  onChange={(e) => setKybData({ ...kybData, registrationNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" />
                  Tax ID (TIN)
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 12345678-0001"
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 outline-none text-black font-medium"
                  value={kybData.taxId}
                  onChange={(e) => setKybData({ ...kybData, taxId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  Business Website
                </label>
                <input
                  required
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 outline-none text-black font-medium"
                  value={kybData.website}
                  onChange={(e) => setKybData({ ...kybData, website: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-2">
                  <Briefcase className="w-3 h-3" />
                  Industry
                </label>
                <select
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 outline-none text-black font-medium appearance-none"
                  value={kybData.industry}
                  onChange={(e) => setKybData({ ...kybData, industry: e.target.value })}
                >
                  <option value="">Select Industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="fintech">Fintech</option>
                  <option value="saas">SaaS</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="bg-black/5 p-6 rounded-3xl border border-black/5 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-black/40 flex-shrink-0 mt-1" />
              <p className="text-xs text-black/60 leading-relaxed">
                By submitting this form, you certify that the information provided is accurate and complete. 
                Verification typically takes 24-48 hours. We may contact you for additional documentation.
              </p>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-black/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  Submit for Verification
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

        {user?.kybStatus === 'VERIFIED' && (
          <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100 text-center">
            <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900">Your business is verified!</h3>
            <p className="text-emerald-700 mt-2 max-w-sm mx-auto">
              You have full access to all FlowPay features, including instant USDC settlements and higher limits.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
