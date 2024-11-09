import { useCallback } from "react";

import type { NodeMouseHandler, OnNodeDrag, OnNodesDelete } from "@xyflow/react";
import type { CustomNodeType } from "~/common/types/dashboard-workflow";

export default function useWorkflowEventsNodes() {
  /** 受控组件写法：监听节点的变化 ( 选中、删除、更新 ) */
  // const onNodesChange: OnNodesChange = useCallback((changes) => {
  //   console.log("onNodesChange", changes);
  // }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 节点被鼠标单击 ( 鼠标抬起时 ) */
  const onNodeClick: NodeMouseHandler<CustomNodeType> = useCallback(
    (_: React.MouseEvent, node: CustomNodeType) => {
      console.log("onNodeClick", node);
    },
    [],
  );

  /** 节点被鼠标双击 ( 鼠标抬起时 ) */
  const onNodeDoubleClick: NodeMouseHandler<CustomNodeType> = useCallback(
    (_: React.MouseEvent, node: CustomNodeType) => {
      console.log("onNodeDoubleClick", node);
    },
    [],
  );

  /** 节点被鼠标右键单击 ( 会同时触发单击事件 ) */
  const onNodeContextMenu: NodeMouseHandler<CustomNodeType> = useCallback(
    (_: React.MouseEvent, node: CustomNodeType) => {
      console.log("onNodeContextMenu", node);
    },
    [],
  );

  /** 节点被鼠标进入 */
  const onNodeMouseEnter: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // console.log("onNodeMouseEnter", node); // 渲染次数过多，不建议在此处作处理
  }, []);

  /** 节点被鼠标经过 */
  const onNodeMouseMove: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // console.log("onNodeMouseMove", node); // 渲染次数过多，不建议在此处作处理
  }, []);

  /** 节点被鼠标离开 */
  const onNodeMouseLeave: NodeMouseHandler<CustomNodeType> = useCallback(() => {
    // console.log("onNodeMouseLeave", node); // 渲染次数过多，不建议在此处作处理
  }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 节点在Canvas上的拖动开始 */
  const onNodeDragStart: OnNodeDrag<CustomNodeType> = useCallback((_, node, nodes) => {
    console.log("onNodeDragStart:", node, nodes);
  }, []);

  /** 节点在Canvas上的拖动中 */
  const onNodeDrag: OnNodeDrag<CustomNodeType> = useCallback(() => {
    // console.log("onNodeDrag:", node, nodes); // 渲染次数过多，不建议在此处作处理
  }, []);

  /** 节点在Canvas上的拖动结束 */
  const onNodeDragStop: OnNodeDrag<CustomNodeType> = useCallback((_, node, nodes) => {
    console.log("onNodeDragStop:", node, nodes);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  /** 节点被删除时 */
  const onNodesDelete: OnNodesDelete<CustomNodeType> = useCallback((nodes: CustomNodeType[]) => {
    console.log("onNodesDelete", nodes);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return {
    onNodeClick,
    onNodeDoubleClick,
    onNodeContextMenu,
    onNodeMouseEnter,
    onNodeMouseMove,
    onNodeMouseLeave,
    onNodeDragStart,
    onNodeDrag,
    onNodeDragStop,
    onNodesDelete,
  };
}
