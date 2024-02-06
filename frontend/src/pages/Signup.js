import { useState } from 'react';
import {useSignup} from '../hooks/useSignUp';     

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        await signup(firstName, lastName, email, password);
    };
    
    return (
        <form className="signup" onSubmit={handleSubmit}>  
        <h3>Signup</h3>

        <label>First name</label>
        <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} required
        />

        <label>Last name</label>
        <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} required

        />
        
        <label>Email address</label> 
        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} required
         />

        <label>Password</label>
        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} required
        />

        <button disabled={isLoading} type="submit">Signup</button>
        {error && <div className="error">{error}</div>}
        </form>

    );
    }

export default Signup;