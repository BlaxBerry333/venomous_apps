import type { FC } from "react";
import { memo } from "react";

import MuiCard from "@mui/material/Card";
import MuiTypography from "@mui/material/Typography";

import { useWorkflowHelperNodeStyles } from "~/common/hooks/use-dashboard-workflow";
import { type CustomNodeWrapperProps } from "~/common/types/dashboard-workflow";

import CustomNodeWrapperConnectionHandlers from "./CustomNodeWrapperConnectionHandlers";
import CustomNodeWrapperHeader from "./CustomNodeWrapperHeader";

const CustomNodeWrapper: FC<CustomNodeWrapperProps> = ({ children, ...nodeProps }) => {
  const { data, id } = nodeProps;

  // ----------------------------------------------------------------------------------------------------

  const { commonNodeWrapperStyle, commonNodeContentStyle } = useWorkflowHelperNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiCard component="div" sx={commonNodeWrapperStyle}>
      <CustomNodeWrapperHeader {...nodeProps} />

      <MuiTypography component="div" variant="subtitle2" noWrap style={commonNodeContentStyle}>
        {data.form?.value?.title || `#${id}`}
      </MuiTypography>

      {/* TODO: Node Form */}
      <div style={{ display: "none" }}>{children}</div>

      <CustomNodeWrapperConnectionHandlers {...nodeProps} />
    </MuiCard>
  );
};

export default memo(CustomNodeWrapper);
