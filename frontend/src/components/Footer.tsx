import { Box, Typography } from '@mui/material';
import * as React from "react";
import Link from "@mui/material/Link";
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "auto", padding: "7%", backgroundColor: 'white', textAlign: 'center' }}>
      <Typography variant="body2" align="center" color="textSecondary" sx={{ fontWeight: 'bold', color: 'black' }}>
        <Link color="inherit" href="/about-us">{t('footer.aboutUs')}</Link>
        <br />
        {t('footer.createdBy')} {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;