import { useCallback } from "react";

import type { OnEdgesDelete } from "@xyflow/react";

import type { CustomEdgeType } from "~/common/types/dashboard-workflow";

export default function useWorkflowEventsEdges() {
  // ----------------------------------------------------------------------------------------------------

  /** 受控组件写法：监听边的变化 ( 选中、删除、更新 ) */
  // const onEdgesChange: OnEdgesChange = useCallback((changes) => {
  //   console.log("onEdgesChange", changes);
  // }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 边被删除时 */
  const onEdgesDelete: OnEdgesDelete<CustomEdgeType> = useCallback((edges: CustomEdgeType[]) => {
    console.log("onEdgesDelete", edges);
    // 不建议分别处理 node 与 edge 的删除逻辑。会导致2次状态的存储
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return { onEdgesDelete };
}
