import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";

const COLORS = ["#6366F1", "#14B8A6", "#F59E0B"];

const ProjectAnalytics = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get(`/projects/${id}/analytics`);
        setData(res.data);
      } catch (err) {
        console.error("Error loading project analytics:", err);
      }
    };
    fetchAnalytics();
  }, [id]);

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading project analytics...
      </div>
    );

  const pieData = [
    { name: "To Do", value: data.statusCount.todo },
    { name: "In Progress", value: data.statusCount.progress },
    { name: "Done", value: data.statusCount.done },
  ];

  const barData = Object.entries(data.userWorkload).map(([name, count]) => ({
    name,
    Tasks: count,
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 p-8 relative overflow-hidden">
      
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-3xl font-semibold tracking-wide text-white">
          {data.project}
          <span className="text-blue-400 font-medium"> — Analytics</span>
        </h1>
        <Link
          to="/projects"
          className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-500 hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium text-white shadow-md shadow-blue-900/40 transition-all"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
       
        <div className="bg-[#1E2233]/80 backdrop-blur-xl border border-[#2D3250] rounded-xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-blue-900/30 transition-all">
          <h2 className="text-lg font-semibold text-white mb-4">
            Task Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label={({ name, value }) => `${name} (${value})`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F1629",
                  border: "1px solid #2D3250",
                  color: "#E2E8F0",
                  borderRadius: "8px",
                }}
              />
              <Legend
                wrapperStyle={{
                  color: "#CBD5E1",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      
        <div className="bg-[#1E2233]/80 backdrop-blur-xl border border-[#2D3250] rounded-xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-blue-900/30 transition-all">
          <h2 className="text-lg font-semibold text-white mb-4">
            Workload by User
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F1629",
                  border: "1px solid #2D3250",
                  color: "#E2E8F0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="Tasks" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div className="relative z-10 mt-10 bg-[#1E2233]/80 backdrop-blur-xl border border-[#2D3250] p-6 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-blue-900/30 transition-all">
        <h2 className="text-lg font-semibold text-white mb-4">
          Recent Tasks
        </h2>
        {data.recentTasks.length === 0 ? (
          <p className="text-gray-500">No recent tasks</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-400 text-left text-xs uppercase tracking-wide">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Assigned To</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="bg-[#0F1629]/70 border border-[#2D3250] hover:bg-[#2A3044] transition rounded-lg"
                  >
                    <td className="px-4 py-2 font-medium text-gray-200">
                      {task.title}
                    </td>
                    <td className="px-4 py-2 text-gray-400">
                      {task.assignedTo?.name || "Unassigned"}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          task.status === "Done"
                            ? "bg-green-600/10 text-green-400 border-green-500/30"
                            : task.status === "In Progress"
                            ? "bg-yellow-600/10 text-yellow-400 border-yellow-500/30"
                            : "bg-gray-600/10 text-gray-400 border-gray-500/30"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAnalytics;
