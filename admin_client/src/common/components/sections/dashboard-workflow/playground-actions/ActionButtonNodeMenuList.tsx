import type { FC } from "react";
import { memo, useState } from "react";

import { Icon } from "@iconify/react";

import MuiMenu from "@mui/material/Menu";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { CustomCollapsibleList, CustomDraggableListItem } from "~/common/components/custom/list";
import { useWorkflowEventsDragDrop } from "~/common/hooks/use-dashboard-workflow";
import type { Keyof } from "~/common/types/common-tools";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

const ActionButtonNodeMenuList: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenNodeMenuList = Boolean(anchorEl);
  const openNodeMenuList = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const closeNodeMenuList = () => setAnchorEl(null);

  // ----------------------------------------------------------------------------------------------------

  const { handleOnDragStart } = useWorkflowEventsDragDrop();

  const nodeMenuList = Object.entries(DASHBOARD_WORKFLOW_CONFIGS.NodeTypeGroup).map(
    ([groupName, nodeTypes]) => ({
      groupName,
      groupColor:
        DASHBOARD_WORKFLOW_CONFIGS.CommonColors[
          groupName as Keyof<typeof DASHBOARD_WORKFLOW_CONFIGS.CommonColors>
        ],
      nodeTypes: nodeTypes.map((nodeType) => ({
        type: nodeType,
      })),
    }),
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock
        color="primary"
        style={{ height: 40, width: 40 }}
        onClick={openNodeMenuList}
      >
        <Icon icon="solar:add-circle-linear" width={20} />
      </CustomSquareBlock>

      <MuiMenu
        anchorEl={anchorEl}
        open={isOpenNodeMenuList}
        onClose={closeNodeMenuList}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              height: 500,
              borderRadius: 2,
              mt: 1,
              px: 1,
            },
          },
        }}
      >
        {nodeMenuList.map((group) => (
          <CustomCollapsibleList key={group.groupName} expandedTitle={group.groupName}>
            {group.nodeTypes.map((node) => (
              <CustomDraggableListItem
                key={node.type}
                MuiListItemTextProps={{ primary: node.type }}
                MuiListItemButtonProps={{
                  sx: { boxShadow: 2, pl: 1 },
                  onDragStart: (e) => handleOnDragStart(e, node),
                }}
                icon={
                  <Icon
                    icon="svg-spinners:blocks-scale"
                    color={group.groupColor}
                    width={24}
                    style={{ marginRight: 8 }}
                  />
                }
              />
            ))}
          </CustomCollapsibleList>
        ))}
      </MuiMenu>
    </>
  );
};

export default memo(ActionButtonNodeMenuList);
