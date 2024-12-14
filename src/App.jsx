import { useState } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MenstrualCycle from "./components/MenstrualCycle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import lightTheme from "./styles/theme/lightTheme";
import darkTheme from "./styles/theme/darkTheme";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const appliedTheme = createTheme(mode === "dark" ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="theme mode"
        sx={{
          mb: 2, // Add margin bottom for spacing
          display: "flex",
          justifyContent: "center", // Center the button group
        }}
      >
        <ToggleButton value="light" aria-label="light mode">
          Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark mode">
          Dark
        </ToggleButton>
      </ToggleButtonGroup>
      <MenstrualCycle />
    </ThemeProvider>
  );
}

export default App;
