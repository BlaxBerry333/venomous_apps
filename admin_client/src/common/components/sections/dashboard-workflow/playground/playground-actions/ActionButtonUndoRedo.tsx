import type { FC } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";

import MuiCard from "@mui/material/Card";
import MuiStack from "@mui/material/Stack";

import { CustomSquareBlock } from "~/common/components/custom/buttons";

const ActionButtonUndoRedo: FC = () => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard sx={{ py: 0.5, px: 0.5 }}>
      <MuiStack spacing={0}>
        <CustomSquareBlock variant="text" disabled onClick={() => {}}>
          <Icon icon="solar:undo-left-round-bold-duotone" width={20} />
        </CustomSquareBlock>

        <CustomSquareBlock variant="text" disabled onClick={() => {}}>
          <Icon icon="solar:undo-right-round-bold-duotone" width={20} />
        </CustomSquareBlock>

        <CustomSquareBlock variant="text" disabled onClick={() => {}}>
          <Icon icon="solar:history-2-bold-duotone" width={20} />
        </CustomSquareBlock>
      </MuiStack>
    </MuiCard>
  );
};

export default memo(ActionButtonUndoRedo);
