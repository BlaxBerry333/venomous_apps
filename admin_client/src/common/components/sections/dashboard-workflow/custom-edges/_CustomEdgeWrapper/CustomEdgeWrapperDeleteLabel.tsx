import type { FC } from "react";
import { memo, useCallback } from "react";

import { useReactFlow } from "@xyflow/react";

import { Icon } from "@iconify/react";

import MuiIconButton from "@mui/material/IconButton";
import MuiPaper from "@mui/material/Paper";

import { useWorkflowUndoRedo } from "~/common/hooks/use-dashboard-workflow";
import { WorkFlowActionEventName } from "~/common/hooks/use-dashboard-workflow/useWorkflowUndoRedo";
import type {
  CustomEdgeProps,
  CustomEdgeType,
  CustomNodeType,
} from "~/common/types/dashboard-workflow";

const CustomEdgeWrapperDeleteLabel: FC<{
  edgeProps: CustomEdgeProps;
  edgeLabelProps: {
    labelX: number;
    labelY: number;
  };
}> = ({ edgeProps, edgeLabelProps }) => {
  const { id, selected } = edgeProps;
  const { labelX, labelY } = edgeLabelProps;

  // ----------------------------------------------------------------------------------------------------

  const { updateUndoRedoHistory } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  const { setEdges } = useReactFlow<CustomNodeType, CustomEdgeType>();

  const onEdgeClick = useCallback(() => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
    updateUndoRedoHistory(WorkFlowActionEventName.onDelete);
  }, [setEdges, id, updateUndoRedoHistory]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiPaper
      className="nodrag nopan"
      style={{
        display: selected ? "flex" : "none",
        position: "absolute",
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        pointerEvents: "all",
        borderRadius: "50%",
      }}
      variant="outlined"
    >
      <MuiIconButton size="medium" onClick={onEdgeClick} color="primary" sx={{ padding: 0 }}>
        <Icon icon="solar:close-circle-linear" />
      </MuiIconButton>
    </MuiPaper>
  );
};

export default memo(CustomEdgeWrapperDeleteLabel);
