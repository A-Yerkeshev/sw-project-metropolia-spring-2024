import styles from './CoursesList.module.css';
import { useState, useEffect } from "react";
import BasicTable from './CoursesTable';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const url = process.env.REACT_APP_BACKEND_URL + '/api/courses';  
            const res = await fetch(url);
            const data = await res.json();

            setCourses(data.courses);
        }

        fetchCourses();
    }, []);

    return(
        <div className={styles.main}>
            <div className={styles.headerTextContainer}>
                <p className={styles.headerText}>Your Courses List</p>
                <p className={styles.subHeaderText}>All courses that been signed to your account in 30 days.</p>
            </div>
            {/* <div className={styles.searchButtonContainer}>
                    <div className={styles.searchButtonText}>
                        <p>GROUP CODE:</p>
                    </div>
                    <div className={styles.searchButtonIcon}>
                        <p className={styles.searchButtonIconText}>Search...</p>
                    </div>
            </div> */}
            <div className={styles.actionButtonContainer}>
                <div className={styles.actionButtonTime}>
                    {/* <CourseDetails/> */}
                </div>
                {/* <div className={styles.actionButtonCourse}>
                    <p className={styles.actionButtonCourseText}>Course</p>
                </div>
                <div className={styles.actionButtonGroup}>
                    <p className={styles.actionButtonGroupText}>Group</p>
                </div> */}
            </div>
            <BasicTable courses={courses} />
        </div>
    )
}

export default CoursesList;