import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import fonts from "./fonts";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: palette.primary.light,
    },
    secondary: {
      main: palette.secondary.light,
    },
    menstrual: {
      main: palette.menstrual.light,
    },
    follicular: {
      main: palette.follicular.light,
    },
    ovulation: {
      main: palette.ovulation.light,
    },
    luteal: {
      main: palette.luteal.light,
    },
    background: {
      default: palette.background.light,
      paper: palette.background.light,
    },
    text: {
      primary: palette.text.light,
      secondary: palette.text.light,
    },
  },
  typography: {
    ...fonts,
  },
});

export default lightTheme;
