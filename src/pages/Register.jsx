import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return setError("Name is required"), false;
    if (!form.email.trim()) return setError("Email is required"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Please enter a valid email"), false;
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters"), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate("/login", {
        state: { message: "Account created successfully! Please login." },
      });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 overflow-hidden relative">
      {/* Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 relative overflow-hidden z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600/20 rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <UserPlus size={42} className="text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">
            Join <span className="text-blue-400">NexTask</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
            Create your account and start managing projects, tracking tasks,
            and collaborating with your team seamlessly.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 z-10">
        <div className="w-full max-w-md bg-[#1E2233]/80 backdrop-blur-xl border border-[#2D3250] rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.15)] p-8 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-10 right-0 w-56 h-56 bg-blue-600/30 blur-3xl rounded-full"></div>

          {/* Header */}
          <div className="relative z-10 flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-500 p-4 rounded-2xl shadow-lg">
                <UserPlus className="text-white" size={28} />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Create your account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Get started with your workspace.
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
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none text-gray-200 text-sm placeholder-gray-500"
                />
              </div>
            </div>

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

              {/* Password Validation */}
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  {form.password.length >= 6 ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <XCircle size={14} className="text-gray-400" />
                  )}
                  <span
                    className={`text-xs ${
                      form.password.length >= 6
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    {form.password.length >= 6
                      ? "Good password"
                      : "At least 6 characters"}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 text-white font-semibold shadow-md shadow-blue-900/30 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} /> <span>Create Account</span>
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block text-center text-sm text-gray-400 hover:text-blue-400 transition"
          >
            Sign in →
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
