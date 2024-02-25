import styles from './Course.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch(`http://localhost:4000/api/courses/${courseId}`);
            const data = await response.json();
            setCourse(data.course);
        };

        fetchCourse();
    }, [courseId]); // Dependency array ensures this effect runs only when courseId changes

    if (!course) {
        return <div>Loading...</div>;
    }

    return(
        <div className={styles.main}>
            <div className={styles.leftContainer}>
                <h1>Course information</h1>
                <p>All information that you need about selected course.</p>
                <div className={styles.courseInfoBlock}>
                    <div>
                        <p>Course:  {course.name}</p>
                        <p>Course student amount: {course.students ? course.students.length : 'N/A'}</p>
                        <p>Class number:</p>
                    </div>
                    <p>Visit Metropolia</p>
                </div>
                <div className={styles.contactUsBlock}>
                    <p>Contact our support</p>
                    <p>Go to service page for more information</p>
                    <p>Contact Us</p>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <img src="/course/qrCode.svg" alt="QR Code" className={styles.qrCodeContainer} />
                <button className={styles.button1}>Generate QR</button>
                <button className={styles.button1}>Close QR</button>
            </div>
      </div>
    );
  }

export default Course;