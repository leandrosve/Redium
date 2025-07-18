import { printIf } from "@/utils/ClassUtils";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  icon?: ReactNode;
  endElement?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  variant?: "outline" | "filled";
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-6 py-3 text-2xl h-20",
};

const variantClasses = {
  outline: "bg-transparent border border-subtle dark:focus-within:bg-gray-400/5",
  filled: "bg-input border border-transparent dark:focus-within:bg-gray-400/10",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { icon, className, size = "md", id, endElement, invalid, variant = "outline", ...props }: InputProps,
  ref
) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-2 rounded-full px-3 py-2 transition-colors text-foreground-100",
        variantClasses[variant],
        sizeClasses[size],
        printIf("border-transparent bg-red-700/5 focus-within:bg-red-400/5", invalid),
        className
      )}
    >
      {icon && <div className="text-gray-500">{icon}</div>}
      <input id={id} ref={ref} className="flex-1 outline-none bg-transparent placeholder-gray-400 text-md" {...props} />
      {endElement}
    </div>
  );
});
