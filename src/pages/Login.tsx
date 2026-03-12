import { useState, useEffect } from 'react'
import { useLocation, Link } from 'wouter'
import toast from 'react-hot-toast'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import axios from 'axios'

export default function Login() { 
  const [, setLocation] = useLocation() 
  const [form, setForm] = useState({ email: '', password: '' }) 
  const [errors, setErrors] = useState<Record<string, string>>({}) 
  const [loading, setLoading] = useState(false) 
  const [showPassword, setShowPassword] = useState(false)

  const validate = () => { 
    const e: Record<string, string> = {} 
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email address is required' 
    if (!form.password) e.password = 'Password is required' 
    setErrors(e) 
    return Object.keys(e).length === 0 
  }

  const handleSignIn = async (e: React.FormEvent) => { 
    e.preventDefault() 
    if (!validate()) return 
    setLoading(true) 
    try { 
      const response = await axios.post('/api/auth/signin', {
        email: form.email.toLowerCase().trim(),
        password: form.password
      })
      
      if (response.data.user) {
        localStorage.setItem("upfrica_user", JSON.stringify(response.data.user))
        toast.success('Welcome back!') 
        setLocation('/dashboard') 
      }
    } catch (error: any) { 
      if (error.response?.status === 401) {
        toast.error('Incorrect email or password') 
        setErrors({ password: 'Incorrect email or password' }) 
      } else {
        toast.error('Sign in failed. Please try again.') 
      }
    } finally { 
      setLoading(false) 
    } 
  }

  return ( 
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4"> 
      <div className="max-w-md w-full"> 
        <div className="text-center mb-8"> 
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-4"> 
            <span className="text-white font-bold text-xl">U</span> 
          </div> 
          <h1 className="font-display text-3xl font-bold text-neutral-900">Welcome Back</h1> 
          <p className="text-neutral-500 mt-2 text-sm">Sign in to your UpFrica account</p> 
        </div> 
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm"> 
          <form onSubmit={handleSignIn} className="space-y-4" noValidate> 
            <div> 
              <label className="text-sm text-neutral-600 block mb-1">Email Address</label> 
              <input 
                type="email" 
                required 
                value={form.email} 
                onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }} 
                placeholder="you@example.com" 
                className={`w-full bg-neutral-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-neutral-200'}`} 
              /> 
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>} 
            </div> 
            <div> 
              <div className="flex items-center justify-between mb-1"> 
                <label className="text-sm text-neutral-600">Password</label> 
                <Link href="/auth/forgot-password" className="text-indigo-600 text-xs hover:underline">Forgot password?</Link> 
              </div> 
              <div className="relative"> 
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  value={form.password} 
                  onChange={(e) => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: '' })) }} 
                  placeholder="Your password" 
                  className={`w-full bg-neutral-50 border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-indigo-500 ${errors.password ? 'border-red-500' : 'border-neutral-200'}`} 
                /> 
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                > 
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} 
                </button> 
              </div> 
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>} 
            </div> 
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
            > 
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-5 h-5" /></>} 
            </button> 
          </form> 
          <div className="mt-6 pt-6 border-t border-neutral-100 text-center"> 
            <p className="text-neutral-500 text-sm"> 
              No account? <Link href="/onboarding" className="text-indigo-600 hover:underline font-medium">Create one free →</Link> 
            </p> 
          </div> 
        </div> 
      </div> 
    </div> 
  ) 
}
