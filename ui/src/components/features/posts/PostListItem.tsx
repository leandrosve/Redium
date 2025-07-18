import ActionMenu from "@/components/common/ActionMenu";
import Avatar from "@/components/common/Avatar";
import DateDisplay from "@/components/common/DateDisplay";
import { useOwnershipContext } from "@/context/OwnershipContext";
import type { Post } from "@/types/models/Post";
import { useTranslation } from "react-i18next";

interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const PostListItem = ({ post, onEdit,onDelete }: Props) => {
  const { isPostOwned } = useOwnershipContext();

  const isOwned = isPostOwned(post.id);
  const { t } = useTranslation();

  return (
    <div className="bg-content-100 rounded-2xl p-5 flex flex-col shadow-md gap-2 hover:bg-content-200 relative">
      {isOwned && (
        <span onClick={(e) => e.preventDefault()} className="absolute top-1 right-1">
          <ActionMenu onEdit={onEdit} onDelete={onDelete} />
        </span>
      )}

      <div className="flex gap-2 items-center font-bold text-foreground-200 text-sm">
        <Avatar name={post.name} src={post.avatar} size="sm" />{" "}
        <span className="max-w-40 overflow-ellipsis line-clamp-1">
          {post.name} {isOwned && `(${t("common.you")})`}
        </span>
        <span className="select-none opacity-50">•</span>
        <DateDisplay format="time-ago" date={post.createdAt} />
      </div>

      <div className="font-bold line-clamp-2 max-md:line-clamp-3">
        {post.title}
      </div>
      <div className="line-clamp-3 text-sm text-foreground-200">
        {post.content}
      </div>
    </div>
  );
};

export default PostListItem;
