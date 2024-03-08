import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Navbar.module.css";
import { useLogout } from "../../hooks/useLogout";
import { AppBar, Toolbar, Button, Typography, Grid } from "@mui/material";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();

  // Define the routes where the Navbar should not be displayed
  const hideOnRoutes = ["/", "/signup", "/share", "/feedback/new"];

  // Check if the current route is in the list of routes to hide the Navbar on
  if (!user || hideOnRoutes.includes(location.pathname)) {
    return null;
  }

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
                <img
                  src="/navbar/logo.svg"
                  alt="Logo"
                  style={{ height: "40px" }}
                />
              </Grid>
              <Grid item>
                <Button component={Link} to="/Courses" color="inherit">
                  Courses
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid item>
                <Button onClick={logout} color="inherit">
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
