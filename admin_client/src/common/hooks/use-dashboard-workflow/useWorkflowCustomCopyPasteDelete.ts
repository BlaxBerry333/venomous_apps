import { useCallback, useRef } from "react";

import { getLastNode } from "~/common/components/sections/dashboard-workflow/_helpers";
import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import { getSessionStorageItem, setSessionStorageItem } from "~/common/utils/handle-web-storage";
import useWorkflowInstance from "./useWorkflowInstance";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

const WORKFLOW_COPIED_NODES_KEY = "__VENOMOUS_APP__WORKFLOW_COPIED_NODES";
const WORKFLOW_COPIED_EDGES_KEY = "__VENOMOUS_APP__WORKFLOW_COPIED_EDGES";

export default function useWorkflowCustomCopyPasteDelete() {
  const { getNodes, getEdges, setNodes, setEdges } = useWorkflowInstance();

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
      updateUndoRedoHistory(WorkFlowActionEventName.PastedCopiedNode);
    }
  }, [getNodes, setNodes, updateUndoRedoHistory]);

  /** 删除所有选中的节点 */
  const deleteSelectedNodes = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => !node.selected));
  }, [setNodes]);

  /** 删除所有选中的边 */
  const deleteSelectedEdges = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => !edge.selected));
  }, [setEdges]);

  /** 删除所有选中的节点或边 */
  const deleteSelectedElements = useCallback(() => {
    const selectedNodes = getNodes().filter((n) => n.selected);
    const selectedEdges = getEdges().filter((e) => e.selected);

    const hasSelectedNodes: boolean = selectedNodes.length > 0;
    const hasSelectedEdges: boolean = selectedEdges.length > 0;

    // 如果没有选中节点和边，则不做任何操作
    if (!hasSelectedNodes && !hasSelectedEdges) return;
    // 删除选中的节点
    if (hasSelectedNodes) deleteSelectedNodes();
    // 删除选中的边
    if (hasSelectedEdges) deleteSelectedEdges();

    if (hasSelectedNodes && !hasSelectedEdges) {
      const actionEventName: WorkFlowActionEventName =
        selectedNodes.length === 1
          ? WorkFlowActionEventName.DeleteOneNode
          : WorkFlowActionEventName.DeleteNodes;
      updateUndoRedoHistory(actionEventName);
      return;
    }
    if (hasSelectedEdges && !hasSelectedNodes) {
      const actionEventName: WorkFlowActionEventName =
        selectedEdges.length === 1
          ? WorkFlowActionEventName.DeleteOneEdge
          : WorkFlowActionEventName.DeleteEdges;
      updateUndoRedoHistory(actionEventName);
      return;
    }
    if (hasSelectedNodes && hasSelectedEdges) {
      updateUndoRedoHistory(WorkFlowActionEventName.DeleteElements);
    }
  }, [getNodes, getEdges, deleteSelectedNodes, deleteSelectedEdges, updateUndoRedoHistory]);

  return {
    copySelectedNodes,
    pasteStoredNodes,
    deleteSelectedNodes,
    deleteSelectedEdges,
    deleteSelectedElements,
  };
}
