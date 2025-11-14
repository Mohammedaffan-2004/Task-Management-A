import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.email.trim()) return setError("Email is required"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Please enter a valid email"), false;
    if (!form.password) return setError("Password is required"), false;
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    const result = await login({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
    if (result.ok) navigate("/dashboard");
    else setError(result.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 relative overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Left - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600/20 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <LogIn size={42} className="text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">
            Welcome to <span className="text-blue-400">NexTask</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
            Manage your workflow and projects with precision and clarity.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-md bg-[#1E2233]/80 backdrop-blur-xl border border-[#2D3250] rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.15)] p-8 transition-all">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-500 p-4 rounded-2xl shadow-md">
                <LogIn className="text-white" size={28} />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Sign in to your account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back to your workspace.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-500/40 rounded-lg flex items-start gap-2 animate-shake text-sm text-red-300">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none text-gray-200 text-sm placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none text-gray-200 text-sm placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 text-white font-semibold shadow-md transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} /> <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2D3250]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1E2233] text-gray-500">
                New to NexTask?
              </span>
            </div>
          </div>

          <Link
            to="/register"
            className="block text-center text-sm text-gray-400 hover:text-blue-400 transition"
          >
            Create an account →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Login;
