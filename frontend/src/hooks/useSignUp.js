import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    console.log('Backend URL:', backendUrl); // Log the backend URL

    try {
      const response = await fetch(`${backendUrl}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      console.log('Response:', response); // Log the response

      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
        setIsLoading(false);
      }

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json.user));

        dispatch({ type: 'LOGIN', payload: json.user });

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in useSignup:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};



