import Button from "@/components/common/Button";
import { Lightbulb, PencilLine } from "lucide-react";
import { useLocalized } from "@/hooks/useLocalized";

interface Props {
  onClick: () => void;
}
const PostCreateButton = ({ onClick }: Props) => {
  const { translate } = useLocalized();
  return (
    <div
      className="bg-content-100 rounded-2xl p-5 flex gap-5 items-center card-gradient cursor-pointer hover:bg-content-200 transition-colors duration-300 flex-wrap max-sm:flex-col"
      onClick={onClick}
    >
      <span className="h-10 w-10 rounded-full dark:bg-primary-200 bg-primary-500  text-white flex items-center justify-center shrink-0">
        <Lightbulb className="-rotate-5" />
      </span>{" "}
      <span className="flex-1">{translate("posts.create.share")}</span>
      <Button
        size="lg"
        leftIcon={<PencilLine />}
        onClick={onClick}
        className="border dark:border-white/30 shadow-md shrink-0"
      >
        {translate("posts.createPost")}
      </Button>
    </div>
  );
};

export default PostCreateButton;
