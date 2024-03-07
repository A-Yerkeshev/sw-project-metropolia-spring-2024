import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Course.module.css';
import SessionModal from '../../components/SessionModal';
import StudentIdModal from '../../components/StudentIdModal';
import {
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

      if (!response.ok) throw new Error('Failed to update session.');

      const data = await response.json();

      setExistingStudentIds(data.updatedCourse.students);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const handleCreateSession = () => {
    setModalContent('createSession');
    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    const formData = new FormData(event.target);
    const sessionData = {
      name: formData.get('name'),
      description: formData.get('description'),
      start: formData.get('start'),
      end: formData.get('end'),
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
        // Optionally, refresh the list of sessions or add the new session to the state
        setOpenModal(false); // Close the modal
        const fetchCourse = async () => {
          const response = await fetch(`${backendUrl}/api/courses/${courseId}`);
          const data = await response.json();
          setCourse(data.course);
        };

        fetchCourse();
      } else {
        throw new Error('Failed to create session');
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

      if (!response.ok) throw new Error('Failed to delete session.');

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

  // const handleGenerateQR = (sessionId) => {
  //   navigate(`/share`, { state: { courseId, sessionId } });
  // };

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

    const updatedSessionData = {
      name: formData.get('name'),
      description: formData.get('description'),
      start: formData.get('start'),
      end: formData.get('end'),
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

      if (!response.ok) throw new Error('Failed to update session.');

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
      // Transform feedback data, assigning colors based on rating
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
          label: `Rating ${feedback.rating}`,
          color: color, // Assign color based on rating
        };
      });

      const aggregatedData = [
        {
          value: transformedData.filter((d) => d.color === 'green').length,
          label: 'Positive',
          color: 'green',
        },
        {
          value: transformedData.filter((d) => d.color === 'yellow').length,
          label: 'Neutral',
          color: 'yellow',
        },
        {
          value: transformedData.filter((d) => d.color === 'red').length,
          label: 'Negative',
          color: 'red',
        },
      ]
        .filter((d) => d.value > 0) // Filter out categories with no feedback
        .map((d) => ({ ...d, label: `${d.label} (${d.value})` }));
      setFeedbackData([{ data: aggregatedData }]);
      setModalContent('statistics');
      setOpenModal(true);

      // Extract and store feedback texts
      const texts = data.feedbacks.map((feedback) => feedback.text);
      setFeedbackTexts(texts);
    }
  };

  if (!course) {
    return (
      <Container>
        <CircularProgress />
        <p> Loading </p>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Course: {course.name}
      </Typography>
      <Typography variant="subtitle1">
        Number of students enrolled:{' '}
        {course.students ? existingStudentIds.length : 'N/A'}
        <Button
          variant="outlined"
          color="primary"
          style={{ marginLeft: '1rem' }}
          onClick={() => setOpenStudentIdModal(true)}
        >
          Add students
        </Button>
      </Typography>
      <Grid container spacing={3} justifyContent="flex-start">
        {/* {course.sessions && course.sessions.length > 0 && ( */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Sessions
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateSession}
            sx={{ mb: 2 }}
          >
            Create Session
          </Button>
          {course.sessions.map((session) => (
            <Accordion key={session._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  {session.name} -{' '}
                  {new Date(session.start).toLocaleDateString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Description: {session.description}</Typography>
                <Typography>
                  Start: {new Date(session.start).toLocaleString()}
                </Typography>
                <Typography>
                  End: {new Date(session.end).toLocaleString()}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    jjustifyContent: 'space-between', // Adjusted for spacing
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleGenerateQR(session.name, session._id)}
                    sx={{ mr: 1 }}
                  >
                    Generate QR
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleShowStatistics(session._id)}
                    sx={{ mr: 1 }}
                  >
                    Show Statistics
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenEditModal(session)}
                  >
                    Edit
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        {/* )} */}
      </Grid>
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
        // Pass any other props required by SessionModal
      />

      <StudentIdModal
        openModal={openStudentIdModal}
        handleSubmit={handleSubmitStudentIds}
        handleClose={() => setOpenStudentIdModal(false)}
        existingStudentIds={existingStudentIds}
      />
    </Container>
  );
};

export default Course;
