import { useEffect, useRef } from "react";

interface Props {
  onLoadMore: () => void;
  disabled?: boolean;
}

const InfiniteScrollDetector = ({ onLoadMore, disabled }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "50px" } // carga antes de que llegue al final
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, disabled]);

  return <div ref={ref} className="h-1" />;
};

export default InfiniteScrollDetector;
