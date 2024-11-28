import PropTypes from "prop-types";

const InputFields = ({
  cycleLength,
  setCycleLength,
  startDate,
  setStartDate,
}) => (
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
          setCycleLength(Math.max(25, Math.min(35, Number(e.target.value))))
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
);

InputFields.propTypes = {
  cycleLength: PropTypes.number.isRequired,
  setCycleLength: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
};

export default InputFields;
