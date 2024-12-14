// src/darkTheme.js
import { createTheme } from "@mui/material/styles";
import palette from "../palette";
import fonts from "../fonts";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: palette.primary.dark,
    },
    secondary: {
      main: palette.secondary.dark,
    },
    menstrual: {
      main: palette.menstrual.dark,
    },
    follicular: {
      main: palette.follicular.dark,
    },
    ovulation: {
      main: palette.ovulation.dark,
    },
    luteal: {
      main: palette.luteal.dark,
    },
    background: {
      default: palette.background.dark,
      paper: palette.background.dark,
    },
    text: {
      primary: palette.text.dark,
      secondary: palette.text.dark,
    },
  },
  typography: {
    ...fonts,
  },
});

export default darkTheme;
