import type { FC } from "react";
import { memo } from "react";

import MuiCard from "@mui/material/Card";
import MuiPaper from "@mui/material/Paper";
import MuiTypography from "@mui/material/Typography";

import { useWorkflowNodeStyles } from "~/common/hooks/use-dashboard-workflow";
import { type CustomNodeWrapperProps } from "~/common/types/dashboard-workflow";

import CustomNodeWrapperConnectionHandlers from "./CustomNodeWrapperConnectionHandlers";
import CustomNodeWrapperHeader from "./CustomNodeWrapperHeader";

const CustomNodeWrapper: FC<CustomNodeWrapperProps> = ({ children, ...nodeProps }) => {
  const { data, id } = nodeProps;

  // ----------------------------------------------------------------------------------------------------

  const { commonNodeWrapperStyles, multipleNodeHandlerWrapperStyles } =
    useWorkflowNodeStyles(nodeProps);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <MuiCard component="div" sx={commonNodeWrapperStyles}>
        <CustomNodeWrapperHeader {...nodeProps} />

        <MuiTypography component="div" variant="subtitle2" noWrap>
          {data.form?.value?.title || `#${id}`}
        </MuiTypography>

        {children}

        <CustomNodeWrapperConnectionHandlers.Source {...nodeProps} />
        <CustomNodeWrapperConnectionHandlers.Target {...nodeProps} />
      </MuiCard>

      <MuiPaper sx={multipleNodeHandlerWrapperStyles}>
        <CustomNodeWrapperConnectionHandlers.MultipleSource {...nodeProps} />
      </MuiPaper>
    </>
  );
};

export default memo(CustomNodeWrapper);
