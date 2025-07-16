import Button from "@/components/common/Button";
import { Lightbulb, PencilLine } from "lucide-react";
import { useState } from "react";
import PostFormModal from "./PostFormModal";
import { useLocalized } from "@/hooks/useLocalized";

const PostCreateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { translate } = useLocalized();
  return (
    <div
      className="bg-content-100 rounded-2xl p-5 flex gap-5 items-center card-gradient cursor-pointer hover:bg-content-200 transition-colors duration-300"
      onClick={() => setIsOpen(true)}
    >
      <span className="h-10 w-10 rounded-full bg-primary-300 flex items-center justify-center">
        <Lightbulb className="-rotate-5" />
      </span>{" "}
      {translate("posts.create.share")}
      <Button
        size="lg"
        leftIcon={<PencilLine />}
        onClick={() => setIsOpen(true)}
        className="ml-auto border dark:border-white/30 shadow-md"
      >
         {translate("posts.create.createPost")}
      </Button>
      <PostFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default PostCreateButton;
