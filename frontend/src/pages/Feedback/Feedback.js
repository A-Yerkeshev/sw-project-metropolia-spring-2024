import React from 'react';
import {  Box, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';
import styles from './Feedback.module.css';

const Feedback = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container maxWidth="sm"> {/* Centers the content and limits its width */}
      <Box
        sx={{
          display: 'flex',        // Makes the box a flex container
          flexDirection: 'column', // Stacks children vertically
          alignItems: 'center',    // Centers children horizontally
          marginTop: 8,            // Adds top margin for spacing from the top
          padding: 2,              // Adds padding around the content
        }}
      >
        <FormControl component="fieldset" className={styles.formControl}  fullWidth>
        <FormLabel component="legend" className={styles.legend}>Rate:</FormLabel>
          <RadioGroup
            aria-label="rating"
            name="rate"
            value={value}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="2" control={<Radio sx={{ color: 'green', '&.Mui-checked': { color: 'green' },'& .MuiSvgIcon-root': { fontSize: 35 },}} />} label="Green" />
            <FormControlLabel value="1" control={<Radio sx={{ color: 'yellow', '&.Mui-checked': { color: 'yellow' },'& .MuiSvgIcon-root': { fontSize: 35 },}} />} label="Yellow" />
            <FormControlLabel value="0" control={<Radio sx={{ color: 'red', '&.Mui-checked': { color: 'red' },'& .MuiSvgIcon-root': { fontSize: 35 },}} />} label="Red" />
          </RadioGroup>
          <TextField
            label="Open feedback"
            name="open-feedback"
            multiline
            rows={4}
            margin="normal"
            fullWidth
          />
          <Box className={styles.submitButtonContainer}>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Submit</Button>
          </Box>        
        </FormControl>
      </Box>
    </Container>
  );
}

export default Feedback;