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
    // Placeholder for create session logic
    console.log("Creating a new session...");
  };

  const handleEditSession = (sessionId) => {
    // Placeholder for edit session logic
    console.log("Editing session:", sessionId);
  };

  const handleDeleteSession = (sessionId) => {
    // Placeholder for delete session logic
    console.log("Deleting session:", sessionId);
  };

  const handleGenerateQR = (sessionId) => {
    navigate(`/share?sid=${sessionId}`);
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
      setOpenModal(true);
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
                      onClick={() => handleEditSession(session._id)}
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
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Session Feedback
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {feedbackData && (
                  <PieChart series={feedbackData} width={400} height={200} />
                )}
              </Typography>
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
