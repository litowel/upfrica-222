import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ShieldCheck, Wallet, User, Building, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import toast from "react-hot-toast";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [diditUrl, setDiditUrl] = useState("");
  const [diditError, setDiditError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    role: 'USER' as 'USER' | 'BUSINESS',
    agreedToTerms: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Full name required (min 2 characters)';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email address required';
    if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.country) e.country = 'Please select your country';
    if (!form.agreedToTerms) e.agreedToTerms = 'You must agree to the Terms of Service';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (step === 2) {
      if (!validateStep2()) return;
      setIsLoading(true);
      // Simulate API call to create user
      const mockUserId = `user_${Math.random().toString(36).substring(7)}`;
      setUserId(mockUserId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setStep(3);
    } else {
      setStep(step + 1);
    }
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
            body: JSON.stringify({ userId, accountType: form.role === 'BUSINESS' ? 'business' : 'individual' })
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
  }, [step, userId, form.role]);

  // Listen for messages from the Didit iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data === 'verification_complete' || event.data.status === 'approved')) {
        setStep(4);
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
      name: form.name,
      email: form.email,
      accountType: form.role,
      balance: 0,
      kycStatus: "APPROVED"
    }));

    setIsLoading(false);
    toast.success('Account created successfully!');
    setLocation("/dashboard");
  };

  const countries = [
    'Nigeria','Kenya','Ghana','South Africa','Ethiopia','Rwanda',
    'Tanzania','Uganda','Senegal','Egypt','Morocco',"Côte d'Ivoire",
    'Cameroon','Zimbabwe','Zambia','Angola','Other'
  ];

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
          Already have an account?{' '}
          <Link href="/login">
            <a className="text-indigo-600 hover:underline">Sign in</a>
          </Link>
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
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Choose Account Type</h3>
                <p className="text-neutral-500 text-sm mb-6">Select the account type that best describes you</p>
                <div className="space-y-4">
                  {[
                    { type: 'USER', icon: User, title: 'Personal Account', desc: 'For individuals — freelancers, remote workers, diaspora, investors' },
                    { type: 'BUSINESS', icon: Building, title: 'Business Account', desc: 'For companies — SMEs, startups, exporters, institutions' },
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => { setForm(f => ({ ...f, role: option.type as any })); setStep(2); }}
                      className={`w-full bg-white border rounded-xl p-5 text-left transition-all flex items-start space-x-4 ${form.role === option.type ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-neutral-200 hover:border-indigo-300'}`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        <option.icon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">{option.title}</h3>
                        <p className="text-neutral-500 text-sm">{option.desc}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 self-center flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} className="text-neutral-500 text-sm mb-4 hover:text-neutral-900">← Back</button>
                <h3 className="text-lg font-medium text-neutral-900 mb-6">Your Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-neutral-700 block mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })) }}
                      className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-neutral-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm text-neutral-700 block mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }}
                      className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-neutral-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-sm text-neutral-700 block mb-1">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimum 8 characters"
                        value={form.password}
                        onChange={(e) => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '' })) }}
                        className={`w-full bg-white border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : 'border-neutral-300'}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <div className="h-1 bg-neutral-100 rounded-full mt-2 overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${form.password.length >= 8 ? 'bg-green-500 w-full' : 'bg-red-500'}`} style={{ width: `${Math.min((form.password.length / 8) * 100, 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-neutral-700 block mb-1">Confirm Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={(e) => { setForm(f => ({ ...f, confirmPassword: e.target.value })); setErrors(er => ({ ...er, confirmPassword: '' })) }}
                      className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-300'}`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label className="text-sm text-neutral-700 block mb-1">Country <span className="text-red-500">*</span></label>
                    <select
                      value={form.country}
                      onChange={(e) => { setForm(f => ({ ...f, country: e.target.value })); setErrors(er => ({ ...er, country: '' })) }}
                      className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.country ? 'border-red-500' : 'border-neutral-300'}`}
                    >
                      <option value="">Select your country...</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreedToTerms}
                        onChange={(e) => { setForm(f => ({ ...f, agreedToTerms: e.target.checked })); setErrors(er => ({ ...er, agreedToTerms: '' })) }}
                        className="mt-1 accent-indigo-600"
                      />
                      <span className="text-neutral-600 text-sm">
                        I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreedToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreedToTerms}</p>}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <><span>Continue to Verification</span><ArrowRight className="w-5 h-5" /></>}
                  </button>
                </div>
              </div>
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