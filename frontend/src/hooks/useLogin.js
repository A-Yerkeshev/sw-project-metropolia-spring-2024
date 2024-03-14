import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "";

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      throw new Error(json.error);
    } else {
      // Store the entire user object including email, id, and token in local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Dispatch LOGIN with the user details
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      return true; // Indicate success
    }
  };

  return { login, isLoading, error };
};
