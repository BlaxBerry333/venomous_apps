import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";

import { CustomNodeWrapper } from "~/common/components/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";
import useWorkflowCustomNodeDataUpdate from "~/common/hooks/use-dashboard-workflow/useWorkflowCustomNodeDataUpdate";
import {
  CustomNodeTypeName,
  type CustomNodeDataType,
  type CustomNodeProps,
} from "~/common/types/dashboard-workflow";

const CustomConditionNode: FC<CustomNodeProps> = (nodeProps) => {
  const { id, data } = nodeProps;

  const { updateNodeFormData } = useWorkflowCustomNodeDataUpdate();

  const multipleConnectionItems = useMemo<CustomNodeDataType["multipleConnectionItems"]>(
    () =>
      data.form?.value?.items?.map((item, index) => ({
        id: item.id,
        text: item.title,
        index,
      })),
    [data.form?.value.items],
  );

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
    updateNodeFormData(id, MOCK_FORM_DATA);
  }, [updateNodeFormData, id]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper
      {...nodeProps}
      type={CustomNodeTypeName.condition}
      data={{
        ...nodeProps.data,
        isMultipleConnectionSources: true,
        multipleConnectionItems,
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
