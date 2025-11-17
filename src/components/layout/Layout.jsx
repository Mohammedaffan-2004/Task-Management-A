import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 overflow-hidden transition-all duration-300">
      <Sidebar />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-20 lg:ml-64"
        }`}
      >
        <Navbar />

        <main className="relative flex-1 p-4 sm:p-6 lg:p-8 bg-[#0F1629]/60 backdrop-blur-xl border-l border-[#1E253F]/60 overflow-y-auto transition-all">
          <div className="w-full max-w-7xl mx-auto relative z-10">
            <Outlet />
          </div>

          <div className="absolute -top-20 sm:-top-32 -right-20 sm:-right-40 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-600/20 blur-[80px] sm:blur-[130px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-50px] sm:bottom-[-100px] left-[-40px] sm:left-[-80px] w-[180px] sm:w-[350px] h-[180px] sm:h-[350px] bg-indigo-600/20 blur-[70px] sm:blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-50px] sm:bottom-[-100px] right-[60px] sm:right-[120px] w-[130px] sm:w-[250px] h-[130px] sm:h-[250px] bg-cyan-500/15 blur-[60px] sm:blur-[100px] rounded-full pointer-events-none"></div>
        </main>
      </div>
    </div>
  );
};

export default Layout;