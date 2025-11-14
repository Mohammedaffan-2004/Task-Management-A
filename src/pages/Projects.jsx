// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Link } from "react-router-dom";
// import { Edit3, Trash2, Search, PlusCircle } from "lucide-react";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [editForm, setEditForm] = useState({ id: "", title: "", description: "" });
//   const [search, setSearch] = useState("");
//   const [filterUser, setFilterUser] = useState("");
//   const [message, setMessage] = useState("");
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetchProjects();
//     fetchUsers();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axiosInstance.get("/projects");
//       setProjects(res.data);
//       setFiltered(res.data);
//     } catch (err) {
//       console.error("Error fetching projects:", err);
//     }
//   };

//   const fetchUsers = async () => {
//     if (user?.role !== "Admin") return;
//     try {
//       const res = await axiosInstance.get("/auth/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   useEffect(() => {
//     let result = projects;
//     if (search.trim()) {
//       const query = search.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.title.toLowerCase().includes(query) ||
//           p.description?.toLowerCase().includes(query)
//       );
//     }
//     if (filterUser) {
//       result = result.filter((p) => p.createdBy?._id === filterUser);
//     }
//     setFiltered(result);
//   }, [search, filterUser, projects]);

//   const handleCreateProject = async (e) => {
//     e.preventDefault();
//     if (!form.title.trim()) return setMessage("⚠️ Title required");
//     try {
//       const res = await axiosInstance.post("/projects", form);
//       setProjects([...projects, res.data]);
//       setForm({ title: "", description: "" });
//       setMessage("✅ Project created!");
//       document.getElementById("createProjectModal").close();
//       setTimeout(() => setMessage(""), 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error creating project");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this project?")) return;
//     try {
//       await axiosInstance.delete(`/projects/${id}`);
//       setProjects(projects.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error("Error deleting project:", err);
//     }
//   };

//   const openEditModal = (project) => {
//     setEditForm({
//       id: project._id,
//       title: project.title,
//       description: project.description,
//     });
//     document.getElementById("editProjectModal").showModal();
//   };

//   const handleEditProject = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.put(`/projects/${editForm.id}`, {
//         title: editForm.title,
//         description: editForm.description,
//       });
//       setProjects(projects.map((p) => (p._id === editForm.id ? res.data : p)));
//       document.getElementById("editProjectModal").close();
//     } catch (err) {
//       console.error("Error updating project:", err);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 p-8 overflow-hidden">
//       {/* Ambient Glow */}
//       <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
//       <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

//       {/* Header */}
//       <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
//         <h1 className="text-3xl font-semibold tracking-wide text-white">
//           <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent font-bold">
//             Projects
//           </span>{" "}
//           Overview
//         </h1>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 pr-3 py-2 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40 outline-none text-sm text-gray-200 placeholder-gray-500 transition-all"
//             />
//           </div>

//           {user?.role === "Admin" && (
//             <>
//               <select
//                 value={filterUser}
//                 onChange={(e) => setFilterUser(e.target.value)}
//                 className="bg-[#0F1629]/70 border border-[#2D3250] rounded-lg p-2 text-sm text-gray-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40 outline-none transition-all"
//               >
//                 <option value="">All Users</option>
//                 {users.map((u) => (
//                   <option key={u._id} value={u._id}>
//                     {u.name}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() =>
//                   document.getElementById("createProjectModal").showModal()
//                 }
//                 className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-[1.03]"
//               >
//                 <PlusCircle size={16} /> New Project
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Message */}
//       {message && (
//         <p className="text-sm text-center mb-4 text-[#60A5FA] font-medium animate-pulse">
//           {message}
//         </p>
//       )}

//       {/* Projects Grid */}
//       {filtered.length === 0 ? (
//         <p className="text-gray-500 text-center mt-10 italic">
//           No projects found. Try adjusting your filters.
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
//           {filtered.map((project) => (
//             <div
//               key={project._id}
//               className="bg-gradient-to-br from-[#0F172A]/90 via-[#1E253F]/85 to-[#111827]/90 backdrop-blur-2xl border border-[#1E253F]/70 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:border-[#3B82F6]/50 transition-all duration-500"
//             >
//               <h2 className="text-lg font-semibold text-white mb-1">
//                 {project.title}
//               </h2>
//               <p className="text-sm text-gray-400 mb-2">
//                 {project.description || "No description provided."}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Created by:{" "}
//                 <span className="text-[#06B6D4] font-medium">
//                   {project.createdBy?.name || "Unknown"}
//                 </span>
//               </p>

