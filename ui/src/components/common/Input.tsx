import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  icon?: ReactNode;
  endElement?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-6 py-3 text-2xl h-20",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { icon, className, size = "md", id, endElement, ...props }: InputProps,
  ref
) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-2 border border-subtle rounded-full px-3 py-2 transition-colors focus-within:bg-gray-400/5 text-foreground-100",
        sizeClasses[size],
        className
      )}
    >
      {icon && <div className="text-gray-500">{icon}</div>}
      <input
        id={id}
        ref={ref}
        className="flex-1 outline-none bg-transparent placeholder-gray-400 text-sm"
        {...props}
      />
      {endElement}
    </div>
  );
});
