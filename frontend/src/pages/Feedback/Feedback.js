import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import styles from './Feedback.module.css';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StudentNavbar from '../../components/Navbar/StudentNavbar';

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sid');

  const [rating, setRating] = useState('');
  const [openFeedback, setOpenFeedback] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
  const { t, i18n } = useTranslation();

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };

  const handleChangeOpenFeedback = (event) => {
    setOpenFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    if (!rating) {
      setSubmitStatus('error');
      setSubmitMessage(t('feedback.ratingIsRequired'));
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/feedbacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
        body: JSON.stringify({
          rating: Number(rating),
          text: openFeedback,
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json(); //parse response body to get error details
        const errorMessage =
          errorBody.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      //const data = await response.json();
      setSubmitStatus('success');
      setSubmitMessage(t('feedback.successMessage'));
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.message || t('feedback.errorMessage'));
    }
  };

  const untickedIconStyle = {
    icon: { fontSize: 45 },
  };

  const iconColorStyles = {
    positive: { color: 'green', fontSize: 48 },
    neutral: { color: 'yellow', fontSize: 48 },
    negative: { color: 'red', fontSize: 48 },
  };

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <StudentNavbar />
      <Box
        sx={{
          p: 3,
          mb: 2,
          backgroundColor: 'background.paper',
          borderRadius: '4px',
          flexGrow: 1, // This makes the Box fill available space
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormControl
            component="fieldset"
            className={styles.formControl}
            fullWidth
            sx={{ width: '100%', mt: 2 }}
          >
            <FormLabel component="legend" className={styles.legend}>
              {t('feedback.rate')}
            </FormLabel>
            <RadioGroup
              name="rate"
              value={rating}
              onChange={handleChangeRating}
              row
              label={t('feedback.rate')}
              sx={{
                justifyContent: 'space-around',
                mb: 2,
                mt: 2,
                width: '100%',
              }}
            >
              <FormControlLabel
                value="3"
                control={
                  <Radio
                    icon={<InsertEmoticonIcon style={untickedIconStyle.icon} />}
                    checkedIcon={
                      <InsertEmoticonIcon style={iconColorStyles.positive} />
                    }
                  />
                }
                aria-label={t('feedback.positive')}
                sx={{
                  '.MuiTypography-root': {
                    color: rating === '3' ? 'green' : 'inherit',
                  },
                }}
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    icon={
                      <SentimentSatisfiedIcon style={untickedIconStyle.icon} />
                    }
                    checkedIcon={
                      <SentimentSatisfiedIcon style={iconColorStyles.neutral} />
                    }
                  />
                }
                aria-label={t('feedback.neutral')}
                sx={{
                  '.MuiTypography-root': {
                    color: rating === '2' ? 'yellow' : 'inherit',
                  },
                }}
              />
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    icon={
                      <SentimentVeryDissatisfiedIcon
                        style={untickedIconStyle.icon}
                      />
                    }
                    checkedIcon={
                      <SentimentVeryDissatisfiedIcon
                        style={iconColorStyles.negative}
                      />
                    }
                  />
                }
                aria-label={t('feedback.negative')}
                sx={{
                  '.MuiTypography-root': {
                    color: rating === '1' ? 'red' : 'inherit',
                  },
                }}
              />
            </RadioGroup>
            <TextField
              label={t('feedback.openFeedbackLabel')}
              name="open-feedback"
              multiline
              rows={4}
              margin="normal"
              fullWidth
              value={openFeedback}
              onChange={handleChangeOpenFeedback}
            />
            <Box className={styles.submitButtonContainer}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                {t('feedback.submit')}
              </Button>
            </Box>
            {submitStatus && (
              <Box mt={2} className={styles[submitStatus]}>
                <Typography
                  variant="body1"
                  color={submitStatus === 'success' ? 'green' : 'red'}
                >
                  {submitMessage}
                </Typography>
              </Box>
            )}
          </FormControl>
        </Box>
      </Box>
    </Container>
  );
};

export default Feedback;
