import React, { useEffect, useState } from "react";
import CourseModal from "../../components/CourseModal";
import { Button, Container, Grid } from "@mui/material";

import styles from "./CoursesList.module.css";
import BasicTable from "./CoursesTable";

export default function CoursesCreateButton() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const url = process.env.REACT_APP_BACKEND_URL + "/api/courses";
      const res = await fetch(url);
      const data = await res.json();

      setCourses(data.courses);
      console.log(data.courses);
    };

    fetchCourses();
  }, []);

  const getUserDetails = () => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      try {
        return JSON.parse(userDetailsString);
      } catch (error) {
        console.error("Error parsing userDetails from localStorage:", error);
        return null; // or return an empty object {}
      }
    }
    return null; // or return an empty object {}
  };

  const userDetails = getUserDetails();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload

    const userDetails = getUserDetails();

    if (!userDetails || !userDetails.id) {
      console.error("User ID is missing from local storage.");
      return; // Handle this error appropriately
    }
    const formData = new FormData(event.target);
    const sessionData = {
      name: formData.get("name"),
      description: formData.get("description"),
      teacherId: userDetails.id,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses/`,
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
        const fetchCourses = async () => {
          const url = process.env.REACT_APP_BACKEND_URL + "/api/courses";
          const res = await fetch(url);
          const data = await res.json();

          setCourses(data.courses);
          console.log(data.courses);
        };

        fetchCourses();
      } else {
        throw new Error("Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  // const handleEditSubmit = async (event) => {
  //   event.preventDefault(); // Prevent the form from submitting in the traditional way
  //   const formData = new FormData(event.currentTarget);

  //   const updatedSessionData = {
  //     name: formData.get("name"),
  //     description: formData.get("description"),
  //     start: formData.get("start"),
  //     end: formData.get("end"),
  //   };

  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/api/sessions/${courseId}/${currentSession._id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updatedSessionData),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed to update session.");

  //     const updatedSession = await response.json();
  //     console.log("Session updated:", updatedSession);

  //     // Perform state updates or navigations here
  //     setOpenModal(false);
  //     setModalContent(null);
  //     //update the course or session list to reflect the changes
  //   } catch (error) {
  //     console.error("Error updating session:", error);
  //     // Handle error cases
  //   }
  // };

  const handleCreateSession = () => {
    setModalContent("createCourse");
    setOpenModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={styles.headerTextContainer}>
            <p className={styles.headerText}>Your Courses List</p>
            <p className={styles.subHeaderText}>
              All courses that been signed to your account in 30 days.
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateSession}
            sx={{ mb: 2 }}
          >
            Create Course
          </Button>
          <BasicTable courses={courses} />
          {/* {course.sessions.map((session) => (
              <Accordion key={session._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {session.name} -{" "}
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
                </AccordionDetails>
              </Accordion>
            ))} */}
        </Grid>
      </Grid>
      <CourseModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        modalContent={modalContent}
        // currentSession={currentSession}
        handleSubmit={handleSubmit}
        // handleEditSubmit={handleEditSubmit}
        // feedbackData={feedbackData}
        // feedbackTexts={feedbackTexts}
      />
    </Container>
  );
}
