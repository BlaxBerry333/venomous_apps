import { useCallback } from "react";

import { useStoreApi } from "@xyflow/react";

import { temporal, type TemporalState } from "zundo";
import { create, useStore } from "zustand";

import { type CustomEdgeType, type CustomNodeType } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

// ----------------------------------------------------------------------------------------------------

export enum WorkFlowActionEventName {
  onInit = "onInit",
  onConnect = "onConnect", // 不建议在 Flow 组件的事件上处理连接逻辑, 建议通过 Handler 组件的 onConnect 事件处理
  onReconnect = "onReconnect",
  onNodeDragStop = "onNodeDragStop",
  onDrop = "onDrop",
  onDelete = "onDelete", // 同时删除 node 或 edge 时统一处理
  onNodesDelete = "onNodesDelete", // 仅删除 nodes ( 不建议分别处理 node 与 edge 的删除逻辑, 会导致2次状态的存储 )
  onEdgesDelete = "onEdgesDelete", // 仅删除 edges ( 不建议分别处理 node 与 edge 的删除逻辑, 会导致2次状态的存储 )
  onNodeDataUpdated = "onNodeDataUpdated",
  onNodeCopyPasted = "onNodeCopyPasted",
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

  const { getState } = useStoreApi<CustomNodeType, CustomEdgeType>();

  const updateUndoRedoHistory = useCallback(
    async (actionEventName: WorkFlowActionEventName) => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      switch (actionEventName) {
        case WorkFlowActionEventName.onInit:
        case WorkFlowActionEventName.onNodeDragStop:
          update({
            actionEventName,
            elements: {
              nodes: getState().nodes,
              edges: getState().edges,
            },
          });
          break;

        case WorkFlowActionEventName.onConnect:
        case WorkFlowActionEventName.onReconnect:
        case WorkFlowActionEventName.onDrop:
        case WorkFlowActionEventName.onDelete:
        case WorkFlowActionEventName.onEdgesDelete:
        case WorkFlowActionEventName.onNodesDelete:
        case WorkFlowActionEventName.onNodeDataUpdated:
        case WorkFlowActionEventName.onNodeCopyPasted:
          update({
            actionEventName,
            elements: {
              nodes: getState().nodes.map((n) => ({ ...n, selected: false })),
              edges: getState().edges.map((e) => ({ ...e, selected: false })),
            },
          });
          break;

        default:
          break;
      }
    },
    [update, getState],
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
    canUndo: !!pastStates.length && actionEventName !== WorkFlowActionEventName.onInit,
    canRedo: !!futureStates.length,
  };
}
