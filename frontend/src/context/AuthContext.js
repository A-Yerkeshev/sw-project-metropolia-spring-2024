import { createContext, useReducer } from "react";

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
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const fetchWithToken = async (url, options = {}) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser ? storedUser.token : null;

    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      };
    const response = await fetch(url, { ...options, headers });
    return response;
    }
    throw new Error("No token found");
  };
  return (
    <AuthContext.Provider value={{ ...state, dispatch, fetchWithToken }}>
      {children}
    </AuthContext.Provider>
  );
};
