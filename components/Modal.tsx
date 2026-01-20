"use client";
import ClientPortal from "./ClientPortal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ClientPortal selector="#modal-root">
      {/* Overlay - Fondo oscuro */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        {/* Contenido del Modal */}
        <div className="w-full max-w-md p-6 rounded-2xl shadow-2xl transition-all
                        bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800">
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="text-gray-700 dark:text-gray-300">
            {children}
          </div>

        </div>
      </div>
    </ClientPortal>
  );
}