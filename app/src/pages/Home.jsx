import React from "react";
import { useAuth } from "../data/hooks/useAuth";
import { Button, Col, Row, Space } from 'antd';
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <h1>Hello!</h1>
      <Space>
        <Button type="primary" size="large"><Link to='/login'>Login</Link></Button>
        <Button size="large"><Link to='/signup'>Sing Up</Link></Button>
      </Space>
    </div>
  );
};


export default Home