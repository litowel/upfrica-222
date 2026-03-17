"use client";

import { useState, useMemo } from "react";
import { 
  Building2, 
  TrendingUp, 
  MapPin, 
  ArrowUpRight, 
  Search, 
  Filter, 
  ChevronDown,
  Zap,
  Coins,
  ShieldCheck,
  Globe,
  Plus,
  X,
  CheckCircle2,
  Info
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const assetCategories = ["All Assets", "Real Estate", "Private Equity", "Fixed Income", "Venture Capital"];
const assetStatuses = ["All Statuses", "Active", "Funding"];

const assets = [
  {
    id: "1",
    name: "Lagos Prime Commercial",
    type: "Real Estate",
    location: "Lagos, Nigeria",
    totalValue: "$2,450,000",
    tokenPrice: "$106.12",
    yield: "8.4%",
    status: "Active",
    image: "https://picsum.photos/seed/lagos/800/600",
    description: "A-grade commercial office space in the heart of Victoria Island, fully leased to multinational tenants. The property features state-of-the-art facilities, 24/7 security, and premium finishing. This asset offers stable rental income with high capital appreciation potential in one of Africa's most dynamic business districts."
  },
  {
    id: "2",
    name: "Tech Growth Fund II",
    type: "Private Equity",
    location: "Global",
    totalValue: "$12,000,000",
    tokenPrice: "$500.00",
    yield: "14.2%",
    status: "Funding",
    image: "https://picsum.photos/seed/tech/800/600",
    description: "Exposure to high-growth Series B and C technology companies across emerging markets. The fund focuses on fintech, healthtech, and edtech sectors where digital transformation is accelerating. Managed by a team with a proven track record of exits and deep industry expertise."
  },
  {
    id: "3",
    name: "Nairobi Logistics Hub",
    type: "Real Estate",
    location: "Nairobi, Kenya",
    totalValue: "$8,500,000",
    tokenPrice: "$250.00",
    yield: "9.1%",
    status: "Active",
    image: "https://picsum.photos/seed/nairobi/800/600",
    description: "Modern warehousing and distribution facility strategically located near Jomo Kenyatta International Airport. This hub serves as a critical node for East African trade, featuring cold storage capabilities and advanced inventory management systems. Long-term contracts with regional e-commerce leaders ensure consistent yields."
  },
  {
    id: "4",
    name: "Solar Energy Bond",
    type: "Fixed Income",
    location: "South Africa",
    totalValue: "$5,000,000",
    tokenPrice: "$1,000.00",
    yield: "7.5%",
    status: "Active",
    image: "https://picsum.photos/seed/solar/800/600",
    description: "Asset-backed debt instrument financing a portfolio of commercial solar installations in Cape Town. Investors receive quarterly interest payments backed by long-term Power Purchase Agreements (PPAs) with creditworthy commercial off-takers. A green investment opportunity with predictable cash flows."
  }
];

export default function AssetListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Assets");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedAsset, setSelectedAsset] = useState<typeof assets[0] | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           asset.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Assets" || asset.type === selectedCategory;
      const matchesStatus = selectedStatus === "All Statuses" || asset.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="space-y-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 tracking-tight">Asset Listings</h1>
          <p className="text-white/40">Explore institutional-grade tokenized assets across the globe.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Search by name or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm transition-all"
            />
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-colors text-sm font-medium">
              <Filter className="w-4 h-4" />
              {selectedStatus}
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {assetStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedStatus === status ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {assetCategories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              cat === selectedCategory 
                ? "bg-white text-black" 
                : "text-white/40 hover:text-white hover:bg-white/5 border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAssets.map((asset) => (
          <div 
            key={asset.id} 
            onClick={() => setSelectedAsset(asset)}
            className="group relative rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img 
                src={asset.image} 
                alt={asset.name} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute top-6 right-6">
                <div className={`px-4 py-2 rounded-full backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest ${
                  asset.status === 'Active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                }`}>
                  {asset.status}
                </div>
              </div>
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                  <MapPin className="w-3 h-3" />
                  {asset.location}
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2">{asset.name}</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                {asset.description}
              </p>
              
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Target Yield</p>
                  <p className="text-lg font-bold text-emerald-500">{asset.yield}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Token Price</p>
                  <p className="text-lg font-bold font-mono">{asset.tokenPrice}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Total Value</p>
                  <p className="text-lg font-bold font-mono">{asset.totalValue}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link 
                  href={`/markets/dashboard/trading?asset=${asset.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-white text-black py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  Trade Now
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAsset(asset);
                  }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-colors"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-24 border border-dashed border-white/10 rounded-[48px]">
          <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/40 font-bold">No assets found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Assets");
              setSelectedStatus("All Statuses");
            }}
            className="mt-4 text-white font-bold text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Featured Section */}
      <div className="relative rounded-[48px] overflow-hidden p-16 border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
        <div className="max-w-xl relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Institutional Grade</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Tokenize Your Own Assets.</h2>
          <p className="text-lg text-white/40 mb-10 leading-relaxed">
            Are you an asset manager or property owner? Leverage our institutional infrastructure to tokenize your assets and access global liquidity.
          </p>
          <button 
            onClick={() => setIsApplyModalOpen(true)}
            className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            Apply for Listing
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <img 
            src="https://picsum.photos/seed/listing/1000/1000" 
            alt="Listing" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAsset(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedAsset(null)}
                className="absolute top-8 right-8 z-20 p-3 rounded-full bg-black/50 border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 aspect-square lg:aspect-auto relative">
                  <img 
                    src={selectedAsset.image} 
                    alt={selectedAsset.name} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                      <MapPin className="w-3 h-3" />
                      {selectedAsset.location}
                    </div>
                    <h3 className="text-4xl font-bold tracking-tight">{selectedAsset.name}</h3>
                  </div>
                </div>

                <div className="lg:w-1/2 p-12 space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {selectedAsset.type}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest ${
                      selectedAsset.status === 'Active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {selectedAsset.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/20">Description</h4>
                    <p className="text-white/60 leading-relaxed">
                      {selectedAsset.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Token Price</p>
                      <p className="text-2xl font-bold font-mono">{selectedAsset.tokenPrice}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Target Yield</p>
                      <p className="text-2xl font-bold text-emerald-500">{selectedAsset.yield}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Total Value</p>
                      <p className="text-2xl font-bold font-mono">{selectedAsset.totalValue}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Asset ID</p>
                      <p className="text-2xl font-bold font-mono text-white/40">#{selectedAsset.id.padStart(4, '0')}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Link 
                      href={`/markets/dashboard/trading?asset=${selectedAsset.id}`}
                      className="flex-1 bg-white text-black py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                    >
                      Trade Now
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Apply for Listing Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[48px] p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-8 right-8 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">Application Received</h3>
                  <p className="text-white/40 max-w-sm mx-auto">
                    Thank you for your interest. Our institutional team will review your asset details and contact you within 48 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight mb-2">Apply for Listing</h3>
                    <p className="text-white/40">Submit your asset details for tokenization review.</p>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-4">Asset Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. Lagos Office Tower"
                          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-4">Asset Type</label>
                        <select className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm transition-all appearance-none">
                          <option className="bg-[#0a0a0a]">Real Estate</option>
                          <option className="bg-[#0a0a0a]">Private Equity</option>
                          <option className="bg-[#0a0a0a]">Fixed Income</option>
                          <option className="bg-[#0a0a0a]">Venture Capital</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-4">Estimated Valuation</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. $5,000,000"
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-4">Asset Description</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Provide a brief overview of the asset, its location, and current performance..."
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      Submit Application
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
