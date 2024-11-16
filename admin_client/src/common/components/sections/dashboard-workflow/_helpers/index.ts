import type { CustomNodeType } from "~/common/types/dashboard-workflow";

export function getLastNode(nodes: CustomNodeType[]): CustomNodeType | null {
  if (nodes.length === 0) {
    return null;
  }

  const reversedNodes = nodes.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  return reversedNodes[0];
}
