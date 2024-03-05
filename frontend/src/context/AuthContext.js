import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const getUserFromLocalStorage = () => {
    const item = localStorage.getItem("user");
    if (item && item !== "undefined") {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
      }
    }
    return null;
  };

  const initialState = {
    user: getUserFromLocalStorage(),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.user !== null) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
