import type { FC } from "react";
import { memo } from "react";

import { Handle as _Handle, Position as _Position } from "@xyflow/react";

import { useWorkflowHelperNodeStyles } from "~/common/hooks/use-dashboard-workflow";
import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomNodeWrapperConnectionHandlers: FC<CustomNodeProps> = ({ ...nodeProps }) => {
  const { isConnectable } = nodeProps;

  const { commonNodeHandlerStyle } = useWorkflowHelperNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <_Handle
        type="target"
        position={_Position.Left}
        isConnectable={isConnectable}
        onConnect={(params) => console.log("target handler onConnect", params)}
        style={{ ...commonNodeHandlerStyle, backgroundColor: "GrayText" }}
      />

      <_Handle
        type="source"
        position={_Position.Right}
        isConnectable={isConnectable}
        onConnect={(params) => console.log("source handler onConnect", params)}
        style={{ ...commonNodeHandlerStyle, backgroundColor: "GrayText" }}
      />
    </>
  );
};

export default memo(CustomNodeWrapperConnectionHandlers);
