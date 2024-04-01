import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SessionModal from '../../components/SessionModal';
import StudentIdModal from '../../components/StudentIdModal';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {
  Button,
  Typography,
  Container,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QRIcon from '@mui/icons-material/QrCode';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useTranslation } from 'react-i18next';
import dateTimeFormats from '../../dateTimeFormats.json';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackTexts, setFeedbackTexts] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  const [existingStudentIds, setExistingStudentIds] = useState([]);
  const [openStudentIdModal, setOpenStudentIdModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { t, i18n } = useTranslation();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`${backendUrl}/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data.course);
      setExistingStudentIds(data.course.students || []);
    };

    fetchCourse();
  }, [courseId]); // Dependency array ensures this effect runs only when courseId changes

  const handleSubmitStudentIds = async (updatedStudentIds) => {
    try {
      const response = await fetch(`${backendUrl}/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ students: updatedStudentIds }),
      });

      if (!response.ok) throw new Error(t('sessions.updateFail'));

      const data = await response.json();

      setExistingStudentIds(data.updatedCourse.students);
      setSnackbarOpen(true);
      setSnackbarMessage(t('sessions.updateOk'));
    } catch (error) {
      console.error('Error updating session:', error);
      setSnackbarMessage(t('sessions.updateFail'));
    }
  };

  const handleCreateSession = () => {
    setModalContent('createSession');
    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    const formData = new FormData(event.target);

    const start = dayjs(
      formData.get('start'),
      dateTimeFormats.datetime[i18n.language]
    ).valueOf();
    const end = dayjs(
      formData.get('end'),
      dateTimeFormats.datetime[i18n.language]
    ).valueOf();

    const sessionData = {
      name: formData.get('name'),
      description: formData.get('description'),
      start,
      end,
    };

    try {
      const response = await fetch(`${backendUrl}/api/sessions/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        const newSession = await response.json();
        setOpenModal(false); // Close the modal
        const fetchCourse = async () => {
          const response = await fetch(`${backendUrl}/api/courses/${courseId}`);
          const data = await response.json();
          setCourse(data.course);
        };

        fetchCourse();
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/sessions/${courseId}/${sessionId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error(t('sessions.deleteFail'));

      // After successful deletion, update the local state to remove the deleted session
      setCourse((prevCourse) => ({
        ...prevCourse,
        sessions: prevCourse.sessions.filter(
          (session) => session._id !== sessionId
        ),
      }));

      setOpenModal(false); // Close the modal
      setModalContent(null); // Reset modal content
      setCurrentSession(null); // Reset current session, if applicable
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const handleGenerateQR = (sessionName, sessionId) => {
    const urlFriendlySessionName = encodeURIComponent(sessionName); // Ensure the session name is URL-friendly
    // Append courseId and sessionId as query parameters
    const url = `/share/${urlFriendlySessionName}?courseId=${courseId}&sessionId=${sessionId}`;
    window.open(url, '_blank');
  };

  const handleOpenEditModal = (session) => {
    setCurrentSession(session); // Set the current session to the one selected for editing
    setModalContent('editSession');
    setOpenModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const formData = new FormData(event.currentTarget);

    const start = dayjs(
      formData.get('start'),
      dateTimeFormats.datetime[i18n.language]
    ).valueOf();
    const end = dayjs(
      formData.get('end'),
      dateTimeFormats.datetime[i18n.language]
    ).valueOf();

    const updatedSessionData = {
      name: formData.get('name'),
      description: formData.get('description'),
      start,
      end,
    };

    try {
      const response = await fetch(
        `${backendUrl}/api/sessions/${courseId}/${currentSession._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSessionData),
        }
      );

      if (!response.ok) throw new Error(t('sessions.updateFail'));

      const updatedSession = await response.json();

      // Perform state updates or navigations here
      setOpenModal(false);
      setModalContent(null);
      //update the course or session list to reflect the changes
    } catch (error) {
      console.error('Error updating session:', error);
      // Handle error cases
    }
  };

  const handleShowStatistics = async (sessionId) => {
    const response = await fetch(
      `${backendUrl}/api/feedbacks?sessionId=${sessionId}`
    );
    const data = await response.json();
    if (data.feedbacks) {
      const transformedData = data.feedbacks.map((feedback, index) => {
        let color;
        switch (feedback.rating) {
          case 1:
            color = 'red'; // Negative feedback
            break;
          case 2:
            color = 'yellow'; // Neutral feedback
            break;
          case 3:
            color = 'green'; // Positive feedback
            break;
          default:
            color = 'grey'; // Unknown or undefined rating
        }

        return {
          id: index,
          value: 1, // Each feedback counts as one
          label: `${t('sessions.rating')} ${feedback.rating}`,
          color: color, // Assign color based on rating
        };
      });

      const aggregatedData = [
        {
          value: transformedData.filter((d) => d.color === 'green').length,
          label: t('sessions.positiveLabel'),
          color: 'green',
        },
        {
          value: transformedData.filter((d) => d.color === 'yellow').length,
          label: t('sessions.neutralLabel'),
          color: 'yellow',
        },
        {
          value: transformedData.filter((d) => d.color === 'red').length,
          label: t('sessions.negativeLabel'),
          color: 'red',
        },
      ]
        .filter((d) => d.value > 0) // Filter out categories with no feedback
        .map((d) => ({ ...d, label: `${d.label} (${d.value})` }));
      setFeedbackData([{ data: aggregatedData }]);
      setModalContent('statistics');
      setOpenModal(true);

      // Extract and store feedback texts
      const texts = data.feedbacks.map((feedback) => {
        //const createdAt = new Date(feedback.createdAt);
        const formattedDate = dayjs(feedback.createdAt).format(
          dateTimeFormats.datetime[i18n.language]
        );

        return {
          text: feedback.text,
          createdAt: formattedDate,
        };
      });
      setFeedbackTexts(texts);
    }
  };

  // loading screen
  if (!course) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box textAlign="center">
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {t('sessions.loadingText')}
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: 'bold', mt: 2, color: '#232222' }}
        >
          {t('sessions.course')}: {course.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom textAlign="center">
          {t('sessions.studentsNum')}:{' '}
          {course.students ? existingStudentIds.length : 'N/A'}
          <Button
            variant="outlined"
            color="primary"
            sx={{ ml: 2 }}
            onClick={() => setOpenStudentIdModal(true)}
          >
            {t('sessions.addStudents')}
          </Button>
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventNoteIcon /> {t('sessions.header')}
        </Box>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateSession}
        sx={{ mb: 2 }}
      >
        {t('sessions.createSessionButton')}
      </Button>
      {course.sessions.map((session) => (
        <Paper
          elevation={4}
          sx={{ mb: 2, overflow: 'hidden' }}
          key={session._id}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {session.name} -{' '}
                {dayjs(session.start).format(
                  dateTimeFormats.date[i18n.language]
                )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t('sessions.description')}: {session.description}
              </Typography>
              <Typography>
                {t('sessions.start')}:{' '}
                {dayjs(session.start).format(
                  dateTimeFormats.datetime[i18n.language]
                )}
              </Typography>
              <Typography>
                {t('sessions.end')}:{' '}
                {dayjs(session.end).format(
                  dateTimeFormats.datetime[i18n.language]
                )}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleGenerateQR(session.name, session._id)}
                  startIcon={<QRIcon />}
                  sx={{ mr: 1 }}
                >
                  {t('sessions.generateQRButton')}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShowStatistics(session._id)}
                  startIcon={<BarChartIcon />}
                  sx={{ mr: 1 }}
                >
                  {t('sessions.showStatisticsButton')}
                </Button>
                {/* Spacer element */}
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenEditModal(session)}
                >
                  {t('sessions.editButton')}
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}

      {/* SessionModal and StudentIdModal */}
      <SessionModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        modalContent={modalContent}
        currentSession={currentSession}
        handleSubmit={handleSubmit}
        handleEditSubmit={handleEditSubmit}
        handleDeleteSession={handleDeleteSession}
        feedbackData={feedbackData}
        feedbackTexts={feedbackTexts}
      />

      <StudentIdModal
        openModal={openStudentIdModal}
        handleSubmit={handleSubmitStudentIds}
        handleClose={() => setOpenStudentIdModal(false)}
        existingStudentIds={existingStudentIds}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Course;
