import { Link, Navigate, useOutlet } from "react-router-dom";
import { Col, Row, Button } from 'antd';
import { useAuth } from "../data/hooks/useAuth";
import React, { useEffect } from "react";

function ProtectedLayout() {
  const { loginUserOnStartup, user, logout } = useAuth();
  useEffect(() => {
    loginUserOnStartup();
  }, []);
  const outlet = useOutlet();

  const onExitClick = () => {
    logout();
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Row style={{ marginTop: 20, marginBottom: 40 }}>
        <Col xs={2} md={6} lg={8}>
        </Col>
        <Col xs={20} md={12} lg={8}>
          <nav>
            <Link to="/news">Articles</Link>
            <Link to="profile">Profile</Link>
            <Button type="link" onClick={onExitClick}>Exit</Button>
          </nav>
        </Col>
        <Col xs={2} md={6} lg={8}></Col>
      </Row>
      {outlet}
    </React.Fragment>

  );
};

export default ProtectedLayout;