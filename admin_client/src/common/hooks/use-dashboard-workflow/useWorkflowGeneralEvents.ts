import { useCallback } from "react";

import { type OnBeforeDelete, type OnDelete, type OnError, type OnInit } from "@xyflow/react";

import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import useWorkflowCustomViewport from "./useWorkflowCustomViewport";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

export default function useWorkflowGeneralEvents() {
  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  const { setViewportInitPosition } = useWorkflowCustomViewport();

  // ----------------------------------------------------------------------------------------------------

  /** Canvas 初始化时 */
  const onInit: OnInit<CustomNodeType, CustomEdgeType> = useCallback(
    (flowInstance) => {
      console.log("onInit", flowInstance);
      const firstNodePosition = { x: 0, y: 0 };
      setViewportInitPosition(firstNodePosition);

      updateUndoRedoHistory(WorkFlowActionEventName.Init);
    },
    [setViewportInitPosition, updateUndoRedoHistory],
  );

  // ----------------------------------------------------------------------------------------------------

  /** Canvas 有错误发生时 */
  const onError: OnError = useCallback((id, message) => {
    console.log("onError", id, message);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 节点或边在被删除前 */
  const onBeforeDelete: OnBeforeDelete<CustomNodeType, CustomEdgeType> = useCallback(
    async (elements) => {
      console.log("onBeforeDelete", elements);
      // return false // 中止删除节点或边
      return elements;
    },
    [],
  );

  /** 节点或边被删除时 */
  const onDelete: OnDelete<CustomNodeType, CustomEdgeType> = useCallback((elements) => {
    console.log("onDelete", elements);
    // 不建议使用该事件记录 UndoRedo, 建议关闭默认删除热键并通过自定义 Hotkey 处理
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return { onInit, onError, onBeforeDelete, onDelete };
}
