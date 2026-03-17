"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessName: "",
    name: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Zap className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-black">Create your account</h1>
          <p className="text-black/40 mt-2">Start accepting global payments today.</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-xl shadow-black/5">
          <form onSubmit={handleSubmit} className="space-evenly flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/40 ml-1">
                Business Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 transition-all outline-none text-black placeholder:text-black/20"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/40 ml-1">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 transition-all outline-none text-black placeholder:text-black/20"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/40 ml-1">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 transition-all outline-none text-black placeholder:text-black/20"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-black/40 ml-1">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 transition-all outline-none text-black placeholder:text-black/20"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-black/5 text-center">
            <p className="text-black/40 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-black/40">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            No setup fees
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-black/40">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Instant USDC settlements
          </div>
        </div>
      </div>
    </div>
  );
}
