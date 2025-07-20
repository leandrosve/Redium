import { useMemo, useState, type ReactNode } from "react";

interface Props {
  content: string | ReactNode;
  children: ReactNode;
  position: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  isOpen?: boolean;
}

// Clases para las diferentes posiciones
const positionClasses = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
};

const Tooltip = ({ content, children, position = "top", disabled, isOpen }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useMemo(() => isOpen || (!disabled && isVisible), [isOpen, disabled, isVisible]);

  return (
    <div className="relative inline-flex">
      <div onFocus={() => setIsVisible(true)} onBlur={() => setIsVisible(false)} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="inline-block" tabIndex={disabled ? -1 : 0}>
        {children}
      </div>

      {show && (
        <div
          className={`absolute z-50 w-max max-w-xs px-3 py-2 text-sm font-medium text-foreground-200 bg-content-300 rounded-md shadow-lg transition-opacity duration-200 ${positionClasses[position]}`}
        >
          {content}
          <TooltipArrow position={position} />
        </div>
      )}
    </div>
  );
};

const arrowPositionClasses = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2",
  left: "right-[-4px] top-1/2 -translate-y-1/2",
  right: "left-[-4px] top-1/2 -translate-y-1/2",
};
const TooltipArrow = ({ position }: { position: "top" | "bottom" | "left" | "right" }) => (
  <div className={`absolute w-2 h-2 bg-content-300 transform rotate-45 ${arrowPositionClasses[position]}`} />
);
export default Tooltip;
