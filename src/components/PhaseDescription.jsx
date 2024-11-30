import PropTypes from "prop-types";

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
  if (!currentPhase || !phaseDescriptions[currentPhase]) return null;

  const { title, hormonalChanges, psychologicalEffects, seedRecommendations } =
    phaseDescriptions[currentPhase];

  return (
    <div className="text-white mt-6">
      <h2 className="text-2xl font-bold mb-4 font-playfair">{title}</h2>
      <p className="mb-3 text-base font-open-sans">
        <strong>Hormonal Changes:</strong> {hormonalChanges}
      </p>
      <p className="mb-2 text-lg font-semibold font-open-sans">
        Psychological Effects:
      </p>
      <ul className="list-disc list-inside mb-4 text-base font-open-sans">
        {psychologicalEffects.map((effect, index) => (
          <li key={index} className="mb-1">
            {effect}
          </li>
        ))}
      </ul>
      {seedRecommendations && seedRecommendations.length > 0 && (
        <>
          <p className="mb-2 text-lg font-semibold font-open-sans">
            Seed Recommendations:
          </p>
          <ul className="list-disc list-inside text-base font-open-sans">
            {seedRecommendations.map((seed, index) => (
              <li key={index} className="mb-1">
                {seed}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

PhaseDescription.propTypes = {
  currentPhase: PropTypes.string.isRequired,
};

export default PhaseDescription;
