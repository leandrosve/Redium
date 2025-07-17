import { useTranslation } from "react-i18next";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { CommentsProvider } from "@/context/CommentsContext";

interface Props {
  postId: string;
}
const CommentSection = ({ postId }: Props) => {
  const { t } = useTranslation();
  return (
    <CommentsProvider postId={postId}>
      <div className="relative rounded-3xl">
        <CommentForm postId={postId} />
        <div className="mt-4">
          <h3 className="mb-2">{t("comments.comments")}</h3>
          <CommentList postId={postId} />
        </div>
      </div>
    </CommentsProvider>
  );
};

export default CommentSection;
