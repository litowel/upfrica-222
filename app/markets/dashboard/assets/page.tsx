"use client";

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
  Plus
} from "lucide-react";
import Link from "next/link";

const assetCategories = ["All Assets", "Real Estate", "Private Equity", "Fixed Income", "Venture Capital"];

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
    description: "A-grade commercial office space in the heart of Victoria Island, fully leased to multinational tenants."
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
    description: "Exposure to high-growth Series B and C technology companies across emerging markets."
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
    description: "Modern warehousing and distribution facility strategically located near Jomo Kenyatta International Airport."
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
    description: "Asset-backed debt instrument financing a portfolio of commercial solar installations in Cape Town."
  }
];

export default function AssetListings() {
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
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/5 focus:ring-1 focus:ring-white/20 outline-none text-sm transition-all"
            />
          </div>
          <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {assetCategories.map((cat) => (
          <button 
            key={cat}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              cat === "All Assets" 
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
        {assets.map((asset) => (
          <div key={asset.id} className="group relative rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
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
                  className="flex-1 bg-white text-black py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  Trade Now
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
          <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center gap-2">
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
    </div>
  );
}
