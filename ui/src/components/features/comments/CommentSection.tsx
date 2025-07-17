import { useTranslation } from "react-i18next";
import CommentForm from "./CommentForm";

interface Props {
  postId: string;
}
const CommentSection = ({ postId }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="relative rounded-3xl">
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentSection;
