import { useState } from "react";

const Feedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO:Send the feedbackMessage to your server via an API endpoint
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback: feedbackMessage }),
      });

      if (response.ok) {
        // Optionally, display a success message or clear the form
        alert("Thank you for your feedback!");
        setFeedbackMessage("");
      } else {
        // Handle errors
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-playfair mb-4">We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="feedbackMessage">
            Feedback
          </label>
          <textarea
            id="feedbackMessage"
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#2f7059] text-white rounded hover:bg-[#256d54]"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
