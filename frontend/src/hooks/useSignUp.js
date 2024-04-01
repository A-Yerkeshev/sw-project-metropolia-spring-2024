import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTranslation } from 'react-i18next';

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Use false for initial state to match boolean type
  const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
  const { t, i18n } = useTranslation();

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError(t('signUp.allFieldRequired'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
        return false;
      } else {
        // Assuming the server's response is now an object { email, token, id }
        //const { email, token, id } = json;
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Error in useSignup:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
