import { lazy, type JSX, type LazyExoticComponent } from "react";

const PostListPage = lazy(() => import("@/pages/posts/PostListPage"));
const PostDetailPage = lazy(() => import("@/pages/posts/PostDetailPage"));

export const ROUTES = {
  HOME: "/",
  POSTS: "/posts",
  POST_DETAIL: "/posts/:id",
};

type AppRoute = {
  path: string;
  titleKey: string; // utilizo key para i18n
  element: LazyExoticComponent<() => JSX.Element>;
};

const routes: AppRoute[] = [
  {
    path: ROUTES.POSTS,
    titleKey: "routes.posts",
    element: PostListPage,
  },
  {
    path: ROUTES.POST_DETAIL,
    titleKey: "routes.postDetail",
    element: PostDetailPage,
  },
];
export default routes;
