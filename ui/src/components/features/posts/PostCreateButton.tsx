import Button from "@/components/common/Button";
import { Lightbulb, PencilLine } from "lucide-react";
import { useLocalized } from "@/hooks/useLocalized";

interface Props {
  onClick: () => void;
}
const PostCreateButton = ({onClick}:Props) => {
  const { translate } = useLocalized();
  return (
    <div
      className="bg-content-100 rounded-2xl p-5 flex gap-5 items-center card-gradient cursor-pointer hover:bg-content-200 transition-colors duration-300"
      onClick={onClick}
    >
      <span className="h-10 w-10 rounded-full bg-primary-300 flex items-center justify-center">
        <Lightbulb className="-rotate-5" />
      </span>{" "}
      {translate("posts.create.share")}
      <Button
        size="lg"
        leftIcon={<PencilLine />}
        onClick={onClick}
        className="ml-auto border dark:border-white/30 shadow-md"
      >
         {translate("posts.createPost")}
      </Button>
    </div>
  );
};

export default PostCreateButton;
