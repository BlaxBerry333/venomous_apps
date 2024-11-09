import type { FC } from "react";
import { memo } from "react";

import type { CustomEdgeProps } from "~/common/types/dashboard-workflow";
import { CustomEdgeWrapper } from "./_CustomEdgeWrapper";

const CustomDeleteLabelEdge: FC<CustomEdgeProps> = (props) => {
  const edgeProps: CustomEdgeProps = {
    ...props,
    data: {
      ...props.data,
      showDeleteButton: true,
    },
  };

  // ----------------------------------------------------------------------------------------------------

  return <CustomEdgeWrapper {...edgeProps} />;
};

export default memo(CustomDeleteLabelEdge);
