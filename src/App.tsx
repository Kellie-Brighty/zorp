import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SplashScreen from './pages/SplashScreen';
import MapScreen from './pages/MapScreen';
import Login from './pages/Login';
import UserRoleSelection from './pages/UserRoleSelection';
import BookingPreview from './pages/BookingPreview';
import ChatScreen from './pages/ChatScreen';
import OngoingRides from './pages/OngoingRides';
import RiderOnboardingWizard from './pages/RiderOnboardingWizard';
import DriverMapScreen from './pages/DriverMapScreen';

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
              <Route path="/map" element={<MapScreen />} />
              <Route path="/booking-preview" element={<BookingPreview />} />
              <Route path="/chat" element={<ChatScreen />} />
              <Route path="/ongoing-rides" element={<OngoingRides />} />
              <Route path="/login" element={<Login />} />
              <Route path="/role-selection" element={<UserRoleSelection />} />
              <Route path="/rider-onboarding" element={<RiderOnboardingWizard />} />
              <Route path="/driver-map" element={<DriverMapScreen />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
