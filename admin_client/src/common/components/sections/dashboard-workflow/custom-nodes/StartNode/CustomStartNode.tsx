import type { FC } from "react";
import { memo } from "react";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import { Icon } from "@iconify/react";

import MuiCard from "@mui/material/Card";
import MuiTypography from "@mui/material/Typography";

import {
  useWorkflowEventsConnection,
  useWorkflowHelperNodeStyles,
} from "~/common/hooks/use-dashboard-workflow";
import { type CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomStartNode: FC<CustomNodeProps> = (nodeProps) => {
  const { isConnectable } = nodeProps;

  // ----------------------------------------------------------------------------------------------------

  const { startNodeWrapperStyle, commonNodeHandlerStyle } = useWorkflowHelperNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowEventsConnection();

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard component="div" sx={startNodeWrapperStyle}>
      <MuiTypography component="div" variant="body2" noWrap>
        <Icon icon="solar:home-smile-bold" width={40} />
      </MuiTypography>

      <_Handle
        type="source"
        position={_Position.Right}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyle, backgroundColor: "GrayText" }}
      />
    </MuiCard>
  );
};

export default memo(CustomStartNode);
