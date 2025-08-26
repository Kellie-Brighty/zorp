import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Divider, message } from 'antd';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (isLogin) {
        await login(values.email, values.password);
        message.success('Login successful!');
      } else {
        await signup(values.email, values.password, values.name);
        message.success('Account created successfully!');
      }
      navigate('/role-selection');
    } catch (error) {
      message.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-livvic font-bold text-primary-black mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600 font-open-sans">
            {isLogin ? 'Sign in to continue to Zorp' : 'Join Zorp to get started'}
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <Form
            name="auth"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            {!isLogin && (
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input
                  prefix={<User className="text-gray-400" size={16} />}
                  placeholder="Full Name"
                />
              </Form.Item>
            )}

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<Mail className="text-gray-400" size={16} />}
                placeholder="Email Address"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<Lock className="text-gray-400" size={16} />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full btn-primary h-12"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </Form.Item>
          </Form>

          <Divider>or</Divider>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-12"
              icon={<Phone size={16} />}
            >
              Continue with Phone
            </Button>
            
            <Button
              className="w-full h-12"
              icon={<Mail size={16} />}
            >
              Continue with Google
            </Button>
          </div>

          {/* Toggle Login/Signup */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-red font-medium hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
