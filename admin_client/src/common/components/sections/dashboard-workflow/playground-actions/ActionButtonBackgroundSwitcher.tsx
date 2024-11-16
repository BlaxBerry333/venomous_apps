import type { FC } from "react";
import { memo, useMemo } from "react";

import { BackgroundVariant } from "@xyflow/react";

import { Icon } from "@iconify/react";

import { CustomSquareBlock } from "~/common/components/custom/buttons";

const ActionButtonBackgroundSwitcher: FC<{
  selectedBackgroundType?: BackgroundVariant;
  changeBackgroundType: (t: undefined | BackgroundVariant) => void;
}> = ({ selectedBackgroundType, changeBackgroundType }) => {
  const isSelected = useMemo<boolean>(
    () => selectedBackgroundType === BackgroundVariant.Dots,
    [selectedBackgroundType],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomSquareBlock
      color={isSelected ? "primary" : "inherit"}
      style={{ height: 40, width: 40 }}
      onClick={() => changeBackgroundType(isSelected ? undefined : BackgroundVariant.Dots)}
    >
      <Icon
        icon={isSelected ? "material-symbols-light:grid-off" : "material-symbols-light:grid-on"}
        width={20}
      />
    </CustomSquareBlock>
  );
};

export default memo(ActionButtonBackgroundSwitcher);
