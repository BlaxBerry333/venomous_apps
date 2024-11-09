import { useCallback } from "react";

import { useReactFlow } from "@xyflow/react";

import { getLastNode } from "~/common/components/sections/dashboard-workflow/_helpers";
import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";

export default function useWorkflowCustomCopyPasteDelete() {
  const { getNodes, getNode, setNodes, addNodes, setEdges } = useReactFlow<
    CustomNodeType,
    CustomEdgeType
  >();

  /** 复制一个指定的节点 */
  const copyOneNode = useCallback(
    (id: CustomNodeType["id"]) => {
      const node = getNode(id);
      if (!node) {
        return;
      }

      const lastNode = getLastNode(getNodes());
      const newNodeId = lastNode ? parseInt(lastNode.id) + 1 : 2;

      addNodes({
        ...node,
        id: String(newNodeId),
        position: {
          x: node.position.x + 50,
          y: node.position.y + 50,
        },
        selected: true, // 浮动显示到被复制节点的上方
        dragging: false,
      });
    },
    [getNodes, getNode, addNodes],
  );

  /** 删除一个指定的节点 */
  const deleteOneNode = useCallback(
    (id: CustomNodeType["id"]) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
    },
    [setNodes, setEdges],
  );

  return {
    copyOneNode,
    deleteOneNode,
  };
}
