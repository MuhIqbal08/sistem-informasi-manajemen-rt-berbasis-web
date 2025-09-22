// components/Toast.jsx
import React, { useEffect } from "react";
import { XCircle, CheckCircle } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyles =
    "fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in";

  const typeStyles =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-600";

  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div className={`${baseStyles} ${typeStyles}`}>
      <Icon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
