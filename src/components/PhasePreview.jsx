import React from "react";

const PhasePreview = ({ currentDayIndex, getPhaseColor }) => {
  if (currentDayIndex === null) return null;

  const currentDay = currentDayIndex + 1;
  const colors = getPhaseColor(currentDay, true);

  return (
    <div className="mb-4 flex items-center space-x-2">
      <div
        className="h-4 w-4 rounded-full border border-gray-300"
        style={{ backgroundColor: colors.bg }}
      />
      <span className="text-white text-sm">Day {currentDay}</span>
    </div>
  );
};

export default PhasePreview;
