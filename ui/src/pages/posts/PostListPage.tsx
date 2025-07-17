import PostCreateButton from "@/components/features/posts/PostCreateButton";
import PostFormModal from "@/components/features/posts/PostFormModal";
import PostList from "@/components/features/posts/PostList";
import { ROUTES } from "@/routes/routes";
import type { Post } from "@/types/models/Post";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PostListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    post: Post | null;
  }>({ isOpen: false, post: null });
  
    const onSuccess = (post:Post) => {
      navigate(ROUTES.POST_DETAIL.replace(":id", post.id))
    }

  return (
    <section className="flex flex-col w-full max-w-5xl mt-10 gap-2 mb-20 items-stretch">
      <PostCreateButton onClick={() => setModalState({isOpen: true, post:null})}/>
      <h1 className="text-4xl mb-4 mt-4">{t("posts.title")}</h1>
      <PostList onEdit={(p) => setModalState({isOpen: true, post:p})}/>
      <PostFormModal
        isOpen={modalState.isOpen}
        post={modalState.post}
        onSuccess={onSuccess}
        onClose={() => setModalState({ isOpen: false, post: null })}
      />
    </section>
  );
};

export default PostListPage;
