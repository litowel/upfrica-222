import { useState } from "react";
import { Link } from "wouter";
import { 
  Smartphone, 
  Globe, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  Palette, 
  Layout, 
  Check, 
  Loader2,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export default function AppBuilder() {
  const [appName, setAppName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#4F46E5"); // Indigo-600
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["payments"]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);

  const features = [
    { id: "payments", name: "Global Payments", icon: CreditCard, description: "Accept payments worldwide" },
    { id: "wallets", name: "Crypto Wallets", icon: Wallet, description: "Secure multi-sig wallets" },
    { id: "trading", name: "Automated Trading", icon: TrendingUp, description: "Grid bots & arbitrage" },
    { id: "tokenization", name: "Tokenized Assets", icon: Building2, description: "Real estate & equity" },
    { id: "escrow", name: "Escrow Services", icon: ShieldCheck, description: "Secure large deals" },
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleBuild = async () => {
    setIsBuilding(true);
    // Simulate build process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsBuilding(false);
    setBuildComplete(true);
  };

  const appUrl = appName 
    ? `upfrica.africa/dev/${appName.toLowerCase().replace(/[^a-z0-9]/g, "")}`
    : "upfrica.africa/dev/your-app";

  if (buildComplete) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
          <Check size={40} />
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">App Generated Successfully!</h1>
        <p className="text-xl text-neutral-600 mb-8 max-w-2xl">
          Your white-label platform <span className="font-bold text-neutral-900">{appName}</span> is ready.
        </p>
        
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm mb-8 w-full max-w-md">
          <div className="text-sm text-neutral-500 mb-2">Public URL</div>
          <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            <code className="text-indigo-600 font-mono">{appUrl}</code>
            <ExternalLink size={16} className="text-neutral-400" />
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/dashboard">
            <a className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Go to Dashboard
            </a>
          </Link>
          <button 
            onClick={() => setBuildComplete(false)}
            className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Build Another App
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-900">White-Label App Builder</h1>
          <p className="text-neutral-600 mt-2">Configure and launch your branded fintech platform in minutes.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* App Details */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                  <Layout size={20} />
                </div>
                <h2 className="text-xl font-bold">App Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">App Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5 border"
                    placeholder="e.g. PayAfrica"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">App URL Preview</label>
                  <div className="w-full bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-neutral-500 text-sm font-mono truncate">
                    {appUrl}
                  </div>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                  <Palette size={20} />
                </div>
                <h2 className="text-xl font-bold">Branding</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">Primary Color</label>
                <div className="flex flex-wrap gap-3">
                  {["#4F46E5", "#059669", "#DC2626", "#D97706", "#7C3AED", "#2563EB", "#000000"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setPrimaryColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${primaryColor === color ? "border-neutral-900 scale-110" : "border-transparent hover:scale-105"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input 
                    type="color" 
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-0 p-0"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                  <Layout size={20} />
                </div>
                <h2 className="text-xl font-bold">Features</h2>
              </div>
              
              <div className="space-y-3">
                {features.map((feature) => (
                  <div 
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedFeatures.includes(feature.id) 
                        ? "border-indigo-600 bg-indigo-50" 
                        : "border-neutral-200 hover:border-indigo-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedFeatures.includes(feature.id) ? "bg-white text-indigo-600" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        <feature.icon size={16} />
                      </div>
                      <div>
                        <div className={`font-medium text-sm ${selectedFeatures.includes(feature.id) ? "text-indigo-900" : "text-neutral-900"}`}>
                          {feature.name}
                        </div>
                        <div className={`text-xs ${selectedFeatures.includes(feature.id) ? "text-indigo-700" : "text-neutral-500"}`}>
                          {feature.description}
                        </div>
                      </div>
                    </div>
                    {selectedFeatures.includes(feature.id) && (
                      <Check size={16} className="text-indigo-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleBuild}
              disabled={!appName || isBuilding}
              className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isBuilding ? (
                <>
                  <Loader2 className="animate-spin" /> Building Platform...
                </>
              ) : (
                <>
                  Launch Platform <ArrowRight size={20} />
                </>
              )}
            </button>

          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 sticky top-24 h-[calc(100vh-8rem)]">
            <div className="bg-neutral-900 rounded-3xl p-8 h-full border border-neutral-800 shadow-2xl overflow-hidden relative flex items-center justify-center">
              
              {/* Mobile Device Frame */}
              <div className="relative w-[320px] h-[640px] bg-white rounded-[40px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden">
                {/* Status Bar */}
                <div className="h-8 bg-neutral-900 w-full absolute top-0 left-0 z-20 flex justify-center">
                  <div className="w-32 h-6 bg-black rounded-b-xl"></div>
                </div>

                {/* App Content */}
                <div className="h-full pt-12 pb-8 px-6 flex flex-col bg-neutral-50 overflow-y-auto">
                  
                  {/* App Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {appName ? appName.charAt(0).toUpperCase() : "A"}
                      </div>
                      <span className="font-bold text-neutral-900">{appName || "App Name"}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
                  </div>

                  {/* Balance Card */}
                  <div 
                    className="rounded-2xl p-6 text-white mb-8 shadow-lg transform transition-all hover:scale-105"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <div className="text-white/80 text-xs font-medium mb-1">Total Balance</div>
                    <div className="text-3xl font-bold mb-4">$12,450.00</div>
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight size={14} className="rotate-45" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight size={14} className="-rotate-135" />
                      </div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {selectedFeatures.map(fid => {
                      const feature = features.find(f => f.id === fid);
                      if (!feature) return null;
                      return (
                        <div key={fid} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center text-center gap-2">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-50"
                            style={{ color: primaryColor }}
                          >
                            <feature.icon size={20} />
                          </div>
                          <span className="text-xs font-medium text-neutral-900">{feature.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-auto">
                    <h3 className="font-bold text-neutral-900 mb-4 text-sm">Recent Activity</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-neutral-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                              <CreditCard size={14} className="text-neutral-500" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-neutral-900">Payment Received</div>
                              <div className="text-[10px] text-neutral-500">Today, 10:23 AM</div>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-green-600">+$120.00</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Preview Label */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                Live Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
