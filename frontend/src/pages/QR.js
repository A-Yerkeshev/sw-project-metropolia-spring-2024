import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { Box, Typography, Paper, Container } from "@mui/material";

const QR = () => {
  const location = useLocation();
  // Access courseId and sessionId from the navigation state
  const { courseId, sessionId } = location.state || {};

  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    // Ensure both courseId and sessionId are present
    if (!courseId || !sessionId) {
      console.error("Course ID or Session ID is missing.");
      return;
    }

    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/sessions/${courseId}/${sessionId}`
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Session details fetched:", data); // Log the fetched session details
          setSessionDetails(data.session);
        } else {
          throw new Error("Failed to fetch session details");
        }
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    fetchSessionDetails();
  }, [courseId, sessionId]); // Depend on both courseId and sessionId

  // Log sessionDetails state before the return statement
  console.log("Current sessionDetails state:", sessionDetails);

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    //baseUrl = process.env.REACT_APP_IP_ADDRESS;
    baseUrl = window.location.origin;
  } else {
    baseUrl = window.location.origin;
  }
  const feedbackUrl = `${baseUrl}/feedback/new?sid=${sessionId}`;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={4}
    >
      {sessionDetails && (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Session: {sessionDetails.name}
          </Typography>
          <Typography variant="subtitle1">
            Date: {new Date(sessionDetails.start).toLocaleString()}
          </Typography>
        </Paper>
      )}
      <QRCode value={feedbackUrl} />
      <Typography variant="caption" display="block" marginTop={2}>
        {feedbackUrl}
      </Typography>
    </Box>
  );
};

export default QR;
