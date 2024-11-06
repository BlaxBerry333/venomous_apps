export const ROUTE_SEGMENTS = {
  error: "error" as const,
  auth: "auth" as const,
  auth_signup: "signup" as const,
  auth_login: "login" as const,
  dashboard: "dashboard" as const,
  dashboard_accounts: "accounts" as const,
  dashboard_flow: "flow" as const,
  dashboard_report: "report" as const,
};

export const ROUTE_PATHS = {
  root: "/" as const,
  error: {
    403: `/${ROUTE_SEGMENTS.error}/403` as const,
    404: `/${ROUTE_SEGMENTS.error}/404` as const,
    500: `/${ROUTE_SEGMENTS.error}/500` as const,
    unknown: `/${ROUTE_SEGMENTS.error}/unknown` as const,
  },
  auth: {
    root: `/${ROUTE_SEGMENTS.auth}` as const,
    signUp: `/${ROUTE_SEGMENTS.auth}/${ROUTE_SEGMENTS.auth_signup}` as const,
    login: `/${ROUTE_SEGMENTS.auth}/${ROUTE_SEGMENTS.auth_login}` as const,
  },
  dashboard: {
    root: `/${ROUTE_SEGMENTS.dashboard}` as const,
    accounts: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_accounts}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_accounts}/list` as const,
      detail: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_accounts}/:id` as const,
    },
    flow: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_flow}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_flow}/list` as const,
      detail: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_flow}/:id` as const,
    },
    report: {
      root: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_report}` as const,
      list: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_report}/list` as const,
      detail: `/${ROUTE_SEGMENTS.dashboard}/${ROUTE_SEGMENTS.dashboard_report}/:id` as const,
    },
  },
};
