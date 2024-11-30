import PropTypes from "prop-types";

const CycleChart = ({
  days,
  currentDayIndex,
  getPhaseColor,
  labels,
  cycleLength,
  getCurrentPhase,
  seedRecommendations,
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

  const generateSeedIcons = () => {
    const radius = 60; // Slightly larger radius to place icons outside the wedges
    const anglePerDay = 360 / cycleLength;

    return days.map((day, index) => {
      const angle = (index * anglePerDay - 90) * (Math.PI / 180);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      const currentPhase = getCurrentPhase(day);
      const seeds = seedRecommendations[currentPhase];

      if (!seeds || seeds.length === 0) return null;

      return (
        <text
          key={`seed-${day}`}
          x={x}
          y={y}
          fontSize="5"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {seeds.join("")}
          <title>
            {currentPhase} Phase Seeds: {seeds.join(" ")}
          </title>
        </text>
      );
    });
  };

  return (
    <div className="mx-auto aspect-square w-[320px]">
      <svg className="h-full w-full overflow-visible" viewBox="-20 -20 140 140">
        {generateWedges()}
        {generateDayNumbers()}
        {generatePhaseLabels()}
        {generateSeedIcons()} {/* Add seed icons */}
        {generateClockHand()}
      </svg>
    </div>
  );
};

CycleChart.propTypes = {
  days: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentDayIndex: PropTypes.number,
  getPhaseColor: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      angle: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  cycleLength: PropTypes.number.isRequired,
  getCurrentPhase: PropTypes.func.isRequired,
  seedRecommendations: PropTypes.object.isRequired,
};

export default CycleChart;
