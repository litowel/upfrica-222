import Link from 'next/link';
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Products — The UpFrica Ecosystem</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Institutional-grade financial infrastructure for the African continent.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col">
            <h2 className="text-3xl font-semibold mb-4">FlowPay</h2>
            <p className="text-gray-400 text-lg mb-8">Accept fiat payments, settle instantly in USDC. Powered by Paystack and Safe Global.</p>
            <Link href="/flowpay" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 text-center">Explore FlowPay</Link>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col">
            <h2 className="text-3xl font-semibold mb-4">Upfrica Markets</h2>
            <p className="text-gray-400 text-lg mb-8">Invest in tokenized African real estate and private equity. Powered by Thirdweb and Didit KYC.</p>
            <Link href="/markets" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 text-center">Explore Markets</Link>
          </div>
        </div>
        <div className="text-center border-t border-gray-800 pt-12">
          <p className="text-gray-500">More products coming soon. Operated by Oskayi Consult Ltd, Ghana.</p>
        </div>
      </div>
    </div>
  );
}
