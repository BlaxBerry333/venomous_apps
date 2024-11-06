import type { FC, PropsWithChildren } from "react";
import { memo, useContext, useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";

import { BackToTopAnchor, CustomBackToTop } from "~/common/components/custom/back-to-top";
import { DashboardLayoutContext } from "./context";
import DashboardLayoutFooter from "./DashboardLayoutFooter";
import DashboardLayoutNavMenu from "./DashboardLayoutNavMenu";

const DashboardLayoutContentContainer: FC<PropsWithChildren> = ({ children }) => {
  const layoutContextValue = useContext(DashboardLayoutContext);

  // ----------------------------------------------------------------------------------------------------

  const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>(undefined);

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiContainer
      component="main"
      maxWidth={layoutContextValue?.largeScreenLimit}
      style={{ padding: 0 }}
      sx={{ display: "flex" }}
    >
      <MuiBox
        component="aside"
        sx={{
          display: layoutContextValue?.isSmallScreen ? "none" : "block",
          width: 240,
          height: `calc(100svh - 64px)`,
          overflowY: "scroll",
          pr: 1,
        }}
      >
        <DashboardLayoutNavMenu />
      </MuiBox>

      <MuiBox
        component="section"
        sx={{
          flex: 1,
          height: `calc(100svh - 64px)`,
          overflowY: "scroll",
          position: "relative",
          py: 1,
          px: 1,
        }}
        ref={(node: Node) => {
          if (node) setScrollTarget(node);
        }}
      >
        <div id={BackToTopAnchor} />
        {children}
        <DashboardLayoutFooter />
        <CustomBackToTop scrollTarget={scrollTarget} />
      </MuiBox>
    </MuiContainer>
  );
};

export default memo(DashboardLayoutContentContainer);
