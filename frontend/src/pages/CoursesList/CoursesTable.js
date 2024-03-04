// CoursesTable.jsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './CoursesList.module.css';
import Container from '@mui/material/Container';

export default function BasicTable({ courses }) {
    if (!courses || courses.length === 0) {
        return <p>No courses available</p>;
    }

    return (
        <Container sx={{ mt: 4, width: '100%', padding: 0}} maxWidth={false}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Students</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course._id}>
                                <TableCell component="th" scope="row">
                                    {course.name}
                                </TableCell>
                                <TableCell align="right">{course.students.length}</TableCell>
                                <TableCell align="right"><a className={styles.courseBtn} href={`/courses/${course._id}`}>Go to course</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}