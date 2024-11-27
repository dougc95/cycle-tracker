import "./../styles/MenstrualCycle.scss";

const MenstrualCycle = () => {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="menstrual-cycle">
      <h1 className="title">Ciclo Menstrual: Qué es y Fases</h1>
      <div className="diagram">
        <div className="outer-circle">
          <div className="phase menstruation">Menstruación</div>
          <div className="phase follicular">Fase Folicular</div>
          <div className="phase ovulation">Ovulación</div>
          <div className="phase luteal">Fase Lútea</div>
        </div>
        <div className="inner-circle">
          {days.map((day) => (
            <span key={day} className="day">
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycle;
