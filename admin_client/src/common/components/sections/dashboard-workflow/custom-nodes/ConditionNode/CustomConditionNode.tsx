import type { FC } from "react";
import { memo, useCallback } from "react";

import { CustomNodeWrapper } from "~/common/components/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";
import useWorkflowCustomNodeDataUpdate from "~/common/hooks/use-dashboard-workflow/useWorkflowCustomNodeDataUpdate";
import { CustomNodeTypeName, type CustomNodeProps } from "~/common/types/dashboard-workflow";

const CustomConditionNode: FC<CustomNodeProps> = (nodeProps) => {
  const { updateNodeFormData } = useWorkflowCustomNodeDataUpdate();

  // ----------------------------------------------------------------------------------------------------

  const handleOnFormSubmit = useCallback(() => {
    const MOCK_FORM_DATA = {
      isValid: true,
      value: {
        title: "条件x",
        items: [
          { id: 111, title: "xxx-1" },
          { id: 112, title: "xxx-2" },
        ],
      },
    };
    updateNodeFormData(nodeProps.id, MOCK_FORM_DATA);
  }, [updateNodeFormData, nodeProps.id]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper
      {...nodeProps}
      type={CustomNodeTypeName.condition}
      data={{
        ...nodeProps.data,
        isMultipleConnectionSources: true,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnFormSubmit();
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </CustomNodeWrapper>
  );
};

export default memo(CustomConditionNode);
