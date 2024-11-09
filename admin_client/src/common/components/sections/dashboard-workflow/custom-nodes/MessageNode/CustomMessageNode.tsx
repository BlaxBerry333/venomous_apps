import type { FC } from "react";
import { memo } from "react";

import { CustomNodeWrapper } from "~/common/components/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";
import { CustomNodeTypeName, type CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomMessageNode: FC<CustomNodeProps> = (nodeProps) => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper {...nodeProps} type={CustomNodeTypeName.message}>
      Message
    </CustomNodeWrapper>
  );
};

export default memo(CustomMessageNode);
