import React from "react";

const CycleChart = ({
  days,
  currentDayIndex,
  getPhaseColor,
  labels,
  cycleLength,
}) => {
  const generateWedges = () => {
    const radius = 50;
    const center = 50;
    const anglePerDay = 360 / cycleLength;

    return days.map((day, index) => {
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
    const radius = 38;
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
    const radius = 70;

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
          fontSize="4"
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
    const x2 = 50 + 35 * Math.cos((Math.PI * angle) / 180);
    const y2 = 50 + 35 * Math.sin((Math.PI * angle) / 180);

    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="1" />
    );
  };

  return (
    <div className="mx-auto aspect-square w-[320px]">
      <svg className="h-full w-full overflow-visible" viewBox="-20 -20 140 140">
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
  );
};

export default CycleChart;
