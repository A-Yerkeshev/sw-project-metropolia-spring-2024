// SessionModal.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SessionModal = ({
  feedbackData = [],
  feedbackTexts = [],
  openModal,
  handleClose,
  modalContent,
  currentSession,
  handleSubmit,
  handleEditSubmit,
  handleDeleteSession,
}) => {
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {modalContent === "statistics"
          ? "Session Feedback"
          : modalContent === "createSession"
          ? "Create New Session"
          : "Edit Session"}
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
        {modalContent === "statistics" && (
          <>
            {feedbackData && (
              <PieChart series={feedbackData} width={400} height={200} />
            )}
            <Typography sx={{ mt: 2 }}>
              <strong>Text Feedback:</strong>
            </Typography>
            {feedbackTexts.length > 0 ? (
              feedbackTexts.map((text, index) => (
                <Typography key={index}>
                  {text || "No text feedback provided."}
                </Typography>
              ))
            ) : (
              <Typography>No text feedback available.</Typography>
            )}
          </>
        )}
        {(modalContent === "createSession" ||
          modalContent === "editSession") && (
          <form
            onSubmit={
              modalContent === "createSession" ? handleSubmit : handleEditSubmit
            }
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Session Name"
                  type="text"
                  defaultValue={
                    modalContent === "editSession" ? currentSession.name : ""
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Session Description"
                  multiline
                  defaultValue={
                    modalContent === "editSession"
                      ? currentSession.description
                      : ""
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="start"
                  label="Start Time"
                  type="datetime-local"
                  defaultValue={
                    modalContent === "editSession" ? currentSession.start : ""
                  }
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="end"
                  label="End Time"
                  type="datetime-local"
                  defaultValue={
                    modalContent === "editSession" ? currentSession.end : ""
                  }
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
              {modalContent === "editSession" && (
                <Button
                  onClick={() => handleDeleteSession(currentSession._id)}
                  color="error"
                >
                  Delete Session
                </Button>
              )}
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SessionModal;
