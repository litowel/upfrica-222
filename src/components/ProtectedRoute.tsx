import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("upfrica_user");
    
    if (!storedUser) {
      setLocation("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const kycStatus = user.kycStatus || "NOT_STARTED";
      
      const isKYCPage = location.startsWith("/kyc");
      
      // Redirect to KYC if authenticated but not yet verified
      if (!isKYCPage && (kycStatus === "NOT_STARTED" || kycStatus === "PENDING")) {
        setLocation("/kyc?required=true");
        return;
      }

      setIsAuthorized(true);
    } catch (e) {
      localStorage.removeItem("upfrica_user");
      setLocation("/login");
    }
  }, [location, setLocation]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
