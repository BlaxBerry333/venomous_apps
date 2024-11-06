import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";

import MuiCollapse from "@mui/material/Collapse";
import MuiList from "@mui/material/List";

import useBoolean from "~/common/hooks/useBoolean";
import CustomNormalListItem, { type CustomListItemProps } from "./NormalListItem";

type Props = PropsWithChildren<
  CustomListItemProps & {
    defaultIsExpanded?: boolean;
  }
>;

const CollapsibleListItem: FC<Props> = ({
  children,
  MuiListItemButtonProps,
  MuiListItemTextProps,
  defaultIsExpanded = true,
  icon,
}) => {
  const { value: isExpanded, toggle } = useBoolean(defaultIsExpanded);

  return (
    <>
      <CustomNormalListItem
        icon={icon}
        end={
          isExpanded ? (
            <Icon icon="solar:alt-arrow-down-linear" />
          ) : (
            <Icon icon="solar:alt-arrow-right-linear" />
          )
        }
        MuiListItemButtonProps={{
          onClick: toggle,
          ...MuiListItemButtonProps,
        }}
        MuiListItemTextProps={MuiListItemTextProps}
      />

      <MuiCollapse in={isExpanded} timeout="auto" unmountOnExit>
        <MuiList component="ul" disablePadding sx={{ pl: 4 }}>
          {children}
        </MuiList>
      </MuiCollapse>
    </>
  );
};

export default memo(CollapsibleListItem);
