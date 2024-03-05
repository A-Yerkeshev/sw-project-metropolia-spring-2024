import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Use false for initial state to match boolean type
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
      } else {
        // Assuming the server's response is now an object { email, token, id }
        const { email, token, id } = json;

        // Here you might want to store the token in localStorage,
        // but that depends on your authentication flow
        localStorage.setItem("authToken", JSON.stringify(token));

        // And then dispatch LOGIN with all necessary user info
        // Adjust according to what your application expects in user state
        dispatch({ type: "LOGIN", payload: { email, id, token } });
      }
    } catch (error) {
      console.error("Error in useSignup:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};
