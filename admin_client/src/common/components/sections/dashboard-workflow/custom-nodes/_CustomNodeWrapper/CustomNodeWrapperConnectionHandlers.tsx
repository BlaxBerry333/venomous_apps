import type { FC } from "react";
import { memo, useMemo } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import {
  useWorkflowEventsConnection,
  useWorkflowNodeStyles,
} from "~/common/hooks/use-dashboard-workflow";
import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

// eslint-disable-next-line react-refresh/only-export-components
const CustomNodeWrapperConnectionSourceHandler: FC<CustomNodeProps> = (nodeProps) => {
  const { isConnectable, data } = nodeProps;
  const isMultipleConnectionSources = data.isMultipleConnectionSources;

  const { commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowEventsConnection();

  // ----------------------------------------------------------------------------------------------------

  if (isMultipleConnectionSources) {
    return null;
  }

  return (
    <_Handle
      type="source"
      position={_Position.Right}
      isConnectable={isConnectable}
      onConnect={onHandlerConnect}
      style={{ ...commonNodeHandlerStyles }}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const CustomNodeWrapperConnectionTargetHandler: FC<CustomNodeProps> = (nodeProps) => {
  const { isConnectable } = nodeProps;

  const { commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowEventsConnection();

  // ----------------------------------------------------------------------------------------------------

  return (
    <_Handle
      type="target"
      position={_Position.Left}
      isConnectable={isConnectable}
      onConnect={onHandlerConnect}
      style={{ ...commonNodeHandlerStyles }}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const CustomNodeWrapperConnectionMultipleSourceHandler: FC<CustomNodeProps> = (nodeProps) => {
  const { isConnectable, data } = nodeProps;
  const isMultipleConnectionSources = data.isMultipleConnectionSources;

  const { commonNodeHandlerStyles } = useWorkflowNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowEventsConnection();

  // ----------------------------------------------------------------------------------------------------

  const multipleItems = useMemo(() => data.form?.value.items || [], [data.form?.value.items]);

  // ----------------------------------------------------------------------------------------------------

  if (!isMultipleConnectionSources) {
    return null;
  }

  return (
    <>
      {multipleItems.map((item) => (
        <MuiBox
          key={item.id}
          component="div"
          sx={{
            position: "relative",
            overflow: "visible",
            px: 2,
            height: "40px",
          }}
        >
          <MuiTypography variant="subtitle2" noWrap sx={{ height: "100%", lineHeight: "40px" }}>
            {item.title}
          </MuiTypography>

          <_Handle
            type="source"
            position={_Position.Right}
            isConnectable={isConnectable}
            onConnect={onHandlerConnect}
            style={{
              ...commonNodeHandlerStyles,
              position: "absolute",
              top: "20px",
              zIndex: 2,
              right: -4,
            }}
          />
        </MuiBox>
      ))}
    </>
  );
};

export default {
  Source: memo(CustomNodeWrapperConnectionSourceHandler),
  Target: memo(CustomNodeWrapperConnectionTargetHandler),
  MultipleSource: memo(CustomNodeWrapperConnectionMultipleSourceHandler),
};
