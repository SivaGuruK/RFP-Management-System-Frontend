import { createContext, useContext, useState,type ReactNode } from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = new Date().getTime();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`
                px-4 py-2 rounded-lg shadow-lg text-white
                ${toast.type === "success" && "bg-green-500"}
                ${toast.type === "error" && "bg-red-500"}
                ${toast.type === "info" && "bg-blue-500"}
                ${toast.type === "warning" && "bg-yellow-500 text-black"}
              `}
            >
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
