import { useState } from 'react';
import {useSignup} from '../hooks/useSignUp';     

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        await signup(email, password);
    };
    
    return (
        <form className="signup" onSubmit={handleSubmit}>  
        <h3>Signup</h3>

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