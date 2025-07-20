import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Alert } from "./Alert";

type ToastStatus = "success" | "danger" | "info";

type ToastContextType = {
  toast: (message: string, type?: ToastStatus) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ToastStatus>("info");
  const [visible, setVisible] = useState(false);

  const toast = useCallback((msg: string, t: ToastStatus = "info") => {
    setMessage(msg);
    setStatus(t);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        visible && (
          <div className="fixed top-25 left-[50%] -translate-x-1/2 animate-scale-in z-100 min-w-lg max-w-[90vw]">
            <Alert status={status} title={message} className="backdrop-blur-lg shadow-md"/>
          </div>
        ),
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};
