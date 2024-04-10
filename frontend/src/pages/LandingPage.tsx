import React from 'react';
import { Box, Typography, Button, Grid, useTheme, useMediaQuery} from '@mui/material';
import LandingNavbar from '../components/Navbar/LandingNavbar';
import Navbar from '../components/Navbar/Navbar';
import FeatureCard from '../components/FeatureCard';
import StatisticsIcon from '@mui/icons-material/Assessment';
import AnonymousIcon from '@mui/icons-material/PersonOff';
import CourseIcon from '@mui/icons-material/MenuBook';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
    const {user} = useAuthContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
    {!user && <LandingNavbar/>}
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
        maxWidth: '100%', // Ensure the box takes up full width to properly calculate margins
    px: { // Responsive padding on the x-axis (left and right)
      xs: 2, // Smaller padding on smaller screens
      sm: '10%', // Starts to increase padding as the screen size grows
      md: '15%', // Further increase for medium screens
      lg: '20%', // Target 20% space on left and right for large screens
    },
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
      <Link to="/signup" style={{ textDecoration: 'none' }}>
  <Button
    variant="contained"
    sx={{
      mt: isMobile ? 2 : 4,
      bgcolor: 'secondary.main', 
      '&:hover': {
        bgcolor: 'secondary.dark',
      },
    }}
  >
    Get Started
  </Button>
</Link>
    </Box>
    <Grid container spacing={2} sx={{
  justifyContent: 'center',
  alignItems: 'center', 
  px: { // Responsive padding on the x-axis (left and right)
    xs: 2, // Smaller padding on smaller screens
    sm: '10%', // Starts to increase padding as the screen size grows
    md: '15%', // Further increase for medium screens
    lg: '20%', // Target 20% space on left and right for large screens
  },
  width: 'auto', // Adjust width to fit the content plus padding
  bgcolor: 'background.default',
  margin: '0 auto', // Center the grid container
}}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FeatureCard icon={<QrCodeScannerIcon />} title="QR Feedback Collection" description="QR codes for instant feedback collection make the process seamless and efficient." />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FeatureCard icon={<StatisticsIcon />} title="Feedback Statistics" description="Access insightful feedback statistics to analyze and improve teaching outcomes." />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FeatureCard icon={<AnonymousIcon />} title="Anonymous Feedback" description="Encourage honest and constructive feedback by allowing anonymity for respondents." />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FeatureCard icon={<CourseIcon />} title="Course Creation" description="Easily create comprehensive courses, organizing your teaching material effectively." />
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default LandingPage;
