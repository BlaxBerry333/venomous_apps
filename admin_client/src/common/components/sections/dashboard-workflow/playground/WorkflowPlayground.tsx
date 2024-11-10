import type { FC } from "react";
import { memo, useEffect } from "react";

import { ConnectionLineType, MarkerType, ReactFlow, useReactFlow } from "@xyflow/react";
import { isEqual } from "lodash-es";

// import "@xyflow/react/dist/style.css";
import "@xyflow/react/dist/base.css";
import "./override-reactflow-styles.css";

import MuiCard from "@mui/material/Card";

import {
  useWorkflowEventsConnection,
  useWorkflowEventsDragDrop,
  useWorkflowEventsEdges,
  useWorkflowEventsNodes,
  useWorkflowGeneralEvents,
  useWorkflowHelperLines,
  useWorkflowUndoRedo,
} from "~/common/hooks/use-dashboard-workflow";
import {
  initialElements,
  type WorkflowElementsType,
} from "~/common/hooks/use-dashboard-workflow/useWorkflowUndoRedo";
import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import {
  CustomEdgeTypeName,
  type CustomEdgeType,
  type CustomNodeType,
} from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

import { customEdgeComponentsTypes } from "../custom-edges";
import { customNodeComponentsTypes } from "../custom-nodes";
import { CustomHelperLine } from "../helper-line";
import { CustomUndoRedoDevtool } from "../undo-redo-devtool";
import { WorkflowPlaygroundActions } from "./playground-actions";

