import { blue, green, grey, orange, red } from "@mui/material/colors";
import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";

export const DASHBOARD_WORKFLOW_CONFIGS = {
  /** Flow 更新历史记录的最大存储个数 */
  FlowUpdateHistoryMaxCount: 5,

  /** Flow UndoRedo 历史记录的最大存储个数 */
  FlowUndoRedoHistoryMaxCount: 10,

  ShowFlowUndoRedoDevtool: true,
  ShowFlowHelperLines: true,

  /** Flow 自动保存时间最短间隔 ( ms ) */
  FlowAutoSaveMinTime: 5000,

  /** 节点的最大展示个数 */
  NodesMaxCount: 100,

  /** 节点的宽度 */
  NodeMinWidth: 160,
  NodeMaxWidth: 400,

  /** 节点的高度 */
  NodeMinHeight: 80,
  NodeMaxHeight: 320,

  /** 节点种类的分组 */
  NodeTypeGroup: {
    communication: [CustomNodeTypeName.message, CustomNodeTypeName.resizable],
    logic: [CustomNodeTypeName.condition],
    transform: [CustomNodeTypeName.code],
  },

  /** Canvas 上的通用颜色 */
  CommonColors: {
    error: red["600"],
    blank: grey["600"],
    logic: green["200"],
    transform: blue["200"],
    communication: orange["200"],
  },

  /** Canvas 视图移动过过渡时间 ( ms ) */
  CanvasViewportTransitionDuration: 200,

  /** Canvas Gird布局的单位 */
  CanvasGridLayoutGap: [20, 20] as [number, number],
} as const;
