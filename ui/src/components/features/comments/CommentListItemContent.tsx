import Button from "@/components/common/Button";
import type { Comment } from "@/types/models/Comment";
import { MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import CommentForm from "./CommentForm";
import { useTranslation } from "react-i18next";
import { useOverflowCheck } from "@/hooks/useOverflowCheck";

const CommentListItemContent = ({ comment }: { comment: Comment }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState(false);

  const hasContentOverflow = useOverflowCheck(contentRef, 2);

  const { t } = useTranslation();
  return (
    <div className="text-sm text-foreground-200">
      <div
        ref={contentRef}
        className={`text-sm text-foreground-200 break-all transition-all ${expanded ? "" : "line-clamp-2"}`}
      >
        {comment.content}
      </div>
      <div className="flex gap-2 mt-1">
        {hasContentOverflow && (
          <Button onClick={() => setExpanded((e) => !e)} variant="link" size="sm" className="text-xs">
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
            postId={comment.postId}
            comment={null}
            parentId={comment.id}
            autoFocus
            onCancel={() => setReply(false)}
            onSuccess={() => setReply(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CommentListItemContent;
