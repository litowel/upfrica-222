import { useEffect, useState } from 'react'
import { useLocation, Link } from 'wouter'
import { DollarSign, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, AlertTriangle, CheckCircle, Clock, RefreshCw, LogOut } from 'lucide-react'
import axios from 'axios'

interface TreasuryData { 
  usdBalance: number; 
  stablecoinBalance: number; 
  cryptoBalance: number; 
  totalValueUsd: number; 
  isActive: boolean; 
} 

interface Transaction { 
  id: string; 
  type: string; 
  amount: number; 
  currency: string; 
  status: string; 
  createdAt: string; 
}

export default function DashboardPage() { 
  const [, setLocation] = useLocation() 
  const [user, setUser] = useState<any>(null)
  const [treasury, setTreasury] = useState<TreasuryData | null>(null) 
  const [transactions, setTransactions] = useState<Transaction[]>([]) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { 
    const storedUser = localStorage.getItem('upfrica_user')
    if (!storedUser) { 
      setLocation('/onboarding')
      return 
    } 
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    fetchData() 
  }, [setLocation])

  const fetchData = async () => { 
    setLoading(true)
    setError(null) 
    try { 
      const storedUser = localStorage.getItem('upfrica_user')
      const parsedUser = storedUser ? JSON.parse(storedUser) : null
      const email = parsedUser?.email

      const [tRes, txRes] = await Promise.all([ 
        axios.get('/api/treasury', { headers: { 'x-user-email': email } }), 
        axios.get('/api/transactions', { headers: { 'x-user-email': email } }), 
      ]) 
      setTreasury(tRes.data.treasury) 
      setTransactions(txRes.data.transactions || []) 
    } catch { 
      setError('Failed to load account data. Please refresh.') 
    } finally { 
      setLoading(false) 
    } 
  }

  const signOut = () => {
    localStorage.removeItem('upfrica_user')
    setLocation('/')
  }

  const kycStatus = user?.kycStatus || 'NOT_STARTED' 
  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0) 
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  if (loading || !user) return ( 
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center"> 
      <div className="text-center"> 
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" /> 
        <p className="text-neutral-500 text-sm">Loading your account...</p> 
      </div> 
    </div> 
  )

  return ( 
    <div className="min-h-screen bg-neutral-50"> 
      <div className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-40"> 
        <div className="max-w-7xl mx-auto flex items-center justify-between"> 
          <div> 
            <h1 className="font-display text-base font-bold text-neutral-900">{user?.name || 'Dashboard'}</h1> 
            <p className="text-neutral-500 text-xs">{user?.email}</p> 
          </div> 
          <div className="flex items-center space-x-2"> 
            <button onClick={fetchData} className="p-2 bg-white rounded-lg border border-neutral-200 hover:border-indigo-300 transition-all"> 
              <RefreshCw className="w-4 h-4 text-neutral-500" /> 
            </button> 
            <Link href="/treasury" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">+ Add Funds</Link> 
            <button onClick={signOut} className="p-2 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"> 
              <LogOut className="w-4 h-4 text-neutral-500" /> 
            </button> 
          </div> 
        </div> 
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6"> 
        {error && ( 
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3"> 
            <AlertTriangle className="w-5 h-5 text-red-600" /> 
            <p className="text-red-600 text-sm flex-1">{error}</p> 
            <button onClick={fetchData} className="text-red-600 text-xs underline">Retry</button> 
          </div> 
        )}

        {kycStatus === 'NOT_STARTED' && ( 
          <div className="bg-white border border-amber-200 rounded-2xl p-5 flex items-start space-x-4 shadow-sm"> 
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" /> 
            <div className="flex-1"> 
              <p className="font-semibold text-amber-600">Identity Verification Required</p> 
              <p className="text-neutral-500 text-sm mt-1">Verify your identity to unlock deposits, withdrawals, investing and trading. Takes under 2 minutes.</p> 
            </div> 
            <Link href="/onboarding" className="bg-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 hover:bg-amber-600 transition-colors">Verify Now →</Link> 
          </div> 
        )} 
        {kycStatus === 'PENDING' && ( 
          <div className="bg-white border border-indigo-200 rounded-2xl p-4 flex items-center space-x-3 shadow-sm"> 
            <Clock className="w-5 h-5 text-indigo-600" /> 
            <p className="text-indigo-600 text-sm font-medium">Verification under review — usually takes 1–5 minutes</p> 
          </div> 
        )} 
        {kycStatus === 'APPROVED' && ( 
          <div className="bg-white border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3 shadow-sm"> 
            <CheckCircle className="w-5 h-5 text-emerald-600" /> 
            <p className="text-emerald-600 text-sm font-medium">✓ Identity Verified — All features unlocked</p> 
          </div> 
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
          {[ 
            { label: 'USD Balance', value: fmt(treasury?.usdBalance || 0), icon: DollarSign, color: 'text-indigo-600' }, 
            { label: 'Stablecoin (USDC)', value: fmt(treasury?.stablecoinBalance || 0), icon: Wallet, color: 'text-blue-500' }, 
            { label: 'Total Portfolio', value: fmt(treasury?.totalValueUsd || 0), icon: TrendingUp, color: 'text-emerald-600' }, 
          ].map((card) => ( 
            <div key={card.label} className={`bg-white shadow-sm border border-neutral-200 rounded-2xl p-6 relative overflow-hidden ${kycStatus !== 'APPROVED' ? 'opacity-60' : ''}`}> 
              {kycStatus !== 'APPROVED' && ( 
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl z-10"> 
                  <div className="text-center"><span className="text-3xl">🔒</span><p className="text-neutral-600 font-medium text-xs mt-1">Verify ID to unlock</p></div> 
                </div> 
              )} 
              <div className="flex items-center justify-between mb-3"> 
                <span className="text-neutral-500 font-medium text-sm">{card.label}</span> 
                <card.icon className={`w-5 h-5 ${card.color}`} /> 
              </div> 
              <div className="font-display text-3xl font-bold text-neutral-900">{card.value}</div> 
            </div> 
          ))} 
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> 
          {[ 
            { label: '💳 Deposit', href: '/treasury' }, 
            { label: '💸 Withdraw', href: '/treasury' }, 
            { label: '🏘️ Invest', href: '/tokenization' }, 
            { label: '🤖 Trade', href: '/trading' }, 
          ].map((action) => ( 
            kycStatus === 'APPROVED' ? ( 
              <Link key={action.label} href={action.href} className="bg-white shadow-sm border border-neutral-200 hover:border-indigo-300 hover:text-indigo-600 rounded-xl py-3 text-center font-semibold text-sm text-neutral-700 transition-all block"> 
                {action.label} 
              </Link> 
            ) : ( 
              <div key={action.label} className="bg-white shadow-sm border border-neutral-100 rounded-xl py-3 text-center font-semibold text-sm text-neutral-400 opacity-70 cursor-not-allowed" title="Complete KYC to unlock"> 
                {action.label} 
              </div> 
            ) 
          ))} 
        </div>

        <div className="bg-white shadow-sm border border-neutral-200 rounded-2xl p-6"> 
          <div className="flex items-center justify-between mb-5"> 
            <h2 className="font-display text-lg font-semibold text-neutral-900">Transaction History</h2> 
            <span className="text-neutral-500 font-medium text-xs bg-neutral-100 px-2 py-1 rounded-full">{transactions.length} total</span> 
          </div> 
          {transactions.length === 0 ? ( 
            <div className="text-center py-12"> 
              <div className="text-4xl mb-3">📭</div> 
              <p className="text-neutral-900 font-medium">No transactions yet</p> 
              <p className="text-neutral-500 text-sm mt-1"> 
                {kycStatus === 'APPROVED' ? 'Make your first deposit to get started' : 'Complete KYC to start transacting'} 
              </p> 
              {kycStatus === 'APPROVED' && ( 
                <Link href="/treasury" className="inline-block mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">Make a Deposit</Link> 
              )} 
            </div> 
          ) : ( 
            <div> 
              {transactions.map((tx) => ( 
                <div key={tx.id} className="flex items-center justify-between py-3.5 border-b border-neutral-100 last:border-0"> 
                  <div className="flex items-center space-x-3"> 
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center"> 
                      {tx.type === 'DEPOSIT' && <ArrowDownLeft className="w-5 h-5 text-emerald-600" />} 
                      {tx.type === 'WITHDRAWAL' && <ArrowUpRight className="w-5 h-5 text-amber-500" />} 
                      {tx.type === 'TRADING_PROFIT' && <TrendingUp className="w-5 h-5 text-emerald-600" />} 
                      {!['DEPOSIT','WITHDRAWAL','TRADING_PROFIT'].includes(tx.type) && <DollarSign className="w-5 h-5 text-neutral-500" />} 
                    </div> 
                    <div> 
                      <p className="font-medium text-sm text-neutral-900 capitalize">{tx.type.replace('_',' ').toLowerCase()}</p> 
                      <p className="text-neutral-500 text-xs">{fmtDate(tx.createdAt)}</p> 
                    </div> 
                  </div> 
                  <div className="text-right"> 
                    <p className={`font-semibold text-sm ${tx.status === 'FAILED' ? 'text-red-600' : ['DEPOSIT','TRADING_PROFIT'].includes(tx.type) ? 'text-emerald-600' : 'text-amber-600'}`}> 
                      {['DEPOSIT','TRADING_PROFIT'].includes(tx.type) ? '+' : '-'}{fmt(tx.amount)} 
                    </p> 
                    <p className={`text-xs font-medium capitalize ${tx.status === 'SUCCESS' ? 'text-emerald-600' : tx.status === 'FAILED' ? 'text-red-600' : 'text-amber-600'}`}> 
                      {tx.status.toLowerCase()} 
                    </p> 
                  </div> 
                </div> 
              ))} 
            </div> 
          )} 
        </div> 
      </div> 
    </div> 
  ) 
}
