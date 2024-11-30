import PropTypes from "prop-types";

const PhasePreview = ({
  currentDayIndex,
  getPhaseColor,
  getPregnancyProbability,
  getCurrentPhase,
  seedRecommendations,
}) => {
  if (currentDayIndex === null) return null;

  const currentDay = currentDayIndex + 1;
  const colors = getPhaseColor(currentDay, true);
  const probability = getPregnancyProbability(currentDay);
  const currentPhase = getCurrentPhase(currentDay);
  const seeds = seedRecommendations[currentPhase];

  return (
    <div className="mb-4 flex flex-col items-start space-y-2">
      <div className="flex items-center space-x-2">
        <div
          className="h-4 w-4 rounded-full border border-gray-300"
          style={{ backgroundColor: colors.bg }}
        />
        <span className="text-white text-sm">Day {currentDay}</span>
      </div>
      <div className="text-white text-sm">
        Fertility Probability: <strong>{probability}</strong>{" "}
        {seeds && seeds.length > 0 && seeds.join("")}
      </div>
    </div>
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
