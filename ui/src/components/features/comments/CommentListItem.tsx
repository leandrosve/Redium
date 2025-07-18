import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import DateDisplay from "@/components/common/DateDisplay";
import type { CommentNode } from "@/types/models/Comment";
import { join } from "@/utils/ClassUtils";
import { MessageCircle } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import CommentForm from "./CommentForm";
import { useTranslation } from "react-i18next";
import { useOverflowCheck } from "@/hooks/useOverflowCheck";
import { useOwnershipContext } from "@/context/OwnershipContext";
import ActionMenu from "@/components/common/ActionMenu";
import { useConfirmDialog } from "@/components/common/ConfirmationDialog";
import CommentService from "@/services/CommentService";
import { useCommentsContext } from "@/context/CommentsContext";

interface Props {
  comment: CommentNode;
  nestingLevel: number;
  className?: string;
}

const maxNextingLevel = 5;

const CommentListItem = ({ comment, nestingLevel = 0, className }: Props) => {
  const { isCommentOwned } = useOwnershipContext();
  const { deleteComment } = useCommentsContext();

  const { t } = useTranslation();
  const isOwned = isCommentOwned(comment.id);

  const [isEditing, setIsEditing] = useState(false);

  const { confirm } = useConfirmDialog();

  const onDeleteConfirmed = useCallback(async () => {
    await CommentService.delete(comment.postId, comment.id);
    deleteComment(comment.id);
  }, [deleteComment]);

  const onDelete = useCallback(async () => {
    await confirm({
      title: t("posts.deletePost"),
      message: t("posts.deleteDescription"),
      confirmText: t("common.accept"),
      cancelText: t("common.cancel"),
      onConfirm: onDeleteConfirmed,
    });
  }, [onDeleteConfirmed, confirm]);

  return (
    <div className={join("flex gap-2", className)}>
      <div className="flex flex-col items-center relative">
        <div className="relative">
          <Avatar
            name={comment.name}
            src={comment.avatar}
            size="sm"
            className="shrink-0"
          />
          {nestingLevel > 0 && (
            <span className="absolute h-[1px] comment-tree-line-horizontal w-5 -left-full top-1/2 -translate-y-1/2 bottom-0 ml-[7px] "></span>
          )}
        </div>

        {!!comment.children.length && (
          <span className="flex-1 comment-tree-line rounded-full w-[1px]  h-full  mt-2 mb-5"></span>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex gap-2 items-center font-bold text-foreground-200 text-sm">
          <span className="max-w-40 overflow-ellipsis line-clamp-1">
            {comment.name} {isOwned && `(${t("common.you")})`}
          </span>
          <span className="select-none opacity-50">•</span>
          <DateDisplay
            className="text-xs"
            format="time-ago"
            date={comment.createdAt}
          />

          {isOwned && (
            <ActionMenu onEdit={() => setIsEditing(true)} onDelete={onDelete} />
          )}
        </div>
        {isEditing ? (
          <CommentForm
            postId={comment.postId}
            parentId={comment.parentId}
            comment={comment}
            autoFocus
            mode="edit"
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <CommentContent
            content={comment.content}
            postId={comment.postId}
            commentId={comment.id}
          />
        )}
        {nestingLevel < maxNextingLevel &&
          comment.children?.map((c) => (
            <CommentListItem comment={c} nestingLevel={nestingLevel + 1} />
          ))}
      </div>
    </div>
  );
};

const CommentContent = ({
  content,
  postId,
  commentId,
}: {
  content: string;
  postId: string;
  commentId: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState(false);

  const isOverflowing = useOverflowCheck(contentRef, 2);

  const { t } = useTranslation();
  return (
    <div className="text-sm text-foreground-200">
      <div
        ref={contentRef}
        className={`text-sm text-foreground-200 break-all transition-all ${
          expanded ? "" : "line-clamp-2"
        }`}
      >
        {content}
      </div>
      <div className="flex gap-2 mt-1">
        {isOverflowing && (
          <Button
            onClick={() => setExpanded((e) => !e)}
            variant="link"
            size="sm"
            className="text-xs"
          >
            {t(expanded ? "common.showLess" : "common.showMore")}
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-foreground-100"
          leftIcon={<MessageCircle className="h-4 w-4" />}
          onClick={() => setReply(true)}
        >
          {t("comments.reply")}
        </Button>
      </div>

      {reply && (
        <div className="mt-1">
          <CommentForm
            postId={postId}
            comment={null}
            parentId={commentId}
            autoFocus
            onCancel={() => setReply(false)}
            onSuccess={() => setReply(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CommentListItem;
