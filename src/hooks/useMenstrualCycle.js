import { useMemo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const useMenstrualCycle = (startDate, cycleLength) => {
  const currentDayIndex = useMemo(() => {
    if (!startDate) return null;
    const parsedStart = dayjs(startDate, "DD-MM-YYYY");
    const diffInDays = dayjs().diff(parsedStart, "day");
    const index = diffInDays % cycleLength;
    return index >= 0 ? index : cycleLength + index;
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
    { text: "Menstrual ", angle: -90, color: "#dc2626" },
    { text: "Follicular ", angle: 0, color: "#2563eb" },
    { text: "Ovulation", angle: 90, color: "#16a34a" },
    { text: "Luteal ", angle: 180, color: "#ca8a04" },
  ];

  const getPregnancyProbability = (day) => {
    const ovulationDay = Math.round(cycleLength * 0.47);
    const fertileWindowStart = ovulationDay - 5;
    const fertileWindowEnd = ovulationDay + 1;

    if (day >= fertileWindowStart && day <= fertileWindowEnd) {
      return "High";
    } else if (day === fertileWindowStart - 1 || day === fertileWindowEnd + 1) {
      return "Moderate";
    } else {
      return "Low";
    }
  };

  const seedRecommendations = {
    Menstrual: [],
    Follicular: ["🌾", "🎃"], // Flaxseeds & Pumpkin Seeds
    Ovulation: ["🌾", "🎃"], // Continue with Follicular seeds
    Luteal: ["🌿", "🌻"], // Sesame Seeds & Sunflower Seeds
  };

  return {
    currentDayIndex,
    days,
    getPhaseColor,
    labels,
    getCurrentPhase,
    getPregnancyProbability,
    seedRecommendations,
  };
};

export default useMenstrualCycle;
