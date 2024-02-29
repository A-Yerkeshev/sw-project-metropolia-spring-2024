import React, { useState } from 'react';
import {useLogin} from '../../hooks/useLogin';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          await login(email, password);
          navigate('/CoursesList');
      } catch (err) {
          
          console.error("Failed to login:", err);
      }
    }

    return (
        <div className={styles.loginWrapper}>
      <div className={ styles.container }> 
          <div className={styles.leftContainer}> 
              <img src="https://i.gifer.com/QHG.gif" />
          </div>

          <div className={styles.formsContainer}> 
              <form className={styles.formControl} onSubmit={handleSubmit}> 
                  <h3 className={styles.headerText}>Welcome back!</h3>
                  <label>Email address:</label>
                  <input 
                      type="email" 
                      className={styles.emailInput} 
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email} 
                      required
                  />
                  <label>Password:</label>
                  <input 
                      type="password" 
                      className={styles.passwordInput} 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password} 
                      required
                  />
                  <button disabled={isLoading}>Log in</button>
                  {error && <div className={styles.error}>{error}</div>} 
                  <p>
                      Don't have an account? <Link to="/signup">Sign up for Free</Link>
                  </p>
              </form>
          </div>
      </div>
      </div>
  );
};

export default Login;