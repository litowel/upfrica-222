import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ShieldCheck, Wallet, User, Building } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [diditUrl, setDiditUrl] = useState("");
  const [diditError, setDiditError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    accountType: "individual" // individual or business
  });
  const [, setLocation] = useLocation();

  const handleNext = async () => {
    setIsLoading(true);
    // Simulate API call to create user
    if (step === 1) {
       // In a real app, we would create the user in the DB here
       const mockUserId = `user_${Math.random().toString(36).substring(7)}`;
       setUserId(mockUserId);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(step + 1);
  };

  // Fetch Didit Session URL when entering KYC step
  useEffect(() => {
    if (step === 3 && userId) {
      const fetchSession = async () => {
        try {
          setDiditError("");
          const res = await fetch('/api/kyc/didit-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, accountType: formData.accountType })
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
    }
  }, [step, userId, formData.accountType]);

  // Listen for messages from the Didit iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // You can log event.data to see the exact payload from Didit
      // console.log("Message from Didit:", event.data);
      
      // Example check for completion (adjust based on actual Didit events)
      if (event.data && (event.data === 'verification_complete' || event.data.status === 'approved')) {
        handleNext();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [step]);

  const handleComplete = async () => {
    setIsLoading(true);
    // Simulate final registration and wallet creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save user to localStorage
    localStorage.setItem("upfrica_user", JSON.stringify({
      name: formData.name,
      email: formData.email,
      accountType: formData.accountType,
      balance: 0,
      kycStatus: "APPROVED"
    }));

    setIsLoading(false);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <a className="flex justify-center items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              U
            </div>
            <span className="font-bold text-2xl tracking-tight text-neutral-900">UpFrica</span>
          </a>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Automated onboarding • Global access • Secure wallet
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-200">
          {/* Progress Bar */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -z-10"></div>
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  s <= step ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {s < step ? <Check size={14} /> : s}
              </div>
            ))}
          </div>

          {/* Steps */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Email address</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                <h3 className="text-lg font-medium text-neutral-900">Select Account Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, accountType: "individual"})}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-3 text-center transition-all ${
                      formData.accountType === "individual" 
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                        : "border-neutral-200 hover:border-indigo-200"
                    }`}
                  >
                    <User size={24} />
                    <span className="text-sm font-medium">Individual</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, accountType: "business"})}
                    className={`p-4 border rounded-xl flex flex-col items-center gap-3 text-center transition-all ${
                      formData.accountType === "business" 
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                        : "border-neutral-200 hover:border-indigo-200"
                    }`}
                  >
                    <Building size={24} />
                    <span className="text-sm font-medium">Business</span>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue"}
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900">Identity Verification</h3>
                <p className="text-sm text-neutral-500 mb-4">
                  Please complete the verification process below to activate your account.
                </p>
                
                <div className="min-h-[600px] border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 relative">
                  {diditError ? (
                    <div className="flex flex-col items-center justify-center h-[600px] p-6 text-center">
                      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900 mb-2">Verification Error</h4>
                      <p className="text-sm text-neutral-600 mb-6">{diditError}</p>
                      <button 
                        onClick={() => setStep(2)}
                        className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800"
                      >
                        Go Back
                      </button>
                    </div>
                  ) : diditUrl ? (
                    <iframe 
                      src={diditUrl} 
                      allow="camera; microphone" 
                      className="w-full h-[600px] border-0"
                      title="Didit KYC Verification"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[600px]">
                      <Loader2 className="animate-spin text-indigo-600 w-8 h-8 mb-4" />
                      <p className="text-sm text-neutral-500">Initializing secure verification...</p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-neutral-400 mt-4">
                  Powered by Didit • Bank-grade Security
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <Wallet className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900">Creating Your Safe Wallet</h3>
                <p className="text-sm text-neutral-500">
                  Deploying a multi-signature smart contract wallet for your treasury.
                </p>
                
                <div className="space-y-3">
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-600"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">Deploying to Ethereum Mainnet...</p>
                </div>

                <button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Enter Dashboard"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}