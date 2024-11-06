import type { FC, PropsWithChildren } from "react";
import { createContext, memo, useEffect, useMemo } from "react";

import MuiCssBaseline from "@mui/material/CssBaseline";
import {
  createTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  type Theme as MuiTheme,
} from "@mui/material/styles";

import useCustomThemes from "~/common/hooks/useCustomThemes";
import {
  overrideMuiComponentsOptions,
  overrideMuiTypographyOptions,
} from "~/common/modules/mui/override-themes";

type CustomThemeContextValueType = Pick<
  ReturnType<typeof useCustomThemes>,
  | "themeMode"
  | "toggleThemeMode"
  | "themePaletteColorOptions"
  | "changeThemePaletteColor"
  | "isThemeValuesChanged"
  | "resetThemeValues"
>;

export const CustomThemeContext = createContext<null | CustomThemeContextValueType>(null);

const CustomMuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    themeMode,
    themePaletteColorOptions,
    toggleThemeMode,
    changeThemePaletteColor,
    isThemeValuesChanged,
    resetThemeValues,
  } = useCustomThemes();

  // ----------------------------------------------------------------------------------------------------

  const theme = useMemo<MuiTheme>(
    () =>
      createMuiTheme({
        palette: {
          mode: themeMode,
          primary: themePaletteColorOptions.palette.primary,
        },
        components: { ...overrideMuiComponentsOptions },
        typography: { ...overrideMuiTypographyOptions },
      }),
    [themeMode, themePaletteColorOptions],
  );

  // ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    const mainThemePaletteColor = themePaletteColorOptions.palette.primary.main;
    const style = document.createElement("style");
    style.innerHTML = `
      ::selection {
        background-color: ${mainThemePaletteColor};  /* 设置选中文本的背景色 */
        color: white;                                /* 设置选中文本的文字颜色 */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [themePaletteColorOptions]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomThemeContext.Provider
      value={{
        themeMode,
        toggleThemeMode,
        themePaletteColorOptions,
        changeThemePaletteColor,
        isThemeValuesChanged,
        resetThemeValues,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <MuiCssBaseline />
        {children}
      </MuiThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default memo(CustomMuiThemeProvider);
