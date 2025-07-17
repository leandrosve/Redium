import { join, printIf } from "@/utils/ClassUtils";
import {
  forwardRef,
  useState,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  className?: string;
  innerClassName?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  invalid?: boolean;
  variant?: "outline" | "filled";
  maxLength?: number;
}

const sizeClasses = {
  sm: "px-3 py-2 text-sm ",
  md: "px-4 py-4 text-base ",
  lg: "px-6 py-6 text-2xl",
};

const variantClasses = {
  outline: "bg-transparent border border-subtle focus-within:bg-gray-400/5",
  filled: "bg-input border border-transparent focus-within:bg-gray-400/10",
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function (
  {
    className,
    size = "md",
    id,
    invalid,
    variant = "outline",
    innerClassName,
    onChange,
    icon,
    maxLength,
    ...props
  }: TextareaProps,
  ref
) {
  const [charCount, setCharCount] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };
  return (
    <div
      className={twMerge(
        "flex flex-col items-start gap-2 rounded-3xl px-3 py-2 transition-colors text-foreground-100 ",
        variantClasses[variant],
        sizeClasses[size],
        printIf(
          "border-transparent bg-red-700/5 focus-within:bg-red-400/5",
          invalid
        ),
        className
      )}
    >
      <div className="flex gap-2 self-stretch flex-1">
        {icon && <div className="text-gray-500">{icon}</div>}
        <textarea
          id={id}
          ref={ref}
          onChange={handleChange}
          className={join(
            "flex-1 outline-none bg-transparent placeholder-gray-400 text-md resize-none w-full h-full",
            innerClassName
          )}
          maxLength={maxLength}
          {...props}
        />
      </div>
      {!!maxLength && (
        <span className="text-xs ml-auto text-foreground-200">{`${charCount}/${maxLength}`}</span>
      )}
    </div>
  );
});

export default Textarea;
