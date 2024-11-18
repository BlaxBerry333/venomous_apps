import type { FC } from "react";
import { memo, useCallback } from "react";

import { Icon } from "@iconify/react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiButton from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import useBoolean from "~/common/hooks/_base/useBoolean";
import useWorkflowInstance from "~/common/hooks/use-dashboard-workflow/useWorkflowInstance";

const ActionButtonSave: FC = () => {
  const { getNodes, getEdges } = useWorkflowInstance();

  const nodes = getNodes();
  const edges = getEdges();

  // ----------------------------------------------------------------------------------------------------

  const {
    value: isOpenConfirmDialog,
    setTrue: openConfirmDialog,
    setFalse: closeConfirmDialog,
  } = useBoolean(false);

  const handleSave = useCallback(async () => {
    console.log({ nodes, edges });
  }, [nodes, edges]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock
        color="primary"
        style={{ height: 40, width: 40 }}
        onClick={openConfirmDialog}
      >
        <Icon icon="fa-solid:save" width={20} />
      </CustomSquareBlock>

      <MuiDialog
        open={isOpenConfirmDialog}
        onClose={undefined}
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
      >
        <MuiDialogTitle>{"Are you sure to update flow ?"}</MuiDialogTitle>
        <MuiDialogContent dividers>
          <MuiTypography>Node: {nodes.length}</MuiTypography>
        </MuiDialogContent>
        <MuiDialogActions>
          <MuiButton size="large" color="error" onClick={closeConfirmDialog}>
            {"Cancel"}
          </MuiButton>
          <MuiLoadingButton size="large" onClick={handleSave} loading={false}>
            {"Save"}
          </MuiLoadingButton>
        </MuiDialogActions>
      </MuiDialog>
    </>
  );
};

export default memo(ActionButtonSave);
