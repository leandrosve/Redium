import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { join, printIf } from "../../utils/ClassUtils";
import Spinner from "./Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  variant?: "solid" | "outline" | "ghost" | "link";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  as?: 'button' | 'span';
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-6 py-3 text-lg h-12",
};

const colorClasses = {
  primary:
    "bg-primary-500 dark:bg-primary-200 enabled:hover:bg-primary-400 dark:enabled:hover:bg-primary-400 text-white",
  secondary: "bg-secondary-400 enabled:hover:bg-secondary-500 text-black",
};

const variantClasses = {
  solid: "",
  outline: "bg-transparent border border-subtle enabled:hover:bg-highlight/50 text-foreground-200",
  ghost: "bg-transparent enabled:hover:bg-gray-400/5 text-foreground-200 focus-within:bg-gray-400/5",
  link: "bg-transparent enabled:hover:bg-transparent enabled:hover:underline px-0",
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
  as = 'button',
  ...props
}: Props) => {
  const Element = as === 'span' ? 'span' : 'button';
  return (
    <Element
      onClick={onClick}
      disabled={loading || disabled}
      className={join(
        "inline-flex items-center justify-center font-medium transition-colors duration-200 overflow-hidden relative cursor-pointer gap-1 rounded-full",
        sizeClasses[size],
        printIf(colorClasses[color], variant == "solid"),
        variantClasses[variant],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      {...props}
    >
      {leftIcon && <span className="flex top-0 right-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}

      {loading && (
        <span className="absolute w-full h-full flex items-center justify-center">
          <Spinner className="h-5 w-5 text-inherit" />
        </span>
      )}
    </Element>
  );
};

export default Button;
