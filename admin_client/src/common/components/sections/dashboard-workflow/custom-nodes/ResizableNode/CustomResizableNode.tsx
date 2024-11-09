import type { FC } from "react";
import { memo } from "react";

import { NodeResizeControl as _NodeResizeControl } from "@xyflow/react";

import { Icon } from "@iconify/react";

import { CustomNodeWrapper } from "~/common/components/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";
import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import { CustomNodeTypeName, type CustomNodeProps } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

const CustomResizableNode: FC<CustomNodeProps> = (nodeProps) => {
  const { selected } = nodeProps;

  // ----------------------------------------------------------------------------------------------------

  const customThemeContextValue = useCustomThemesContextValue();
  const themePrimaryColor = customThemeContextValue?.themePrimaryColor;

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper {...nodeProps} type={CustomNodeTypeName.resizable}>
      {/* {children} */}

      <_NodeResizeControl
        style={{ background: "transparent", border: "none" }}
        minWidth={DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth}
        minHeight={DASHBOARD_WORKFLOW_CONFIGS.NodeMinHeight}
        maxWidth={DASHBOARD_WORKFLOW_CONFIGS.NodeMaxWidth}
        maxHeight={DASHBOARD_WORKFLOW_CONFIGS.NodeMaxHeight}
        shouldResize={() => true}
      >
        <Icon
          icon="solar:arrow-right-down-bold-duotone"
          width={20}
          style={{
            position: "absolute",
            right: 8,
            bottom: 8,
            display: selected ? "block" : "none",
            color: themePrimaryColor?.main,
          }}
        />
      </_NodeResizeControl>
    </CustomNodeWrapper>
  );
};

export default memo(CustomResizableNode);
