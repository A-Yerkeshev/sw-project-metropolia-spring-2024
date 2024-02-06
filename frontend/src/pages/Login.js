import React, { useState } from 'react';
import {useLogin} from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault();
         await login(email, password);
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
          <h3>Welcome back!</h3>
          
          <label >Email address:</label>
          <input 
            type="email" 
            className="email-input"
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required
          />
          <label >Password:</label>
          <input 
            type="password" 
            className="password-input"
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required
          />
    
          <button  disabled={isLoading}>Log in</button>
          {error && <div className="error">{error}</div>}

          <p>
             Don't have an account? <Link to="/signup">Sign up for Free</Link>
             </p>
        </form>
      );
    };
    
    export default Login;