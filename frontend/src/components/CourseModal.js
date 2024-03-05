// CourseModal.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CourseModal = ({
  courseData = {}, // Изменение: Используем courseData для отображения данных о курсе
  openModal,
  handleClose,
  modalContent,
  handleSubmit,
  handleEditSubmit,
  handleDeleteCourse,
}) => {
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {modalContent === "createCourse" ? "Create New Course" : "Edit Course"}{" "}
        {/* Изменение: Текст заголовка */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {(modalContent === "createCourse" || modalContent === "editCourse") && (
          <form
            onSubmit={
              modalContent === "createCourse" ? handleSubmit : handleEditSubmit
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Course Name"
                  type="text"
                  defaultValue={
                    modalContent === "editCourse" ? courseData.name : "" // Изменение: Используем courseData.name
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Course Description"
                  multiline
                  defaultValue={
                    modalContent === "editCourse" ? courseData.description : "" // Изменение: Используем courseData.description
                  }
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
              {modalContent === "editCourse" && (
                <Button
                  onClick={() => handleDeleteCourse(courseData._id)} // Изменение: Используем courseData._id
                  color="error"
                >
                  Delete Course
                </Button>
              )}
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;
