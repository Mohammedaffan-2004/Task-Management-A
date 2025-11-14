// import { LogOut, Search, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useState } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0F1629]/70 border-b border-[#1E253F] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <h1
//           onClick={() => navigate("/dashboard")}
//           className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent tracking-wide cursor-pointer select-none"
//         >
//         NexTask
//         </h1>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center bg-[#1E253F]/70 border border-[#2D3250] rounded-lg px-3 py-1.5 text-sm text-gray-300 w-72 shadow-inner hover:border-blue-500/50 transition-all">
//           <Search size={16} className="mr-2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search projects or tasks..."
//             className="bg-transparent border-none outline-none w-full placeholder-gray-500 text-gray-200 focus:text-white"
//           />
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {/* Profile */}
//           <div className="relative">
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex items-center gap-2 bg-[#1E253F]/70 hover:bg-[#2A3150]/80 border border-[#2D3250] hover:border-blue-500/50 rounded-lg px-3 py-1.5 transition-all"
//             >
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white text-sm font-semibold shadow-[0_0_10px_rgba(59,130,246,0.4)]">
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <div className="hidden md:flex flex-col items-start text-left">
//                 <span className="text-sm font-medium text-gray-100 leading-tight">
//                   {user?.name || "User"}
//                 </span>
//                 <span className="text-xs text-[#60A5FA]">
//                   {user?.role || "Member"}
//                 </span>
//               </div>
//             </button>

//             {/* Dropdown */}
//             {open && (
//               <div className="absolute right-0 mt-3 w-44 bg-[#0F1629]/95 border border-[#2D3250] rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.5)] backdrop-blur-md p-2 text-gray-300 animate-fade-in">
//                 <button
//                   onClick={() => {
//                     navigate("/profile");
//                     setOpen(false);
//                   }}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#1E253F]/70 hover:text-blue-400 rounded-md transition-all"
//                 >
//                   <User size={15} className="text-[#60A5FA]" />
//                   Profile
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-all"
//                 >
//                   <LogOut size={15} />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Small Animation Styles */}
//       <style>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(-5px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.2s ease-out forwards;
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;

import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0F1629]/70 border-b border-[#1E253F] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all">
      <div className="w-full px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
        {/* Logo - Hide on very small screens if needed */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent tracking-wide cursor-pointer select-none flex-shrink-0"
        >
         NexTask
        </h1>

        {/* Spacer for mobile - pushes profile to right */}
        <div className="flex-1"></div>

        {/* Right Side - Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer flex items-center gap-2 bg-[#1E253F]/70 hover:bg-[#2A3150]/80 border border-[#2D3250] hover:border-blue-500/50 rounded-lg px-2 sm:px-3 py-1.5 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white text-sm font-semibold shadow-[0_0_10px_rgba(59,130,246,0.4)] flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              
              {/* Hide name on very small screens */}
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm font-medium text-gray-100 leading-tight max-w-[120px] truncate">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-[#60A5FA]">
                  {user?.role || "Member"}
                </span>
              </div>
            </button>

            {/* Dropdown - Responsive positioning */}
            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-[#0F1629]/95 border border-[#2D3250] rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.5)] backdrop-blur-md p-2 text-gray-300 animate-fade-in z-50">
                {/* Show name/role in dropdown on mobile */}
                <div className="sm:hidden px-3 py-2 border-b border-[#2D3250] mb-2">
                  <p className="text-sm font-medium text-gray-100 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-[#60A5FA]">
                    {user?.role || "Member"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#1E253F]/70 hover:text-blue-400 rounded-md transition-all"
                >
                  <User size={15} className="text-[#60A5FA]" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;