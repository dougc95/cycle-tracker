// useMenstrualCycle.js
import { useState, useEffect } from "react";

const useMenstrualCycle = (startDate, cycleLength) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(null);

  useEffect(() => {
    if (startDate) {
      const calculateCurrentDayIndex = () => {
        const start = new Date(startDate);
        const now = new Date();
        const diffInDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        const index = diffInDays % cycleLength;
        return index >= 0 ? index : cycleLength + index;
      };
      setCurrentDayIndex(calculateCurrentDayIndex());
    }
  }, [startDate, cycleLength]);

  const days = Array.from({ length: cycleLength }, (_, i) => i + 1);

  const calculatePhaseRanges = (length) => {
    const menstrualEnd = Math.round(length * 0.18);
    const ovulationLength = Math.max(2, Math.round(length * 0.1));
    const ovulationStart = Math.round(length * 0.47);
    const ovulationEnd = ovulationStart + ovulationLength - 1;
    const follicularEnd = ovulationStart - 1;
    const lutealStart = ovulationEnd + 1;

    return {
      menstrual: [1, menstrualEnd],
      follicular: [menstrualEnd + 1, follicularEnd],
      ovulation: [ovulationStart, ovulationEnd],
      luteal: [lutealStart, length],
    };
  };

  const phaseRanges = calculatePhaseRanges(cycleLength);

  const getPhaseColor = (day, isCurrentDay = false) => {
    if (day >= phaseRanges.menstrual[0] && day <= phaseRanges.menstrual[1])
      return { bg: isCurrentDay ? "#fecaca" : "#fee2e2", text: "#991b1b" };
    if (day >= phaseRanges.follicular[0] && day <= phaseRanges.follicular[1])
      return { bg: isCurrentDay ? "#bfdbfe" : "#dbeafe", text: "#1e40af" };
    if (day >= phaseRanges.ovulation[0] && day <= phaseRanges.ovulation[1])
      return { bg: isCurrentDay ? "#bbf7d0" : "#dcfce7", text: "#166534" };
    if (day >= phaseRanges.luteal[0] && day <= phaseRanges.luteal[1])
      return { bg: isCurrentDay ? "#fef08a" : "#fef9c3", text: "#854d0e" };
    return { bg: isCurrentDay ? "#e5e7eb" : "#f3f4f6", text: "#1f2937" };
  };

  // New function to get the current phase name
  const getCurrentPhase = (day) => {
    if (day >= phaseRanges.menstrual[0] && day <= phaseRanges.menstrual[1])
      return "Menstrual";
    if (day >= phaseRanges.follicular[0] && day <= phaseRanges.follicular[1])
      return "Follicular";
    if (day >= phaseRanges.ovulation[0] && day <= phaseRanges.ovulation[1])
      return "Ovulation";
    if (day >= phaseRanges.luteal[0] && day <= phaseRanges.luteal[1])
      return "Luteal";
    return "Unknown";
  };

  const labels = [
    { text: "Menstruación", angle: -90, color: "#dc2626" },
    { text: "Fase Folicular", angle: 0, color: "#2563eb" },
    { text: "Ovulación", angle: 90, color: "#16a34a" },
    { text: "Fase Lútea", angle: 180, color: "#ca8a04" },
  ];

  return {
    currentDayIndex,
    days,
    getPhaseColor,
    labels,
    getCurrentPhase, // Include this in the returned object
  };
};

export default useMenstrualCycle;
