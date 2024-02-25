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

    const handleCreateSession = () => {
        // Placeholder for create session logic
        console.log('Creating a new session...');
    };

    const handleEditSession = (sessionId) => {
        // Placeholder for edit session logic
        console.log('Editing session:', sessionId);
    };

    const handleDeleteSession = (sessionId) => {
        // Placeholder for delete session logic
        console.log('Deleting session:', sessionId);
    };
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
                        <button onClick={handleCreateSession} className={styles.button1}>Create Session</button>
                    </div>
                    {/* Sessions list */}
                    {course.sessions && course.sessions.length > 0 && (
                        <div>
                            <h2>Sessions</h2>
                            {course.sessions.map((session) => (
                                <div key={session._id} className={styles.sessionBlock}>
                                    <p>Name: {session.name}</p>
                                    <p>Description: {session.description}</p>
                                    <p>Start: {new Date(session.start).toLocaleString()}</p>
                                    <p>End: {new Date(session.end).toLocaleString()}</p>
                                    <div className={styles.buttonContainer}>
                                        <button onClick={() => handleEditSession(session._id)} className={styles.button1}>Edit</button>
                                        <button onClick={() => handleDeleteSession(session._id)} className={styles.button1}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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