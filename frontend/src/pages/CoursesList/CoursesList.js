import styles from './CoursesList.module.css';
import { useState, useEffect } from "react";

const CoursesList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // const url = process.env.REACT_APP_BACKEND_URL + '/api/courses';

        // const fetchCourses = async () => {
        //   const res = await fetch(url);
        //   const courses = await res.json();

        //   setCourses(courses);
        //   console.log(courses);
        // }

        // fetchCourses();

        const courses = [
            {
                _id: '2874682101',
                name: 'Software 1',
                students: [1,2,3],
                teachers: [{
                    firstName: 'Juso',
                    lastName: 'Pehkonen'
                }]
            }, {
                _id: '2874682102',
                name: 'Software 2',
                students: [1,2,3,4,5],
                teachers: [{
                    firstName: 'Jarkko',
                    lastName: 'Punavuori'
                }, {
                    firstName: 'Asko',
                    lastName: 'Mattila'
                }]
            },
        ];

        setCourses(courses);
    }, []);

    return(
        <div className={styles.main}>
            <div className={styles.headerTextContainer}>
                <p className={styles.headerText}>You’re Courses List</p>
                <p className={styles.subHeaderText}>All courses that been signed to you’re account in 30 days.</p>
            </div>
            <div className={styles.searchButtonContainer}>
                    <div className={styles.searchButtonText}>
                        <p>GROUP CODE:</p>
                    </div>
                    <div className={styles.searchButtonIcon}>
                        <p className={styles.searchButtonIconText}>Search...</p>
                    </div>
            </div>
            <div className={styles.actionButtonContainer}>
                <div className={styles.actionButtonTime}>
                    <p className={styles.actionButtonTimeText}>Timeframe:</p>
                </div>
                <div className={styles.actionButtonCourse}>
                    <p className={styles.actionButtonCourseText}>Course</p>
                </div>
                <div className={styles.actionButtonGroup}>
                    <p className={styles.actionButtonGroupText}>Group</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Students</th>
                        <th>Teachers</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {courses.map((course) => {
                    return  <tr key={course._id}>
                                <td>{course.name}</td>
                                <td>{course.students.length}</td>
                                <td>{course.teachers.map((teacher) => teacher.firstName + ' ' + teacher.lastName).join(', ')}</td>
                                <td>
                                    <a className={styles.courseBtn} href={`/courses/${course._id}`}>Go to course</a>
                                </td>
                            </tr>
                })}
                </tbody>
            </table>
            <div>
                <button className={styles.openButtom}>Open</button>
            </div>
        </div>
    )
}

export default CoursesList;