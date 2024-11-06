import type { FC, PropsWithChildren } from "react";
import { createContext, memo, useMemo } from "react";

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
          //   background: {
          //     default: themeMode === "dark" ? "#141A21" : "#F6F6F6",
          //     paper: themeMode === "dark" ? "#1C252E" : "#FFFFFF",
          //   },
        },
        components: { ...overrideMuiComponentsOptions },
        typography: { ...overrideMuiTypographyOptions },
      }),
    [themeMode, themePaletteColorOptions],
  );

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
