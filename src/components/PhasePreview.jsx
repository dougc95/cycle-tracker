import PropTypes from "prop-types";

const PhasePreview = ({
  currentDayIndex,
  getPhaseColor,
  getPregnancyProbability,
}) => {
  if (currentDayIndex === null) return null;

  const currentDay = currentDayIndex + 1;
  const colors = getPhaseColor(currentDay, true);
  const probability = getPregnancyProbability(currentDay);

  return (
    <div className="mb-4 flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div
          className="h-4 w-4 rounded-full border border-gray-300"
          style={{ backgroundColor: colors.bg }}
        />
        <span className="text-white text-sm">Day {currentDay}</span>
      </div>
      <div>
        <span className="text-white text-sm">
          Pregnancy Probability: <strong>{probability}</strong>
        </span>
      </div>
    </div>
  );
};

PhasePreview.propTypes = {
  currentDayIndex: PropTypes.number,
  getPhaseColor: PropTypes.func.isRequired,
  getPregnancyProbability: PropTypes.func.isRequired,
};

export default PhasePreview;
