// import {
//   LayoutDashboard,
//   User,
//   Folder,
//   ListTodo,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";

// const Sidebar = () => {
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [collapsed, setCollapsed] = useState(false);

//   const baseNav = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
   
//   ];

//   const adminNav = [
//     { name: "Projects", icon: <Folder size={18} />, path: "/projects" },
//     { name: "Tasks", icon: <ListTodo size={18} />, path: "/tasks" },
//      { name: "Profile", icon: <User size={18} />, path: "/profile" },
//   ];

//   const memberNav = [
//     { name: "My Tasks", icon: <ListTodo size={18} />, path: "/tasks" },
//      { name: "Profile", icon: <User size={18} />, path: "/profile" },
//   ];

//   const navItems =
//     user?.role === "Admin" ? [...baseNav, ...adminNav] : [...baseNav, ...memberNav];

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-full ${
//         collapsed ? "w-20" : "w-64"
//       } bg-gradient-to-b from-[#0B0C10]/95 via-[#0F1629]/90 to-[#111A2D]/90 backdrop-blur-2xl border-r border-[#1E253F]/60 shadow-[8px_0_25px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E253F]/60">
//         <h2
//           className={`text-xl font-bold bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent tracking-wide transition-all duration-300 ${
//             collapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
//           }`}
//         >
//          NexTask
//         </h2>

//         {/* Collapse Button */}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-400 hover:text-blue-400 transition p-1.5 rounded-md hover:bg-[#1E253F]/70"
//         >
//           {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col space-y-2 px-3 mt-6 flex-grow">
//         {navItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`relative group flex items-center ${
//                 collapsed ? "justify-center" : "gap-3"
//               } px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 isActive
//                   ? "bg-gradient-to-r from-[#1E3A8A]/40 to-[#1E40AF]/20 text-white border border-[#3B82F6]/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
//                   : "text-gray-400 hover:text-white hover:bg-[#1E253F]/60"
//               }`}
//             >
//               {/* Active Glow Indicator */}
//               {isActive && (
//                 <span className="absolute left-0 top-0 h-full w-[3px] rounded-r-full bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
//               )}

//               <span
//                 className={`transition-transform duration-200 group-hover:scale-110 ${
//                   isActive ? "text-[#60A5FA]" : "text-gray-400"
//                 }`}
//               >
//                 {item.icon}
//               </span>
//               {!collapsed && (
//                 <span
//                   className={`truncate transition-colors ${
//                     isActive ? "text-gray-100" : "text-gray-400"
//                   }`}
//                 >
//                   {item.name}
//                 </span>
//               )}

//               {/* Tooltip when Collapsed */}
//               {collapsed && (
//                 <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-[#0F1629]/95 text-gray-100 text-xs border border-[#2D3250]/60 opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-200 backdrop-blur-sm">
//                   {item.name}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="px-4 py-4 border-t border-[#1E253F]/60 text-center text-xs">
//         {!collapsed && user?.role && (
//           <p className="text-gray-400">
//             Logged in as{" "}
//             <span className="text-[#60A5FA] font-semibold">{user.role}</span>
//           </p>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import {
  LayoutDashboard,
  User,
  Folder,
  ListTodo,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false); // Close mobile menu on desktop
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const baseNav = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
  ];

  const adminNav = [
    { name: "Projects", icon: <Folder size={18} />, path: "/projects" },
    { name: "Tasks", icon: <ListTodo size={18} />, path: "/tasks" },
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  const memberNav = [
    { name: "My Tasks", icon: <ListTodo size={18} />, path: "/tasks" },
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  const navItems =
    user?.role === "Admin" ? [...baseNav, ...adminNav] : [...baseNav, ...memberNav];

  return (
    <>
      {/* Mobile Menu Button - Fixed Top Left */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-4 z-[60] p-2 bg-[#0F1629]/90 backdrop-blur-xl border border-[#2D3250] rounded-lg text-gray-300 hover:text-blue-400 transition-all shadow-lg"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Overlay for Mobile */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-gradient-to-b from-[#0B0C10]/95 via-[#0F1629]/90 to-[#111A2D]/90 backdrop-blur-2xl border-r border-[#1E253F]/60 shadow-[8px_0_25px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-300 ${
          isMobile
            ? mobileOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : collapsed
            ? "w-20"
            : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E253F]/60">
          <h2
            className={`text-xl font-bold bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent tracking-wide transition-all duration-300 ${
              collapsed && !isMobile ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
          >
           NexTask
          </h2>

          {/* Collapse Button (Desktop Only) */}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400 hover:text-blue-400 transition p-1.5 rounded-md hover:bg-[#1E253F]/70"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 px-3 mt-6 flex-grow overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group flex items-center ${
                  collapsed && !isMobile ? "justify-center" : "gap-3"
                } px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#1E3A8A]/40 to-[#1E40AF]/20 text-white border border-[#3B82F6]/40 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                    : "text-gray-400 hover:text-white hover:bg-[#1E253F]/60"
                }`}
              >
                {/* Active Glow Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-[3px] rounded-r-full bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                )}

                <span
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-[#60A5FA]" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                {(!collapsed || isMobile) && (
                  <span
                    className={`truncate transition-colors ${
                      isActive ? "text-gray-100" : "text-gray-400"
                    }`}
                  >
                    {item.name}
                  </span>
                )}

                {/* Tooltip when Collapsed (Desktop Only) */}
                {collapsed && !isMobile && (
                  <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-[#0F1629]/95 text-gray-100 text-xs border border-[#2D3250]/60 opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-200 backdrop-blur-sm whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[#1E253F]/60 text-center text-xs">
          {(!collapsed || isMobile) && user?.role && (
            <p className="text-gray-400">
              Logged in as{" "}
              <span className="text-[#60A5FA] font-semibold">{user.role}</span>
            </p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;