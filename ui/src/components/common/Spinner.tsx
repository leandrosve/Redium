import { join, printIf } from "@/utils/ClassUtils";
import { LoaderCircle } from "lucide-react";

interface Props {
  fullPage?: boolean;
}
const Spinner = ({ fullPage }: Props) => {
  return (
    <div
      className={join(
        "flex items-center justify-center",
        printIf("w-full h-full flex-auto", fullPage)
      )}
    >
      <LoaderCircle className="animate-spin h-16 w-16 text-foreground-200" />
    </div>
  );
};

export default Spinner;
