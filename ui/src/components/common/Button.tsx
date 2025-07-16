import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { join } from "../../utils/ClassUtils";
import Spinner from "./Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  variant?: "solid" | "outline" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-6 py-3 text-lg h-12",
};

const colorClasses = {
  primary: "bg-primary-200 enabled:hover:bg-primary-400 text-white",
  secondary: "bg-gray-300 enabled:hover:bg-gray-400 text-gray-800",
};

const variantClasses = {
  solid: "",
  outline:
    "bg-transparent border border-subtle enabled:hover:bg-gray-400/10 text-foreground-200   focus-within:bg-gray-400/5",
  ghost:
    "bg-transparent enabled:hover:bg-gray-400/5 text-foreground-200 focus-within:bg-gray-400/5",
};

const Button = ({
  children,
  rightIcon,
  leftIcon,
  size = "md",
  variant = "solid",
  color = "primary",
  disabled = false,
  onClick,
  loading,
  className,
  ...props
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={join(
        "inline-flex items-center justify-center font-medium transition-colors overflow-hidden relative cursor-pointer gap-1 rounded-full",
        sizeClasses[size],
        colorClasses[color],
        variantClasses[variant],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="flex top-0 right-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}

      {loading && <span className="absolute w-full h-full flex items-center justify-center"><Spinner className="h-5 w-5 "/></span>}
    </button>
  );
};

export default Button;
