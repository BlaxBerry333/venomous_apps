import type { FC } from "react";
import { memo, useCallback } from "react";

import type { GetMiniMapNodeAttribute } from "@xyflow/react";
import { MiniMap as _MiniMap } from "@xyflow/react";

import { Icon } from "@iconify/react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import useBoolean from "~/common/hooks/_base/useBoolean";
import { useWorkflowCustomViewport } from "~/common/hooks/use-dashboard-workflow";
import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import { CustomThemeModeType } from "~/common/modules/mui/custom-themes";
import { CustomNodeTypeName, type CustomNodeType } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

const ActionButtonMiniMap: FC = () => {
  const customThemeContextValue = useCustomThemesContextValue();
  const isDarkMode = customThemeContextValue?.themeMode === CustomThemeModeType.dark;
  const themePrimaryColor = customThemeContextValue?.themePrimaryColor;

  // ----------------------------------------------------------------------------------------------------

  const { value: isOpenMiniMap, toggle: toggleIsOpenMiniMap } = useBoolean(true);

  // ----------------------------------------------------------------------------------------------------

  const { moveToViewportCenter } = useWorkflowCustomViewport();

  const handleClickMiniMapNode = useCallback(
    (event: React.MouseEvent, node: CustomNodeType) => {
      event.preventDefault();
      moveToViewportCenter(node.position);
      console.log(node);
    },
    [moveToViewportCenter],
  );

  // ----------------------------------------------------------------------------------------------------

  const getMiniMapNodeColor: GetMiniMapNodeAttribute<CustomNodeType> = useCallback(
    (node: CustomNodeType): string => {
      const isInvalid: boolean = !node.data.form?.isValid;
      const isStartNode: boolean = node.type === CustomNodeTypeName.start;

      if (isInvalid && !isStartNode) return DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error;
      if (node.selected) return themePrimaryColor?.main || "";
      return isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
    },
    [isDarkMode, themePrimaryColor],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock style={{ height: 40, width: 40 }} onClick={toggleIsOpenMiniMap}>
        <Icon
          icon={isOpenMiniMap ? "line-md:map-marker-off-loop" : "line-md:map-marker-alt-loop"}
          width={20}
        />
      </CustomSquareBlock>

      <_MiniMap
        position="bottom-left"
        style={{
          display: isOpenMiniMap ? "block" : "none",
          margin: 0,
          bottom: "48px",
          background: isDarkMode ? "#121212" : "#ffffff",
        }}
        nodeBorderRadius={16}
        nodeColor={getMiniMapNodeColor}
        maskColor={isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.16)"}
        pannable
        zoomable
        onNodeClick={handleClickMiniMapNode}
      />
    </>
  );
};

export default memo(ActionButtonMiniMap);
