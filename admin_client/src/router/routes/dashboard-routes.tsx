import { lazy, Suspense } from "react";

import type { RouteObject } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import { CustomLoadingScreen } from "~/common/components/custom/loadings";
import { DashboardLayout } from "~/common/components/layouts";
import { ROUTE_PATHS, ROUTE_SEGMENTS } from "../path";

const DashboardAccountsListPage = lazy(() => import("~/pages/dashboard/accounts/list/page"));
const DashboardAccountsDetailPage = lazy(() => import("~/pages/dashboard/accounts/[id]/page"));
const DashboardFlowListPage = lazy(() => import("~/pages/dashboard/flow/list/page"));
const DashboardFlowDetailPage = lazy(() => import("~/pages/dashboard/flow/detail/page"));
const DashboardReportListPage = lazy(() => import("~/pages/dashboard/report/list/page"));
const DashboardReportDetailPage = lazy(() => import("~/pages/dashboard/report/[id]/page"));

const DashboardRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.dashboard.root,
    element: (
      <DashboardLayout>
        <Suspense fallback={<CustomLoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        element: <Navigate to={ROUTE_PATHS.dashboard.flow.root} replace />,
        index: true,
      },

      // Accounts
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.dashboard_accounts,
        children: [
          {
            element: <Navigate to={ROUTE_PATHS.dashboard.accounts.list} replace />,
            index: true,
          },
          {
            path: "list",
            element: <DashboardAccountsListPage />,
          },
          {
            path: ":id",
            element: <DashboardAccountsDetailPage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTE_PATHS.dashboard.accounts.list} replace />,
          },
        ],
      },

      // Flow
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.dashboard_flow,
        children: [
          {
            element: <Navigate to={ROUTE_PATHS.dashboard.flow.list} replace />,
            index: true,
          },
          {
            path: "list",
            element: <DashboardFlowListPage />,
          },
          {
            path: "detail",
            element: <DashboardFlowDetailPage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTE_PATHS.dashboard.flow.list} replace />,
          },
        ],
      },

      // Report
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.dashboard_report,
        children: [
          {
            element: <Navigate to={ROUTE_PATHS.dashboard.report.list} replace />,
            index: true,
          },
          {
            path: "list",
            element: <DashboardReportListPage />,
          },
          {
            path: ":id",
            element: <DashboardReportDetailPage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTE_PATHS.dashboard.report.list} replace />,
          },
        ],
      },

      // Fallback
      // ----------------------------------------------------------------------------------------------------
      {
        path: "*",
        element: <Navigate to={ROUTE_PATHS.error[404]} replace />,
      },
    ],
  },
];

export default DashboardRoutes;
