import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./Navbar.module.css";
import { useLogout } from "../../hooks/useLogout";
import Button from "@mui/material/Button";


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
    <div className={styles.mainNavBarContainer}>
      <div className={styles.topMenu}>
        {/* <div className={styles.topMenuEmail}>
          <div className={styles.topMenuEmailAvatar}></div>
          <p>{user.email}</p>
        </div> */}
        <div>
          <img src="/navbar/logo1.png" alt="course" width={"auto"} height={40}/>
        </div>
        <div className={styles.topMenuEmail}>
        <p>{user.email}</p>
        {/* <Button onClick={logout} variant="outlined">
          Logout
        </Button> */}
        </div>
      </div>
      <div className={styles.topMenu}>
        {/* <Link to="/Courses" variant="outlined">
          <img src="/navbar/CoursesList.svg" alt="course" />
          <p>Courses</p>
        </Link> */}
        <Button component={Link} to="/Courses" variant="outlined">
        Courses
        </Button>
        <Button onClick={logout} variant="outlined">
          Logout
        </Button>
        {/* <Link to="/Course" className={styles.bottonMenuContainer}>
          <img src="/navbar/Course.svg" alt="course" />
          <p>Course</p>
        </Link>
        <Link to="/Users" className={styles.bottonMenuContainer}>
          <img src="/navbar/Users.svg" alt="course" />
          <p>Users</p>
        </Link>
        <Link to="/Settings" className={styles.bottonMenuContainer}>
          <img src="/navbar/Settings.svg" alt="course" />
          <p>Setttings</p>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
