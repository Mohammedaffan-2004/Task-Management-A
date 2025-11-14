// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Activity, Folder, ListTodo, Users } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     projects: 0,
//     tasks: 0,
//     completedTasks: 0,
//     users: 0,
//   });
//   const [tasks, setTasks] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchData = async () => {
//     try {
//       const [taskRes, projRes] = await Promise.all([
//         axiosInstance.get("/tasks"),
//         axiosInstance.get("/projects"),
//       ]);

//       setTasks(taskRes.data);
//       setProjects(projRes.data);

//       const completed = taskRes.data.filter((t) => t.status === "Done").length;

//       let userCount = 0;
//       if (user?.role === "Admin") {
//         const usersRes = await axiosInstance.get("/auth/users");
//         userCount = usersRes.data.length;
//       }

//       setStats({
//         projects: projRes.data.length,
//         tasks: taskRes.data.length,
//         completedTasks: completed,
//         users: userCount,
//       });
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//     }
//   };

//   const fetchActivities = async () => {
//     try {
//       const res = await axiosInstance.get("/activities");
//       setActivities(res.data);
//     } catch (err) {
//       console.error("Error fetching activities:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchActivities();
//   }, []);

//   const pieData = [
//     { name: "To Do", value: tasks.filter((t) => t.status === "To Do").length },
//     {
//       name: "In Progress",
//       value: tasks.filter((t) => t.status === "In Progress").length,
//     },
//     { name: "Done", value: tasks.filter((t) => t.status === "Done").length },
//   ];

//   const COLORS = ["#3B82F6", "#2563EB", "#60A5FA"];

//   const barData = projects.map((p) => ({
//     name: p.title,
//     Tasks: tasks.filter((t) => t.projectId?._id === p._id).length,
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 p-8 overflow-hidden relative">
//       {/* Ambient Glows */}
//       <div className="absolute w-80 h-80 bg-blue-600/20 blur-3xl rounded-full -top-10 -left-10"></div>
//       <div className="absolute w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full bottom-0 right-0"></div>

