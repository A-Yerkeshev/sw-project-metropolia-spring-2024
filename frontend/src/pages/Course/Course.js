import styles from "./Course.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackTexts, setFeedbackTexts] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(
        `http://localhost:4000/api/courses/${courseId}`
      );
      const data = await response.json();
      setCourse(data.course);
    };

    fetchCourse();
  }, [courseId]); // Dependency array ensures this effect runs only when courseId changes

  const handleCreateSession = () => {
    setModalContent("createSession");
    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    const formData = new FormData(event.target);
    const sessionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      start: formData.get("start"),
      end: formData.get("end"),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/sessions/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sessionData),
        }
      );

      if (response.ok) {
        const newSession = await response.json();
        console.log("Session created:", newSession);
        // Optionally, refresh the list of sessions or add the new session to the state
        setOpenModal(false); // Close the modal
      } else {
        throw new Error("Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleEditSession = (sessionId) => {
    // Placeholder for edit session logic
    console.log("Editing session:", sessionId);
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/sessions/${sessionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete session.");

      console.log("Session deleted:", sessionId);

      // Update the local state to remove the deleted session from `course.sessions`

      setOpenModal(false); // Close the modal
      setModalContent(null); // Reset modal content
      setCurrentSession(null); // Reset current session
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleGenerateQR = (sessionId) => {
    navigate(`/share?sid=${sessionId}`);
  };

  const handleOpenEditModal = (session) => {
    setCurrentSession(session); // Set the current session to the one selected for editing
    setModalContent("editSession");
    setOpenModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const formData = new FormData(event.currentTarget); // Assuming the event is passed from the form submit

    const updatedSessionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      start: formData.get("start"),
      end: formData.get("end"),
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/sessions/${currentSession._id}`,
        {
          method: "PUT", // or 'PATCH', depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSessionData),
        }
      );

      if (!response.ok) throw new Error("Failed to update session.");

      const updatedSession = await response.json();
      console.log("Session updated:", updatedSession);

      // Perform any state updates or navigations here
      setOpenModal(false);
      setModalContent(null);
      // You might also want to update the course or session list to reflect the changes
    } catch (error) {
      console.error("Error updating session:", error);
      // Handle error cases, possibly setting error messages in state for display
    }
  };

  const handleShowStatistics = async (sessionId) => {
    const response = await fetch(
      `http://localhost:4000/api/feedbacks?sessionId=${sessionId}`
    );
    const data = await response.json();
    if (data.feedbacks) {
      // Transform feedback data, assigning colors based on rating
      const transformedData = data.feedbacks.map((feedback, index) => {
        let color;
        switch (feedback.rating) {
          case 0:
            color = "red"; // Negative feedback
            break;
          case 1:
            color = "yellow"; // Neutral feedback
            break;
          case 2:
            color = "green"; // Positive feedback
            break;
          default:
            color = "grey"; // Unknown or undefined rating
        }

        return {
          id: index, // Ensure each data point has a unique id
          value: 1, // Each feedback counts as one
          label: `Rating ${feedback.rating}`, // Customize this label as needed
          color: color, // Assign color based on rating
        };
      });

      // Since we're counting each feedback as one, we can aggregate ratings
      const aggregatedData = [
        {
          value: transformedData.filter((d) => d.color === "green").length,
          label: "Positive",
          color: "green",
        },
        {
          value: transformedData.filter((d) => d.color === "yellow").length,
          label: "Neutral",
          color: "yellow",
        },
        {
          value: transformedData.filter((d) => d.color === "red").length,
          label: "Negative",
          color: "red",
        },
      ]
        .filter((d) => d.value > 0) // Filter out categories with no feedback
        .map((d) => ({ ...d, label: `${d.label} (${d.value})` }));
      setFeedbackData([{ data: aggregatedData }]);
      setModalContent("statistics");
      setOpenModal(true);

      // Extract and store feedback texts
      const texts = data.feedbacks.map((feedback) => feedback.text);
      setFeedbackTexts(texts);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.leftContainer}>
        <h1>Course information</h1>
        <p>All information that you need about selected course.</p>

        <div className={styles.courseInfoBlock}>
          <div>
            <p>Course: {course.name}</p>
            <p>
              Course student amount:{" "}
              {course.students ? course.students.length : "N/A"}
            </p>
            <p>Class number:</p>
            <button onClick={handleCreateSession} className={styles.button1}>
              Create Session
            </button>
          </div>
          {/* Sessions list */}
          {course.sessions && course.sessions.length > 0 && (
            <div>
              <h2>Sessions</h2>
              {course.sessions.map((session) => (
                <div key={session._id} className={styles.sessionBlock}>
                  <p>Name: {session.name}</p>
                  <p>Description: {session.description}</p>
                  <p>Start: {new Date(session.start).toLocaleString()}</p>
                  <p>End: {new Date(session.end).toLocaleString()}</p>
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => handleOpenEditModal(session)}
                      className={styles.button1}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteSession(session._id)}
                      className={styles.button1}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleGenerateQR(session._id)}
                      className={styles.button1}
                    >
                      Generate QR
                    </button>
                    <button
                      onClick={() => handleShowStatistics(session._id)}
                      className={styles.button1}
                    >
                      Show Statistics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p>Visit Metropolia</p>
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setModalContent(null);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              {modalContent === "statistics" && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Session Feedback
                  </Typography>
                  {feedbackData && (
                    <PieChart series={feedbackData} width={400} height={200} />
                  )}
                  <Typography sx={{ mt: 2 }}>
                    <strong>Text Feedback:</strong>
                    {feedbackTexts.length > 0 ? (
                      feedbackTexts.map((text, index) => (
                        <div key={index}>
                          {text || "No text feedback provided."}
                        </div>
                      ))
                    ) : (
                      <div>No text feedback available.</div>
                    )}
                  </Typography>
                </>
              )}
              {modalContent === "createSession" && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Create New Session
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <input
                      name="name"
                      type="text"
                      placeholder="Session Name"
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Session Description"
                      required
                    />
                    <input name="start" type="datetime-local" required />
                    <input name="end" type="datetime-local" required />
                    <button type="submit">Submit</button>
                  </form>
                </>
              )}
              {modalContent === "editSession" && currentSession && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Session
                  </Typography>
                  <form onSubmit={handleEditSubmit}>
                    <input
                      name="name"
                      type="text"
                      defaultValue={currentSession.name}
                      placeholder="Session Name"
                      required
                    />
                    <textarea
                      name="description"
                      defaultValue={currentSession.description}
                      placeholder="Session Description"
                      required
                    />
                    <input
                      name="start"
                      type="datetime-local"
                      defaultValue={currentSession.start}
                      required
                    />
                    <input
                      name="end"
                      type="datetime-local"
                      defaultValue={currentSession.end}
                      required
                    />
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          handleEditSubmit(
                            currentSession._id /*, Updated data here*/
                          )
                        }
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(currentSession._id)}
                      >
                        Delete Session
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Box>
          </Modal>
        </div>
        <div className={styles.contactUsBlock}>
          <p>Contact our support</p>
          <p>Go to service page for more information</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <img
          src="/course/qrCode.svg"
          alt="QR Code"
          className={styles.qrCodeContainer}
        />

        <button className={styles.button1}>Close QR</button>
      </div>
    </div>
  );
};

export default Course;
