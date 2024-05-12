import { Box, Typography, Button, Grid, useTheme, useMediaQuery} from '@mui/material';
import LandingNavbar from '../components/Navbar/LandingNavbar';
import FeatureCard from '../components/FeatureCard';
import StatisticsIcon from '@mui/icons-material/Assessment';
import AnonymousIcon from '@mui/icons-material/PersonOff';
import CourseIcon from '@mui/icons-material/MenuBook';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const LandingPage = () => {
    const {user} = useAuthContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

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
      <Typography
        variant="h3"
        component="h1"
        sx={{
        fontWeight: 600,
        fontSize: isMobile ? '2.25rem' : '5rem',
        lineHeight: isMobile ? '2.5rem' : '5.5rem',
        mt: isMobile ? 2 : 4,
        }}
        >
        ReflectEd
      </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, opacity: 0.8, fontSize: isMobile ? '1rem' : '1.25rem' }}>
          {t('landingPage.subtitle')}
        </Typography>
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
        {t('landingPage.getStarted')}
        </Button>
      </Link>
      <KeyboardDoubleArrowDownIcon
        sx={{
        mt: 13,
        fontSize: '5rem',
        }}
      />
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
  <FeatureCard
    icon={<QrCodeScannerIcon />}
    title={t('landingPage.qrFeedbackTitle')}
    description={t('landingPage.qrFeedbackDescription')}
  />
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6}>
  <FeatureCard
    icon={<StatisticsIcon />}
    title={t('landingPage.feedbackStatisticsTitle')}
    description={t('landingPage.feedbackStatisticsDescription')}
  />
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6}>
  <FeatureCard
    icon={<AnonymousIcon />}
    title={t('landingPage.anonymousFeedbackTitle')}
    description={t('landingPage.anonymousFeedbackDescription')}
  />
</Grid>
<Grid item xs={12} sm={12} md={6} lg={6}>
  <FeatureCard
    icon={<CourseIcon />}
    title={t('landingPage.courseCreationTitle')}
    description={t('landingPage.courseCreationDescription')}
  />
</Grid>
      </Grid>
      <Footer/>
    </>
  );
};

export default LandingPage;
