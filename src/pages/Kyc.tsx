import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import toast from "react-hot-toast";

export default function Kyc() {
  const [, setLocation] = useLocation();
  const [diditUrl, setDiditUrl] = useState("");
  const [diditError, setDiditError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("upfrica_user");
    if (!storedUser) {
      setLocation("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (parsedUser.kycStatus === "VERIFIED") {
      setLocation("/dashboard");
      return;
    }

    const fetchSession = async () => {
      try {
        setDiditError("");
        const res = await fetch('/api/kyc/didit-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: parsedUser.id || 'user_123', accountType: 'individual' })
        });
        const data = await res.json();
        if (data.url) {
          setDiditUrl(data.url);
        } else {
          console.error("Failed to get KYC session URL", data);
          setDiditError(data.error || "Failed to initialize verification.");
        }
      } catch (err: any) {
        console.error("Error fetching KYC session", err);
        setDiditError(err.message || "Network error while initializing verification.");
      }
    };
    fetchSession();
  }, [setLocation]);

  // Listen for messages from the Didit iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data === 'verification_complete' || event.data.status === 'approved')) {
        handleComplete();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [user]);

  const handleComplete = async () => {
    setIsLoading(true);
    // Simulate final verification update
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (user) {
      const updatedUser = { ...user, kycStatus: "VERIFIED" };
      localStorage.setItem("upfrica_user", JSON.stringify(updatedUser));
    }
    
    toast.success("Verification complete!");
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Identity Verification</h1>
          <p className="text-neutral-500 mt-2 text-sm">Please complete verification to access your account</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm text-center"
        >
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
            <ShieldCheck className="h-6 w-6 text-green-600" />
          </div>
          
          {diditError ? (
            <div className="text-red-500 bg-red-50 p-4 rounded-xl text-sm mb-4 border border-red-100">
              {diditError}
            </div>
          ) : diditUrl ? (
            <div className="w-full h-[500px] border border-neutral-200 rounded-xl overflow-hidden mb-6">
              <iframe 
                src={diditUrl} 
                allow="camera; microphone" 
                className="w-full h-full border-0"
                title="KYC Verification"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <p className="text-neutral-500 text-sm">Initializing secure verification...</p>
            </div>
          )}

          <button
            onClick={handleComplete}
            disabled={isLoading || !diditUrl}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <><span>Simulate Verification Success</span><ArrowRight className="w-5 h-5" /></>}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
