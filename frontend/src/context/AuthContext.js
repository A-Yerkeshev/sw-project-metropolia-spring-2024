import { createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
    case 'LOGIN':
        return {user: action.payload};
    case 'LOGOUT':
        return {user: null};
    default:
        return state;
    }
}
export const AuthContextProvider = ({ children }) => {
    // Initialize state from local storage if available
    const initialState = {
        user: JSON.parse(localStorage.getItem('user')) || null
    };


    const [state, dispatch] = useReducer(authReducer, initialState);

     // Sync user state with local storage
     useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    console.log('AuthContext state:', state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
        </AuthContext.Provider>
       
    );
    }