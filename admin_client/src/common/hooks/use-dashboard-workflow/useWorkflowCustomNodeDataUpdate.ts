import { useCallback } from "react";

import { isEqual } from "lodash-es";
import type { CustomNodeDataType, CustomNodeType } from "~/common/types/dashboard-workflow";
import useWorkflowInstance from "./useWorkflowInstance";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

function useWorkflowCustomNodeDataUpdate() {
  const { setNodes, getNode } = useWorkflowInstance();

  // ----------------------------------------------------------------------------------------------------

  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  const updateNodeFormData = useCallback(
    (nodeId: CustomNodeType["id"], nodeForm: Required<CustomNodeDataType["form"]>) => {
      const node = getNode(nodeId);
      const nodeFormValue = node?.data.form?.value;

      if (!isEqual(nodeFormValue, nodeForm?.value)) {
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
      }
    },
    [getNode, setNodes, updateUndoRedoHistory],
  );

  return {
    updateNodeFormData,
  };
}

export default useWorkflowCustomNodeDataUpdate;
