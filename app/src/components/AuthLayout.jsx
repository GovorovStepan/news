import {  useOutlet } from "react-router-dom";
import { AuthProvider } from "../data/hooks/useAuth";


function AuthLayout () {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};

export default AuthLayout ;