import { type ReactNode } from "react";
import { join } from "../../utils/ClassUtils";

interface Props {
  children?: ReactNode;
  rightIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  variant?: "solid" | "outline";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-6 py-3 text-2xl h-20",
};

const colorClasses = {
  primary: "bg-primary-200 hover:bg-primary-400 text-white",
  secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
};

const variantClasses = {
  solid: "",
  outline: "bg-transparent border border-subtle hover:bg-gray-400/15 text-foreground-200  rounded-full",
};

const Button = ({
  children,
  rightIcon,
  size = "md",
  variant = "solid",
  color = "primary",
  disabled = false,
  onClick,
  className,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={join(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors overflow-hidden relative cursor-pointer gap-1",
        sizeClasses[size],
        colorClasses[color],
        variantClasses[variant],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {children && <span>{children}</span>}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
};

export default Button;
