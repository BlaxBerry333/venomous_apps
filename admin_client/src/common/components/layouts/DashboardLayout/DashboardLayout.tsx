import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import useBoolean from "~/common/hooks/useBoolean";
import { DashboardLayoutContext } from "./context";
import DashboardLayoutContentContainer from "./DashboardLayoutContentContainer";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import DashboardLayoutSettingDrawer from "./DashboardLayoutSettingDrawer";
import DashboardLayoutSmallScreenNavDrawer from "./DashboardLayoutSmallScreenNavDrawer";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const muiTheme = useTheme();

  // ----------------------------------------------------------------------------------------------------

  const isSmallScreen: boolean = useMediaQuery(muiTheme.breakpoints.down("md"));
  const smallScreenNavDrawer = useBoolean(true);
  const settingDrawer = useBoolean(false);

  // ----------------------------------------------------------------------------------------------------

  return (
    <DashboardLayoutContext.Provider
      value={{
        largeScreenLimit: "xl",
        isSmallScreen,
        isOpenSmallScreenNavDrawer: smallScreenNavDrawer.value,
        toggleSmallScreenNavDrawer: smallScreenNavDrawer.toggle,
        closeSmallScreenNavDrawer: smallScreenNavDrawer.setFalse,
        isOpenSettingDrawer: settingDrawer.value,
        toggleSettingDrawer: settingDrawer.toggle,
        closeSettingDrawer: settingDrawer.setFalse,
      }}
    >
      <DashboardLayoutHeader />

      <DashboardLayoutContentContainer>{children}</DashboardLayoutContentContainer>

      <DashboardLayoutSmallScreenNavDrawer />

      <DashboardLayoutSettingDrawer />
    </DashboardLayoutContext.Provider>
  );
};

export default memo(DashboardLayout);
