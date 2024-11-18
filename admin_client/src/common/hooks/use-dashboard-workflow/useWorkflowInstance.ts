import { useMemo } from "react";

import { useReactFlow } from "@xyflow/react";
import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";

export default function useWorkflowInstance() {
  const workflowInstance = useReactFlow<CustomNodeType, CustomEdgeType>();

  return useMemo(() => workflowInstance, [workflowInstance]);
}
