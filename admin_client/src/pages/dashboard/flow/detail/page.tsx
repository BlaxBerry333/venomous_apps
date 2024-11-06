import { Helmet } from "react-helmet-async";

import DashboardFlowDetailPageView from "./view";

export default function DashboardFlowDetailPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Flow Detail</title>
      </Helmet>

      <DashboardFlowDetailPageView />
    </>
  );
}