const WorkflowPlayground: FC<WorkflowElementsType> = (newData) => {
  // 受控组件写法
  // const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges , onEdgesChange] = useEdgesState(initialEdges);

  // ----------------------------------------------------------------------------------------------------

  const { setNodes, setEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const { elements } = useWorkflowUndoRedo();

  useEffect(() => {
    if (isEqual(elements, initialElements)) {
      return;
    }
    setNodes(elements.nodes);
    setEdges(elements.edges);
  }, [elements, setNodes, setEdges]);

  // ----------------------------------------------------------------------------------------------------

  const { onInit, onError, onBeforeDelete, onDelete } = useWorkflowGeneralEvents();

  const {
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
  } = useWorkflowEventsNodes();

  const { onEdgesDelete } = useWorkflowEventsEdges();

  const {
    onConnectStart,
    onConnect,
    onConnectEnd,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isValidConnection,
  } = useWorkflowEventsConnection();

  const { handleOnDragOver, handleOnDrop } = useWorkflowEventsDragDrop();

  // ----------------------------------------------------------------------------------------------------

  const customThemeContextValue = useCustomThemesContextValue();

  const { customNodesChange, helperLineHorizontal, helperLineVertical } = useWorkflowHelperLines();

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard variant="outlined" sx={{ height: "100%", width: "100%" }}>
      <ReactFlow
        defaultNodes={newData.nodes} /** 受控组件写法：节点列表 */
        defaultEdges={newData.edges} /** 受控组件写法：边列表 */
        // onNodesChange={onNodesChange} /** 受控组件写法：监听节点的变化 ( 选中、删除、更新 ) */
        // onEdgesChange={onEdgesChange} /** 受控组件写法：监听边的变化 ( 选中、删除、更新 ) */
        // ----------------------------------------------------------------------------------------------------
        onNodesChange={customNodesChange}
        // ----------------------------------------------------------------------------------------------------
        onNodeDragStart={onNodeDragStart} /** 节点在Canvas上的开始 */
        onNodeDrag={onNodeDrag} /** 节点在Canvas上的拖动中 */
        onNodeDragStop={onNodeDragStop} /** 节点在Canvas上的结束 */
        onNodeClick={onNodeClick} /** 节点被鼠标单击 ( 鼠标抬起时 ) */
        onNodeDoubleClick={onNodeDoubleClick} /** 节点被鼠标双击 ( 会同时触发单击事件 ) */
        onNodeContextMenu={onNodeContextMenu} /** 节点被鼠标右键单击 ( 鼠标抬起时 ) */
        onNodeMouseEnter={onNodeMouseEnter} /** 节点被鼠标进入 */
        onNodeMouseMove={onNodeMouseMove} /** 节点被鼠标经过 */
        onNodeMouseLeave={onNodeMouseLeave} /** 节点被鼠标离开 */
        onNodesDelete={onNodesDelete} /** 节点被删除时 */
        onEdgesDelete={onEdgesDelete} /** 边被删除时 */
        onConnectStart={onConnectStart} /** 边连接开始 */
        onConnect={onConnect} /** 边连接成功时 */
        onConnectEnd={onConnectEnd} /** 边连接结束 ( 无论连接成功或失败 ) */
        onReconnectStart={onReconnectStart} /** 边重新连接开始 */
        onReconnect={onReconnect} /** 边重新连接成功时 */
        onReconnectEnd={onReconnectEnd} /**  边重新连接结束 ( 无论连接成功或失败 ) */
        isValidConnection={isValidConnection} /** 判断是否可以连接 */
        // ----------------------------------------------------------------------------------------------------
        onInit={onInit} /** Canvas 初始化时 */
        onError={onError} /** Canvas 有错误发生时 */
        onBeforeDelete={onBeforeDelete} /** 节点或边在被删除前 */
        onDelete={onDelete} /** 节点或边被删除时 */
        onDragOver={handleOnDragOver} /** 拖动页面元素经过Canvas */
        onDrop={handleOnDrop} /** 拖动页面元素放入Canvas */
        // ----------------------------------------------------------------------------------------------------
        colorMode={customThemeContextValue?.themeMode}
        elementsSelectable /** 节点与边是否能被选中 */
        nodesConnectable /** 节点是否能被连接 */
        nodesDraggable /** 节点是否能被拖拽 */
        panOnDrag /** 是否可以拖拽整个Canvas */
        panOnScroll={false} /** 是否可以滚动整个Canvas */
        zoomOnScroll /** 是否可以滚动缩放整个Canvas */
        zoomOnPinch /** 是否可以二指捏合手势缩放整个Canvas */
        nodesFocusable={false} /** 是否可以使用 Tab 切换节点 */
        edgesFocusable={false} /** 是否可以使用 Tab 切换边 */
        nodeDragThreshold={5} /** 节点被拖拽了指定 px 之后才会真正在Canvas上移动，可防止失误移动 */
        connectionRadius={DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth / 4} /** 节点连接的 px 范围 */
        // ----------------------------------------------------------------------------------------------------
        nodeTypes={customNodeComponentsTypes}
        edgeTypes={customEdgeComponentsTypes}
        connectionLineType={ConnectionLineType.Bezier} /** 连接中的边的种类 */
        connectionLineStyle={{ strokeWidth: 3 }} /** 连接中的边的样式 */
        defaultEdgeOptions={{
          type: CustomEdgeTypeName.deleteLabel /** 连接拖拽时的边的种类 */,
          markerEnd: { type: MarkerType.ArrowClosed } /** 连接拖拽时的边的箭头种类 */,
          // style: { strokeWidth: 2 } /** 连接拖拽时的边的样式 */,
        }}
        // ----------------------------------------------------------------------------------------------------
        proOptions={{ hideAttribution: true }}
      >
        <WorkflowPlaygroundActions />

        <CustomUndoRedoDevtool showDevtool={DASHBOARD_WORKFLOW_CONFIGS.ShowFlowUndoRedoDevtool} />

        <CustomHelperLine
          showHelperLines={DASHBOARD_WORKFLOW_CONFIGS.ShowFlowHelperLines}
          horizontal={helperLineHorizontal}
          vertical={helperLineVertical}
        />
      </ReactFlow>
    </MuiCard>
  );
};

export default memo(WorkflowPlayground);
