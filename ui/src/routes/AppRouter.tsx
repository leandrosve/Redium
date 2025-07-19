import { Suspense } from "react";
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "@/components/layout/Layout";
import Spinner from "@/components/common/Spinner";
import { useTranslation } from "react-i18next";
import MissingPage from "@/pages/MissingPage";

const createRouter = import.meta.env.VITE_GH_PAGES === "true" ? createHashRouter : createBrowserRouter;

const router = createRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to="/posts" replace />,
      },
      ...routes.map((r) => ({
        path: r.path,
        id: r.path,
        lazy: async () => {
          const LazyComponent = r.element;
          return {
            protection: null,
            Component: () => {
              const { t } = useTranslation();
              document.title = t(r.titleKey);
              return (
                <Suspense fallback={<Spinner fullPage />}>
                  <LazyComponent />
                </Suspense>
              );
            },
          };
        },
        hydrateFallbackElement: <Spinner fullPage />,
      })),
      { path: "*", Component: MissingPage },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
