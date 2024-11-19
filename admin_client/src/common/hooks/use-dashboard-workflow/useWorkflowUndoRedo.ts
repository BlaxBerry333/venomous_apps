import { useCallback } from "react";

import { temporal, type TemporalState } from "zundo";
import { create, useStore } from "zustand";

import { type CustomEdgeType, type CustomNodeType } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import useWorkflowInstance from "./useWorkflowInstance";

// ----------------------------------------------------------------------------------------------------

export enum WorkFlowActionEventName {
  Init = "Init" /* onInit 事件 */,
  Connect = "Connect" /* Handler.onConnect 事件 */, // 不建议在 ReactFlow 组件的 onConnect 事件而是建议通过 Handler 组件的 onConnect 事件
  Reconnect = "Reconnect" /* onReconnect 事件 */,
  MoveNode = "MoveNode" /* onNodeDragStop 事件 */,
  AddNode = "AddNode" /* onDrop 事件 */,
  DeleteNodes = "DeleteNodes", // 仅所有删除选中的 nodes
  DeleteEdges = "DeleteEdges", // 仅所有删除除选中的 edges
  DeleteElements = "DeleteElements", // 同时删除所有选中的 nodes 与 edges
  DeleteOneNode = "DeleteOneNode", // 仅删除一个选中的 node
  DeleteOneEdge = "DeleteOneEdge", // 仅删除一个选中的 edge
  DeleteEdgeByLabel = "DeleteEdgeByLabel", // 通过 edge 的关闭 label 后删除
  DeleteEdgeByDrop = "DeleteEdgeByDrop", // 通过拖拽 edge 离开 node 后删除
  UpdateNodeData = "UpdateNodeData", // 更新 node 的数据
  PastedCopiedNode = "PastedCopiedNode", // 粘贴 nodes
}

export const initialElements: WorkflowElementsType = {
  nodes: [],
  edges: [],
};

// ----------------------------------------------------------------------------------------------------

export type WorkflowElementsType = { nodes: CustomNodeType[]; edges: CustomEdgeType[] };

interface WorkflowUndoRedoStoreState {
  state: {
    actionEventName: null | WorkFlowActionEventName;
    elements: WorkflowElementsType;
  };
  clear: () => void;
  update: (state: {
    actionEventName: WorkFlowActionEventName;
    elements: WorkflowElementsType;
  }) => void;
}

// ----------------------------------------------------------------------------------------------------

const useWorkflowUndoRedoStore = create(
  temporal<WorkflowUndoRedoStoreState>(
    (set) => ({
      state: {
        actionEventName: null,
        elements: initialElements,
      },
      clear: () => set({ state: { actionEventName: null, elements: initialElements } }),
      update: (state: {
        actionEventName: WorkFlowActionEventName;
        elements: WorkflowElementsType;
      }) => set({ state }),
    }),
    { limit: DASHBOARD_WORKFLOW_CONFIGS.FlowUndoRedoHistoryMaxCount },
  ),
);

// ----------------------------------------------------------------------------------------------------

export default function useWorkflowUndoRedo() {
  const { getNodes, getEdges } = useWorkflowInstance();
  const undoRedoStore = useWorkflowUndoRedoStore();
  const { undo, redo, futureStates, pastStates } = useStore(
    useWorkflowUndoRedoStore.temporal,
    (state: TemporalState<WorkflowUndoRedoStoreState>) => state,
  );
  const {
    state: { actionEventName, elements },
    clear,
    update,
  } = undoRedoStore;

  const updateUndoRedoHistory = useCallback(
    async (actionEventName: WorkFlowActionEventName) => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      switch (actionEventName) {
        case WorkFlowActionEventName.Init:
        case WorkFlowActionEventName.MoveNode:
          update({
            actionEventName,
            elements: {
              nodes: getNodes(),
              edges: getEdges(),
            },
          });
          break;

        case WorkFlowActionEventName.Connect:
        case WorkFlowActionEventName.Reconnect:
        case WorkFlowActionEventName.AddNode:
        case WorkFlowActionEventName.DeleteNodes:
        case WorkFlowActionEventName.DeleteOneNode:
        case WorkFlowActionEventName.DeleteEdges:
        case WorkFlowActionEventName.DeleteOneEdge:
        case WorkFlowActionEventName.DeleteEdgeByLabel:
        case WorkFlowActionEventName.DeleteEdgeByDrop:
        case WorkFlowActionEventName.DeleteElements:
        case WorkFlowActionEventName.UpdateNodeData:
        case WorkFlowActionEventName.PastedCopiedNode:
          update({
            actionEventName,
            elements: {
              nodes: getNodes().map((n) => ({ ...n, selected: false })),
              edges: getEdges().map((e) => ({ ...e, selected: false })),
            },
          });
          break;

        default:
          break;
      }
    },
    [update, getNodes, getEdges],
  );

  const handleAfterTemporalAction = useCallback(async (action: () => void) => {
    action();
  }, []);

  return {
    actionEventName,
    elements,
    updateUndoRedoHistory,
    clear,
    currentState: undoRedoStore,
    futureStates,
    pastStates,
    undo: () => handleAfterTemporalAction(() => undo()),
    redo: () => handleAfterTemporalAction(() => redo()),
    canUndo: !!pastStates.length && actionEventName !== WorkFlowActionEventName.Init,
    canRedo: !!futureStates.length,
  };
}
