import { join, printIf } from "@/utils/ClassUtils";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  className?: string;
  innerClassName?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  invalid?: boolean;
  variant?: "outline" | "filled";
  maxLength?: number;
  displayCharCount?: boolean;
}

const sizeClasses = {
  sm: "px-3 py-2 text-sm ",
  md: "px-4 py-4 text-base ",
  lg: "px-6 py-6 text-2xl",
};

const variantClasses = {
  outline: "bg-transparent border border-subtle dark:focus-within:bg-gray-400/5",
  filled: "bg-input border border-transparent focus-within:bg-gray-400/10",
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function (
  {
    className,
    size = "md",
    id,
    invalid,
    value,
    variant = "outline",
    displayCharCount = true,
    innerClassName,
    onChange,
    autoFocus,
    icon,
    maxLength,
    ...props
  }: TextareaProps,
  ref
) {
  const [charCount, setCharCount] = useState(0);

  // Pequeña logica para permitir que el textarea crezca a meida que se agregan mas lineas
  const innerRef = useRef<HTMLTextAreaElement>(null);

  // Expone el innerRef al ref externo
  useImperativeHandle(ref, () => innerRef.current!);

  const resize = useCallback(() => {
    const el = innerRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [innerRef]);

  const onInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resize();
    setCharCount(e.target.value.length);
  }, [resize, setCharCount]);

  useEffect(() => resize(), [resize]);
  useEffect(() => {
    if (value == undefined) return;
    setCharCount(value.toString().length);
  }, [value]);

  useEffect(() => {
    if (autoFocus) {
      const el = innerRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, [autoFocus]);

  return (
    <div
      className={twMerge(
        "flex flex-col items-start gap-2 rounded-3xl px-3 py-2 transition-colors text-foreground-100 relative",
        variantClasses[variant],
        sizeClasses[size],
        printIf("border-transparent bg-red-700/5 focus-within:bg-red-400/5", invalid),
        className
      )}
    >
      <div className="flex gap-2 self-stretch flex-1  overflow-y-auto">
        {icon && <div className="text-gray-500">{icon}</div>}
        <textarea
          id={id}
          ref={innerRef}
          value={value}
          onChange={onChange}
          className={join(
            "flex-1 outline-none bg-transparent placeholder-gray-400 text-md resize-none w-full h-full",
            innerClassName
          )}
          rows={1}
          onInput={onInput}
          maxLength={maxLength}
          {...props}
        />
      </div>
      {!!maxLength && (
        <span className="text-xs  text-foreground-200 absolute right-4 bottom-2">{`${charCount}/${maxLength}`}</span>
      )}
    </div>
  );
});

export default Textarea;
