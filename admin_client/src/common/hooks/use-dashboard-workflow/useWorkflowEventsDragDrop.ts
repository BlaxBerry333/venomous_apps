import { useCallback } from "react";

import { getLastNode } from "~/common/components/sections/dashboard-workflow/_helpers";
import type { CustomNodeMenuListItemType, CustomNodeType } from "~/common/types/dashboard-workflow";

import useWorkflowInstance from "./useWorkflowInstance";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

export default function useWorkflowEventsDragDrop() {
  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  /** 开始拖拖页面上其他元素 */
  const handleOnDragStart = useCallback(
    (event: React.DragEvent<Element>, node: CustomNodeMenuListItemType) => {
      event.dataTransfer.setData("text/plain", JSON.stringify(node));
      event.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  /** 拖拖页面上其他元素经过 Canvas */
  const handleOnDragOver: React.DragEventHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  const { screenToFlowPosition, getNodes, setNodes } = useWorkflowInstance();

  /** 在 Canvas 中松开拖入的页面上其他元素  */
  const handleOnDrop: React.DragEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      const strData = event.dataTransfer.getData("text/plain");
      const draggedNode = JSON.parse(strData) as CustomNodeMenuListItemType;
      if (!draggedNode) {
        return;
      }
      // TODO:
      // node type 验证

      const lastNode = getLastNode(getNodes());
      const newNodeId = lastNode ? parseInt(lastNode.id) + 1 : 2;

      const newNode: CustomNodeType = {
        id: String(newNodeId),
        position: screenToFlowPosition({ x: event.clientX, y: event.clientY }),
        type: draggedNode.type,
        data: {
          form: {
            isValid: false,
            value: { title: `#${newNodeId}` },
          },
        },
      };

      setNodes((nds) => nds.concat(newNode));

      updateUndoRedoHistory(WorkFlowActionEventName.onDrop);
    },
    [screenToFlowPosition, getNodes, setNodes, updateUndoRedoHistory],
  );

  // ----------------------------------------------------------------------------------------------------

  return { handleOnDragStart, handleOnDragOver, handleOnDrop };
}
