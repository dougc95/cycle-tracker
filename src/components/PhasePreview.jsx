import PropTypes from "prop-types";
import { Box, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PhasePreview = ({
  currentDayIndex,
  getPhaseColor,
  getPregnancyProbability,
  getCurrentPhase,
  seedRecommendations,
}) => {
  const theme = useTheme();

  if (currentDayIndex === null) return null;

  const currentDay = currentDayIndex + 1;
  const currentPhase = getCurrentPhase(currentDay);
  const { bg } = getPhaseColor(currentDay, true); // Assuming this returns an object with 'bg'
  const probability = getPregnancyProbability(currentDay);
  const seeds = seedRecommendations[currentPhase];

  // Function to determine the color based on phase
  const getChipColor = (phase) => {
    switch (phase) {
      case "Menstrual":
        return theme.palette.menstrual.main;
      case "Follicular":
        return theme.palette.follicular.main;
      case "Ovulation":
        return theme.palette.ovulation.main;
      case "Luteal":
        return theme.palette.luteal.main;
      default:
        return theme.palette.grey[500];
    }
  };
  return (
    <Box mb={2}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <div
          style={{
            backgroundColor: bg,
            height: "16px",
            width: "16px",
            borderRadius: "50%",
            border: "1px solid grey",
          }}
        />
        <Typography>Day {currentDay}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
        <Typography>
          Fertility Probability: <strong>{probability}</strong>
        </Typography>
        {seeds && seeds.length > 0 && (
          <div style={{ display: "flex", gap: "4px" }}>
            {seeds.map((seed, index) => (
              <Chip
                key={index}
                label={seed}
                size="small"
                style={{
                  backgroundColor: getChipColor(currentPhase),
                  color: theme.palette.getContrastText(
                    getChipColor(currentPhase)
                  ),
                }}
              />
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

PhasePreview.propTypes = {
  currentDayIndex: PropTypes.number,
  getPhaseColor: PropTypes.func.isRequired,
  getPregnancyProbability: PropTypes.func.isRequired,
  getCurrentPhase: PropTypes.func.isRequired,
  seedRecommendations: PropTypes.object.isRequired,
};

export default PhasePreview;
