/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Typography, List, ListItem, Box, useTheme } from "@mui/material";

const phaseDescriptions = {
  Menstrual: {
    title: "Menstrual Phase",
    hormonalChanges: "Low levels of estrogen and progesterone.",
    psychologicalEffects: [
      "Low Mood and Irritability: The drop in hormone levels can lead to feelings of sadness, irritability, or moodiness.",
      "Fatigue and Withdrawal: Many women feel tired and may prefer to withdraw from social activities, seeking solitude or rest.",
      "Relief from PMS: Some may experience a sense of relief as premenstrual symptoms diminish with the onset of menstruation.",
      "Reflection and Introspection: This phase can bring about a period of self-reflection and emotional processing.",
    ],
    seedRecommendations: [], // No seeds during Menstrual phase
  },
  Follicular: {
    title: "Follicular Phase",
    hormonalChanges: "Rising estrogen levels.",
    psychologicalEffects: [
      "Improved Mood and Optimism: Increasing estrogen enhances neurotransmitters like serotonin, leading to feelings of happiness, confidence, and well-being.",
      "Increased Energy and Motivation: Higher energy levels make it a great time for starting new projects or engaging in physical activities.",
      "Enhanced Cognitive Function: Better focus, memory, and creativity may be noticed.",
      "Social Engagement: A heightened desire for social interaction, networking, and collaboration.",
      "Bravery and Adventurousness: Women may feel more open to taking risks or trying new experiences.",
    ],
    seedRecommendations: ["Flaxseeds (🌾)", "Pumpkin Seeds (🎃)"],
  },
  Ovulation: {
    title: "Ovulation Phase",
    hormonalChanges:
      "Peak levels of estrogen and a surge in luteinizing hormone (LH).",
    psychologicalEffects: [
      "Increased Libido: A natural boost in sexual desire occurs as the body is most fertile.",
      "Heightened Sensuality and Attractiveness: Women may feel more confident in their appearance and sexuality.",
      "Extroversion and Communication: Greater ease in expressing thoughts and feelings, making it an ideal time for important conversations or presentations.",
      "Emotional Sensitivity: Enhanced ability to read social cues and empathize with others.",
      "Creativity and Problem-Solving: Peak cognitive abilities can lead to innovative thinking.",
    ],
    seedRecommendations: ["Flaxseeds (🌾)", "Pumpkin Seeds (🎃)"],
  },
  Luteal: {
    title: "Luteal Phase",
    hormonalChanges:
      "Progesterone rises after ovulation and then declines if pregnancy does not occur.",
    psychologicalEffects: [
      "Premenstrual Syndrome (PMS):",
      "Mood Swings: Sudden changes in mood, including feelings of irritability, sadness, or anger.",
      "Anxiety and Tension: Increased feelings of stress or anxiety without a clear cause.",
      "Depression and Low Self-Esteem: Some may experience negative thoughts or feelings of worthlessness.",
      "Reduced Concentration: Difficulty focusing, forgetfulness, or mental fog.",
      "Desire for Comfort and Routine: A preference for familiar environments and activities, seeking comfort foods or cozy settings.",
      "Sensitivity to Stress: Everyday stressors may feel more overwhelming during this phase.",
      "Physical Discomfort Influencing Mood: Symptoms like bloating, breast tenderness, or headaches can contribute to irritability or low mood.",
    ],
    seedRecommendations: ["Sesame Seeds (🌿)", "Sunflower Seeds (🌻)"],
  },
};

const PhaseDescription = ({ currentPhase }) => {
  const theme = useTheme();
  if (!currentPhase || !phaseDescriptions[currentPhase]) return null;

  const { title, hormonalChanges, psychologicalEffects, seedRecommendations } =
    phaseDescriptions[currentPhase];

  return (
    <Box mt={3}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Hormonal Changes:</strong> {hormonalChanges}
      </Typography>
      <Typography variant="h3" gutterBottom>
        Psychological Effects:
      </Typography>
      <List>
        {psychologicalEffects.map((effect, index) => (
          <ListItem key={index} sx={{ display: "list-item" }}>
            <Typography variant="body1">{effect}</Typography>
          </ListItem>
        ))}
      </List>
      {seedRecommendations && seedRecommendations.length > 0 && (
        <>
          <Typography variant="h3" gutterBottom>
            Seed Recommendations:
          </Typography>
          <List>
            {seedRecommendations.map((seed, index) => (
              <ListItem key={index} sx={{ display: "list-item" }}>
                <Typography variant="body1">{seed}</Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

PhaseDescription.propTypes = {
  currentPhase: PropTypes.string,
};

export default PhaseDescription;
