import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
} from "@mui/material";
import CycleChart from "./CycleChart";
import FAQ from "./FAQ/FAQ";
import Feedback from "./Feedback";
import InputFields from "./InputFields";
import PhasePreview from "./PhasePreview";
import PhaseDescription from "./PhaseDescription";
import SeedCyclingTab from "./SeedCyclingTab";
import useMenstrualCycle from "../hooks/useMenstrualCycle";

const MenstrualCycle = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [cycleLength, setCycleLength] = useState(28);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const {
    currentDayIndex,
    days,
    getPhaseColor,
    labels,
    getCurrentPhase,
    getPregnancyProbability,
    seedRecommendations,
  } = useMenstrualCycle(startDate, cycleLength);

  const currentDay = currentDayIndex !== null ? currentDayIndex + 1 : null;
  const currentPhase = currentDay ? getCurrentPhase(currentDay) : null;

  const tabs = ["Home", "Seed Cycling", "FAQ", "Feedback"];
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isSmallScreen) {
      document.body.style.fontSize = "14px";
    } else {
      document.body.style.fontSize = "16px";
    }

    return () => {
      document.body.style.fontSize = "";
    };
  }, [isSmallScreen]);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Typography variant="h1" align="center" mb={4}>
        Couples Cycle Tracker
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        centered
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons="auto"
        sx={{
          mb: 3,
          ".Mui-selected": {
            color: (theme) => theme.palette.primary.main,
            fontWeight: "bold",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab === "Seed Cycling" ? "Seed Cycling" : tab}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              "&:hover": {
                opacity: 0.8,
              },
            }}
          />
        ))}
      </Tabs>

      <Box width="100%" maxWidth="md">
        {activeTab === 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 3,
                mb: 3,
              }}
            >
              <InputFields
                cycleLength={cycleLength}
                setCycleLength={setCycleLength}
                startDate={startDate}
                setStartDate={setStartDate}
                getCurrentPhase={getCurrentPhase}
              />
              <CycleChart
                days={days}
                currentDayIndex={currentDayIndex}
                getPhaseColor={getPhaseColor}
                labels={labels}
                cycleLength={cycleLength}
                getCurrentPhase={getCurrentPhase}
                seedRecommendations={seedRecommendations}
              />
            </Box>
            <PhasePreview
              currentDayIndex={currentDayIndex}
              getPhaseColor={getPhaseColor}
              getPregnancyProbability={getPregnancyProbability}
              seedRecommendations={seedRecommendations}
              getCurrentPhase={getCurrentPhase}
            />

            <PhaseDescription currentPhase={currentPhase} />
            <Typography
              variant="caption"
              display="block"
              align="center"
              mt={2}
              color="textSecondary"
            >
              Note: The pregnancy probability is an estimation and should not be
              used for medical advice or contraception. Please consult a
              healthcare professional for personalized information.
            </Typography>
          </>
        )}
        {activeTab === 1 && <SeedCyclingTab />}
        {activeTab === 2 && <FAQ />}
        {activeTab === 3 && <Feedback />}
      </Box>
    </Container>
  );
};

export default MenstrualCycle;
