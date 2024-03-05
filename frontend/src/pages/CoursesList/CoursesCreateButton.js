import React, { useEffect, useState, useContext } from "react";
import CourseModal from "../../components/CourseModal";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import styles from "./CoursesList.module.css";
import BasicTable from "./CoursesTable";
import { AuthContext } from '../../context/AuthContext';

export default function CoursesCreateButton() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [courses, setCourses] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
  const { fetchWithToken } = useContext(AuthContext);

  useEffect(() => {
      const fetchCourses = async () => {
          const url = backendUrl + '/api/courses';
          const res = await fetchWithToken(url);
          const data = await res.json();

      setCourses(data.courses);
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
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const sessionData = {
      name: formData.get("name"),
      description: formData.get("description")
    };

    try {
      const response = await fetchWithToken(
        `${backendUrl}/api/courses/`,
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
        // Optionally, refresh the list of sessions or add the new session to the state
        setOpenModal(false); // Close the modal
        const fetchCourses = async () => {
          const url = backendUrl + '/api/courses';
          const res = await fetchWithToken(url);
          const data = await res.json();

          setCourses(data.courses);
        };

        fetchCourses();
      } else {
        throw new Error("Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  const handleEditCourse = (courseId) => {
    console.log("Edit", courseId);
    // Implementation for opening edit modal or redirecting to an edit page
  };

  const handleDeleteCourse = (courseId) => {
    console.log("Delete", courseId);
    // Implementation for deleting a course
  };

  const goToCourse = (courseId) => {
    console.log("Go to Course", courseId);
    // Implementation for navigating to the course's detailed view
    // This might involve using the `useNavigate` hook from `react-router-dom` if you're using React Router
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
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {course.description}
                    </Typography>
                    {/* Include other course details here */}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEditCourse(course.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                    <Button size="small" onClick={() => goToCourse(course.id)}>
                      Go to Course
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <CourseModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        modalContent={modalContent}
        handleSubmit={handleSubmit}
      />
    </Container>
    )
}
