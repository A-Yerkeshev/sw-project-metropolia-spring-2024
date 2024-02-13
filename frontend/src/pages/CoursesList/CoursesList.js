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
        </div>
    )
}

export default CoursesList;