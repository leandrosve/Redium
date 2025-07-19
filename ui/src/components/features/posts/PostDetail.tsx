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
import PostFormModal from "./PostFormModal";
import MissingPage from "@/pages/MissingPage";
import { useConfirmDialog } from "@/components/common/ConfirmationDialog";
import { useToast } from "@/components/common/Toast";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import ActionMenu from "@/components/common/ActionMenu";
import Breadcrumbs from "@/components/common/Breadcrumbs";
interface Props {
  id: string;
}
const PostDetail = ({ id }: Props) => {
  const {
    entity: post,
    error,
    loading,
  } = useAPI<Post | null>({
    fetchFunction: () => PostService.detail(id),
    initialData: null,
  });

  useEffect(() => {
    if (!post) return;
    document.title = post?.title;
  }, [post]);

  if (loading) return <Spinner fullPage />;

  if (error || !post) return <MissingPage />;

  return (
    <div className="flex flex-col gap-4">
      <PostDetailContent post={post} />
      <div className="mt-8">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
};

const PostDetailContent = ({ post: initialPost }: { post: Post }) => {
  const [post, setPost] = useState(initialPost);
  const { isPostOwned } = useOwnershipContext();
  const isOwned = isPostOwned(post.id);

  const { confirm } = useConfirmDialog();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const onEdited = useCallback(
    (updatedPost: Post) => {
      setPost(updatedPost);
      setIsEditing(false);
    },
    [setIsEditing]
  );

  const onDelete = useCallback(async () => {
    const res = await confirm({
      title: t("posts.deletePost"),
      message: t("posts.deleteDescription"),
      confirmText: t("common.accept"),
      cancelText: t("common.cancel"),
      onConfirm: async () => await PostService.delete(post.id),
    });

    if (res.hasError) {
      toast(t("common.error"), "danger");
      return;
    }
    toast(t("posts.postDeleted"), "info");
    navigate(ROUTES.POSTS);
  }, [confirm, toast, navigate, post.id]);

  return (
    <div className="relative">
      <Breadcrumbs items={[{to: "/posts", name: "Posts"}, {to:"", name: post.title}]}/>
      {isOwned && <div className="absolute top-0 right-0"><ActionMenu onDelete={onDelete} onEdit={() => setIsEditing(true)} /></div>}
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

      <PostFormModal
        isOpen={isEditing}
        post={post}
        onSuccess={onEdited}
        onClose={() => setIsEditing(false)}
      />
    </div>
  );
};

export default PostDetail;
