import React from "react";

const Card = ({ title, subtitle, icon, children, onClick, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden 
      bg-gradient-to-br from-[#0B0C10]/90 via-[#0F1629]/85 to-[#111827]/90 
      backdrop-blur-2xl border border-[#1E253F]/70 
      rounded-2xl p-6 
      shadow-[0_8px_24px_rgba(0,0,0,0.3)] 
      hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] 
      hover:border-[#3B82F6]/50 
      transition-all duration-500 ease-out
      ${onClick ? "cursor-pointer hover:-translate-y-[3px]" : ""} 
      ${className}`}
    >
      {/* Ambient glow overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#3B82F6]/10 via-[#06B6D4]/10 to-[#22D3EE]/10 blur-xl transition-all duration-700 pointer-events-none"></div>

      {/* Header */}
      {(title || icon) && (
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex-1">
            {title && (
              <h3 className="text-lg font-semibold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-1 tracking-wide drop-shadow-[0_0_6px_rgba(59,130,246,0.3)]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
            )}
          </div>

          {icon && (
            <div
              className="p-2 rounded-xl bg-gradient-to-br from-[#1E253F]/60 to-[#0F172A]/60 
              border border-[#2D3250]/60 text-[#60A5FA] 
              group-hover:from-[#3B82F6]/40 group-hover:to-[#06B6D4]/30 
              group-hover:border-[#3B82F6]/50 
              group-hover:text-[#93C5FD]
              shadow-[inset_0_0_8px_rgba(59,130,246,0.15)]
              transition-all duration-500 flex-shrink-0 ml-3"
            >
              {icon}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="relative z-10 text-gray-200 leading-relaxed">
        {children}
      </div>

      {/* Accent lighting */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-gradient-to-tr from-[#3B82F6]/25 via-[#06B6D4]/20 to-transparent blur-3xl rounded-tl-full opacity-70 pointer-events-none"></div>
    </div>
  );
};

export default Card;
