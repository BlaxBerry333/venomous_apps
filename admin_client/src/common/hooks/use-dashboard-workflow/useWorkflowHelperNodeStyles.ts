import { useMemo, type CSSProperties } from "react";

import type { CardProps as MuiCardProps } from "@mui/material/Card";
import type { SxProps as MuiSxProps } from "@mui/material/styles";

import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import { CustomNodeTypeName, type CustomNodeProps } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

export default function useWorkflowHelperNodeStyles(nodeProps: CustomNodeProps) {
  const { type, selected, data } = nodeProps;

  const isValid: boolean = Boolean(data.form?.isValid);

  // ----------------------------------------------------------------------------------------------------

  const customThemeContextValue = useCustomThemesContextValue();
  const themePrimaryColor = customThemeContextValue?.themePrimaryColor;

  // ----------------------------------------------------------------------------------------------------

  const startNodeWrapperStyle = useMemo<MuiSxProps>(
    () => ({
      width: 60,
      height: 60,
      borderRadius: "50%",
      border: 3,
      borderColor: themePrimaryColor?.main,
      color: themePrimaryColor?.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
    [themePrimaryColor],
  );

  const commonNodeWrapperStyle = useMemo<MuiCardProps["sx"]>(
    () => ({
      height: "-webkit-fill-available",
      ...(type === CustomNodeTypeName.resizable
        ? {
            minWidth: DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth,
            minHeight: DASHBOARD_WORKFLOW_CONFIGS.NodeMinHeight,
            maxWidth: DASHBOARD_WORKFLOW_CONFIGS.NodeMaxWidth,
            maxHeight: DASHBOARD_WORKFLOW_CONFIGS.NodeMaxHeight,
          }
        : {
            width: DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth,
            height: DASHBOARD_WORKFLOW_CONFIGS.NodeMinHeight,
          }),
      border: 3,
      color: !isValid ? DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error : "default",
      borderColor: !isValid
        ? DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error
        : selected
          ? themePrimaryColor?.main
          : "transparent",
      boxShadow: (theme) => theme.shadows[2],
      "&:hover": { boxShadow: (theme) => theme.shadows[3] },
      transition: "box-shadow 0.25s",
      py: 1,
      px: 2,
    }),
    [type, selected, isValid, themePrimaryColor],
  );

  // ----------------------------------------------------------------------------------------------------

  const commonNodeContentStyle = useMemo<CSSProperties>(
    () => ({
      color: isValid ? "default" : DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error,
    }),
    [isValid],
  );

  // ----------------------------------------------------------------------------------------------------

  const commonNodeHandlerStyle = useMemo<CSSProperties>(
    () => ({
      width: 16,
      height: 16,
      borderRadius: "50%",
    }),
    [],
  );

  // ----------------------------------------------------------------------------------------------------

  return {
    startNodeWrapperStyle,
    commonNodeWrapperStyle,
    commonNodeContentStyle,
    commonNodeHandlerStyle,
  };
}
