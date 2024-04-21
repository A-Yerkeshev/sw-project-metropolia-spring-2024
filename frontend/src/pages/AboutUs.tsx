import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can implement the logic to submit the form data
    console.log('Email:', email);
    console.log('Login Name:', loginName);
    console.log('Secret Question:', secretQuestion);
    // Reset input fields after submission
    setEmail('');
    setLoginName('');
    setSecretQuestion('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <TextField
        id="loginName"
        label="Login Name"
        variant="outlined"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        className="input-field"
      />
      <TextField
        id="secretQuestion"
        label="Secret Question"
        variant="outlined"
        value={secretQuestion}
        onChange={(e) => setSecretQuestion(e.target.value)}
        className="input-field"
      />
      <Button variant="contained" color="primary" type="submit" className="submit-button">
        Submit
      </Button>
    </form>
  );
};

export default ResetPasswordPage;