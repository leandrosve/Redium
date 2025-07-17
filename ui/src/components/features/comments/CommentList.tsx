import { useTranslation } from "react-i18next";
import Skeleton from "@/components/common/Skeleton";
import ErrorMessage from "@/components/common/ErrorMessage";
import { CircleOff } from "lucide-react";
import CommentService, { type BasicFilters } from "@/services/CommentService";
import type { Comment } from "@/types/models/Comment";
import CommentListItem from "./CommentListItem";
import { useCallback } from "react";
import useAPI from "@/hooks/useAPI";
import useCommentTree from "@/hooks/useCommentTree";

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const fetchFunction = useCallback(
    () => CommentService.list(postId),
    [postId]
  );

  const {
    loading,
    entity: items,
    error,
  } = useAPI<Comment[]>({ fetchFunction });

  const isEmpty = !loading && items?.length === 0 && !error;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full gap-2 items-stretch">
      {loading && <Skeleton repeat={5} className="h-30" />}

      {!loading && !!items && (
        <div className="flex flex-col gap-4 ">
          <CommentListContent comments={items} />
        </div>
      )}

      {error && <ErrorMessage />}

      {isEmpty && (
        <div className="text-center w-full p-5 font-bold text-sm text-foreground-200 relative">
          <CircleOff className="h-14 w-14 opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          {t("posts.noResults")}
        </div>
      )}
      {!loading ||
        (!error && (
          <div className="text-center w-full p-5 font-bold text-sm text-foreground-200">
            {t("posts.endReached")}
          </div>
        ))}
    </div>
  );
};

const CommentListContent = ({ comments }: { comments: Comment[] }) => {
  const commentTree = useCommentTree(comments);
  return (
    <div className="flex flex-col bg-content-100 rounded-2xl">
      {commentTree.map((c) => (
        <div key={c.id} className="p-4">  
          <CommentListItem comment={c}  nestingLevel={0} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
