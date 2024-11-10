import { ReactFlowProvider } from "@xyflow/react";
import { _MOCK_EDGES, _MOCK_NODES } from "~/common/__mocks__/_workfllow";

import DashboardLayoutMainContainerInnerWrappers from "~/common/components/layouts/DashboardLayout/DashboardLayoutMainContainerInnerWrappers";
import { WorkflowPlayground } from "~/common/components/sections/dashboard-workflow/playground";

export default function DashboardWorkflowPlaygroundPageView() {
  return (
    <DashboardLayoutMainContainerInnerWrappers isOverflowHidden showCommonFooter={false}>
      <ReactFlowProvider>
        <WorkflowPlayground nodes={_MOCK_NODES} edges={_MOCK_EDGES} />
      </ReactFlowProvider>
    </DashboardLayoutMainContainerInnerWrappers>
  );
}
