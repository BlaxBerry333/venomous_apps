import type { FC } from "react";
import { memo, useMemo } from "react";

import MuiButton from "@mui/material/Button";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiPaper from "@mui/material/Paper";
import MuiTypography from "@mui/material/Typography";

import useBoolean from "~/common/hooks/_base/useBoolean";
import { useWorkflowUndoRedo } from "~/common/hooks/use-dashboard-workflow";
import { ADMIN_CLIENT_CONFIGS } from "~/configs";

const CustomUndoRedoDevtool: FC<{ showDevtool: boolean }> = ({
  showDevtool = ADMIN_CLIENT_CONFIGS.info.envName === "development",
}) => {
  const devtool = useBoolean(false);

  const { futureStates, pastStates, currentState } = useWorkflowUndoRedo();

  const stateList = useMemo(
    () => [
      { title: "Past State", content: pastStates },
      { title: "Future State", content: futureStates },
    ],
    [futureStates, pastStates],
  );

  // ----------------------------------------------------------------------------------------------------

  if (!showDevtool) {
    return null;
  }

  return (
    <>
      <MuiButton
        size="small"
        onClick={devtool.toggle}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 100,
          height: 16,
          width: 16,
          minWidth: 16,
          p: 0,
        }}
      />

      <MuiPaper
        sx={{
          display: devtool.value ? "block" : "none",
          position: "fixed",
          bottom: 40,
          right: 16,
          zIndex: 100,
          width: 320,
          maxHeight: 640,
          overflowY: "scroll",
          typography: "caption",
        }}
      >
        {stateList.map((item) => (
          <MuiAccordion key={item.title}>
            <MuiAccordionSummary sx={{ display: "flex", justifyContent: "space-between" }}>
              <MuiTypography variant="subtitle2" sx={{ flex: 1 }}>
                {item.title}
              </MuiTypography>
              <MuiTypography variant="subtitle2">{item.content.length}</MuiTypography>
            </MuiAccordionSummary>

            <MuiAccordionDetails sx={{ overflowY: "scroll" }}>
              <MuiTypography variant="caption">{JSON.stringify(item.content)}</MuiTypography>
            </MuiAccordionDetails>
          </MuiAccordion>
        ))}

        <MuiAccordion expanded>
          <MuiAccordionSummary
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <MuiTypography variant="subtitle2" sx={{ flex: 1 }}>
              {"ActionEvent:"}
            </MuiTypography>
            <MuiTypography variant="caption" color="primary">
              {currentState.state.actionEventName}
            </MuiTypography>
          </MuiAccordionSummary>
        </MuiAccordion>

        <MuiAccordion>
          <MuiAccordionSummary sx={{ typography: "subtitle2" }}>
            {"Current Nodes & Edges"}
          </MuiAccordionSummary>
          <MuiAccordionDetails sx={{ overflowY: "scroll" }}>
            <MuiTypography variant="caption">{JSON.stringify(currentState)}</MuiTypography>
          </MuiAccordionDetails>
        </MuiAccordion>
      </MuiPaper>
    </>
  );
};

export default memo(CustomUndoRedoDevtool);
