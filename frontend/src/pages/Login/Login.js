import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import StudentNavbar from '../../components/Navbar/StudentNavbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset form error state
    setFormError('');

    // Basic validation for empty fields
    if (!email.trim() || !password.trim()) {
      setFormError(t('login.emailAndPasswordRequired')); // Set an error message
      return; // Prevent the form from being submitted
    }

    try {
      await login(email, password);
      navigate('/Courses');
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <>
      <StudentNavbar />
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('login.header')}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('login.emailAddressLabel')}
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
              label={t('login.passwordLabel')}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              id="login-btn"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {t('login.loginButton')}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {formError && <Typography color="error">{formError}</Typography>}

            <Grid container>
              <Grid item>
                <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2">
                    {t('login.signUpPrompt')}
                  </Typography>
                </RouterLink>
                <RouterLink to="/resetpassword" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2">
                    {t('login.resetPassword')}
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
