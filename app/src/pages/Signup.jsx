import React, { useState, useContext } from "react";
import { Col, Row, Button, Form, Input, Space, notification, Spin } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { passwordValidator } from "../passwordValidatror";
import user from "../data/models/user";
import { useAuth } from "../data/hooks/useAuth";


function Signup() {

  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = (values) => {
    setLoading(true);
    user.registrate(values, onSuccsess, onError)
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
            <h1>Registartion</h1>
          </Col>
          <Col xs={2} md={6} lg={8}>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={6} lg={8}>
          </Col>
          <Col xs={20} md={12} lg={8} >
            <Form
              name="singup"
              className="singup-form"
              onFinish={onFinish}
              form={form}
            >
              {contextHolder}
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your Name!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
              </Form.Item>
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
                rules={[{ required: true, message: 'Please input your Password!' }, { validator: passwordValidator }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password confirmation" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign up
                  </Button>
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

export default Signup


