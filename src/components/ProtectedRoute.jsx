import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, Loader2, Lock } from "lucide-react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#0B0C10] via-[#0F1629] to-[#111827] text-gray-200 relative overflow-hidden">
        <div className="absolute w-80 h-80 bg-[#3B82F6]/20 blur-3xl rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-[#06B6D4]/20 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#60A5FA] animate-spin" />
          <p className="text-gray-400 text-sm tracking-wide">
            Authenticating user...
          </p>
        </div>
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0B0C10] via-[#0F1629] to-[#111827] relative overflow-hidden text-gray-200">
        <div className="absolute w-96 h-96 bg-[#3B82F6]/25 blur-3xl rounded-full -top-12 -left-12 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-[#06B6D4]/25 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

        <div className="relative z-10 max-w-md w-full bg-linear-to-br from-[#0F172A]/95 via-[#1E253F]/85 to-[#111827]/95 backdrop-blur-2xl border border-[#1E253F]/70 rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(59,130,246,0.25)]">
          <div className="flex justify-center mb-5">
            <div className="p-4 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-full shadow-inner shadow-[#3B82F6]/20">
              <ShieldAlert className="text-[#60A5FA] w-10 h-10" />
            </div>
          </div>

          <h2 className="text-xl font-semibold bg-linear-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-2 tracking-wide">
            Access Denied
          </h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            You need <span className="text-blue-400 font-semibold">{allowedRoles.join(" or ")}</span> role to access this page.
          </p>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex items-center gap-2 bg-linear-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] px-6 py-2 rounded-md text-sm font-medium text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.03] mx-auto"
          >
            <Lock size={16} />
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

 
  return children;
};

export default ProtectedRoute;