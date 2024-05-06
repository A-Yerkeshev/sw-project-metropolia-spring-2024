import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const hideOnRoutes = ['/signup', '/share', '/feedback/new'];

  if (!user || hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          fullWidth
        >
          <Grid item xs>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Link to={user ? '/' : '/'}>
                  <img
                    src="/navbar/logo.svg"
                    alt="Logo"
                    style={{ height: '40px' }}
                  />
                </Link>
              </Grid>
              <Grid item>
                <Button component={Link} to="/Courses" color="inherit">
                  {t('navbar.courses')}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              onClick={logout}
              color="inherit"
              id="sign-out"
              //style={{ marginLeft: '5%' }}
            >
              {t('navbar.logout')}
            </Button>
          </Grid>

          <Grid item>
            <LanguageSwitcher />
          </Grid>

          <Grid item>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              style={{
                marginTop: '-4%',
                borderRadius: '4px',
                padding: '2px 10px',
              }}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="body1">{user.firstName}</Typography>
                </Grid>

                <Grid item>
                  <AccountCircle />
                </Grid>
              </Grid>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{user.email}</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
