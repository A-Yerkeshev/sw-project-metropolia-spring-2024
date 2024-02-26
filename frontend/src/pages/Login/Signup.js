import React, { useState } from 'react';
import styles from './Login.module.css';
import {useSignup} from '../../hooks/useSignUp'; 
import { useNavigate, Link } from 'react-router-dom';    

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(firstName, lastName, email, password);
        navigate('/CoursesList');
    };
    
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.container}>
                
                <div className={styles.leftContainer}> 
                    <img src="https://i.gifer.com/QHG.gif" alt="Dark" />
                 </div> 

                <div className={styles.formsContainer}> 
                    <form className={styles.formControl} onSubmit={handleSubmit}> 
                        <h3 className={styles.headerText}>Sign Up for Free</h3>
                        
                        <label>First name:</label>
                        <input 
                            type="text" 
                            className={styles.emailInput} // Assuming the same style as email input in Login
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            required
                        />

                        <label>Last name:</label>
                        <input 
                            type="text" 
                            className={styles.emailInput} // Assuming the same style as email input in Login
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            required
                        />
                        
                        <label>Email address:</label>
                        <input 
                            type="email" 
                            className={styles.emailInput} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />

                        <label>Password:</label>
                        <input 
                            type="password" 
                            className={styles.passwordInput} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        
                        <button disabled={isLoading} className={styles.submitButton}>Sign Up</button>
                        {error && <div className={styles.error}>{error}</div>} 
                        <p>
                            Already have an account? <Link to="/">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;