import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null); // State for managing menu anchor

  // Define the routes where the Navbar should not be displayed
  const hideOnRoutes = ["/signup", "/share", "/feedback/new"];

  // Check if the current route is in the list of routes to hide the Navbar on
  if (!user || hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  //  opening and closing of the user menu
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
                <Link to={user ? "/" : "/"}>
                  <img
                    src="/navbar/logo.svg"
                    alt="Logo"
                    style={{ height: "40px" }}
                  />
                </Link>
              </Grid>
              <Grid item>
                <Button component={Link} to="/Courses" color="inherit">
                  {t("navbar.courses")}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <LanguageSwitcher />
              </Grid>
              <Grid item>
                <Button onClick={logout} color="inherit">
                  {t("navbar.logout")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
