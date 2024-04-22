// ResetPassword.jsx
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');
  const { t, i18n } = useTranslation();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
  const queryParams = new URLSearchParams(location.search);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = queryParams.get("token");

    try {
      const response = await fetch(`${backendUrl}/api/users/changepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language
        },
        body: JSON.stringify({ email, password, passwordRep, token }),
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error);
      }
      setError('');
      setMessage(res.message);
    } catch (error) {
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('resetPassword.header')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('resetPassword.emailAddressLabel')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('resetPassword.newPasswordLabel')}
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password-rep"
            label={t('resetPassword.passwordRepLabel')}
            type="password"
            id="password-rep"
            autoComplete="new-password"
            value={passwordRep}
            onChange={(e) => setPasswordRep(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('resetPassword.submitButton')}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="success.main">{message}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
