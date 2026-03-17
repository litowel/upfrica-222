"use client";

import { useState, useEffect } from "react";
import { Shield, ShieldCheck, ShieldAlert, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Security() {
  const [isLoading, setIsLoading] = useState(false);
  const [twoFAData, setTwoFAData] = useState<any>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const res = await fetch("/api/auth/session");
    const data = await res.json();
    setUser(data.user);
  };

  const setup2FA = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", { method: "POST" });
      const data = await res.json();
      setTwoFAData(data);
    } catch (error) {
      toast.error("Failed to setup 2FA");
    } finally {
      setIsLoading(false);
    }
  };

  const verify2FA = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verificationCode }),
      });

      if (!res.ok) throw new Error("Invalid code");

      toast.success("2FA enabled successfully!");
      setTwoFAData(null);
      fetchSession();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const disable2FA = async () => {
    if (!confirm("Are you sure you want to disable 2FA? This will make your account less secure.")) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/disable", { method: "POST" });
      if (!res.ok) throw new Error("Failed to disable 2FA");
      toast.success("2FA disabled");
      fetchSession();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-xl shadow-black/5">
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg ${
              user?.twoFactorEnabled ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
            }`}>
              {user?.twoFactorEnabled ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">Two-Factor Authentication</h2>
              <p className="text-black/40 mt-1">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
            user?.twoFactorEnabled ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
          }`}>
            {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
          </div>
        </div>

        {!user?.twoFactorEnabled && !twoFAData && (
          <div className="bg-black/5 p-8 rounded-3xl border border-dashed border-black/10 text-center">
            <Shield className="w-12 h-12 text-black/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-black mb-2">Protect your account</h3>
            <p className="text-sm text-black/40 mb-8 max-w-sm mx-auto">
              We recommend enabling 2FA to keep your funds and business data safe from unauthorized access.
            </p>
            <button
              onClick={setup2FA}
              disabled={isLoading}
              className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-black/80 transition-all flex items-center gap-2 mx-auto"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Setup 2FA Now"}
            </button>
          </div>
        )}

        {twoFAData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="bg-white p-4 rounded-3xl border border-black/5 flex items-center justify-center shadow-inner">
                <img src={twoFAData.qrCode} alt="QR Code" className="w-full max-w-[240px]" />
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-black/40 uppercase tracking-wider mb-2">Step 1: Scan QR Code</h4>
                  <p className="text-sm text-black/60">
                    Open your authenticator app (Google Authenticator, Authy, etc.) and scan the QR code.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black/40 uppercase tracking-wider mb-2">Step 2: Enter Verification Code</h4>
                  <p className="text-sm text-black/60 mb-4">
                    Enter the 6-digit code generated by your app to confirm setup.
                  </p>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      className="flex-1 px-5 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-black/10 outline-none font-mono text-xl tracking-[0.5em]"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    />
                    <button
                      onClick={verify2FA}
                      disabled={isLoading || verificationCode.length !== 6}
                      className="bg-black text-white px-8 rounded-2xl font-bold hover:bg-black/80 transition-all disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <div className="flex gap-4">
                <ShieldAlert className="w-6 h-6 text-amber-500 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-bold text-amber-900">Backup Secret Key</h5>
                  <p className="text-xs text-amber-700 mt-1 mb-3">
                    If you can't scan the QR code, enter this secret manually in your app. Keep it safe!
                  </p>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-xl border border-amber-200">
                    <code className="text-xs font-mono font-bold text-amber-900 flex-1">{twoFAData.secret}</code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(twoFAData.secret);
                        toast.success("Secret copied!");
                      }}
                      className="p-2 hover:bg-amber-200 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-amber-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {user?.twoFactorEnabled && (
          <div className="space-y-8">
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-900">Your account is secured</h4>
                <p className="text-sm text-emerald-700">Two-factor authentication is currently active.</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5">
              <h4 className="text-sm font-bold text-black mb-4">Danger Zone</h4>
              <button
                onClick={disable2FA}
                disabled={isLoading}
                className="text-red-500 text-sm font-bold hover:underline flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Disable two-factor authentication"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Audit Logs Section */}
      <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-sm">
        <h3 className="text-xl font-bold text-black mb-6">Security Audit Logs</h3>
        <div className="space-y-4">
          {[
            { action: "Login", device: "Chrome / macOS", time: "2 hours ago", status: "Success" },
            { action: "2FA Setup Initiated", device: "Chrome / macOS", time: "1 day ago", status: "Success" },
            { action: "Password Changed", device: "Safari / iPhone", time: "3 days ago", status: "Success" },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-black/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-black/40" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">{log.action}</p>
                  <p className="text-xs text-black/40">{log.device} • {log.time}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{log.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}
