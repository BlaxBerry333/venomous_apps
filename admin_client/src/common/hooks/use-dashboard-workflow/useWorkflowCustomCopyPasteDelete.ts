import { useCallback, useRef } from "react";

import { useReactFlow } from "@xyflow/react";

import { getLastNode } from "~/common/components/sections/dashboard-workflow/_helpers";
import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import { getSessionStorageItem, setSessionStorageItem } from "~/common/utils/handle-web-storage";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

const WORKFLOW_COPIED_NODES_KEY = "__VENOMOUS_APP__WORKFLOW_COPIED_NODES";
const WORKFLOW_COPIED_EDGES_KEY = "__VENOMOUS_APP__WORKFLOW_COPIED_EDGES";

export default function useWorkflowCustomCopyPasteDelete() {
  const { getNodes, setNodes, setEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();

  // ----------------------------------------------------------------------------------------------------

  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  /** 复制所有选中的节点，并存到 SessionStorage */
  const copySelectedNodes = useCallback(() => {
    const selectedNodes: Array<CustomNodeType> = getNodes().filter((n) => n.selected);
    const relatedEdges: Array<CustomEdgeType> = [];

    if (selectedNodes.length) {
      setSessionStorageItem(WORKFLOW_COPIED_NODES_KEY, JSON.stringify(selectedNodes));
    }
    if (relatedEdges.length) {
      setSessionStorageItem(WORKFLOW_COPIED_EDGES_KEY, JSON.stringify(relatedEdges));
    }
  }, [getNodes]);

  /** 删除所有选中的节点 */
  const deleteSelectedNodes = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => !edge.selected));
  }, [setNodes, setEdges]);

  const pasteCount = useRef<number>(0);

  /** 粘贴存储在 SessionStorage 中的节点 */
  const pasteStoredNodes = useCallback(() => {
    const copiedNodes = getSessionStorageItem<Array<CustomNodeType>>(WORKFLOW_COPIED_NODES_KEY, []);
    const copiedEdges = getSessionStorageItem<Array<CustomEdgeType>>(WORKFLOW_COPIED_EDGES_KEY, []);

    if (copiedNodes?.length) {
      setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));

      const lastNode = getLastNode(getNodes());
      const nodesToAppended = copiedNodes.map<CustomNodeType>((n) => ({
        ...n,
        id: String(lastNode ? parseInt(lastNode.id) + parseInt(n.id) : n.id),
        position: {
          x: n.position.x + 50 * (pasteCount.current + 1),
          y: n.position.y + 50 * (pasteCount.current + 1),
        },
        selected: true, // 浮动显示到被复制节点的上方
        dragging: false,
      }));

      setNodes((nds) => nds.concat(nodesToAppended));
    }

    if (copiedNodes?.length || copiedEdges?.length) {
      pasteCount.current += 1;
      updateUndoRedoHistory(WorkFlowActionEventName.onNodeCopyPasted);
    }
  }, [getNodes, setNodes, updateUndoRedoHistory]);

  return {
    copySelectedNodes,
    deleteSelectedNodes,
    pasteStoredNodes,
  };
}
