import React from "react";

import { CircleAlert, Info } from "lucide-react";

interface HelperTextProps {
  type?: "error" | "helper";
  message?: string;
  className?: string;
}

const typeClasses = {
  error: "text-primary-600",
  helper: "text-foreground-300",
};

const HelperText = ({
  type = "error",
  message,
  className = "",
}: HelperTextProps) => {
  if (!message) return null;

  const Icon = type === "error" ? CircleAlert : Info;

  return (
    <span
      className={`text-sm ml-3 inline-flex items-center gap-1 mt-1 animate-scale-in duration-300 ${typeClasses[type]} ${className}`}
    >
      <Icon className="h-4 w-4 flex-shrink-0 -mb-[0.25em]" />
      {message}
    </span>
  );
};

export default HelperText;
