import type { FC, PropsWithChildren } from "react";
import { memo, useCallback } from "react";

import { Icon } from "@iconify/react";

import MuiCollapse from "@mui/material/Collapse";
import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";
import MuiListSubheader from "@mui/material/ListSubheader";
import MuiTypography from "@mui/material/Typography";

import useBoolean from "~/common/hooks/_base/useBoolean";

type Props = PropsWithChildren<{
  MuiListProps?: MuiListProps;
  expandedTitle: string;
  defaultIsExpanded?: boolean;
}>;

const CustomCollapsibleList: FC<Props> = ({
  children,
  MuiListProps,
  expandedTitle,
  defaultIsExpanded = true,
}) => {
  const { value: isExpanded, toggle } = useBoolean(defaultIsExpanded);

  const {
    value: isShowExpandedTitle,
    setTrue: showExpandedTitle,
    setFalse: hideExpandedTitle,
  } = useBoolean(false);

  const delay = useCallback(async (func: () => void) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    func();
  }, []);

  return (
    <MuiList
      disablePadding
      sx={{ width: "100%", mb: 1 }}
      subheader={
        <MuiListSubheader
          onClick={toggle}
          onMouseEnter={() => delay(showExpandedTitle)}
          onMouseLeave={() => delay(hideExpandedTitle)}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            py: 1,
            px: 0,
          }}
        >
          <Icon
            icon={
              isExpanded
                ? "solar:alt-arrow-down-bold-duotone"
                : "solar:alt-arrow-right-bold-duotone"
            }
            style={{
              transform: `scale(${isExpanded || isShowExpandedTitle ? 1 : 0})`,
              animation: "transform 0.5s",
            }}
          />
          <MuiTypography variant="subtitle2" color="textDisabled" sx={{ ml: 0.5 }}>
            {expandedTitle}
          </MuiTypography>
        </MuiListSubheader>
      }
      {...MuiListProps}
    >
      <MuiCollapse in={isExpanded} timeout="auto" unmountOnExit>
        {children}
      </MuiCollapse>
    </MuiList>
  );
};

export default memo(CustomCollapsibleList);
