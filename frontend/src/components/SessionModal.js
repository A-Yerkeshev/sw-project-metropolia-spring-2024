// SessionModal.js
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

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
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        {modalContent === "statistics" && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Session Feedback
            </Typography>
            {feedbackData && (
              <PieChart series={feedbackData} width={400} height={200} />
            )}
            <Typography sx={{ mt: 2 }}>
              <strong>Text Feedback:</strong>
              {feedbackTexts.length > 0 ? (
                feedbackTexts.map((text, index) => (
                  <div key={index}>{text || "No text feedback provided."}</div>
                ))
              ) : (
                <div>No text feedback available.</div>
              )}
            </Typography>
          </>
        )}
        {modalContent === "createSession" && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
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
                <button type="submit">Save Changes</button>
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
  );
};

export default SessionModal;
