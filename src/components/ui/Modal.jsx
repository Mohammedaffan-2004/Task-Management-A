import { X } from "lucide-react";

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0C10]/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-linear-to-br from-[#0F1629]/95 via-[#111827]/90 to-[#0B1120]/90 
        backdrop-blur-2xl border border-[#1E253F]/70 
        rounded-2xl shadow-[0_8px_40px_rgba(59,130,246,0.25)] 
        hover:shadow-[0_12px_50px_rgba(59,130,246,0.35)]
        p-6 w-full max-w-lg text-gray-100 transform transition-all duration-500 animate-modalIn overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Ring Accent */}
        <div className="absolute inset-0 bg-linear-to-tr from-[#3B82F6]/10 via-[#06B6D4]/10 to-[#22D3EE]/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#1E253F]/60 pb-3 mb-4">
          <h3 className="text-lg font-semibold bg-linear-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_8px_rgba(59,130,246,0.25)]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#60A5FA] hover:scale-110 transition-transform duration-200 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/40 rounded-md p-1.5"
          >
            <X size={18} />
          </button>
        </div>

       
        <div className="max-h-[65vh] overflow-y-auto pr-2 custom-scroll relative z-10 text-gray-200">
          {children}
        </div>

       
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-linear-to-tr from-[#3B82F6]/25 via-[#06B6D4]/20 to-transparent blur-3xl rounded-tl-full pointer-events-none"></div>
      </div>

     
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(15px) scale(0.97); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
        .animate-modalIn {
          animation: modalIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #06B6D4);
          border-radius: 9999px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default Modal;
