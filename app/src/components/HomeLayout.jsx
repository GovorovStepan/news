import { Navigate, useOutlet } from "react-router-dom";
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
    <React.Fragment>
      {outlet}
    </React.Fragment>
  );
};

export default HomeLayout;