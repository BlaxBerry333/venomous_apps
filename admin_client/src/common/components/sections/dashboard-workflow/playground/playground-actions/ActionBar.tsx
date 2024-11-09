import type { FC } from "react";
import { memo, useState } from "react";

import {
  Background as _Background,
  BackgroundVariant as _BackgroundVariant,
  Panel as _Panel,
} from "@xyflow/react";

import MuiStack from "@mui/material/Stack";

import ActionButtonSwitchGridBackground from "./ActionButtonBackgroundSwitcher";
import ActionButtonHistory from "./ActionButtonHistory";
import ActionButtonMiniMap from "./ActionButtonMiniMap";
import ActionButtonNodeMenu from "./ActionButtonNodeMenuList";
import ActionButtonSave from "./ActionButtonSave";
import ActionButtonUndoRedo from "./ActionButtonUndoRedo";
import ActionButtonZoom from "./ActionButtonZoom";

const WorkflowPlaygroundActionBar: FC = () => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState<
    undefined | _BackgroundVariant
  >(_BackgroundVariant.Dots);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <_Panel
        position="top-left"
        style={{
          width: "-webkit-fill-available",
          margin: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MuiStack spacing={1} sx={{ justifySelf: "flex-start" }}>
          <ActionButtonNodeMenu />
          <ActionButtonSwitchGridBackground
            selectedBackgroundType={selectedBackgroundType}
            changeBackgroundType={(t) => setSelectedBackgroundType(t)}
          />
        </MuiStack>

        <MuiStack spacing={1} sx={{ justifySelf: "flex-end" }}>
          <ActionButtonHistory />
          <ActionButtonSave />
        </MuiStack>
      </_Panel>

      <_Panel position="bottom-left" style={{ width: "-webkit-fill-available", margin: 8 }}>
        <MuiStack spacing={1}>
          <ActionButtonMiniMap />
          <ActionButtonZoom />
          <ActionButtonUndoRedo />
        </MuiStack>
      </_Panel>

      <_Background
        variant={selectedBackgroundType}
        style={{ display: !selectedBackgroundType ? "none" : "block" }}
      />
    </>
  );
};

export default memo(WorkflowPlaygroundActionBar);
