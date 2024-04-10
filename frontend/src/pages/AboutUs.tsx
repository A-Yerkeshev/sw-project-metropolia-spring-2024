import { Typography, Grid, } from '@mui/material';
import LandingNavbar from '../components/Navbar/LandingNavbar';
import { useAuthContext } from '../hooks/useAuthContext';
import BasicCard from '../components/BasicCard';

const developers = [
    { 
      title: 'Developer: frontend',
      content: 'Anna Linden',
      description: 'adjective\nwell meaning and kindly.\n"a benevolent smile"',
      actionLink: 'https://github.com/developer1',
      imageUrl: '/navbar/developer1.png'
    },
    { 
      title: 'Developer: frontend',
      content: 'Artur Golavskiy',
      description: 'noun\na thing characteristic of its kind or illustrating a general rule.',
      actionLink: 'https://github.com/developer2',
      imageUrl: '/navbar/developer1.png'
    },
    { 
      title: 'Developer: backend',
      content: 'Arman Yerkeshev',
      description: 'This is the description for the third card.',
      actionLink: 'https://github.com/developer3',
      imageUrl: '/navbar/developer1.png'
    },
    { 
      title: 'Developer: backend',
      content: 'Dung Pham',
      description: 'This is the description for the fourth card.',
      actionLink: 'https://github.com/developer4',
      imageUrl: '/navbar/developer1.png'
    },
];

const AboutUs = () => {
  const { user } = useAuthContext();

  return (
    <div style={{ backgroundColor: '#fff', padding: 15, minHeight: '100vh' }}>
      {!user && <LandingNavbar />}
      <Grid container spacing={3} justifyContent="center" sx={{ padding: 15 }}>
        {developers.map((developer, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}> {/* Set 2 columns on md screens */}
            <BasicCard
              title={developer.title}
              content={developer.content}
              actionLink={developer.actionLink}
              imageUrl={developer.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="body1" align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis enim eget purus hendrerit commodo.
            Phasellus fringilla efficitur justo non laoreet. Nullam tempor arcu in ex tincidunt, vel tincidunt justo
            blandit. Nullam vel pulvinar odio. Aenean malesuada sit amet nisi ut fringilla. Nullam sollicitudin nisi
            vitae mi commodo, et cursus sapien aliquam.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;