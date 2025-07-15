import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  repeat?: number;
  wrapperClassName?: string;
}

const Skeleton = ({
  className,
  repeat = 1,
  wrapperClassName,
  ...props
}: SkeletonProps) => {
  const mergedClassName = twMerge(
    "animate-pulse rounded-2xl bg-content-100/50 dark:bg-content-200 w-full ",
    className
  );

  if (repeat <= 1) {
    return <div className={mergedClassName} {...props} />;
  }

  return (
    <div className={twMerge("flex flex-col gap-4 self-stretch", wrapperClassName)}>
      {Array.from({ length: repeat }).map((_, i) => (
        <div key={i} className={mergedClassName} {...props} />
      ))}
    </div>
  );
};

export default Skeleton;