//               <div className="flex justify-between items-center mt-4">
//                 <Link
//                   to={`/projects/${project._id}`}
//                   className="text-[#60A5FA] hover:text-[#93C5FD] text-sm font-medium transition"
//                 >
//                   View Analytics →
//                 </Link>

//                 {user?.role === "Admin" && (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => openEditModal(project)}
//                       className="text-[#F59E0B] hover:text-[#FACC15] hover:scale-110 transition"
//                     >
//                       <Edit3 size={16} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(project._id)}
//                       className="text-[#EF4444] hover:text-[#F87171] hover:scale-110 transition"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ----- Modals ----- */}
//       {/* Create Modal */}
//       <dialog
//         id="createProjectModal"
//         className="backdrop:bg-black/60 backdrop-blur-sm p-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-[#1E253F]/70 bg-gradient-to-br from-[#0F172A]/95 via-[#111827]/90 to-[#0B1120]/90 text-gray-200 w-full max-w-md"
//       >
//         <form onSubmit={handleCreateProject} className="p-6 space-y-5">
//           <h3 className="text-lg font-semibold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
//             Create New Project
//           </h3>
//           <input
//             name="title"
//             placeholder="Project Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
//             rows={3}
//           />
//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={() =>
//                 document.getElementById("createProjectModal").close()
//               }
//               className="px-4 py-2 rounded-lg text-sm text-gray-400 border border-[#2D3250] hover:bg-[#1E253F]/70 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90 shadow-[0_4px_20px_rgba(59,130,246,0.35)] transition-all"
//             >
//               Create
//             </button>
//           </div>
//         </form>
//       </dialog>

//       {/* Edit Modal */}
//       <dialog
//         id="editProjectModal"
//         className="backdrop:bg-black/60 backdrop-blur-sm p-0 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-[#1E253F]/70 bg-gradient-to-br from-[#0F172A]/95 via-[#111827]/90 to-[#0B1120]/90 text-gray-200 w-full max-w-md"
//       >
//         <form onSubmit={handleEditProject} className="p-6 space-y-5">
//           <h3 className="text-lg font-semibold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
//             Edit Project
//           </h3>
//           <input
//             name="title"
//             placeholder="Project Title"
//             value={editForm.title}
//             onChange={(e) =>
//               setEditForm({ ...editForm, title: e.target.value })
//             }
//             className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={editForm.description}
//             onChange={(e) =>
//               setEditForm({ ...editForm, description: e.target.value })
//             }
//             className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
//             rows={3}
//           />
//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={() =>
//                 document.getElementById("editProjectModal").close()
//               }
//               className="px-4 py-2 rounded-lg text-sm text-gray-400 border border-[#2D3250] hover:bg-[#1E253F]/70 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90 shadow-[0_4px_20px_rgba(59,130,246,0.35)] transition-all"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </dialog>
//     </div>
//   );
// };

// export default Projects;


