import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layouts/Layout';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import UserRoleSelection from './pages/UserRoleSelection';
import Dashboard from './pages/Dashboard';
import Ride from './pages/Ride';
import CarWash from './pages/CarWash';
import Groceries from './pages/Groceries';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#D32F2F',
    colorBgContainer: '#FFFFFF',
    colorText: '#121212',
    fontFamily: 'Open Sans, sans-serif',
    borderRadius: 8,
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 font-open-sans">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/role-selection" element={<UserRoleSelection />} />
              <Route path="/dashboard/*" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="overview" element={<Dashboard />} />
                <Route path="ride" element={<Ride />} />
                <Route path="carwash" element={<CarWash />} />
                <Route path="groceries" element={<Groceries />} />
                {/* Add more routes here as we build them */}
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
