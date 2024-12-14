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
        {/* TODO: fix date picker interaction */}
        <DatePicker
          label="Start Date of Bleeding"
          value={dayjs(startDate)}
          onChange={(newValue) => {
            if (newValue) {
              setStartDate(newValue.format("YYYY-MM-DD"));
            }
          }}
          sx={{
            width: "24ch",
            "& .MuiInputBase-input": {
              padding: "10px 14px",
            },
          }}
          slotProps={{
            dayCalendar: {
              dayOfWeekFormatter: (day) =>
                typeof day === "string" ? day.charAt(0).toUpperCase() : "",
            },
            day: (ownerState) => {
              const date = ownerState.day.toDate();
              const diffInDays = Math.floor(
                (date - new Date(startDate)) / (1000 * 60 * 60 * 24)
              );
              const currentDay = (diffInDays % cycleLength) + 1;
              const currentPhase = getCurrentPhase(currentDay);
              let phaseColor = "grey.300";
              switch (currentPhase) {
                case "Menstrual":
                  phaseColor = "menstrual.main";
                  break;
                case "Follicular":
                  phaseColor = "follicular.main";
                  break;
                case "Ovulation":
                  phaseColor = "ovulation.main";
                  break;
                case "Luteal":
                  phaseColor = "luteal.main";
                  break;
                default:
                  phaseColor = "grey.300";
              }
              return {
                sx: {
                  bgcolor: phaseColor,
                },
              };
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