import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { Edit3, Trash2, Search, PlusCircle, Loader2 } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editForm, setEditForm] = useState({ id: "", title: "", description: "" });
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const requests = [axiosInstance.get("/projects")];
      
      if (user?.role === "Admin") {
        requests.push(axiosInstance.get("/auth/users"));
      }
      
      const [projRes, userRes] = await Promise.all(requests);
      setProjects(projRes.data);
      setFiltered(projRes.data);
      if (userRes) setUsers(userRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = projects;
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }
    if (filterUser) {
      result = result.filter((p) => p.createdBy?._id === filterUser);
    }
    setFiltered(result);
  }, [search, filterUser, projects]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setMessage("⚠️ Title required");
    try {
      const res = await axiosInstance.post("/projects", form);
      setProjects([res.data, ...projects]);
      setForm({ title: "", description: "" });
      setMessage("✅ Project created!");
      document.getElementById("createProjectModal").close();
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axiosInstance.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      setMessage("🗑️ Project deleted!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const openEditModal = (project) => {
    setEditForm({
      id: project._id,
      title: project.title,
      description: project.description,
    });
    document.getElementById("editProjectModal").showModal();
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/projects/${editForm.id}`, {
        title: editForm.title,
        description: editForm.description,
      });
      setProjects(projects.map((p) => (p._id === editForm.id ? res.data : p)));
      document.getElementById("editProjectModal").close();
      setMessage("✏️ Project updated!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233]">
        <Loader2 className="w-10 h-10 text-[#60A5FA] animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px] pointer-events-none" />
      <div className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-4 mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white">
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent font-bold">
            Projects
          </span>{" "}
          Overview
        </h1>

        {/* Filters - Responsive Stack */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40 outline-none text-sm text-gray-200 placeholder-gray-500 transition-all"
            />
          </div>

          {user?.role === "Admin" && (
            <>
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full sm:w-auto bg-[#0F1629]/70 border border-[#2D3250] rounded-lg p-2 text-sm text-gray-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/40 outline-none transition-all"
              >
                <option value="">All Users</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  document.getElementById("createProjectModal").showModal()
                }
                className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#60A5FA] hover:to-[#22D3EE] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.45)] transition-all duration-300"
              >
                <PlusCircle size={16} /> New Project
              </button>
            </>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <p className="text-sm text-center mb-4 text-[#60A5FA] font-medium animate-pulse">
          {message}
        </p>
      )}

      {/* Projects Grid - Responsive */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 italic text-sm">
          No projects found. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
          {filtered.map((project) => (
            <div
              key={project._id}
              className="bg-gradient-to-br from-[#0F172A]/90 via-[#1E253F]/85 to-[#111827]/90 backdrop-blur-2xl border border-[#1E253F]/70 rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:border-[#3B82F6]/50 transition-all duration-500"
            >
              <h2 className="text-base sm:text-lg font-semibold text-white mb-1 truncate">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">
                {project.description || "No description provided."}
              </p>
              <p className="text-xs text-gray-400 truncate">
                Created by:{" "}
                <span className="text-[#06B6D4] font-medium">
                  {project.createdBy?.name || "Unknown"}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
                <Link
                  to={`/projects/${project._id}`}
                  className="text-[#60A5FA] hover:text-[#93C5FD] text-xs sm:text-sm font-medium transition"
                >
                  View Analytics →
                </Link>

                {user?.role === "Admin" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(project)}
                      className="text-[#F59E0B] hover:text-[#FACC15] hover:scale-110 transition cursor-pointer"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-[#EF4444] hover:text-[#F87171] hover:scale-110 transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals - Responsive */}
      <dialog
        id="createProjectModal"
        className="backdrop:bg-black/60 backdrop-blur-sm p-0 rounded-2xl border border-[#1E253F]/70 bg-gradient-to-br from-[#0F172A]/95 via-[#111827]/90 to-[#0B1120]/90 text-gray-200 w-[90vw] max-w-md"
      >
        <form onSubmit={handleCreateProject} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
            Create New Project
          </h3>
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
            rows={3}
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                document.getElementById("createProjectModal").close()
              }
              className="cursor-pointer px-4 py-2 rounded-lg text-sm text-gray-400 border border-[#2D3250] hover:bg-[#1E253F]/70 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90 shadow-[0_4px_20px_rgba(59,130,246,0.35)] transition-all"
            >
              Create
            </button>
          </div>
        </form>
      </dialog>

      {/* Edit Modal */}
      <dialog
        id="editProjectModal"
        className="backdrop:bg-black/60 backdrop-blur-sm p-0 rounded-2xl border border-[#1E253F]/70 bg-gradient-to-br from-[#0F172A]/95 via-[#111827]/90 to-[#0B1120]/90 text-gray-200 w-[90vw] max-w-md"
      >
        <form onSubmit={handleEditProject} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
            Edit Project
          </h3>
          <input
            name="title"
            placeholder="Project Title"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
            className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            className="w-full p-2.5 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] outline-none text-sm text-gray-200 placeholder-gray-500"
            rows={3}
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                document.getElementById("editProjectModal").close()
              }
              className="cursor-pointer px-4 py-2 rounded-lg text-sm text-gray-400 border border-[#2D3250] hover:bg-[#1E253F]/70 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90 shadow-[0_4px_20px_rgba(59,130,246,0.35)] transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Projects;