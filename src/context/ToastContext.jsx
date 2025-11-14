import { createContext, useState, useContext } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-300" />,
    error: <AlertTriangle className="w-5 h-5 text-red-300" />,
    info: <Info className="w-5 h-5 text-purple-300" />,
  };

  const colors = {
    success: "bg-green-600/90 border-green-400/40",
    error: "bg-red-600/90 border-red-400/40",
    info: "bg-purple-600/90 border-purple-400/40",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

    
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-white backdrop-blur-md animate-fade-in-up ${colors[toast.type]}`}
          >
            {icons[toast.type]}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>
              <X size={16} className="text-gray-200 hover:text-white" />
            </button>
          </div>
        ))}
      </div>

     
      <style>
        {`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out;
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
