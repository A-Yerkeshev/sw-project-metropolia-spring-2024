import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface FeatureCardProps {
  icon: React.ReactNode; 
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : 320,
        height: 304,
        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: '#F7F7F7',
        borderRadius: '10px',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 70,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E6E6E6',
          borderRadius: '10px',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
