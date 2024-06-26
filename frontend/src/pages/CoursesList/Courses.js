import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CourseModal from "../../components/CourseModal";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import { AuthContext } from "../../context/AuthContext";

export default function Courses() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editCourseData, setEditCourseData] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
  const navigate = useNavigate();
  const { fetchWithToken } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCourses = async () => {
      const url = backendUrl + "/api/courses";
      const res = await fetchWithToken(url);
      const data = await res.json();

      setCourses(data.courses);
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const sessionData = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    try {
      const response = await fetchWithToken(`${backendUrl}/api/courses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      if (response.ok) {
        const newSession = await response.json();
        setOpenModal(false);
        const fetchCourses = async () => {
          const url = backendUrl + "/api/courses";
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
  const handleEditCourse = (course) => {
    setEditCourseData(course);
    setModalContent("editCourse");
    setOpenModal(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedCourseData = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    try {
      const response = await fetch(
        `${backendUrl}/api/courses/${editCourseData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourseData),
        }
      );

      if (!response.ok) throw new Error("Failed to update course.");

      const updatedCourse = await response.json();
      console.log("Course updated:", updatedCourse);

      // Update local state to reflect changes
      setCourses((currentCourses) =>
        currentCourses.map((course) =>
          course._id === editCourseData._id
            ? { ...course, ...updatedCourseData }
            : course
        )
      );

      setOpenModal(false); // Close modal upon success
      setModalContent(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    console.log("Delete", courseId);
    try {
      const response = await fetch(`${backendUrl}/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the course.");
      }
      console.log("Course deleted:", courseId);

      // Remove the deleted course from the local state to update the UI
      setCourses((currentCourses) =>
        currentCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const goToCourse = (courseId) => {
    navigate(`/sessions/${courseId}`);
  };

  const handleCreateSession = () => {
    setModalContent("createCourse");
    setOpenModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            sx={{ fontWeight: "bold", mt: 2, color: "#232222" }}
          >
            {t("coursesList.header")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateSession}
            sx={{ mb: 2 }}
            id="new-course"
          >
            {t("coursesList.createButton")}
          </Button>
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleEditCourse(course)}
                    >
                      {t("coursesList.editButton")}
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      {t("coursesList.deleteButton")}
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(
                          `Navigating to course with ID: ${course._id}`,
                          course
                        );
                        goToCourse(course._id);
                      }}
                    >
                      {t("coursesList.goToCourseButton")}
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
        handleEditSubmit={handleEditSubmit}
        handleDeleteCourse={handleDeleteCourse}
        courseData={editCourseData}
      />
    </Container>
  );
}
