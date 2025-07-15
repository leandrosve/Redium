import { lazy, type JSX, type LazyExoticComponent } from "react";

const PostListPage = lazy(() => import("@/pages/posts/PostListPage"));

export const ROUTES = {
    HOME: "/",
    POSTS: "/posts",
    POST_DETAIL: "/posts/:id"
}

type AppRoute = {
  path: string;
  titleKey: string; // utilizo key para i18n
  element: LazyExoticComponent<() => JSX.Element>;
}

const routes: AppRoute[] = [
    {
        path: ROUTES.HOME,
        titleKey: "home",
        element: PostListPage
    }
]
export default routes;