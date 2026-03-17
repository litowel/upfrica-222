"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  Globe,
  Loader2,
  ArrowRight,
  Lock
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function KycOnboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    idType: "passport",
    idNumber: "",
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      toast.success("KYC documents submitted successfully!");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-white/10">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Investor Onboarding</h1>
        <p className="text-white/40">Complete your KYC verification to start trading institutional assets.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0" />
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
              step >= i ? "bg-white text-black scale-110" : "bg-[#0a0a0a] text-white/20 border border-white/5"
            }`}
          >
            {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
          </div>
        ))}
      </div>

      <div className="p-12 rounded-[40px] border border-white/5 bg-white/[0.02] shadow-2xl">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Personal Information</h3>
              <p className="text-sm text-white/40">Please provide your legal details as shown on your ID.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/20 ml-1">Full Legal Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-medium transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/20 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-medium transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/20 ml-1">Country of Residence</label>
                <select 
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-medium transition-all appearance-none"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option value="">Select Country</option>
                  <option value="NG">Nigeria</option>
                  <option value="KE">Kenya</option>
                  <option value="ZA">South Africa</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleNext}
              className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Identity Verification</h3>
              <p className="text-sm text-white/40">Select your document type and provide the details.</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {["passport", "national_id", "drivers_license"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, idType: type})}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                      formData.idType === type 
                        ? "border-white bg-white text-black" 
                        : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{type.replace("_", " ")}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/20 ml-1">Document Number</label>
                <input 
                  type="text" 
                  placeholder="A12345678"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm font-medium transition-all"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleBack}
                className="flex-1 border border-white/10 py-5 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all"
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] bg-white text-black py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Document Upload</h3>
              <p className="text-sm text-white/40">Upload a clear photo or scan of your selected identity document.</p>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-[32px] p-12 text-center hover:border-white/20 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all">
                <Upload className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-lg font-bold mb-2">Drag and drop your file</p>
              <p className="text-sm text-white/20">Supports JPG, PNG, or PDF up to 10MB</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleBack}
                className="flex-1 border border-white/10 py-5 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] bg-white text-black py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Verification"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="py-10 text-center space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">Verification Pending</h3>
              <p className="text-white/40 max-w-sm mx-auto">
                Our compliance team is reviewing your documents. This typically takes 24-48 hours. 
                We'll notify you via email once your account is verified.
              </p>
            </div>
            <button 
              onClick={() => window.location.href = "/markets/dashboard"}
              className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-center gap-8 text-white/20">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">AES-256 Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
}
