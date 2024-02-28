import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Course.module.css";
import SessionModal from "../../components/SessionModal";

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackTexts, setFeedbackTexts] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/${courseId}`
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
        `${process.env.REACT_APP_BACKEND_URL}/api/sessions/${courseId}`,
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

  const handleDeleteSession = async (sessionId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/sessions/${courseId}/${sessionId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete session.");

      console.log("Session deleted:", sessionId);

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
    const formData = new FormData(event.currentTarget);

    const updatedSessionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      start: formData.get("start"),
      end: formData.get("end"),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/sessions/${courseId}/${currentSession._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSessionData),
        }
      );

      if (!response.ok) throw new Error("Failed to update session.");

      const updatedSession = await response.json();
      console.log("Session updated:", updatedSession);

      // Perform state updates or navigations here
      setOpenModal(false);
      setModalContent(null);
      //update the course or session list to reflect the changes
    } catch (error) {
      console.error("Error updating session:", error);
      // Handle error cases
    }
  };

  const handleShowStatistics = async (sessionId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/feedbacks?sessionId=${sessionId}`
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
          id: index,
          value: 1, // Each feedback counts as one
          label: `Rating ${feedback.rating}`,
          color: color, // Assign color based on rating
        };
      });

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
