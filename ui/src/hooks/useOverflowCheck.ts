import { useEffect, useState, type RefObject } from "react";

export function useOverflowCheck(ref: RefObject<HTMLElement | null>, maxLines = 2) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    const maxHeight = lineHeight * maxLines;

    setIsOverflowing(el.scrollHeight > maxHeight + 1);
  }, [ref, maxLines]);

  return isOverflowing;
}
