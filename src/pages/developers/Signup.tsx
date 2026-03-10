import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Loader2, CheckCircle2, ArrowRight, ShieldCheck, Building } from "lucide-react";

export default function DeveloperSignup() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [diditUrl, setDiditUrl] = useState("");
  const [diditError, setDiditError] = useState("");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
  });

  const handleNext = async () => {
    setIsLoading(true);
    if (step === 1) {
      // Simulate API call to create developer user
      const mockUserId = `dev_${Math.random().toString(36).substring(7)}`;
      setUserId(mockUserId);
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  // Fetch Didit Session URL when entering KYB step
  useEffect(() => {
    if (step === 2 && userId) {
      const fetchSession = async () => {
        try {
          setDiditError("");
          const res = await fetch('/api/kyc/didit-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, accountType: "business" })
          });
          const data = await res.json();
          if (data.url) {
            setDiditUrl(data.url);
          } else {
            console.error("Failed to get KYB session URL", data);
            setDiditError(data.error || "Failed to initialize verification.");
          }
        } catch (err: any) {
          console.error("Error fetching KYB session", err);
          setDiditError(err.message || "Network error while initializing verification.");
        }
      };
      fetchSession();
    }
  }, [step, userId]);

  // Listen for messages from the Didit iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data === 'verification_complete' || event.data.status === 'approved')) {
        handleNext();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [step]);

  if (step === 3) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-200 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Verification Complete</h2>
            <p className="text-neutral-600 mb-6">
              We've sent a verification link to <span className="font-medium text-neutral-900">{formData.email}</span>.
              Please click the link to verify your account and access the developer dashboard.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {}}
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Resend verification email
              </button>
              <div className="pt-4 border-t border-neutral-100">
                <Link href="/developers">
                  <a className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center justify-center gap-1">
                    Back to Developer Portal <ArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          Create Developer Account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Start building on the world's financial operating system.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-200">
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  Work Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700">
                  Company Name
                </label>
                <div className="mt-1">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-neutral-700">
                  Company Website (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="website"
                    name="website"
                    type="url"
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue to Verification"}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900">Business Verification (KYB)</h3>
              <p className="text-sm text-neutral-500 mb-4">
                Please complete the business verification process below to activate your developer account.
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
                      onClick={() => setStep(1)}
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
                    title="Didit KYB Verification"
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

          {step === 1 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-neutral-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link href="/login">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in to dashboard
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
