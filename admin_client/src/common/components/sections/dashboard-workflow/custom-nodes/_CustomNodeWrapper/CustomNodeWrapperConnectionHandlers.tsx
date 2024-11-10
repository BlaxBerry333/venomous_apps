import type { FC } from "react";
import { memo } from "react";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import {
  useWorkflowEventsConnection,
  useWorkflowHelperNodeStyles,
} from "~/common/hooks/use-dashboard-workflow";
import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomNodeWrapperConnectionHandlers: FC<CustomNodeProps> = ({ ...nodeProps }) => {
  const { isConnectable } = nodeProps;

  const { commonNodeHandlerStyle } = useWorkflowHelperNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  const { onHandlerConnect } = useWorkflowEventsConnection();

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <_Handle
        type="target"
        position={_Position.Left}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyle, backgroundColor: "GrayText" }}
      />

      <_Handle
        type="source"
        position={_Position.Right}
        isConnectable={isConnectable}
        onConnect={onHandlerConnect}
        style={{ ...commonNodeHandlerStyle, backgroundColor: "GrayText" }}
      />
    </>
  );
};

export default memo(CustomNodeWrapperConnectionHandlers);
