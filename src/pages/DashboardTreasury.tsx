import { useState } from 'react';
import { useLocation } from 'wouter';
import { DollarSign, CreditCard, Building, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function TreasuryPage() {
  const [, setLocation] = useLocation();
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  const handlePayazaDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) < 1) {
      toast.error('Minimum deposit is $1');
      return;
    }
    setLoading('payaza');
    try {
      const email = JSON.parse(localStorage.getItem('upfrica_user') || '{}').email;
      const res = await axios.post('/api/payments/payaza/initialize', {
        amount: parseFloat(depositAmount),
        currency: 'USD',
      }, {
        headers: { 'x-user-email': email }
      });
      if (res.data.checkoutUrl) window.location.href = res.data.checkoutUrl;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to initialize Payaza payment');
    } finally {
      setLoading(null);
    }
  };

  const handlePaystackDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) < 1) {
      toast.error('Minimum deposit is $1');
      return;
    }
    toast.error('Paystack integration is currently disabled in this demo environment.');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button onClick={() => setLocation('/dashboard')} className="text-neutral-500 hover:text-neutral-900 text-sm font-medium mb-4 flex items-center">
            ← Back to Dashboard
          </button>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Treasury Management</h1>
          <p className="text-neutral-500 mt-2">Fund your account or withdraw your assets securely.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === 'deposit' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Deposit Funds
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === 'withdraw' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Withdraw Funds
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'deposit' ? (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">Amount to Deposit</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      className="block w-full pl-11 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Select Payment Method</h3>
                  
                  {/* Option 1: Payaza (Primary) */}
                  <div className="border-2 border-indigo-600 rounded-xl p-5 relative overflow-hidden bg-indigo-50/30">
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                      Recommended
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-indigo-100">
                          <Globe className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 text-lg">Pay in USD — Global</h4>
                          <p className="text-neutral-500 text-sm mt-0.5">Global cards, bank transfers, and mobile money via Payaza.</p>
                          <div className="flex items-center space-x-3 mt-3">
                            <span className="flex items-center text-xs font-medium text-neutral-600 bg-white px-2 py-1 rounded-md border border-neutral-200"><CreditCard className="w-3 h-3 mr-1" /> Cards</span>
                            <span className="flex items-center text-xs font-medium text-neutral-600 bg-white px-2 py-1 rounded-md border border-neutral-200"><Building className="w-3 h-3 mr-1" /> Bank</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handlePayazaDeposit}
                      disabled={loading !== null}
                      className="w-full mt-5 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {loading === 'payaza' ? 'Initializing...' : 'Deposit via Payaza'} <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>

                  {/* Option 2: Paystack (Secondary) */}
                  <div className="border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-200">
                          <DollarSign className="w-6 h-6 text-neutral-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900">Pay in Local Currency</h4>
                          <p className="text-neutral-500 text-sm mt-0.5">NGN, GHS, and ZAR via Paystack.</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handlePaystackDeposit}
                      disabled={loading !== null}
                      className="w-full mt-5 bg-white border border-neutral-200 text-neutral-700 py-3 rounded-xl font-bold hover:bg-neutral-50 transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {loading === 'paystack' ? 'Initializing...' : 'Deposit via Paystack'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xs text-neutral-500 mt-6">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>All transactions are secured and encrypted.</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-bold text-neutral-900 text-lg">Withdrawals Locked</h3>
                <p className="text-neutral-500 mt-2 max-w-sm mx-auto">
                  For security reasons, withdrawals require a linked bank account and 2FA to be enabled.
                </p>
                <button className="mt-6 bg-neutral-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-neutral-800 transition-colors">
                  Link Bank Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
