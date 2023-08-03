import React from "react";
import { useAuth } from "../data/hooks/useAuth";
import { Col, Row, Card } from 'antd';
import Preferences from "../components/Preferences";
import sources from "../data/models/sources";
import topics from "../data/models/topics";
import preferences from "../data/models/preferences";


function Profile() {
  const { user } = useAuth();
  return (
    <React.Fragment>
      <Row style={{ marginTop: 20, marginBottom: 40 }}>
        <Col xs={2} md={6} lg={8}>
        </Col>
        <Col xs={20} md={12} lg={8}>
          <Card title="User Info"  >
            <p><span>Name - </span>{user.name}</p>
            <p><span>Email - </span>{user.email}</p>
            <p><span>Registartion date - </span>{new Date(user.created_at).toLocaleString("en-US")}</p>
          </Card>
        </Col>
        <Col xs={2} md={6} lg={8}></Col>
      </Row>
      <Row style={{ marginTop: 20, marginBottom: 40 }}>
        <Col xs={2} md={6} lg={8}>
        </Col>
        <Col xs={20} md={12} lg={8}>
          <Preferences
            title="Topics Preferences"
            optionsGetter={topics.list}
            preferencesGetter={preferences.topics}
            type='topics' />
        </Col>
        <Col xs={2} md={6} lg={8}></Col>
      </Row>
      <Row style={{ marginTop: 20, marginBottom: 40 }}>
        <Col xs={2} md={6} lg={8}>
        </Col>
        <Col xs={20} md={12} lg={8}>
          <Preferences
            title="Sources Preferences"
            optionsGetter={sources.list}
            preferencesGetter={preferences.sources}
            type='sources' />
        </Col>
        <Col xs={2} md={6} lg={8}></Col>
      </Row>

    </React.Fragment>
  );
};


export default Profile