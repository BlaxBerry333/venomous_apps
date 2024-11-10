import { useEffect, useRef } from "react";

import { type ReactFlowState, useStore } from "@xyflow/react";

import useCustomThemesContextValue from "~/common/hooks/use-dashboard/useCustomThemesContextValue";
import { ADMIN_CLIENT_CONFIGS, DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

type Props = {
  showHelperLines: boolean;
  horizontal?: number;
  vertical?: number;
};

function HelperLinesRenderer({
  showHelperLines = ADMIN_CLIENT_CONFIGS.info.envName === "development",
  horizontal,
  vertical,
}: Props) {
  const { width, height, transform } = useStore((state: ReactFlowState) => ({
    width: state.width,
    height: state.height,
    transform: state.transform,
  }));

  const customThemesContextValue = useCustomThemesContextValue();
  const themePrimaryColor = customThemesContextValue?.themePrimaryColor;
  const helperLinesColor = themePrimaryColor?.main || DASHBOARD_WORKFLOW_CONFIGS.CommonColors.error;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) {
      return;
    }

    const dpi = window.devicePixelRatio;
    canvas.width = width * dpi;
    canvas.height = height * dpi;

    ctx.scale(dpi, dpi);
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = helperLinesColor;

    if (typeof vertical === "number") {
      ctx.moveTo(vertical * transform[2] + transform[0], 0);
      ctx.lineTo(vertical * transform[2] + transform[0], height);
      ctx.stroke();
    }

    if (typeof horizontal === "number") {
      ctx.moveTo(0, horizontal * transform[2] + transform[1]);
      ctx.lineTo(width, horizontal * transform[2] + transform[1]);
      ctx.stroke();
    }
  }, [width, height, transform, horizontal, vertical, helperLinesColor]);

  if (!showHelperLines) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}

export default HelperLinesRenderer;
