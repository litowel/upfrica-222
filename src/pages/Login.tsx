import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUser = localStorage.getItem("upfrica_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setLocation("/dashboard");
        return;
      }
    }
    
    // If user not found, redirect to onboarding
    alert("Account not found. Please complete onboarding.");
    setLocation("/onboarding");
  };

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
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-neutral-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Email address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Log in"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/onboarding">
              <a className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                Don't have an account? Sign up
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
