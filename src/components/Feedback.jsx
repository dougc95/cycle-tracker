import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const Feedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Send the feedbackMessage to your server via an API endpoint
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: feedbackMessage }),
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setFeedbackMessage("");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h2" mb={2}>
        We Value Your Feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Feedback"
          multiline
          rows={5}
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send Feedback
        </Button>
      </form>
    </Box>
  );
};

export default Feedback;
