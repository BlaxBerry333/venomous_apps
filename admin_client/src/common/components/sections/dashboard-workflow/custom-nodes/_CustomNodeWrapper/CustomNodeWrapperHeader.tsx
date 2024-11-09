import type { FC } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomNodeWrapperHeader: FC<CustomNodeProps> = (nodeProps) => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiBox
      sx={{
        width: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1.5,
      }}
    >
      <MuiTypography
        variant="caption"
        noWrap
        color="textDisabled"
        sx={{ flex: 1, fontWeight: 600 }}
      >
        {nodeProps.type}
      </MuiTypography>
    </MuiBox>
  );
};

export default memo(CustomNodeWrapperHeader);
