import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("userDetails");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // Redirect to the homepage after logout
    navigate("/");
  };

  return { logout };
};
