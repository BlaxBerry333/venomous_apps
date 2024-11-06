import type { PaletteColor as MuiPaletteColor } from "@mui/material/styles";
import { darken, lighten } from "@mui/material/styles";

export enum CustomThemePaletteColorName {
  Teal = "Teal",
  Indigo = "Indigo",
  SkyBlue = "SkyBlue",
  Amber = "Amber",
  Purple = "Purple",
  Pink = "Pink",
}

export type CustomThemePaletteColorOptionType = {
  name: CustomThemePaletteColorName;
  palette: {
    primary: MuiPaletteColor;
  };
};

export const CustomThemePaletteColorOptions: Array<CustomThemePaletteColorOptionType> = [
  {
    name: CustomThemePaletteColorName.Teal,
    palette: {
      primary: {
        main: "#00796b",
        light: lighten("#00796b", 0.3),
        dark: darken("#00796b", 0.2),
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.Indigo,
    palette: {
      primary: {
        main: "#3949ab",
        light: lighten("#3949ab", 0.3),
        dark: "#1c287d",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.SkyBlue,
    palette: {
      primary: {
        main: "#0097a7",
        light: "#4fb3bf",
        dark: "#006978",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.Amber,
    palette: {
      primary: {
        main: "#ff9800",
        light: lighten("#ff9800", 0.2),
        dark: "#f57c00",
        contrastText: "#FFFFFF",
      },
    },
  },
  {
    name: CustomThemePaletteColorName.Purple,
    palette: {
      primary: {
        main: "#8e24aa",
        light: "#ae52d4",
        dark: "#5e1e8d",
        contrastText: "#FFFFFF",
      },
    },
  },
  // {
  //   name: CustomThemePaletteColorName.Pink,
  //   palette: {
  //     primary: {
  //       main: "#d81b60",
  //       light: "#ff4081",
  //       dark: "#b40044",
  //       contrastText: "#FFFFFF",
  //     },
  //   },
  // },
];
