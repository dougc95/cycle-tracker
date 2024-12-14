import PropTypes from "prop-types";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const InputFields = ({
  cycleLength,
  setCycleLength,
  startDate,
  setStartDate,
  getCurrentPhase,
}) => {
  const handleCycleLengthChange = (event) => {
    const newCycleLength = Math.max(
      25,
      Math.min(35, Number(event.target.value))
    );
    setCycleLength(newCycleLength);
  };

  const getPhaseColor = (date) => {
    const diffInDays = dayjs(date).diff(dayjs(startDate), "day");
    const currentDay = (diffInDays % cycleLength) + 1;
    const currentPhase = getCurrentPhase(currentDay);

    switch (currentPhase) {
      case "Menstrual":
        return "menstrual.main";
      case "Follicular":
        return "follicular.main";
      case "Ovulation":
        return "ovulation.main";
      case "Luteal":
        return "luteal.main";
      default:
        return "grey.300"; // Default color if no phase matches
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Cycle Length (days)"
          type="number"
          value={cycleLength}
          onChange={handleCycleLengthChange}
          inputProps={{ min: 25, max: 35 }}
          sx={{ width: "18ch" }}
        />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date of Bleeding"
          value={dayjs(startDate)}
          onChange={(newValue) => {
            setStartDate(newValue.format("YYYY-MM-DD"));
          }}
          sx={{
            width: "24ch",
            "& .MuiInputBase-input": {
              padding: "10px 14px", // Adjust padding to match original style
            },
          }}
          dayOfWeekFormatter={(_, date) => ({
            sx: {
              color: getPhaseColor(date), // Apply phase color to the day of the week
            },
          })}
          slotProps={{
            day: {
              sx: (ownerState) => ({
                bgcolor: getPhaseColor(ownerState.date), // Apply phase color to each day
              }),
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

InputFields.propTypes = {
  cycleLength: PropTypes.number.isRequired,
  setCycleLength: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  getCurrentPhase: PropTypes.func.isRequired,
};

export default InputFields;
