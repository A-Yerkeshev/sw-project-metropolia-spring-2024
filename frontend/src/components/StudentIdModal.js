import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const StudentIdModal = ({
  openModal,
  handleClose,
  existingStudentIds,
  handleSubmit,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [studentIds, setStudentIds] = useState(existingStudentIds);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError('');
  };

  const handleInputKeydown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (isNaN(inputValue.trim())) {
        setError('Please enter numbers only');
        return;
      }

      const newStudentId = parseInt(inputValue.trim());

      if (newStudentId !== '' && !studentIds.includes(newStudentId)) {
        setStudentIds([...studentIds, newStudentId]);
        setInputValue('');
      } else {
        setError('Student ID already exists!');
      }
    }
  };

  const handleDeleteStudentId = (studenIdToDelete) => {
    setStudentIds(studentIds.filter((id) => id !== studenIdToDelete));
  };

  const handleSubmitStudentId = (event) => {
    event.preventDefault();
    handleSubmit(studentIds);
    setInputValue('');
    setError('');
    handleClose();
  };

  const handleModalClose = () => {
    setStudentIds(existingStudentIds);
    setInputValue('');
    setError('');
    handleClose();
  };

  return (
    <Dialog open={openModal} onClose={handleModalClose} fullWidth maxWidth="sm">
      <DialogTitle>
      {t('modals.studentId.header')} {' '}
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          {t('modals.studentId.instruction')} {' '}
        </Typography>
        <TextField
          label={t('modals.studentId.inputLabel')}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
          fullWidth
          error={!!error}
          helperText={error}
          style={{ marginTop: '10px' }}
        />
        <div style={{ marginTop: '10px' }}>
          {studentIds.map((id, index) => (
            <Chip
              key={index}
              label={id}
              onDelete={() => handleDeleteStudentId(id)}
              style={{ margin: '5px' }}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button 
        onClick={handleModalClose}>{t('modals.studentId.cancelButton')}
        </Button>
        <Button 
        onClick={handleSubmitStudentId}>{t('modals.studentId.submitButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentIdModal;
