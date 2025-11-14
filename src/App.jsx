import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import ProjectAnalytics from "./pages/ProjectAnalytics";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

// Components
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#111827] relative overflow-hidden text-gray-300">
    {/* Animated ambient glows */}
    <div className="absolute w-[24rem] h-[24rem] bg-[#3B82F6]/25 blur-3xl rounded-full -top-16 -left-20 animate-float"></div>
    <div className="absolute w-[22rem] h-[22rem] bg-[#06B6D4]/25 blur-3xl rounded-full bottom-0 right-0 animate-float-delay"></div>

    {/* Centerpiece Logo + Progress */}
    <div className="relative z-10 flex flex-col items-center gap-3 animate-fadeIn">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent tracking-wide animate-pulse">
       NexTask
      </h1>
      <p className="text-sm text-gray-400 tracking-wide">
        Preparing your workspace...
      </p>

      {/* Loading bar */}
      <div className="mt-4 w-40 h-1.5 rounded-full bg-[#1E253F]/50 overflow-hidden">
        <div className="w-1/3 h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] animate-loadingBar"></div>
      </div>
    </div>

    {/* Subtle motion styles */}
    <style>{`
      @keyframes loadingBar {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
      .animate-loadingBar { animation: loadingBar 1.8s ease-in-out infinite; }

      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn { animation: fadeIn 0.6s ease-out; }

      @keyframes float {
        0%, 100% { transform: translateY(0); opacity: 0.9; }
        50% { transform: translateY(-10px); opacity: 1; }
      }
      .animate-float { animation: float 7s ease-in-out infinite; }
      .animate-float-delay { animation: float 9s ease-in-out infinite alternate; }
    `}</style>
  </div>
);

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      {/* Public Routes */}
      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}

      {/* Protected Routes */}
      {user && (
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ProjectAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
