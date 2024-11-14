import { useCallback, useRef } from "react";

import type {
  Connection,
  FinalConnectionState,
  HandleType,
  IsValidConnection,
  OnConnect,
  OnConnectEnd,
  OnConnectStart,
  OnConnectStartParams,
  OnReconnect,
} from "@xyflow/react";
import { addEdge, reconnectEdge, useReactFlow } from "@xyflow/react";

import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import useWorkflowUndoRedo, { WorkFlowActionEventName } from "./useWorkflowUndoRedo";

type OnReconnectStart = (
  event: React.MouseEvent,
  edge: CustomEdgeType,
  handleType: HandleType,
) => void;

type OnReconnectEnd = (
  event: MouseEvent | TouchEvent,
  edge: CustomEdgeType,
  handleType: HandleType,
) => void;

export default function useWorkflowEventsConnection() {
  const { setEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();

  // ----------------------------------------------------------------------------------------------------

  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  /** 边连接开始 */
  const onConnectStart: OnConnectStart = useCallback((_, params: OnConnectStartParams) => {
    console.log("onConnectStart", params);
  }, []);

  /** 边连接成功时 */
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      console.log("onConnect", connection);
      setEdges((els) => addEdge(connection, els));
      // 不建议在此处 onConnect、onConnectEnd 处理连接逻辑。会导致多次状态的存储
      // 建议在 Handler 组件的 onConnect 事件处理
    },
    [setEdges],
  );

  /** 边连接结束 ( 无论连接成功或失败 ) */
  const onConnectEnd: OnConnectEnd = useCallback((_, connectionState: FinalConnectionState) => {
    console.log("onConnectEnd", connectionState);
  }, []);

  /** 连接组件 Handler 连接成功时 */
  const onHandlerConnect: OnConnect = useCallback(
    (connection: Connection) => {
      console.log("Handler's onConnect", connection);
      updateUndoRedoHistory(WorkFlowActionEventName.onConnect);
    },
    [updateUndoRedoHistory],
  );

  // ----------------------------------------------------------------------------------------------------

  const edgeReconnectSuccessful = useRef<boolean>(true);

  /** 边重新连接开始 */
  const onReconnectStart: OnReconnectStart = useCallback((_, edge) => {
    console.log("onReconnectStart", edge);
    edgeReconnectSuccessful.current = false;
  }, []);

  /** 边重新连接成功时 */
  const onReconnect: OnReconnect<CustomEdgeType> = useCallback(
    (oldEdge, newConnection: Connection) => {
      console.log("onReconnect", oldEdge, newConnection);
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));

      if (!(oldEdge.target === newConnection.target)) {
        updateUndoRedoHistory(WorkFlowActionEventName.onReconnect);
      }
    },
    [setEdges, updateUndoRedoHistory],
  );

  /** 边重新连接结束 ( 无论连接成功或失败 ) */
  const onReconnectEnd: OnReconnectEnd = useCallback(
    async (_, edge) => {
      console.log("onReconnectEnd", edge);
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges],
  );

  // ----------------------------------------------------------------------------------------------------

  /** 判断是否可以连接 */
  const isValidConnection: IsValidConnection = useCallback((): boolean => {
    // console.log("isValidConnection:", edge); // 渲染次数过多，不建议在此处作处理
    return true;
  }, []);

  return {
    onConnectStart,
    onConnect,
    onConnectEnd,
    onHandlerConnect,
    onReconnectStart,
    onReconnect,
    onReconnectEnd,
    isValidConnection,
  };
}
