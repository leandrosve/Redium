import { useTranslation } from "react-i18next";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface Props {
  postId: string;
}
const CommentSection = ({ postId }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl">
      <CommentForm postId={postId} />
      <div className="mt-4">
        <h3 className="mb-2">{t('comments.comments')}</h3>
        <CommentList postId={postId} />
      </div>
    </div>
  );
};

export default CommentSection;
