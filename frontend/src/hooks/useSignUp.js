import {useState} from 'react';
import {useAuthContext} from '../context/AuthContext';

export const useSignup = () => {
    const {dispatch} = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstName, lastName, email, password}),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
            setIsLoading(false);
        }

        if (response.ok) {
           localStorage.setItem('user', JSON.stringify(json.user));

            dispatch({type: 'LOGIN', payload: json.user});

            setIsLoading(false);
        }
    };

    return {signup, error, isLoading};
}





