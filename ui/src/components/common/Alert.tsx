import React from "react";
import { join } from "@/utils/ClassUtils";
import { BadgeCheck, CircleAlert, Info } from "lucide-react";

type AlertProps = {
  title: string;
  visible?: boolean;
  className?: string;
  status?: "info" | "danger" | "success";
};

const textClasses = {
  info: "text-primary-500",
  danger: "text-red-300",
  success: "text-emerald-300",
};

const bgClasses = {
  info: "bg-primary-50/50",
  danger: "bg-red-800/10",
  success: "bg-emerald-800/10",
};

const iconContainerClasses = {
  info: "bg-primary-100",
  danger: "bg-red-900",
  success: "bg-emerald-900",
};
const icons = {
  info: <Info className="h-7 w-8 fill-primary-500 stroke-primary-100" />,
  danger: <CircleAlert className="h-7 w-8 fill-red-300 stroke-red-900" />,
  success: <BadgeCheck className="h-7 w-8 fill-emerald-300 stroke-emerald-900" />,
};

export const Alert: React.FC<AlertProps> = ({ title, className, status = "info" }) => {
  const textColor = textClasses[status];
  const bgColor = bgClasses[status];
  const iconContainerColor = iconContainerClasses[status];

  return (
    <div
      role="alert"
      className={join(
        "flex flex-grow  w-full py-3 px-4 gap-1 rounded-2xl items-center animate-scale-in duration-300",
        textColor,
        bgColor,
        className
      )}
    >
      <div
        className={`flex-none relative w-9 h-9 rounded-full grid place-items-center  shadow-small ${iconContainerColor}`}
      >
        {icons[status]}
      </div>

      <div className="h-full flex-grow min-h-10 ms-2 flex flex-col justify-center items-center">
        <div className="text-small w-full font-medium leading-5">{title}</div>
      </div>
    </div>
  );
};
