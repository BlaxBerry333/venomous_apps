import { ReactFlowProvider } from "@xyflow/react";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { WorkflowPlayground } from "~/common/components/sections/dashboard-workflow/playground";

export default function DashboardWorkflowPlaygroundPageView() {
  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <ReactFlowProvider>
        <WorkflowPlayground />
      </ReactFlowProvider>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
