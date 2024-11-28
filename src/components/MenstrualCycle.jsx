import { useState, useEffect } from "react";

const MenstrualCycle = () => {
  const [cycleLength, setCycleLength] = useState(28);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [currentDayIndex, setCurrentDayIndex] = useState(null);

  useEffect(() => {
    if (startDate) {
      const calculateCurrentDayIndex = () => {
        const start = new Date(startDate);
        const now = new Date();
        const diffInDays =
          Math.floor((now - start) / (1000 * 60 * 60 * 24)) % cycleLength;
        // Ensure the index is within the cycle length
        const index = diffInDays % cycleLength;
        return index >= 0 ? index : cycleLength + index;
      };
      setCurrentDayIndex(calculateCurrentDayIndex());
    }
  }, [startDate, cycleLength]);

  // Generate days based on cycle length
  const days = Array.from({ length: cycleLength }, (_, i) => i + 1);

  // Calculate phase ranges dynamically
  const calculatePhaseRanges = (length) => {
    const menstrualEnd = Math.round(length * 0.18); // 18% for Menstrual phase
    const ovulationLength = Math.max(2, Math.round(length * 0.1)); // 2–3 days (~7–10%)
    const ovulationStart = Math.round(length * 0.47); // ~47% through the cycle
    const ovulationEnd = ovulationStart + ovulationLength - 1; // 2-3 days for ovulation

    const follicularEnd = ovulationStart - 1; // Ends right before ovulation starts
    const lutealStart = ovulationEnd + 1; // Starts right after ovulation ends

    return {
      menstrual: [1, menstrualEnd],
      follicular: [menstrualEnd + 1, follicularEnd],
      ovulation: [ovulationStart, ovulationEnd],
      luteal: [lutealStart, length],
    };
  };

  const phaseRanges = calculatePhaseRanges(cycleLength);

  // Determine the phase color for a given day
  const getPhaseColor = (day, isCurrentDay = false) => {
    if (day >= phaseRanges.menstrual[0] && day <= phaseRanges.menstrual[1])
      return {
        bg: isCurrentDay ? "#fecaca" : "#fee2e2",
        text: "#991b1b",
      };
    if (day >= phaseRanges.follicular[0] && day <= phaseRanges.follicular[1])
      return {
        bg: isCurrentDay ? "#bfdbfe" : "#dbeafe",
        text: "#1e40af",
      };
    if (day >= phaseRanges.ovulation[0] && day <= phaseRanges.ovulation[1])
      return {
        bg: isCurrentDay ? "#bbf7d0" : "#dcfce7",
        text: "#166534",
      };
    if (day >= phaseRanges.luteal[0] && day <= phaseRanges.luteal[1])
      return {
        bg: isCurrentDay ? "#fef08a" : "#fef9c3",
        text: "#854d0e",
      };
    return {
      bg: isCurrentDay ? "#e5e7eb" : "#f3f4f6",
      text: "#1f2937",
    };
  };

  const generateWedges = () => {
    const radius = 50;
    const center = 50;
    const anglePerDay = 360 / cycleLength;

    return days.map((day, index) => {
      // Adjusted to center the wedge around the day number
      const centerAngle = index * anglePerDay - 90;
      const startAngle = centerAngle - anglePerDay / 2;
      const endAngle = centerAngle + anglePerDay / 2;

      const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);

      const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
      const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);

      const isCurrentDay = index === currentDayIndex;
      const colors = getPhaseColor(day, isCurrentDay);

      const largeArcFlag = anglePerDay >= 180 ? 1 : 0;

      const d = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;

      return (
        <path
          key={`wedge-${day}`}
          d={d}
          fill={colors.bg}
          stroke="#ffffff"
          strokeWidth="0.5"
        />
      );
    });
  };

  const generateDayNumbers = () => {
    const radius = 38; // Increased from 35 to 38 to move numbers outward
    const anglePerDay = 360 / cycleLength;

    return days.map((day, index) => {
      const angle = (index * anglePerDay - 90) * (Math.PI / 180);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      const isCurrentDay = index === currentDayIndex;
      const colors = getPhaseColor(day, isCurrentDay);

      return (
        <text
          key={`day-${day}`}
          x={x}
          y={y}
          fill={colors.text}
          fontSize="4"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {day}
        </text>
      );
    });
  };

  const generatePhaseLabels = () => {
    const labels = [
      { text: "Menstruación", angle: -90, color: "#dc2626" },
      { text: "Fase Folicular", angle: 0, color: "#2563eb" },
      { text: "Ovulación", angle: 90, color: "#16a34a" },
      { text: "Fase Lútea", angle: 180, color: "#ca8a04" },
    ];

    const radius = 70; // Increased from 60 to 70 to ensure labels are visible

    return labels.map((label, index) => {
      const angle = label.angle * (Math.PI / 180);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      return (
        <text
          key={`label-${index}`}
          x={x}
          y={y}
          fill={label.color}
          fontSize="4" // Increased font size for better visibility
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {label.text}
        </text>
      );
    });
  };

  const generateClockHand = () => {
    if (currentDayIndex === null) return null;

    const angle = currentDayIndex * (360 / cycleLength) - 90;
    const x1 = 50;
    const y1 = 50;
    const x2 = 50 + 35 * Math.cos((Math.PI * angle) / 180); // Reduced length from 45 to 35
    const y2 = 50 + 35 * Math.sin((Math.PI * angle) / 180);

    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1" />
    );
  };

  const generatePhasePreview = () => {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2e2e2e] p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#2f7059]">
          Couples Cycle Tracker
        </h1>

        {/* Input fields for cycle length and start date */}
        <div className="mb-6 flex flex-col items-center space-y-4">
          <div>
            <label htmlFor="cycleLength" className="block text-white">
              Cycle Length (days):
            </label>
            <input
              id="cycleLength"
              type="number"
              value={cycleLength}
              onChange={(e) =>
                setCycleLength(
                  Math.max(25, Math.min(35, Number(e.target.value)))
                )
              }
              className="mt-1 w-24 rounded border border-gray-400 p-2 text-center"
              min="25"
              max="35"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-white">
              Start Date of Bleeding
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-48 rounded border border-gray-400 p-2"
            />
          </div>
        </div>

        {generatePhasePreview()}

        <div className="mx-auto aspect-square w-[320px]">
          <svg
            className="h-full w-full overflow-visible"
            viewBox="-20 -20 140 140"
          >
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="white"
              stroke="gray"
              strokeWidth="1"
            />
            {generateWedges()}
            {generateDayNumbers()}
            {generatePhaseLabels()}
            {generateClockHand()}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycle;
