import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../data/hooks/useAuth";
import React, { useEffect } from "react";

function HomeLayout() {
  const { loginUserOnStartup, user } = useAuth();
  useEffect(() => {
    loginUserOnStartup();
  }, []);
  
  const outlet = useOutlet();
  
  if (user) {
    return <Navigate to="/news" />;
  }

  return (
    <div>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">SingUp</Link>
      </nav>
      {outlet}
    </div>
  );
};

export default HomeLayout;