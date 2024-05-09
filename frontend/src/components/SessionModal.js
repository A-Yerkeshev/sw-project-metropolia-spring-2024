// SessionModal.js
import React from 'react';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/en';
import { enUS } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/ru';
import { ruRU } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/fi';
import { fiFI } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/vi';
import { viVN } from '@mui/x-date-pickers/locales';

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
  errorMessage,
}) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  let placeholdersLocale = enUS;
  switch (i18n.language) {
    case 'ru':
      placeholdersLocale = ruRU;
      break;
    case 'fi':
      placeholdersLocale = fiFI;
      break;
    case 'vi':
      placeholdersLocale = viVN;
      break;
    default:
      placeholdersLocale = enUS;
      break;
  }

  console.log(feedbackTexts);
  console.log(feedbackData);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language}
      localeText={
        placeholdersLocale.components.MuiLocalizationProvider.defaultProps
          .localeText
      }
    >
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {modalContent === 'statistics'
            ? t('modals.feedback.textFeedbackHeader')
            : modalContent === 'createSession'
            ? t('modals.session.createHeader')
            : t('modals.session.editHeader')}
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          {modalContent === 'statistics' && (
            <>
              {feedbackData[0].data.length > 0 && (
                <PieChart series={feedbackData} width={500} height={200} />
              )}

              {feedbackTexts.length > 0 ? (
                <>
                  <Typography sx={{ mt: 2 }}>
                    <strong>{t('modals.feedback.textFeedback')}</strong>
                  </Typography>
                  {feedbackTexts.map((text, index) => (
                    <Typography key={index}>
                      {text.text ? `(${text.createdAt}) ${text.text}` : ''}
                    </Typography>
                  ))}
                </>
              ) : (
                <Typography>
                  {t('modals.feedback.noFeedbackMessage')}
                </Typography>
              )}
            </>
          )}
          {(modalContent === 'createSession' ||
            modalContent === 'editSession') && (
            <form
              onSubmit={
                modalContent === 'createSession'
                  ? handleSubmit
                  : handleEditSubmit
              }
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label={t('modals.session.nameLabel')}
                    type="text"
                    defaultValue={
                      modalContent === 'editSession' ? currentSession.name : ''
                    }
                    fullWidth
                    required
                    style={{ marginTop: '10px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('modals.session.descriptionLabel')}
                    multiline
                    defaultValue={
                      modalContent === 'editSession'
                        ? currentSession.description
                        : ''
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    name="start"
                    label={t('modals.session.startLabel')}
                    defaultValue={
                      modalContent === 'editSession'
                        ? dayjs(currentSession.start)
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    name="end"
                    label={t('modals.session.endLabel')}
                    defaultValue={
                      modalContent === 'editSession'
                        ? dayjs(currentSession.end)
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose}>
                  {t('modals.session.cancelButton')}
                </Button>
                <Button type="submit">
                  {t('modals.session.submitButton')}
                </Button>
                {modalContent === 'editSession' && (
                  <Button
                    onClick={() => handleDeleteSession(currentSession._id)}
                    color="error"
                  >
                    {t('modals.session.deleteButton')}
                  </Button>
                )}
              </DialogActions>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default SessionModal;
