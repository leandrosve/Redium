import { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "@/components/layout/Layout";
import Spinner from "@/components/common/Spinner";
import { useTranslation } from "react-i18next";

const router = createBrowserRouter([
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
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
