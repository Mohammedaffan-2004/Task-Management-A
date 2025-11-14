import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#0B0C10] via-[#0F1629] to-[#111827] text-gray-200 overflow-hidden">
    {/* Ambient Glows */}
    <div className="absolute w-[500px] h-[500px] bg-[#3B82F6]/25 blur-[140px] rounded-full -top-24 -left-32"></div>
    <div className="absolute w-[420px] h-[420px] bg-[#06B6D4]/25 blur-[130px] rounded-full bottom-0 right-0"></div>

    {/* Content */}
    <div className="relative z-10 text-center space-y-7 px-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="p-5 bg-gradient-to-br from-[#3B82F6]/15 to-[#06B6D4]/10 border border-[#3B82F6]/30 rounded-full shadow-[0_0_25px_rgba(59,130,246,0.25)] backdrop-blur-xl">
          <TriangleAlert size={50} className="text-[#60A5FA]" />
        </div>
      </div>

      {/* 404 Number */}
      <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent tracking-widest drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
        404
      </h1>

      {/* Message */}
      <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
        The page you’re looking for might have drifted into the void.
      </p>

      {/* Button */}
      <Link
        to="/dashboard"
        className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] text-white px-6 py-3 rounded-lg font-medium shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.03]"
      >
        Return to Dashboard
      </Link>
    </div>

    {/* Floating Aura Shimmer */}
    <div className="absolute inset-0 pointer-events-none animate-pulse-slow"></div>

    <style>{`
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.03); }
      }
      .animate-pulse-slow {
        animation: pulse-slow 7s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default NotFound;
