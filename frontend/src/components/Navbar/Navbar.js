import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'; 
import styles from './Navbar.module.css';
import  {useLogout} from '../../hooks/useLogout'

const Navbar = () => {
    const { user } = useAuthContext();
    const {logout} = useLogout();

    console.log('Navbar user:', user);

    if (!user) {
        return null;
    }

    return (
        <div className={styles.mainNavBarContainer}>
            <div className={styles.topMenu}> 
                <div className={styles.topMenuEmail}>
                    <div className={styles.topMenuEmailAvatar}>   
                    </div>
                    <p>{user.email}</p>
                </div>
                <div className={styles.topMenuUserAvatar}>
                </div>
                <button onClick={logout} className={styles.logoutButton}>Logout</button>
            </div>           
            <div className={styles.bottonMenu}>
                <Link to="/CoursesList" className={styles.bottonMenuContainer}>
                <img src="/navbar/CoursesList.svg" alt="course" />
                <p>Courses List</p>
                </Link>
                <Link to="/Course" className={styles.bottonMenuContainer}>
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
                </Link>
            </div>
        </div>
    );
}

export default Navbar;