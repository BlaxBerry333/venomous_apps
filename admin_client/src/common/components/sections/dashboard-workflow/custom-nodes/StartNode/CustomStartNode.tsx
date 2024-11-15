import type { FC } from "react";
import { memo } from "react";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import { Icon } from "@iconify/react";

import MuiCard from "@mui/material/Card";
import MuiTypography from "@mui/material/Typography";

import {
  useWorkflowEventsConnection,
  useWorkflowNodeStyles,
} from "~/common/hooks/use-dashboard-workflow";
import { type CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomStartNode: FC<CustomNodeProps> = (nodeProps) => {
  const { isConnectable } = nodeProps;

  // ----------------------------------------------------------------------------------------------------

  const { startNodeWrapperStyles, commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowEventsConnection();

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard component="div" sx={startNodeWrapperStyles}>
      <MuiTypography component="div" variant="body2" noWrap>
        <Icon icon="solar:home-smile-bold" width={40} />
      </MuiTypography>

      <_Handle
        type="source"
        position={_Position.Right}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyles }}
      />
    </MuiCard>
  );
};

export default memo(CustomStartNode);
