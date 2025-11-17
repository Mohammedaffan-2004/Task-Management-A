import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { toast } from "react-hot-toast";
import { User, Edit3, Save, X, Loader2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
      setForm({ name: res.data.name, password: "" });
    } catch (err) {
      toast.error("Error loading profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/auth/update", form);
      toast.success("Profile updated successfully!");
      setEditing(false);
      fetchProfile();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  // Loading State
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#0B0C10] via-[#0F1629] to-[#111827] text-gray-300 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#3B82F6]/25 blur-3xl rounded-full -top-10 -left-10 animate-pulse-slow"></div>
        <div className="absolute w-80 h-80 bg-[#06B6D4]/25 blur-3xl rounded-full bottom-0 right-0 animate-pulse-slower"></div>
        <Loader2 className="w-10 h-10 text-[#60A5FA] animate-spin mb-4" />
        <p className="text-gray-400 text-sm tracking-wide">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 relative overflow-hidden px-6 py-10">
      
      <div className="absolute w-[500px] h-[500px] bg-[#3B82F6]/20 blur-[130px] rounded-full -top-20 left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#06B6D4]/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      
      <div className="relative z-10 bg-linear-to-br from-[#0F172A]/90 via-[#1E253F]/85 to-[#111827]/90 backdrop-blur-2xl border border-[#1E253F]/70 rounded-2xl shadow-[0_8px_32px_rgba(59,130,246,0.25)] w-full max-w-md p-8 transition-all text-gray-200">
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-[#3B82F6]/20 to-[#06B6D4]/10 border border-[#3B82F6]/30 shadow-[0_0_25px_rgba(59,130,246,0.3)] mb-3">
            <User size={42} className="text-[#60A5FA]" />
            <div className="absolute inset-0 rounded-full border border-[#3B82F6]/30 animate-pulse-slow"></div>
          </div>
          <h1 className="text-2xl font-semibold text-white">Your Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your account information</p>
        </div>

        
        {!editing ? (
          <div className="space-y-5">
            <div>
              <span className="block text-sm text-gray-500">Name</span>
              <span className="text-lg font-medium text-gray-200">{user.name}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Email</span>
              <span className="text-lg font-medium text-gray-200">{user.email}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Role</span>
              <span
                className={`px-3 py-1 mt-1 inline-block rounded-full text-sm font-medium border ${
                  user.role === "Admin"
                    ? "bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/40"
                    : "bg-[#10B981]/10 text-[#6EE7B7] border-[#10B981]/30"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="pt-5 flex justify-end">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-linear-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.03]"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
           
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40 outline-none text-sm text-gray-200 placeholder-gray-500 transition-all"
              />
            </div>

           
            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/40 outline-none text-sm text-gray-200 placeholder-gray-500 transition-all"
              />
            </div>

           
            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex items-center gap-1 px-4 py-2 text-gray-400 border border-[#2D3250] rounded-lg hover:bg-[#1E253F]/70 transition-all"
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-linear-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.03]"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

     
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite alternate; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite alternate-reverse; }
      `}</style>
    </div>
  );
};

export default Profile;
