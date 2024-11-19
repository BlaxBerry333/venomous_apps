import { useHotkeys } from "react-hotkeys-hook";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";
import useWorkflowCustomCopyPasteDelete from "./useWorkflowCustomCopyPasteDelete";
import useWorkflowUndoRedo from "./useWorkflowUndoRedo";

export default function useWorkflowCustomHotkeys() {
  const { copySelectedNodes, pasteStoredNodes, deleteSelectedElements } =
    useWorkflowCustomCopyPasteDelete();

  const { canUndo, canRedo, undo, redo } = useWorkflowUndoRedo();

  // ----------------------------------------------------------------------------------------------------

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.CopyNode,
    () => copySelectedNodes(),
    { enabled: true, preventDefault: true },
    [copySelectedNodes],
  );

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.PasteNode,
    () => pasteStoredNodes(),
    { enabled: true, preventDefault: true },
    [pasteStoredNodes],
  );

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.DeleteElements,
    () => deleteSelectedElements(),
    { enabled: true, preventDefault: true },
    [deleteSelectedElements],
  );

  // ----------------------------------------------------------------------------------------------------

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.Undo,
    () => {
      if (canUndo) undo();
    },
    { enabled: canUndo, preventDefault: true },
    [undo, canUndo],
  );

  useHotkeys(
    DASHBOARD_WORKFLOW_CONFIGS.CanvasHotkeys.Redo,
    () => {
      if (canRedo) redo();
    },
    { enabled: canRedo, preventDefault: true },
    [redo, canRedo],
  );
}
