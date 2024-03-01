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
  Paper,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/feedbacks`,
        {
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
        }
      );
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

  const untickedIconStyle = {
    icon: { fontSize: 45 },
  };

  const iconColorStyles = {
    positive: { color: "green", fontSize: 48 },
    neutral: { color: "yellow", fontSize: 48 },
    negative: { color: "red", fontSize: 48 },
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 8, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl
            component="fieldset"
            className={styles.formControl}
            fullWidth
            sx={{ width: "100%", mt: 2 }}
          >
            <FormLabel component="legend" className={styles.legend}>
              Rate:
            </FormLabel>
            <RadioGroup
              name="rate"
              value={rating}
              onChange={handleChangeRating}
              row
              aria-label="rating"
              sx={{ justifyContent: "center", mb: 2, mt: 2 }}
            >
              <FormControlLabel
                value="3"
                control={
                  <Radio
                    icon={<InsertEmoticonIcon style={untickedIconStyle.icon} />}
                    checkedIcon={
                      <InsertEmoticonIcon style={iconColorStyles.positive} />
                    }
                  />
                }
                label="Positive"
                sx={{
                  ".MuiTypography-root": {
                    color: rating === "3" ? "green" : "inherit",
                  },
                }}
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    icon={
                      <SentimentSatisfiedIcon style={untickedIconStyle.icon} />
                    }
                    checkedIcon={
                      <SentimentSatisfiedIcon style={iconColorStyles.neutral} />
                    }
                  />
                }
                label="Neutral"
                sx={{
                  ".MuiTypography-root": {
                    color: rating === "2" ? "yellow" : "inherit",
                  },
                }}
              />
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    icon={
                      <SentimentVeryDissatisfiedIcon
                        style={untickedIconStyle.icon}
                      />
                    }
                    checkedIcon={
                      <SentimentVeryDissatisfiedIcon
                        style={iconColorStyles.negative}
                      />
                    }
                  />
                }
                label="Negative"
                sx={{
                  ".MuiTypography-root": {
                    color: rating === "1" ? "red" : "inherit",
                  },
                }}
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
      </Paper>
    </Container>
  );
};

export default Feedback;
