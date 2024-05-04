import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { Box, Typography, Paper, Container, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SessionDetails {
  name: string;
  start: string;
  end: string;
}

const QR: React.FC = () => {
  const location = useLocation();
  // Access courseId and sessionId from the navigation state
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("courseId");
  const sessionId = queryParams.get("sessionId");
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
  const { t } = useTranslation();
  //const decodedSessionName = decodeURIComponent(sessionName);

  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);

  useEffect(() => {
    // Ensure both courseId and sessionId are present
    if (!courseId || !sessionId) {
      console.error(t("qr.errorMissingID"));
      return;
    }

    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/sessions/${courseId}/${sessionId}`
        );
        const data = await response.json();
        if (response.ok) {
          setSessionDetails(data.session);
        } else {
          throw new Error(t("feedback.errorMessage"));
        }
      } catch (error) {
        console.error(t("feedback.errorMessage"), error);
      }
    };

    fetchSessionDetails();
  }, [courseId, sessionId, backendUrl, t]); // Depend on both courseId and sessionId

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    //baseUrl = process.env.REACT_APP_IP_ADDRESS;
    baseUrl = window.location.origin;
  } else {
    baseUrl = window.location.origin;
  }
  const feedbackUrl = `${baseUrl}/feedback/new?sid=${sessionId}&cid=${courseId}`;

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
              {t('qr.header')}: {sessionDetails.name}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" display="block">
              {t('qr.startLabel')}: {new Date(sessionDetails.start).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" display="block">
              {t('qr.endLabel')}: {new Date(sessionDetails.end).toLocaleString()}
              </Typography>
              <Box display="flex" justifyContent="center" m={2}>
                <QRCode value={feedbackUrl} size={256} />
              </Box>
              <Typography variant="body1" marginTop={2}>
              {t('qr.feedbackPrompt')} {" "}
                <Link
                  component="a"
                  href={feedbackUrl}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('qr.clickHere')}
                </Link>{" "}
                {t('qr.feedbackPrompt2')}
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default QR;
