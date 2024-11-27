import { useState } from "react";

const MenstrualCycle = () => {
  const [cycleLength, setCycleLength] = useState(28);
  const [startDate, setStartDate] = useState("");

  // Generate days based on cycle length
  const days = Array.from({ length: cycleLength }, (_, i) => i + 1);

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
        index * (360 / cycleLength)
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
                setCycleLength(Math.max(1, Number(e.target.value)))
              }
              className="mt-1 w-24 rounded border border-gray-400 p-2 text-center"
              min="1"
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
                className="absolute text-sm text-gray-700"
                style={calculatePosition(index)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycle;
