import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Users as UsersIcon, Loader2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/auth/users");
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 p-8 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#3B82F6]/25 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-[#06B6D4]/25 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-10">
        <div className="p-3 bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/10 border border-[#3B82F6]/30 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.25)] backdrop-blur-xl">
          <UsersIcon size={24} className="text-[#60A5FA]" />
        </div>
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent font-bold">
            Users
          </span>{" "}
          Directory
        </h1>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#60A5FA] mb-3" />
          <p className="text-sm">Loading users...</p>
        </div>
      ) : (
        <div className="relative z-10 overflow-x-auto rounded-2xl border border-[#2D3250] bg-[#1E2233]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:border-[#3B82F6]/40 transition-all duration-300">
          <table className="w-full text-sm border-separate border-spacing-y-1">
            <thead>
              <tr className="text-left bg-[#0F1629]/80 text-gray-400 uppercase text-xs tracking-wider border-b border-[#2D3250]">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-gray-500 text-sm italic"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u, i) => (
                  <tr
                    key={u._id}
                    className={`group border border-[#2D3250]/50 rounded-xl transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-[#3B82F6]/40 ${
                      i % 2 === 0
                        ? "bg-[#151A2D]/60"
                        : "bg-[#1B2034]/60"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-100 group-hover:text-[#60A5FA] transition-all">
                      {u.name}
                    </td>
                    <td className="p-4 text-gray-400">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium border ${
                          u.role === "Admin"
                            ? "bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/40"
                            : "bg-[#10B981]/10 text-[#6EE7B7] border-[#10B981]/30"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
};

export default Users;
