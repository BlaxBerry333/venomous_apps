import type { CustomNodeType } from "~/common/types/dashboard-workflow";

export function getLastNode(nodes: CustomNodeType[]): CustomNodeType | null {
  if (nodes.length === 0) {
    return null;
  }
  return nodes.reduce((lastNode, currentNode) => {
    return currentNode.id > lastNode.id ? currentNode : lastNode;
  });
}
