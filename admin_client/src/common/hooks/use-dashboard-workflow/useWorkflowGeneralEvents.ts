import { useCallback } from "react";

import type { OnBeforeDelete, OnError, OnInit } from "@xyflow/react";

import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import useWorkflowCustomViewport from "./useWorkflowCustomViewport";

export default function useWorkflowGeneralEvents() {
  const { setViewportInitPosition } = useWorkflowCustomViewport();

  // ----------------------------------------------------------------------------------------------------

  /** Canvas 初始化时 */
  const onInit: OnInit<CustomNodeType, CustomEdgeType> = useCallback(
    (flowInstance) => {
      console.log("onInit", flowInstance);
      const firstNodePosition = { x: 0, y: 0 };
      setViewportInitPosition(firstNodePosition);
    },
    [setViewportInitPosition],
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

  // ----------------------------------------------------------------------------------------------------

  return { onInit, onError, onBeforeDelete };
}
