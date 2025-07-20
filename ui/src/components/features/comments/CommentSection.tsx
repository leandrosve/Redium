import { useTranslation } from "react-i18next";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { CommentsProvider } from "@/context/CommentsContext";
import Tooltip from "@/components/common/Tooltip";
import { CircleQuestionMark } from "lucide-react";

interface Props {
  postId: string;
}
const CommentSection = ({ postId }: Props) => {
  const { t } = useTranslation();
  return (
    <CommentsProvider postId={postId}>
      <div className="relative rounded-3xl">
        <CommentForm postId={postId} comment={null} />
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <h3>{t("comments.comments")}</h3>
            <Tooltip content={t("extra.commentSection")} position="right">
              <CircleQuestionMark className="h-4 w-4 text-foreground-200/50"/>
            </Tooltip>
          </div>
          <CommentList />
        </div>
      </div>
    </CommentsProvider>
  );
};

export default CommentSection;
