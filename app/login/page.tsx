"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show2FA, setShow2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(show2FA ? { ...formData, twoFACode } : formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requires2FA) {
          setShow2FA(true);
          toast.success("Please enter your 2FA code.");
          return;
        }
        throw new Error(data.error || "Login failed");
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
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
          <h1 className="text-3xl font-bold tracking-tight text-black">
            {show2FA ? "Verify your identity" : "Welcome back"}
          </h1>
          <p className="text-black/40 mt-2">
            {show2FA ? "Enter the 6-digit code from your app." : "Log in to your FlowPay account."}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-xl shadow-black/5">
          <form onSubmit={handleSubmit} className="space-evenly flex flex-col gap-6">
            {!show2FA ? (
              <>
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
              </>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/40 ml-1">
                  2FA Code
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
                  <input
                    required
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    className="w-full pl-12 pr-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 transition-all outline-none text-black placeholder:text-black/20 tracking-[0.5em] font-mono text-xl"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {show2FA ? "Verify & Login" : "Log In"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {!show2FA && (
            <div className="mt-8 pt-8 border-t border-black/5 text-center">
              <p className="text-black/40 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-black font-bold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