//       {/* Header */}
//       <div className="relative z-10 mb-10">
//         <h1 className="text-3xl font-semibold text-white tracking-wide">
//           Welcome back,{" "}
//           <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-bold">
//             {user?.name || "User"}
//           </span>
//         </h1>
//         <p className="text-gray-400 text-sm mt-1">
//           Here’s what’s happening in your workspace today.
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
//         {[
//           { label: "Projects", value: stats.projects, icon: Folder },
//           { label: "Tasks", value: stats.tasks, icon: ListTodo },
//           { label: "Completed", value: stats.completedTasks, icon: Activity },
//           ...(user?.role === "Admin"
//             ? [{ label: "Users", value: stats.users, icon: Users }]
//             : []),
//         ].map(({ label, value, icon: Icon }) => (
//           <div
//             key={label}
//             className="bg-[#1E2233]/80 border border-[#2D3250] rounded-xl p-5 shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:border-blue-500/40 transition-all duration-300"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-sm text-gray-400">{label}</h2>
//                 <p className="text-3xl font-bold text-blue-400 mt-1">{value}</p>
//               </div>
//               <div className="p-2 bg-blue-600/10 rounded-lg border border-blue-500/20">
//                 <Icon className="text-blue-400" size={22} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="relative z-10 grid md:grid-cols-2 gap-8 mt-10">
//         <div className="bg-[#1E2233]/80 backdrop-blur-md border border-[#2D3250] rounded-xl p-6 shadow-lg hover:border-blue-500/30 transition-all">
//           <h3 className="text-lg font-semibold text-blue-400 mb-4">
//             Task Status Overview
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={90}
//                 label={({ name, value }) => `${name} (${value})`}
//               >
//                 {pieData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "#1E2233",
//                   border: "1px solid #3B82F6",
//                   color: "#E5E7EB",
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-[#1E2233]/80 backdrop-blur-md border border-[#2D3250] rounded-xl p-6 shadow-lg hover:border-blue-500/30 transition-all">
//           <h3 className="text-lg font-semibold text-blue-400 mb-4">
//             Project Task Distribution
//           </h3>
//           {barData.length ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={barData}>
//                 <XAxis dataKey="name" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1E2233",
//                     border: "1px solid #3B82F6",
//                     color: "#E5E7EB",
//                   }}
//                 />
//                 <Bar dataKey="Tasks" fill="#3B82F6" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-gray-500">No projects found.</p>
//           )}
//         </div>
//       </div>

//       {/* Activity Feed */}
//       <div className="relative z-10 mt-10 bg-[#1E2233]/80 border border-[#2D3250] rounded-xl p-6 shadow-md hover:border-blue-500/30 transition-all">
//         <h3 className="text-lg font-semibold text-blue-400 mb-4">
//           Recent Activity
//         </h3>
//         {activities.length === 0 ? (
//           <p className="text-gray-500">No recent activity found.</p>
//         ) : (
//           <ul className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3B82F6]/40">
//             {activities.map((act) => (
//               <li
//                 key={act._id}
//                 className="flex justify-between items-center bg-[#141827]/60 px-4 py-3 rounded-lg border border-[#2D3250] hover:bg-[#1A1E2D] transition-all"
//               >
//                 <div>
//                   <p className="text-gray-200">
//                     <span className="text-blue-400 font-medium">
//                       {act.user?.name || "Someone"}
//                     </span>{" "}
//                     {act.action}{" "}
//                     <span className="italic text-gray-400">{act.target}</span>
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {new Date(act.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, Folder, ListTodo, Users, Loader2 } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completedTasks: 0,
    users: 0,
  });
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // ✅ Fetch data based on user role
      const requests = [
        axiosInstance.get("/tasks"),
        axiosInstance.get("/projects"),
        axiosInstance.get("/activities"),
      ];

      // Add users fetch only for Admin
      if (user?.role === "Admin") {
        requests.push(axiosInstance.get("/auth/users"));
      }

      const responses = await Promise.all(requests);
      const [taskRes, projRes, actRes, userRes] = responses;

      setTasks(taskRes.data);
      setProjects(projRes.data);
      setActivities(actRes.data);

      const completed = taskRes.data.filter((t) => t.status === "Done").length;

      setStats({
        projects: projRes.data.length,
        tasks: taskRes.data.length,
        completedTasks: completed,
        users: userRes ? userRes.data.length : 0,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pieData = [
    { name: "To Do", value: tasks.filter((t) => t.status === "To Do").length },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
    },
    { name: "Done", value: tasks.filter((t) => t.status === "Done").length },
  ];

  const COLORS = ["#3B82F6", "#F59E0B", "#10B981"];

  const barData = projects.slice(0, 5).map((p) => ({
    name: p.title.length > 15 ? p.title.substring(0, 15) + "..." : p.title,
    Tasks: tasks.filter((t) => t.projectId?._id === p._id).length,
  }));

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#60A5FA] animate-spin" />
          <p className="text-gray-400 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Ambient Glows */}
      <div className="absolute w-60 sm:w-80 h-60 sm:h-80 bg-blue-600/20 blur-3xl rounded-full -top-10 -left-10 pointer-events-none"></div>
      <div className="absolute w-52 sm:w-72 h-52 sm:h-72 bg-indigo-600/20 blur-3xl rounded-full bottom-0 right-0 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-bold">
            {user?.name || "User"}
          </span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Stats - Responsive Grid */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10">
        {[
          { label: "Projects", value: stats.projects, icon: Folder },
          { label: "Tasks", value: stats.tasks, icon: ListTodo },
          { label: "Completed", value: stats.completedTasks, icon: Activity },
          ...(user?.role === "Admin"
            ? [{ label: "Users", value: stats.users, icon: Users }]
            : []),
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[#1E2233]/80 border border-[#2D3250] rounded-xl p-3 sm:p-5 shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xs sm:text-sm text-gray-400">{label}</h2>
                <p className="text-xl sm:text-3xl font-bold text-blue-400 mt-1">{value}</p>
              </div>
              <div className="p-1.5 sm:p-2 bg-blue-600/10 rounded-lg border border-blue-500/20">
                <Icon className="text-blue-400" size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts - Responsive Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-10">
        {/* Pie Chart */}
        <div className="bg-[#1E2233]/80 backdrop-blur-md border border-[#2D3250] rounded-xl p-4 sm:p-6 shadow-lg hover:border-blue-500/30 transition-all">
          <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-4">
            Task Status Overview
          </h3>
          <div className="w-full h-[200px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E2233",
                    border: "1px solid #3B82F6",
                    color: "#E5E7EB",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#1E2233]/80 backdrop-blur-md border border-[#2D3250] rounded-xl p-4 sm:p-6 shadow-lg hover:border-blue-500/30 transition-all">
          <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-4">
            Project Task Distribution
          </h3>
          {barData.length ? (
            <div className="w-full h-[200px] sm:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E2233",
                      border: "1px solid #3B82F6",
                      color: "#E5E7EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="Tasks" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No projects found.</p>
          )}
        </div>
      </div>

      {/* Activity Feed - Responsive */}
      <div className="relative z-10 bg-[#1E2233]/80 border border-[#2D3250] rounded-xl p-4 sm:p-6 shadow-md hover:border-blue-500/30 transition-all">
        <h3 className="text-base sm:text-lg font-semibold text-blue-400 mb-4">
          Recent Activity
        </h3>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activity found.</p>
        ) : (
          <ul className="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3B82F6]/40">
            {activities.slice(0, 10).map((act) => (
              <li
                key={act._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#141827]/60 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#2D3250] hover:bg-[#1A1E2D] transition-all gap-2 sm:gap-0"
              >
                <div className="flex-1">
                  <p className="text-sm text-gray-200">
                    <span className="text-blue-400 font-medium">
                      {act.user?.name || "Someone"}
                    </span>{" "}
                    {act.action}{" "}
                    <span className="italic text-gray-400">{act.target}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(act.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
