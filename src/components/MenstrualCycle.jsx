import { useState } from "react";
import CycleChart from "./CycleChart";
import FAQ from "./FAQ/FAQ";
import Feedback from "./Feedback";
import InputFields from "./InputFields";
import PhasePreview from "./PhasePreview";
import PhaseDescription from "./PhaseDescription";
import SeedCyclingTab from "./SeedCyclingTab";

import useMenstrualCycle from "../hooks/useMenstrualCycle";

const MenstrualCycle = () => {
  const [activeTab, setActiveTab] = useState("Home");
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

  const tabs = ["Home", "SeedCycling", "FAQ", "Feedback"];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2e2e2e] p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-playfair text-[#2f7059]">
          Couples Cycle Tracker
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 mx-2 rounded ${
                activeTab === tab
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-[#2f7059] opacity-75"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "SeedCycling" ? "Seed Cycling" : tab}
            </button>
          ))}
        </div>

        {activeTab === "Home" && (
          <>
            <div className="flex flex-col md:flex-row">
              <InputFields
                cycleLength={cycleLength}
                setCycleLength={setCycleLength}
                startDate={startDate}
                setStartDate={setStartDate}
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
            </div>

            <PhasePreview
              currentDayIndex={currentDayIndex}
              getPhaseColor={getPhaseColor}
              getPregnancyProbability={getPregnancyProbability}
              seedRecommendations={seedRecommendations}
              getCurrentPhase={getCurrentPhase}
            />

            <PhaseDescription currentPhase={currentPhase} />
            <footer>
              {/* Disclaimer */}
              <p className="mt-4 text-center text-xs text-gray-400">
                Note: The pregnancy probability is an estimation and should not
                be used for medical advice or contraception. Please consult a
                healthcare professional for personalized information.
              </p>
            </footer>
          </>
        )}
        {activeTab === "SeedCycling" && <SeedCyclingTab />}
        {activeTab === "FAQ" && <FAQ />}
        {activeTab === "Feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default MenstrualCycle;
