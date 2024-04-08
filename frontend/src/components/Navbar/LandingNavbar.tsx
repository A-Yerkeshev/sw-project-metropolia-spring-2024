import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Grid, Box } from '@mui/material';
import LanguageSwitcher from '../LanguageSwitcher';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTranslation } from "react-i18next";

const LandingNavbar = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  return (
    <AppBar position="static"  elevation={1}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Logo on the left */}
          <Grid item>
            <Link to={user ? "/Courses" : "/"}>
              <img
                src="/navbar/logo.svg"
                alt="Logo"
                style={{ height: "40px" }}                  />
            </Link>
          </Grid>

          {/* Right side content: Login, Signup, LanguageSwitcher */}
          <Grid item>
            <Box display="flex" alignItems="center" height="100%">
              {/* Login Button */}
              <Button component={Link} to="/login" color="inherit">
                {t('navbar.login')}
              </Button>

              {/* Signup Button */}
              <Button component={Link} to="/signup" color="inherit">
                {t('navbar.signup')}
              </Button>

              {/* Language Selector */}
              {/* Ensure LanguageSwitcher aligns correctly; you might need to adjust LanguageSwitcher's internal styling if it's a custom component */}
              <LanguageSwitcher />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default LandingNavbar;
