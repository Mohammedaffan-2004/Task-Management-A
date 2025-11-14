import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) => {
  const base =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.97] overflow-hidden";

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] text-white border border-[#3B82F6]/30 shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.4)] hover:brightness-110 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#3B82F6]/10 before:to-[#22D3EE]/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    secondary:
      "bg-[#1E253F]/80 text-gray-200 border border-[#2D3250]/70 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    danger:
      "bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white border border-[#EF4444]/30 shadow-[0_4px_18px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_28px_rgba(239,68,68,0.45)] hover:brightness-110",
    ghost:
      "bg-transparent text-gray-300 hover:text-white hover:bg-[#1E253F]/70 border border-transparent hover:border-[#2D3250]/70 transition-all",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {/* Loader or Icon */}
      <span className="relative flex items-center justify-center z-10">
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
        ) : Icon ? (
          <Icon className="w-4 h-4 mr-2" />
        ) : null}
        {children}
      </span>
    </button>
  );
};

export default Button;
