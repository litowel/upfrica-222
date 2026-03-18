import Link from 'next/link';
export default function FlowPayPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="py-24 px-6 border-b border-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">FlowPay — Fiat-to-USDC Settlements</h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">The bridge between African commerce and global liquidity. Accept NGN, GHS, and more — settle instantly in USDC.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 w-full sm:w-auto text-center">Start Accepting Payments</Link>
            <Link href="#" className="px-8 py-4 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 w-full sm:w-auto text-center">View Documentation</Link>
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Global Settlement</h3>
            <p className="text-gray-400">No more waiting for cross-border wire transfers. Receive funds in USDC on any EVM-compatible chain.</p>
          </div>
          <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Safe Custody</h3>
            <p className="text-gray-400">Integrated with Safe (Gnosis Safe) for multi-sig custody. Your assets are secured by the industry standard.</p>
          </div>
          <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Paystack Powered</h3>
            <p className="text-gray-400">Seamlessly accept payments via cards, bank transfers, and mobile money.</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 border-t border-gray-800 text-center">
        <div className="flex flex-wrap justify-center gap-12 mb-8 opacity-60">
          <span className="text-xl font-bold">Paystack</span>
          <span className="text-xl font-bold">Safe Global</span>
          <span className="text-xl font-bold">Payaza</span>
        </div>
        <p className="text-gray-600 text-sm">© 2026 UpFrica FlowPay. A product of Upfrica. Operated by Oskayi Consult Ltd.</p>
      </section>
    </div>
  );
}
