import { useMemo, type CSSProperties } from "react";

import type { CardProps as MuiCardProps } from "@mui/material/Card";
import type { SxProps as MuiSxProps } from "@mui/material/styles";

import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import { CustomNodeTypeName, type CustomNodeProps } from "~/common/types/dashboard-workflow";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

export default function useWorkflowNodeStyles(nodeProps: CustomNodeProps) {
  const { type, selected, data } = nodeProps;

  const isValid: boolean = Boolean(data.form?.isValid);
  const isMultipleConnectionSources: boolean = Boolean(data.isMultipleConnectionSources);
  const hasMultipleConnectionItems: boolean = Boolean(data.form?.value?.items?.length);

  // ----------------------------------------------------------------------------------------------------

  const customThemeContextValue = useCustomThemesContextValue();
  const themePrimaryColor = customThemeContextValue?.themePrimaryColor;

  // ----------------------------------------------------------------------------------------------------

  const nodeTextColor = useMemo(
    () => (!isValid ? DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error : "default"),
    [isValid],
  );

  const nodeWrapperBorderColor = useMemo(
    () =>
      !isValid
        ? DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error
        : selected
          ? themePrimaryColor?.main
          : "transparent",
    [isValid, selected, themePrimaryColor],
  );

  // ----------------------------------------------------------------------------------------------------

  const startNodeWrapperStyles = useMemo<MuiSxProps>(
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

  const commonNodeWrapperStyles = useMemo<MuiCardProps["sx"]>(
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
            minWidth: DASHBOARD_WORKFLOW_CONFIGS.NodeMinWidth,
            minHeight: DASHBOARD_WORKFLOW_CONFIGS.NodeMinHeight,
          }),
      color: nodeTextColor,
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: nodeWrapperBorderColor,
      ...(!isMultipleConnectionSources
        ? {}
        : {
            borderBottomLeftRadius: hasMultipleConnectionItems ? 0 : "8px",
            borderBottomRightRadius: hasMultipleConnectionItems ? 0 : "8px",
          }),
      boxShadow: (theme) => theme.shadows[2],
      "&:hover": { boxShadow: (theme) => theme.shadows[3] },
      transition: "box-shadow 0.25s",
      py: 1,
      px: 2,
    }),
    [
      type,
      nodeWrapperBorderColor,
      nodeTextColor,
      isMultipleConnectionSources,
      hasMultipleConnectionItems,
    ],
  );

  // ----------------------------------------------------------------------------------------------------

  const commonNodeHandlerStyles = useMemo<CSSProperties>(
    () => ({
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "GrayText",
      zIndex: 2,
    }),
    [],
  );

  const multipleNodeHandlerWrapperStyles = useMemo<MuiSxProps>(
    () =>
      !isMultipleConnectionSources
        ? {}
        : {
            boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14)",
            borderColor: nodeWrapperBorderColor,
            borderStyle: "solid",
            borderWidth: hasMultipleConnectionItems ? 3 : 0,
            borderRadius: "8px",
            borderTop: 0,
            borderTopLeftRadius: hasMultipleConnectionItems ? 0 : "8px",
            borderTopRightRadius: hasMultipleConnectionItems ? 0 : "8px",
            transform: "translateY(-1px)",
          },
    [isMultipleConnectionSources, nodeWrapperBorderColor, hasMultipleConnectionItems],
  );

  // ----------------------------------------------------------------------------------------------------

  return {
    startNodeWrapperStyles,
    commonNodeWrapperStyles,
    commonNodeHandlerStyles,
    multipleNodeHandlerWrapperStyles,
  };
}
