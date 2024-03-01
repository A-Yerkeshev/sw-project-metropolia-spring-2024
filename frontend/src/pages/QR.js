import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { Box, Typography, Paper, Container, Link } from "@mui/material";

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
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={4}
      >
        {sessionDetails && (
          <Paper
            elevation={3}
            sx={{ padding: 4, marginBottom: 4, width: "100%", maxWidth: 600 }}
          >
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Session: {sessionDetails.name}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" display="block">
                Start: {new Date(sessionDetails.start).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" display="block">
                End: {new Date(sessionDetails.end).toLocaleString()}
              </Typography>
              <Box display="flex" justifyContent="center" m={2}>
                <QRCode value={feedbackUrl} size={256} />
              </Box>
              <Typography variant="body1" marginTop={2}>
                Scan QR code or{" "}
                <Link
                  component="a"
                  href={feedbackUrl}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click here
                </Link>{" "}
                to give your feedback on the session.
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default QR;
