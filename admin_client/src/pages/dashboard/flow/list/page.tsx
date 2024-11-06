import { Helmet } from "react-helmet-async";

import DashboardFlowListPageView from "./view";

export default function DashboardFlowListPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Flow List</title>
      </Helmet>

      <DashboardFlowListPageView />
    </>
  );
}
