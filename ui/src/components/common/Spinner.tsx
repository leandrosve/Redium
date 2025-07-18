import { join, printIf } from "@/utils/ClassUtils";
import { LoaderCircle } from "lucide-react";

interface Props {
  fullPage?: boolean;
  className?: string;
}
const Spinner = ({ fullPage, className }: Props) => {
  return (
    <div className={join("flex items-center justify-center", printIf("w-full h-full  flex-1", fullPage))}>
      <LoaderCircle className={join("animate-spin h-16 w-16 text-foreground-200", className)} />
    </div>
  );
};

export default Spinner;
