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
        return diffInDays >= 0 ? diffInDays : cycleLength + diffInDays;
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
  const getPhaseColor = (day) => {
    if (day >= phaseRanges.menstrual[0] && day <= phaseRanges.menstrual[1])
      return "text-red-500"; // Menstrual phase
    if (day >= phaseRanges.follicular[0] && day <= phaseRanges.follicular[1])
      return "text-blue-400"; // Follicular phase
    if (day >= phaseRanges.ovulation[0] && day <= phaseRanges.ovulation[1])
      return "text-green-500"; // Ovulation phase
    if (day >= phaseRanges.luteal[0] && day <= phaseRanges.luteal[1])
      return "text-yellow-500"; // Luteal phase
    return "text-gray-700"; // Default
  };

  // Calculate positions for days around the circle
  const calculatePosition = (index) => {
    const angle = (index * (360 / cycleLength) - 90) * (Math.PI / 180);
    const radius = 35; // Percentage from center
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {
      left: `${50 + x}%`,
      top: `${50 + y}%`,
      transform: `translate(-50%, -50%) rotate(${
        -index * (360 / cycleLength)
      }deg)`,
    };
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#2e2e2e] p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#2f7059]">
          Ciclo Menstrual: Qué es y Fases
        </h1>

        {/* Input fields for cycle length and start date */}
        <div className="mb-6 flex flex-col items-center space-y-4">
          <div>
            <label htmlFor="cycleLength" className="block text-white">
              Longitud del Ciclo (días):
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
              Fecha de Inicio del Sangrado:
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

        <div className="relative mx-auto aspect-square w-[320px]">
          {/* Outer circle with gradient border */}
          <div className="absolute h-full w-full rounded-full border-4 border-gray-300 bg-white">
            {/* Phase labels */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-red-500">
              Menstruación
            </div>
            <div className="absolute right-0 top-1/4 translate-x-1/2 -rotate-45 text-blue-400">
              Fase Folicular
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-green-500">
              Ovulación
            </div>
            <div className="absolute left-0 top-1/4 -translate-x-1/2 rotate-45 text-yellow-500">
              Fase Lútea
            </div>

            {/* Day numbers */}
            {days.map((day, index) => (
              <div
                key={day}
                className={`absolute text-sm ${getPhaseColor(day)}`}
                style={calculatePosition(index)}
              >
                {day}
              </div>
            ))}

            {/* Updated Clock hand */}
            {currentDayIndex !== null && (
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: "2px",
                  height: "50%",
                  backgroundColor: "black",
                  transform: `translateX(-50%) rotate(${
                    -currentDayIndex * (360 / cycleLength) + 180
                  }deg)`,
                  transformOrigin: "0% 0%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycle;
