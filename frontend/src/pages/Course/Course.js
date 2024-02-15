import styles from './Course.module.css';

const Course = () => {
    return(
        <div className={styles.main}>
            <div className={styles.leftContainer}>
                <h1>Course information</h1>
                <p>All information that you need about selected course.</p>
                <div className={styles.courseInfoBlock}>
                    <div>
                        <p>Course: GF399DX</p>
                        <p>Course student amount:</p>
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