import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ width: '100%', padding: 4, backgroundColor: 'white', textAlign: 'center' }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Created by Metropolia students 2024
      </Typography>
      {/* Add any links or social media icons here */}
    </Box>
  );
};

export default Footer;
