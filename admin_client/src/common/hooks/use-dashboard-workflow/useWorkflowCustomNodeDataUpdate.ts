import { useCallback } from "react";

import { useReactFlow } from "@xyflow/react";

import type {
  CustomEdgeType,
  CustomNodeDataType,
  CustomNodeType,
} from "~/common/types/dashboard-workflow";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

function useWorkflowCustomNodeDataUpdate() {
  const { setNodes } = useReactFlow<CustomNodeType, CustomEdgeType>();

  // ----------------------------------------------------------------------------------------------------

  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  const updateNodeFormData = useCallback(
    (nodeId: CustomNodeType["id"], nodeForm: Required<CustomNodeDataType["form"]>) => {
      setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id !== nodeId) {
            return n;
          }
          return {
            ...n,
            data: {
              ...n.data,
              form: nodeForm,
            },
          };
        }),
      );

      updateUndoRedoHistory(WorkFlowActionEventName.onNodeDataUpdated);
    },
    [setNodes, updateUndoRedoHistory],
  );

  return {
    updateNodeFormData,
  };
}

export default useWorkflowCustomNodeDataUpdate;
