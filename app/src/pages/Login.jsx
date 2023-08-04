import React, { useState } from "react";
import { Col, Row, Button, Form, Input, Space, notification, Spin } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import user from "../data/models/user";
import { useAuth } from "../data/hooks/useAuth";
import { Link } from "react-router-dom";

function Login() {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = (values) => {
    setLoading(true)
    user.login(values, onSuccsess, onError)
  };

  const onSuccsess = (response) => {
    setLoading(false)
    api.success({
      message: 'Success'
    });
    login(response.data.user);
  }
  const onError = (error) => {
    console.error(error);
    api.error({
      message: 'Error',
      description: error.message,
    });
    setLoading(false);
    form.resetFields();
    form.validateFields();

  }

  return (
    <React.Fragment>
      <Spin spinning={loading} size="large">
        <Row style={{ marginTop: 20, marginBottom: 40 }}>
          <Col xs={2} md={6} lg={8}>
          </Col>
          <Col xs={20} md={12} lg={8}>
            <h1>Login</h1>
          </Col>
          <Col xs={2} md={6} lg={8}>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={6} lg={8}>
          </Col>
          <Col xs={20} md={12} lg={8} >
            <Form
              name="login"
              className="login-form"
              onFinish={onFinish}
              form={form}
            >
              {contextHolder}
              <Form.Item
                name="email"
                rules={[{
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                }, { required: true, message: 'Please input your Email!' }]}
              >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <Link to='/signup'>register now!</Link>
                </Space>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={2} md={6} lg={8}>
          </Col>
        </Row>
      </Spin>
    </React.Fragment>
  )
}

export default Login


