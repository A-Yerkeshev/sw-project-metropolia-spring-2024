import { Typography, Grid, } from '@mui/material';
import LandingNavbar from '../components/Navbar/LandingNavbar';
import { useAuthContext } from '../hooks/useAuthContext';
import BasicCard from '../components/BasicCard';
import { useTranslation } from 'react-i18next';

const developers = [
  { 
    title: 'Developer: frontend',
    content: 'Anna Linden',
    description: 'adjective\nwell meaning and kindly.\n"a benevolent smile"',
    actionLink: 'https://github.com/AnnaLinden',
    linkedInLink: 'https://www.linkedin.com/in/anna-linden-software-developer/',
    imageUrl: '/navbar/developerPictures/Anna.jpg'
  },
  { 
    title: 'Developer: frontend',
    content: 'Artur Golavskiy',
    description: 'noun\na thing characteristic of its kind or illustrating a general rule.',
    actionLink: 'https://github.com/arturgola',
    linkedInLink: 'https://www.linkedin.com/in/artur-golavskiy/',
    imageUrl: '/navbar/developerPictures/Artur.jpg'
  },
  { 
    title: 'Developer: backend',
    content: 'Arman Yerkeshev',
    description: 'This is the description for the third card.',
    actionLink: 'https://github.com/A-Yerkeshev',
    linkedInLink: 'https://www.linkedin.com/in/arman-yerkesh-29b8a7165/',
    imageUrl: '/navbar/developerPictures/Arman.jpg'
  },
  { 
    title: 'Developer: backend',
    content: 'Dung Pham',
    description: 'This is the description for the fourth card.',
    actionLink: 'https://github.com/dungdpham',
    linkedInLink: 'https://www.linkedin.com/in/dungdpham/',
    imageUrl: '/navbar/developerPictures/Pham.png'
  },
];

const AboutUs = () => {
  
  const { user } = useAuthContext();
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      {!user && <LandingNavbar />}
      <Grid container spacing={3} justifyContent="center" sx={{ padding: 15 }}>
        {developers.map((developer, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <BasicCard
              title={developer.title}
              content={developer.content}
              actionLink={developer.actionLink}
              linkedInLink={developer.linkedInLink}
              imageUrl={developer.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
        <Typography variant="body1" align="center">
          {t('aboutus.loremIpsum')}
        </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;