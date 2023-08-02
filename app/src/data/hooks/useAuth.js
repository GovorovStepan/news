import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { default as userModel } from "../models/user";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null );
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    navigate("/news/profile");
  };

  const logout = () => {
    setUser(null);
    userModel.logout();
    navigate("/", { replace: true });
  };
  
  const loginUserOnStartup = () => {
    userModel.get(setUser, setUser)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loginUserOnStartup
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
