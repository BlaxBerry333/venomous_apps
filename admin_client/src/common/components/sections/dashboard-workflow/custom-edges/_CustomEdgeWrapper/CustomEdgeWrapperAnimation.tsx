import type { FC } from "react";
import { memo } from "react";

import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import type { CustomEdgeProps } from "~/common/types/dashboard-workflow";

const CustomEdgeWrapperAnimation: FC<{
  edgeProps: CustomEdgeProps;
  edgePath: string;
}> = ({ edgePath, edgeProps }) => {
  const animationDuration: string = `${edgeProps.data?.animationDuration ?? 1}s`;

  // ----------------------------------------------------------------------------------------------------

  const customThemeContextValue = useCustomThemesContextValue();
  const themePrimaryColor = customThemeContextValue?.themePrimaryColor;

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <circle r={4} fill={themePrimaryColor?.main}>
        <animateMotion dur={animationDuration} repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
};

export default memo(CustomEdgeWrapperAnimation);
