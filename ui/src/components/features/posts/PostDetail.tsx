import Avatar from "@/components/common/Avatar";
import Spinner from "@/components/common/Spinner";
import useAPI from "@/hooks/useAPI";
import PostService from "@/services/api/PostService";
import type { Post } from "@/types/models/Post";
import { useCallback, useEffect, useState } from "react";
import CommentSection from "../comments/CommentSection";
import DateDisplay from "@/components/common/DateDisplay";
import { useTranslation } from "react-i18next";
import Tooltip from "@/components/common/Tooltip";
import { useOwnershipContext } from "@/context/OwnershipContext";
import Button from "@/components/common/Button";
import { Pencil } from "lucide-react";
import PostFormModal from "./PostFormModal";
import MissingPage from "@/pages/MissingPage";

interface Props {
  id: string;
}
const PostDetail = ({ id }: Props) => {
  const {
    entity: post,
    error,
    loading,
    setEntity,
  } = useAPI<Post | null>({
    fetchFunction: () => PostService.detail(id),
    initialData: null,
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    post: Post | null;
  }>({ isOpen: false, post: null });

  const onEdited = useCallback(
    (p: Post) => {
      setEntity(p);
      setModalState({ isOpen: false, post: null });
    },
    [setEntity, setModalState]
  );

  useEffect(() => {
    if (!post) return;
    document.title = post?.title;
  }, [post])

  if (loading) return <Spinner fullPage />;

  if (error || !post) return <MissingPage />;

  return (
    <div className="flex flex-col gap-4">
      <PostDetailContent post={post} onEdit={(p) => setModalState({ isOpen: true, post: p })} />
      <div className="mt-8">
        <CommentSection postId={post.id} />
      </div>
      <PostFormModal
        isOpen={modalState.isOpen}
        post={modalState.post}
        onSuccess={onEdited}
        onClose={() => setModalState({ isOpen: false, post: null })}
      />
    </div>
  );
};

const PostDetailContent = ({ post, onEdit }: { post: Post; onEdit: (p: Post) => void }) => {
  const { t } = useTranslation();

  const { isPostOwned } = useOwnershipContext();
  const isOwned = isPostOwned(post.id);

  return (
    <div className="relative">
      {isOwned && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-0 top-0"
          leftIcon={<Pencil className="h-4 w-4" />}
          onClick={() => onEdit(post)}
        >
          {t("common.edit")}
        </Button>
      )}
      <div className="flex gap-2 items-center font-bold text-foreground-200 text-sm flex-wrap max-sm">
        <Avatar name={post.name} src={post.avatar} size="sm" />{" "}
        <span className="max-w-40 overflow-ellipsis line-clamp-1">
          {post.name} {isOwned && `(${t("common.you")})`}
          <span className="select-none opacity-50">•</span>
        </span>
        <DateDisplay date={post.createdAt} format="date" />
        {post.updatedAt && (
          <Tooltip content={<DateDisplay date={post.updatedAt} format="date" />} position="top">
            <span className="text-xs">({t("common.edited")})</span>
          </Tooltip>
        )}
      </div>
      <h2 className="text-xl mt-4 font-bold">{post.title}</h2>
      <p className="mt-4 text-foreground-200">{post.content}</p>
    </div>
  );
};

export default PostDetail;
