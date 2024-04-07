import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import StudentNavbar from '../components/Navbar/StudentNavbar';
import LandingNavbar from '../components/Navbar/LandingNavbar';

const LandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
    <LandingNavbar/>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: isMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 200px)',
        p: isMobile ? 2 : 5,
        bgcolor: 'background.default', // Use theme's default background
        textAlign: 'center',
    }}
    >
      {/* Main Title */}
      <Typography variant="h3" component="h1" sx={{
            fontWeight: 600,
            fontSize: isMobile ? '2.25rem' : '5rem', // Adjust font size based on the screen size
            lineHeight: isMobile ? '2.5rem' : '5.5rem', // Adjust line height for mobile
            mt: isMobile ? 2 : 4, // Adjust top margin
          }}>
        Instant Feedback App
      </Typography>
      
      {/* Subtitle/Description */}
      <Typography variant="subtitle1" sx={{ mt: 2, opacity: 0.8,fontSize: isMobile ? '1rem' : '1.25rem', }}>
        Enhance your teaching with ReflectEd— a tool for collecting instant feedback on lessons and gaining valuable insights to refine your teaching strategies.
      </Typography>
      
      {/* Get Started Button */}
      <Button
        variant="contained"
        sx={{
          mt:  isMobile ? 2 : 4,
          bgcolor: 'secondary.main', // Use theme's secondary color
          '&:hover': {
            bgcolor: 'secondary.dark', // Darken button on hover
          },
        }}
      >
        Get Started
      </Button>
    </Box>
    </>
  );
};

export default LandingPage;
