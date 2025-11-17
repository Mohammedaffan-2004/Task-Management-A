
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Edit3, Trash2, Search, PlusCircle, CheckCircle2, X } from "lucide-react";
import confetti from "canvas-confetti";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
    projectId: "",
    assignedTo: "",
  });
  const [editForm, setEditForm] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [toast, setToast] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTasks();
    if (user?.role === "Admin") fetchProjectsAndUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const endpoint = user?.role === "Admin" ? "/tasks" : "/tasks/my-tasks";
      const res = await axiosInstance.get(endpoint);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const fetchProjectsAndUsers = async () => {
    try {
      const [projRes, userRes] = await Promise.all([
        axiosInstance.get("/projects"),
        axiosInstance.get("/auth/users"),
      ]);
      setProjects(projRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Error fetching projects/users:", err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? t.status === filterStatus : true;
    const matchProject = filterProject
      ? t.projectId?._id === filterProject
      : true;
    return matchSearch && matchStatus && matchProject;
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const tinyConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x: 1, y: 0 }, // top-right
      scalar: 0.7,
    });
  };

  const handleMarkCompleted = async (id) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, { status: "Done" });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));

      tinyConfetti();
      showToast("Task Completed 🎉");

    } catch (err) {
      console.error("Error marking task complete:", err);
      showToast("Failed to update task ❌");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.projectId)
      return showToast("Title & Project required ⚠️");

    try {
      const res = await axiosInstance.post("/tasks", form);
      setTasks([...tasks, res.data]);
      setForm({
        title: "",
        description: "",
        status: "To Do",
        projectId: "",
        assignedTo: "",
      });
      document.getElementById("createTaskModal").close();
      showToast("Task Created ✔");
    } catch (err) {
      showToast("Error creating task ❌");
    }
  };

  const openEditModal = (task) => {
    setEditForm({ ...task, projectId: task.projectId?._id || "" });
    document.getElementById("editTaskModal").showModal();
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/tasks/${editForm._id}`, editForm);
      setTasks(tasks.map((t) => (t._id === editForm._id ? res.data : t)));

      document.getElementById("editTaskModal").close();
      showToast("Task Updated ✏️");
    } catch (err) {
      showToast("Failed to update task ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));

      showToast("Task Deleted 🗑️");
    } catch (err) {
      showToast("Failed to delete task ❌");
    }
  };

  return (
    <>
      {/* Top-right Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-[9999] animate-slideIn">
          <div className="bg-[#1E253F]/90 text-white px-4 py-2 rounded-xl border border-blue-500/40 shadow-lg flex items-center gap-2">
            <CheckCircle2 size={18} className="text-blue-300" />
            <span className="text-sm">{toast}</span>
            <button onClick={() => setToast(null)}>
              <X size={16} className="text-gray-300 hover:text-white cursor-pointer" />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>

      {/* MAIN PAGE */}
      <div className="p-8 min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#111827] to-[#1E2233] text-gray-200 relative overflow-hidden">
        
        {/* Ambient glows */}
        <div className="absolute w-[500px] h-[500px] bg-[#3B82F6]/25 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-[#06B6D4]/25 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-3xl font-semibold tracking-wide text-white">
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent font-bold">
              {user?.role === "Admin" ? "Admin" : "My"}
            </span>{" "}
            Tasks
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-lg bg-[#0F1629]/70 border border-[#2D3250] focus:border-[#3B82F6] text-sm text-gray-200"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0F1629]/70 border border-[#2D3250] rounded-lg p-2 text-sm text-gray-200"
            >
              <option value="">All Status</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            {/* Project Filter */}
            {user?.role === "Admin" && (
              <>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="bg-[#0F1629]/70 border border-[#2D3250] rounded-lg p-2 text-sm text-gray-200"
                >
                  <option value="">All Projects</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>

                {/* Create Task */}
                <button
                  onClick={() => document.getElementById("createTaskModal").showModal()}
                  className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:scale-[1.03] transition"
                >
                  <PlusCircle size={16} /> New Task
                </button>
              </>
            )}
          </div>
        </div>

        {/* No Tasks */}
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 italic">No tasks found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-gradient-to-br from-[#0F172A]/90 via-[#1E253F]/85 to-[#111827]/90 border border-[#1E253F]/70 rounded-2xl p-5 shadow-lg hover:border-[#3B82F6]/50 transition-all"
              >
                <h2 className="text-lg font-semibold text-white mb-1">
                  {task.title}
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  {task.description || "No description"}
                </p>

                <p className="text-xs text-gray-400">
                  Project:
                  <span className="text-[#60A5FA] ml-1">
                    {task.projectId?.title || "N/A"}
                  </span>
                </p>

                <p className="text-xs text-gray-400">
                  Assigned to:
                  <span className="text-[#06B6D4] ml-1">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                </p>

                <div className="mt-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border font-medium ${
                      task.status === "Done"
                        ? "bg-[#10B981]/10 text-[#6EE7B7] border-[#10B981]/30"
                        : task.status === "In Progress"
                        ? "bg-[#F59E0B]/10 text-[#FACC15] border-[#FBBF24]/30"
                        : "bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/30"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="flex justify-end gap-3 mt-4">
  {/* Complete Button */}
  <button
    onClick={() => handleMarkCompleted(task._id)}
    disabled={task.status === "Done"}
    className={`
             cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 border shadow-sm
      ${task.status === "Done"
        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-500 border-green-400 cursor-default"
        : "bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-amber-500 border-amber-400 hover:shadow-lg hover:scale-105 cursor-pointer"
      }
    `}
  >
    {task.status === "Done" ? "✔ Completed" : "✔ Mark Done"}
  </button>

  {/* Admin Controls */}
  {user?.role === "Admin" && (
    <>
      <button
        onClick={() => openEditModal(task)}
        className="text-[#F59E0B] hover:text-[#FACC15] hover:scale-110 transition cursor-pointer"
      >
        <Edit3 size={16} />
      </button>

      <button
        onClick={() => handleDelete(task._id)}
        className="text-[#EF4444] hover:text-[#F87171] hover:scale-110 transition cursor-pointer"
      >
        <Trash2 size={16} />
      </button>
    </>
  )}
</div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create Task */}
    {/* Create Task Modal */}
<dialog
  id="createTaskModal"
  className="
    fixed top-1/2 left-1/2 
    -translate-x-1/2 -translate-y-1/2
    backdrop:bg-black/60 backdrop-blur-sm 
    p-0 rounded-2xl border border-[#1E253F]/70 
    bg-[#0F172A]/95 text-gray-200 
    w-full max-w-md
  "
>
  <form onSubmit={handleCreateTask} className="p-6 space-y-5">
    <h3 className="text-lg font-semibold text-blue-300">Create New Task</h3>

    <input
      placeholder="Task Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      required
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    />

    <textarea
      placeholder="Description"
      rows={3}
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    />

    <select
      value={form.projectId}
      onChange={(e) => setForm({ ...form, projectId: e.target.value })}
      required
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    >
      <option value="">Select Project</option>
      {projects.map((p) => (
        <option key={p._id} value={p._id}>
          {p.title}
        </option>
      ))}
    </select>

    <select
      value={form.assignedTo}
      onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    >
      <option value="">Unassigned</option>
      {users.map((u) => (
        <option key={u._id} value={u._id}>
          {u.name}
        </option>
      ))}
    </select>

    <div className="flex justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={() => document.getElementById("createTaskModal").close()}
        className="px-4 py-2 rounded-lg text-sm border border-[#2D3250] text-gray-400 cursor-pointer"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
      >
        Create
      </button>
    </div>
  </form>
</dialog>



{/* Edit Task Modal */}
<dialog
  id="editTaskModal"
  className="
    fixed top-1/2 left-1/2 
    -translate-x-1/2 -translate-y-1/2
    backdrop:bg-black/60 backdrop-blur-sm 
    p-0 rounded-2xl border border-[#1E253F]/70 
    bg-[#0F172A]/95 text-gray-200 
    w-full max-w-md
  "
>
  <form onSubmit={handleEditTask} className="p-6 space-y-5">
    <h3 className="text-lg font-semibold text-blue-300">Edit Task</h3>

    <input
      value={editForm?.title || ""}
      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
      required
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    />

    <textarea
      rows={3}
      value={editForm?.description || ""}
      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    />

    <select
      value={editForm?.status || "To Do"}
      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
      className="w-full p-2.5 rounded-lg bg-[#0F1629] border border-[#2D3250]"
    >
      <option>To Do</option>
      <option>In Progress</option>
      <option>Done</option>
    </select>

    <div className="flex justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={() => document.getElementById("editTaskModal").close()}
        className="px-4 py-2 rounded-lg text-sm border border-[#2D3250] text-gray-400 cursor-pointer"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="cursor-pointer px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
      >
        Save Changes
      </button>
    </div>
  </form>
</dialog>

    </>
  );
};

export default Tasks;
