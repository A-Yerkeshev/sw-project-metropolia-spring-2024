import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Grid } from '@mui/material';
import LanguageSwitcher from '../LanguageSwitcher';

const StudentNavbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            {/* <Link to="/">
              <img src="/navbar/logo.svg" alt="Logo" style={{ height: "40px" }} />
            </Link> */}
            {/*Logo in the Feedback form shown to students shouldn't link to app homepage*/}
            <img src="/navbar/logo.svg" alt="Logo" style={{ height: '40px' }} />
          </Grid>
          <Grid item>
            <LanguageSwitcher />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
