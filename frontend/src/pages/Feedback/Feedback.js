import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import styles from "./Feedback.module.css";
import { useSearchParams } from "react-router-dom";

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sid");
  const [rating, setRating] = useState("");
  const [openFeedback, setOpenFeedback] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };

  const handleChangeOpenFeedback = (event) => {
    setOpenFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(rating),
          text: openFeedback,
          sessionId: sessionId,
          studentId: 1, // This should be dynamically set based on the logged-in user
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Feedback submitted:", data);
      setSubmitStatus("success");
      setSubmitMessage("Feedback submitted successfully!");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setSubmitStatus("error");
      setSubmitMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      {" "}
      {/* Centers the content and limits its width */}
      <Box
        sx={{
          display: "flex", // Makes the box a flex container
          flexDirection: "column", // Stacks children vertically
          alignItems: "center", // Centers children horizontally
          marginTop: 8, // Adds top margin for spacing from the top
          padding: 2, // Adds padding around the content
        }}
      >
        <FormControl
          component="fieldset"
          className={styles.formControl}
          fullWidth
        >
          <FormLabel component="legend" className={styles.legend}>
            Rate:
          </FormLabel>
          <RadioGroup
            aria-label="rating"
            name="rate"
            value={rating}
            onChange={handleChangeRating}
            row
          >
            <FormControlLabel
              value="2"
              control={
                <Radio
                  sx={{
                    color: "green",
                    "&.Mui-checked": { color: "green" },
                    "& .MuiSvgIcon-root": { fontSize: 35 },
                  }}
                />
              }
              label="Green"
            />
            <FormControlLabel
              value="1"
              control={
                <Radio
                  sx={{
                    color: "yellow",
                    "&.Mui-checked": { color: "yellow" },
                    "& .MuiSvgIcon-root": { fontSize: 35 },
                  }}
                />
              }
              label="Yellow"
            />
            <FormControlLabel
              value="0"
              control={
                <Radio
                  sx={{
                    color: "red",
                    "&.Mui-checked": { color: "red" },
                    "& .MuiSvgIcon-root": { fontSize: 35 },
                  }}
                />
              }
              label="Red"
            />
          </RadioGroup>
          <TextField
            label="Open feedback"
            name="open-feedback"
            multiline
            rows={4}
            margin="normal"
            fullWidth
            value={openFeedback}
            onChange={handleChangeOpenFeedback}
          />
          <Box className={styles.submitButtonContainer}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </Box>
          {submitStatus && (
            <Box mt={2} className={styles[submitStatus]}>
              <Typography
                variant="body1"
                color={submitStatus === "success" ? "green" : "red"}
              >
                {submitMessage}
              </Typography>
            </Box>
          )}
        </FormControl>
      </Box>
    </Container>
  );
};

export default Feedback;
