import type { CustomEdgeType, CustomNodeType } from "~/common/types/dashboard-workflow";
import { CustomEdgeTypeName, CustomNodeTypeName } from "~/common/types/dashboard-workflow";

export const _MOCK_NODES: CustomNodeType[] = [
  {
    id: "1",
    type: CustomNodeTypeName.start,
    position: { x: 100, y: 100 },
    data: {
      form: undefined,
    },
  },
  {
    id: "2",
    type: CustomNodeTypeName.blank,
    position: { x: 600, y: 300 },
    data: {
      form: {
        value: {
          title: "yyyyyy",
        },
        isValid: true,
      },
    },
  },
  {
    id: "3",
    type: CustomNodeTypeName.blank,
    position: { x: 400, y: 400 },
    data: {
      form: {
        value: {
          title: "zzzzzz",
        },
        isValid: true,
      },
    },
  },
  {
    id: "4",
    type: CustomNodeTypeName.blank,
    position: { x: 600, y: 80 },
    data: {
      form: {
        value: {
          title: "ooooo",
        },
        isValid: true,
      },
    },
  },
];

export const _MOCK_EDGES: CustomEdgeType[] = [
  {
    id: "e1-3",
    type: CustomEdgeTypeName.deleteLabel,
    source: "1",
    target: "3",
  },
];
