import styles from './CoursesList.module.css';

const CoursesList = () => {
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
        </div>
    )
}

export default CoursesList;