import { useState } from "react";
import InputFields from "./InputFields";
import PhasePreview from "./PhasePreview";
import CycleChart from "./CycleChart";
import PhaseDescription from "./PhaseDescription";
import useMenstrualCycle from "../hooks/useMenstrualCycle";

const MenstrualCycle = () => {
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
  } = useMenstrualCycle(startDate, cycleLength);

  const currentDay = currentDayIndex !== null ? currentDayIndex + 1 : null;
  const currentPhase = currentDay ? getCurrentPhase(currentDay) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2e2e2e] p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#2f7059]">
          Couples Cycle Tracker
        </h1>

        <InputFields
          cycleLength={cycleLength}
          setCycleLength={setCycleLength}
          startDate={startDate}
          setStartDate={setStartDate}
        />

        <PhasePreview
          currentDayIndex={currentDayIndex}
          getPhaseColor={getPhaseColor}
          getPregnancyProbability={getPregnancyProbability}
        />

        <PhaseDescription currentPhase={currentPhase} />

        <CycleChart
          days={days}
          currentDayIndex={currentDayIndex}
          getPhaseColor={getPhaseColor}
          labels={labels}
          cycleLength={cycleLength}
        />

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Note: The pregnancy probability is an estimation and should not be
          used for medical advice or contraception. Please consult a healthcare
          professional for personalized information.
        </p>
      </div>
    </div>
  );
};

export default MenstrualCycle;
