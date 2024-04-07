import React from 'react';
import { Box, Typography, Button, Grid, useTheme, useMediaQuery} from '@mui/material';
import StudentNavbar from '../components/Navbar/StudentNavbar';
import LandingNavbar from '../components/Navbar/LandingNavbar';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';
import FeedbackIcon from '@mui/icons-material/Feedback';
import StatisticsIcon from '@mui/icons-material/Assessment';
import AnonymousIcon from '@mui/icons-material/PersonOff';
import CourseIcon from '@mui/icons-material/MenuBook';

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
    <Grid container spacing={2} sx={{ justifyContent: 'center', p: isMobile ? 2 : 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard icon={<FeedbackIcon />} title="QR Feedback Collection" description="QR codes for instant feedback collection make the process seamless and efficient." />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard icon={<StatisticsIcon />} title="Feedback Statistics" description="Access insightful feedback statistics to analyze and improve teaching outcomes." />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard icon={<AnonymousIcon />} title="Anonymous Feedback" description="Encourage honest and constructive feedback by allowing anonymity for respondents." />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard icon={<CourseIcon />} title="Course Creation" description="Easily create comprehensive courses, organizing your teaching material effectively." />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default LandingPage;
