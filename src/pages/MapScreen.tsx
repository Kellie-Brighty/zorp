import { useState, useEffect } from 'react';
import { Button, message, Drawer, Tabs, Input, Form, Select, Card, Badge, Modal, Avatar, Tag, FloatButton } from 'antd';
import { MapPin, User, Menu, Phone, LayoutDashboard, CarTaxiFront, Cog, ArrowRightFromLine, UserCheck, Truck, Route, Users, Star, Clock, CheckCircle, History, MessageCircle, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationPicker from '../components/LocationPicker';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

// Fix for Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (color: string = '#D32F2F') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to update map center when location changes
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 15);
  }, [map, center]);
  
  return null;
};

interface RideOption {
  id: string;
  name: string;
  type: 'basic' | 'luxury';
  capacity: number;
  price: number;
  estimatedTime: string;
  rating: number;
  features: string[];
  iconType: 'sedan' | 'suv';
}

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [rideBookingVisible, setRideBookingVisible] = useState(false);
  const [selectedRide, setSelectedRide] = useState<RideOption | null>(null);
  const [bookingPreferences, setBookingPreferences] = useState({
    passengers: 1,
    rideType: 'basic' as 'basic' | 'luxury',
    destination: '',
    pickup: ''
  });
  const [friendDetails, setFriendDetails] = useState({
    name: '',
    phone: ''
  });
  const [rideHistoryVisible, setRideHistoryVisible] = useState(false);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sample ongoing rides data
  const ongoingRides = [
    {
      id: '1',
      driver: { name: 'John D.', phone: '+234 800 123 4567', rating: 4.8, avatar: 'JD' },
      vehicle: 'Toyota Camry - ABC 123 XY',
      pickup: 'Victoria Island, Lagos',
      destination: 'Lekki Phase 1, Lagos',
      status: 'en_route',
      eta: '5 min',
      price: 1200,
      startTime: '14:30'
    },
    {
      id: '2',
      driver: { name: 'Sarah M.', phone: '+234 800 234 5678', rating: 4.9, avatar: 'SM' },
      vehicle: 'Honda Accord - DEF 456 YZ',
      pickup: 'Ikeja, Lagos',
      destination: 'Mushin, Lagos',
      status: 'arrived',
      eta: '0 min',
      price: 1800,
      startTime: '15:15'
    }
  ];

  // Sample nearby drivers (in a real app, this would come from an API)
  const nearbyDrivers = [
    { id: 1, lat: 6.5250, lng: 3.3800, name: 'John D.', rating: 4.8, car: 'Toyota Camry' },
    { id: 2, lat: 6.5230, lng: 3.3780, name: 'Sarah M.', rating: 4.9, car: 'Honda Accord' },
    { id: 3, lat: 6.5270, lng: 3.3820, name: 'Mike T.', rating: 4.7, car: 'Nissan Altima' },
  ];

  // Sample ride history data
  const rideHistory = [
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      pickup: 'Victoria Island, Lagos',
      destination: 'Lekki Phase 1, Lagos',
      driver: { name: 'John D.', phone: '+234 800 123 4567', rating: 4.8, avatar: 'JD' },
      vehicle: 'Toyota Camry - ABC 123 XY',
      rideType: 'basic',
      price: 1200,
      status: 'completed',
      duration: '25 min',
      distance: '12.5 km'
    },
    {
      id: '2',
      date: '2024-01-12',
      time: '09:15',
      pickup: 'Ikeja, Lagos',
      destination: 'Mushin, Lagos',
      driver: { name: 'Sarah M.', phone: '+234 800 234 5678', rating: 4.9, avatar: 'SM' },
      vehicle: 'Honda Accord - DEF 456 YZ',
      rideType: 'luxury',
      price: 2500,
      status: 'completed',
      duration: '18 min',
      distance: '8.2 km'
    },
    {
      id: '3',
      date: '2024-01-10',
      time: '16:45',
      pickup: 'Surulere, Lagos',
      destination: 'Yaba, Lagos',
      driver: { name: 'Mike T.', phone: '+234 800 345 6789', rating: 4.7, avatar: 'MT' },
      vehicle: 'Nissan Altima - GHI 789 AB',
      rideType: 'basic',
      price: 800,
      status: 'completed',
      duration: '12 min',
      distance: '5.8 km'
    },
    {
      id: '4',
      date: '2024-01-08',
      time: '11:20',
      pickup: 'Ikoyi, Lagos',
      destination: 'Victoria Island, Lagos',
      driver: { name: 'David K.', phone: '+234 800 456 7890', rating: 4.6, avatar: 'DK' },
      vehicle: 'Hyundai Elantra - JKL 012 CD',
      rideType: 'luxury',
      price: 1800,
      status: 'completed',
      duration: '15 min',
      distance: '6.3 km'
    }
  ];

  // Available ride options
  const allRideOptions: RideOption[] = [
    {
      id: 'basic-sedan',
      name: 'Basic Sedan',
      type: 'basic',
      capacity: 4,
      price: 1200,
      estimatedTime: '5-8 min',
      rating: 4.5,
      features: ['Air Conditioning', 'Clean Vehicle'],
      iconType: 'sedan'
    },
    {
      id: 'basic-suv',
      name: 'Basic SUV',
      type: 'basic',
      capacity: 6,
      price: 1800,
      estimatedTime: '7-10 min',
      rating: 4.6,
      features: ['More Space', 'Air Conditioning'],
      iconType: 'suv'
    },
    {
      id: 'luxury-sedan',
      name: 'Luxury Sedan',
      type: 'luxury',
      capacity: 4,
      price: 2500,
      estimatedTime: '3-5 min',
      rating: 4.9,
      features: ['Premium Vehicle', 'Professional Driver', 'Complimentary Water'],
      iconType: 'sedan'
    },
    {
      id: 'luxury-suv',
      name: 'Luxury SUV',
      type: 'luxury',
      capacity: 6,
      price: 3200,
      estimatedTime: '4-6 min',
      rating: 4.8,
      features: ['Premium SUV', 'Professional Driver', 'WiFi', 'Complimentary Snacks'],
      iconType: 'suv'
    }
  ];

  // Helper function to render ride icon
  const renderRideIcon = (iconType: 'sedan' | 'suv') => {
    return iconType === 'sedan' ? 
      <CarTaxiFront className="w-6 h-6" /> : 
      <Truck className="w-6 h-6" />;
  };

  // Filter ride options based on preferences
  const filteredRideOptions = allRideOptions.filter(option => 
    option.capacity >= bookingPreferences.passengers && 
    option.type === bookingPreferences.rideType
  );

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            address: 'Current Location' // In real app, you'd reverse geocode this
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default location (Lagos, Nigeria)
          setCurrentLocation({
            lat: 6.5244,
            lng: 3.3792,
            address: 'Lagos, Nigeria'
          });
          setLocationLoading(false);
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setCurrentLocation({
        lat: 6.5244,
        lng: 3.3792,
        address: 'Lagos, Nigeria'
      });
      setLocationLoading(false);
    }
  }, []);

  const handleBookRide = () => {
    // Reset booking preferences to defaults when opening fresh
    setBookingPreferences({
      passengers: 1,
      rideType: 'basic',
      destination: '',
      pickup: ''
    });
    setSelectedRide(null);
    setIsPrefilled(false);
    setRideBookingVisible(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/map');
  };

  return (
    <div className="h-screen w-full relative flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 shadow-lg flex-col h-screen">
        <div className="flex-1 p-6">
          {/* User Info */}
          {user ? (
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary-red rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user.name?.charAt(0) || 'U'}
              </div>
              <h3 className="text-xl font-livvic font-semibold text-primary-black mb-1">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <User className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-livvic font-semibold text-primary-black mb-1">Guest User</h3>
              <p className="text-sm text-gray-600">Sign in for a better experience</p>
            </div>
          )}

          {/* Quick Stats */}
          {user && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-primary-black mb-3">Your Stats</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-primary-red">24</div>
                  <div className="text-xs text-gray-600">Rides</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary-red">4.8★</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary-red">₦125K</div>
                  <div className="text-xs text-gray-600">Spent</div>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-2">
            <Button
              type="text"
              icon={<LayoutDashboard className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/map')}
            >
              Home
            </Button>
            
            <Button
              type="text"
              icon={<Activity className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/ongoing-rides')}
            >
              <div className="flex items-center justify-between w-full">
                <span>Ongoing Rides</span>
                {ongoingRides.length > 0 && (
                  <Badge count={ongoingRides.length} size="small" />
                )}
              </div>
            </Button>
            
            <Button
              type="text"
              icon={<CarTaxiFront className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left"
              onClick={() => navigate('/rider-onboarding')}
            >
              Drive with Us
            </Button>
            
            <Button
              type="text"
              icon={<Cog className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left"
            >
              Settings
            </Button>

            {user ? (
              <Button
                type="text"
                icon={<ArrowRightFromLine className="w-5 h-5" />}
                className="w-full justify-start h-12 text-left text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                type="text"
                icon={<UserCheck className="w-5 h-5" />}
                className="w-full justify-start h-12 text-left"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Fixed Bottom - Become a Rider Button */}
        <div className="p-6 pt-0 border-t border-gray-200">
          <Button
            type="primary"
            icon={<CarTaxiFront className="w-5 h-5" />}
            className="w-full h-12 btn-primary"
            onClick={() => navigate('/rider-onboarding')}
          >
            Become a Rider
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
      {/* Real Map */}
      {currentLocation && (
        <div className="absolute inset-0">
          <MapContainer
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Current Location Marker */}
            <Marker 
              position={[currentLocation.lat, currentLocation.lng]}
              icon={createCustomIcon('#D32F2F')}
            >
              <Popup>
                <div className="text-center">
                  <div className="font-semibold text-primary-red">Your Location</div>
                  <div className="text-sm text-gray-600">{currentLocation.address}</div>
                </div>
              </Popup>
            </Marker>

            {/* Nearby Drivers */}
            {nearbyDrivers.map((driver) => (
              <Marker 
                key={driver.id}
                position={[driver.lat, driver.lng]}
                icon={createCustomIcon('#10B981')}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{driver.name}</div>
                    <div className="text-sm text-gray-600">{driver.car}</div>
                    <div className="text-sm text-yellow-600">⭐ {driver.rating}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Update map center when location changes */}
            <MapUpdater center={[currentLocation.lat, currentLocation.lng]} />
          </MapContainer>
        </div>
      )}

      {/* Loading State */}
      {locationLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-livvic font-bold mb-2">Zorp</h2>
            <p className="text-blue-100">Finding your location...</p>
          </div>
        </div>
      )}


      {/* Top Header - Mobile Only */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-livvic font-bold text-primary-red">Zorp</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              type="text"
              icon={<Menu className="w-5 h-5" />}
              className="text-gray-600 hover:text-primary-red"
              onClick={() => setMobileMenuVisible(true)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-white rounded-t-3xl shadow-2xl p-6">
          {/* Location Info */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 text-primary-red mr-2" />
              <span className="text-gray-600 font-medium">
                {locationLoading ? 'Getting your location...' : currentLocation?.address}
              </span>
            </div>
            <h2 className="text-2xl font-livvic font-bold text-primary-black mb-2">
              {user ? `Welcome back, ${user.name}!` : 'Welcome to Zorp'}
            </h2>
            <p className="text-gray-600">
              Ready to book your next ride?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              type="primary"
              size="large"
              icon={<Route className="w-6 h-6" />}
              onClick={handleBookRide}
              className="w-full h-14 btn-primary text-lg font-semibold"
            >
              Book a Ride
            </Button>
            
            <Button
              type="default"
              size="large"
              icon={<History className="w-5 h-5" />}
              onClick={() => setRideHistoryVisible(true)}
              className="w-full h-12 border-gray-300 hover:border-primary-red hover:text-primary-red"
            >
              Ride History
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={300}
        className="mobile-menu-drawer"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 space-y-6">
            {/* User Info */}
            {user ? (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <h3 className="font-semibold text-primary-black">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-black">Guest User</h3>
                <p className="text-sm text-gray-600">Sign in for a better experience</p>
              </div>
            )}

            {/* Menu Items */}
            <div className="space-y-2">
              <Button
                type="text"
                icon={<LayoutDashboard className="w-5 h-5" />}
                className="w-full justify-start h-12"
                onClick={() => {
                  setMobileMenuVisible(false);
                  navigate('/map');
                }}
              >
                Home
              </Button>
              
              <Button
                type="text"
                icon={<CarTaxiFront className="w-5 h-5" />}
                className="w-full justify-start h-12"
                onClick={() => {
                  setMobileMenuVisible(false);
                  navigate('/rider-onboarding');
                }}
              >
                Drive with Us
              </Button>
              
              <Button
                type="text"
                icon={<Cog className="w-5 h-5" />}
                className="w-full justify-start h-12"
                onClick={() => {
                  setMobileMenuVisible(false);
                  // Navigate to settings
                }}
              >
                Settings
              </Button>

              {user ? (
                <Button
                  type="text"
                  icon={<ArrowRightFromLine className="w-5 h-5" />}
                  className="w-full justify-start h-12 text-red-600 hover:text-red-700"
                  onClick={() => {
                    setMobileMenuVisible(false);
                    handleLogout();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  type="text"
                  icon={<UserCheck className="w-5 h-5" />}
                  className="w-full justify-start h-12"
                  onClick={() => {
                    setMobileMenuVisible(false);
                    navigate('/login');
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Fixed Bottom - Become a Rider Button */}
          <div className="pt-6 border-t border-gray-200 pb-4">
            <Button
              type="primary"
              icon={<CarTaxiFront className="w-5 h-5" />}
              className="w-full h-12 btn-primary"
              onClick={() => {
                setMobileMenuVisible(false);
                navigate('/rider-onboarding');
              }}
            >
              Become a Rider
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Ride Booking Bottom Sheet */}
      <Drawer
        title="Book a Ride"
        placement="bottom"
        onClose={() => setRideBookingVisible(false)}
        open={rideBookingVisible}
        height="80%"
        className="ride-booking-drawer"
      >
        <Tabs
          defaultActiveKey="myself"
          items={[
            {
              key: 'myself',
              label: 'Book for Myself',
              children: (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Route className="w-12 h-12 text-primary-red mx-auto mb-3" />
                    <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                      Book a Ride for Yourself
                    </h3>
                    <p className="text-gray-600">
                      Enter your destination and ride preferences
                    </p>
                    {isPrefilled && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-center space-x-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Route prefilled from your ride history</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Form layout="vertical" className="space-y-4">
                    <Form.Item
                      label="Pickup Location"
                      name="pickup"
                      rules={[{ required: true, message: 'Please enter pickup location!' }]}
                    >
                      <Input
                        prefix={<MapPin className="text-gray-400" size={16} />}
                        placeholder="Current location"
                        value={currentLocation?.address || 'Getting your location...'}
                        disabled
                      />
                    </Form.Item>

                    <Form.Item
                      label="Destination"
                      name="destination"
                      rules={[{ required: true, message: 'Please enter destination!' }]}
                    >
                      <LocationPicker
                        placeholder="Where are you going?"
                        value={bookingPreferences.destination}
                        onChange={(value) => setBookingPreferences(prev => ({ ...prev, destination: value }))}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Number of Passengers"
                      name="passengers"
                      rules={[{ required: true, message: 'Please select number of passengers!' }]}
                    >
                      <Select
                        placeholder="Select passengers"
                        value={bookingPreferences.passengers}
                        onChange={(value) => setBookingPreferences(prev => ({ ...prev, passengers: value }))}
                        suffixIcon={<Users className="w-4 h-4" />}
                      >
                        <Select.Option value={1}>1 Passenger</Select.Option>
                        <Select.Option value={2}>2 Passengers</Select.Option>
                        <Select.Option value={3}>3 Passengers</Select.Option>
                        <Select.Option value={4}>4 Passengers</Select.Option>
                        <Select.Option value={5}>5 Passengers</Select.Option>
                        <Select.Option value={6}>6 Passengers</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Ride Type"
                      name="rideType"
                      rules={[{ required: true, message: 'Please select ride type!' }]}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          className={`h-16 flex flex-col items-center justify-center ${
                            bookingPreferences.rideType === 'basic' ? 'border-primary-red bg-red-50 text-primary-red' : 'border-gray-300'
                          }`}
                          onClick={() => setBookingPreferences(prev => ({ ...prev, rideType: 'basic' }))}
                        >
                          <CarTaxiFront className="w-6 h-6 mb-1" />
                          <span className="text-sm">Basic</span>
                        </Button>
                        <Button 
                          className={`h-16 flex flex-col items-center justify-center ${
                            bookingPreferences.rideType === 'luxury' ? 'border-primary-red bg-red-50 text-primary-red' : 'border-gray-300'
                          }`}
                          onClick={() => setBookingPreferences(prev => ({ ...prev, rideType: 'luxury' }))}
                        >
                          <Truck className="w-6 h-6 mb-1" />
                          <span className="text-sm">Luxury</span>
                        </Button>
                      </div>
                    </Form.Item>

                    {/* Available Ride Options */}
                    <Form.Item label="Available Rides">
                      <div className="space-y-3">
                        {filteredRideOptions.length > 0 ? (
                          filteredRideOptions.map((option) => (
                            <Card
                              key={option.id}
                              className={`cursor-pointer hover:shadow-md transition-shadow ${
                                selectedRide?.id === option.id ? 'ring-2 ring-primary-red bg-red-50' : ''
                              }`}
                              onClick={() => {
                                setSelectedRide(option);
                                message.success(`Selected ${option.name}`);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-primary-red">{renderRideIcon(option.iconType)}</div>
                                  <div>
                                    <h4 className="font-semibold text-primary-black">{option.name}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                      <span className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {option.capacity}
                                      </span>
                                      <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {option.estimatedTime}
                                      </span>
                                      <span className="flex items-center">
                                        <Star className="w-4 h-4 mr-1" />
                                        {option.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary-red">₦{option.price.toLocaleString()}</div>
                                  <div className="text-xs text-gray-500">per ride</div>
                                </div>
                              </div>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CarTaxiFront className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No rides available for your preferences</p>
                            <p className="text-sm">Try adjusting passenger count or ride type</p>
                          </div>
                        )}
                      </div>
                    </Form.Item>

                    <Button
                      type="primary"
                      size="large"
                      className="w-full h-12 btn-primary"
                      disabled={!selectedRide}
                      onClick={() => {
                        if (selectedRide) {
                          const bookingDetails = {
                            passengers: bookingPreferences.passengers,
                            rideType: bookingPreferences.rideType,
                            destination: bookingPreferences.destination,
                            pickup: currentLocation?.address || 'Current Location',
                            selectedRide: selectedRide,
                            bookingType: 'myself' as const
                          };
                          setRideBookingVisible(false);
                          navigate('/booking-preview', { state: { bookingDetails } });
                        }
                      }}
                    >
                      {selectedRide ? 'Continue to Book' : 'Select a Ride First'}
                    </Button>
                  </Form>
                </div>
              ),
            },
            {
              key: 'friend',
              label: 'Book for a Friend',
              children: (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="w-12 h-12 text-primary-red mx-auto mb-3" />
                    <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                      Book a Ride for a Friend
                    </h3>
                    <p className="text-gray-600">
                      Enter your friend's details and destination
                    </p>
                    {isPrefilled && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-center space-x-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Route prefilled from your ride history</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Form layout="vertical" className="space-y-4">
                    <Form.Item
                      label="Friend's Name"
                      name="friendName"
                      rules={[{ required: true, message: 'Please enter friend\'s name!' }]}
                    >
                      <Input
                        prefix={<User className="text-gray-400" size={16} />}
                        placeholder="Enter friend's name"
                        value={friendDetails.name}
                        onChange={(e) => setFriendDetails(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Friend's Phone Number"
                      name="friendPhone"
                      rules={[{ required: true, message: 'Please enter friend\'s phone!' }]}
                    >
                      <Input
                        prefix={<Phone className="text-gray-400" size={16} />}
                        placeholder="+234 800 000 0000"
                        value={friendDetails.phone}
                        onChange={(e) => setFriendDetails(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Pickup Location"
                      name="pickup"
                      rules={[{ required: true, message: 'Please enter pickup location!' }]}
                    >
                      <LocationPicker
                        placeholder="Where should we pick up your friend?"
                        value={bookingPreferences.pickup}
                        onChange={(value) => setBookingPreferences(prev => ({ ...prev, pickup: value }))}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Destination"
                      name="destination"
                      rules={[{ required: true, message: 'Please enter destination!' }]}
                    >
                      <LocationPicker
                        placeholder="Where is your friend going?"
                        value={bookingPreferences.destination}
                        onChange={(value) => setBookingPreferences(prev => ({ ...prev, destination: value }))}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Number of Passengers"
                      name="passengers"
                      rules={[{ required: true, message: 'Please select number of passengers!' }]}
                    >
                      <Select
                        placeholder="Select passengers"
                        value={bookingPreferences.passengers}
                        onChange={(value) => setBookingPreferences(prev => ({ ...prev, passengers: value }))}
                        suffixIcon={<Users className="w-4 h-4" />}
                      >
                        <Select.Option value={1}>1 Passenger</Select.Option>
                        <Select.Option value={2}>2 Passengers</Select.Option>
                        <Select.Option value={3}>3 Passengers</Select.Option>
                        <Select.Option value={4}>4 Passengers</Select.Option>
                        <Select.Option value={5}>5 Passengers</Select.Option>
                        <Select.Option value={6}>6 Passengers</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Ride Type"
                      name="rideType"
                      rules={[{ required: true, message: 'Please select ride type!' }]}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          className={`h-16 flex flex-col items-center justify-center ${
                            bookingPreferences.rideType === 'basic' ? 'border-primary-red bg-red-50 text-primary-red' : 'border-gray-300'
                          }`}
                          onClick={() => setBookingPreferences(prev => ({ ...prev, rideType: 'basic' }))}
                        >
                          <CarTaxiFront className="w-6 h-6 mb-1" />
                          <span className="text-sm">Basic</span>
                        </Button>
                        <Button 
                          className={`h-16 flex flex-col items-center justify-center ${
                            bookingPreferences.rideType === 'luxury' ? 'border-primary-red bg-red-50 text-primary-red' : 'border-gray-300'
                          }`}
                          onClick={() => setBookingPreferences(prev => ({ ...prev, rideType: 'luxury' }))}
                        >
                          <Truck className="w-6 h-6 mb-1" />
                          <span className="text-sm">Luxury</span>
                        </Button>
                      </div>
                    </Form.Item>

                    {/* Available Ride Options */}
                    <Form.Item label="Available Rides">
                      <div className="space-y-3">
                        {filteredRideOptions.length > 0 ? (
                          filteredRideOptions.map((option) => (
                            <Card
                              key={option.id}
                              className={`cursor-pointer hover:shadow-md transition-shadow ${
                                selectedRide?.id === option.id ? 'ring-2 ring-primary-red bg-red-50' : ''
                              }`}
                              onClick={() => {
                                setSelectedRide(option);
                                message.success(`Selected ${option.name}`);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-primary-red">{renderRideIcon(option.iconType)}</div>
                                  <div>
                                    <h4 className="font-semibold text-primary-black">{option.name}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                      <span className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {option.capacity}
                                      </span>
                                      <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {option.estimatedTime}
                                      </span>
                                      <span className="flex items-center">
                                        <Star className="w-4 h-4 mr-1" />
                                        {option.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary-red">₦{option.price.toLocaleString()}</div>
                                  <div className="text-xs text-gray-500">per ride</div>
                                </div>
                              </div>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CarTaxiFront className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No rides available for your preferences</p>
                            <p className="text-sm">Try adjusting passenger count or ride type</p>
                          </div>
                        )}
                      </div>
                    </Form.Item>

                    <Button
                      type="primary"
                      size="large"
                      className="w-full h-12 btn-primary"
                      disabled={!selectedRide || !friendDetails.name || !friendDetails.phone}
                      onClick={() => {
                        if (selectedRide && friendDetails.name && friendDetails.phone) {
                          const bookingDetails = {
                            passengers: bookingPreferences.passengers,
                            rideType: bookingPreferences.rideType,
                            destination: bookingPreferences.destination,
                            pickup: bookingPreferences.pickup,
                            selectedRide: selectedRide,
                            friendDetails: friendDetails,
                            bookingType: 'friend' as const
                          };
                          setRideBookingVisible(false);
                          navigate('/booking-preview', { state: { bookingDetails } });
                        }
                      }}
                    >
                      {!selectedRide ? 'Select a Ride First' : 
                       !friendDetails.name || !friendDetails.phone ? 'Complete Friend Details' : 
                       'Book for Friend'}
                    </Button>
                  </Form>
                </div>
              ),
            },
          ]}
        />
      </Drawer>

      {/* Ride History Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
              <History className="w-5 h-5 text-primary-red" />
            </div>
            <div>
              <h2 className="text-xl font-livvic font-bold text-primary-black mb-0">Ride History</h2>
              <p className="text-sm text-gray-600 mb-0">Your past rides and drivers</p>
            </div>
          </div>
        }
        open={rideHistoryVisible}
        onCancel={() => setRideHistoryVisible(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: '800px', top: 20 }}
        className="ride-history-modal"
        styles={{
          body: { padding: '0' }
        }}
      >
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-6 space-y-4">
            {rideHistory.map((ride, _index) => (
              <Card
                key={ride.id}
                className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-gradient-to-r from-white to-gray-50/50"
                bodyStyle={{ padding: '20px' }}
              >
                <div className="space-y-4">
                  {/* Header with Driver Info and Price */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <Avatar 
                        size={50} 
                        className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-lg shadow-lg"
                      >
                        {ride.driver.avatar}
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-livvic font-bold text-lg text-primary-black mb-1">
                          {ride.driver.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{ride.driver.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="truncate max-w-[200px]">{ride.vehicle}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-red mb-1">
                        ₦{ride.price.toLocaleString()}
                      </div>
                      <Tag 
                        color={ride.rideType === 'luxury' ? 'gold' : 'blue'} 
                        className="text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {ride.rideType.toUpperCase()}
                      </Tag>
                    </div>
                  </div>
                  
                  {/* Route Information */}
                  <div className="bg-white/60 rounded-xl p-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-3 h-3 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Pickup</p>
                        <p className="text-sm font-medium text-gray-800">{ride.pickup}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Destination</p>
                        <p className="text-sm font-medium text-gray-800">{ride.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ride Details and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary-red" />
                        <span className="font-medium">{ride.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Route className="w-4 h-4 text-primary-red" />
                        <span className="font-medium">{ride.distance}</span>
                      </div>
                      <div className="text-gray-500">
                        {new Date(ride.date).toLocaleDateString()} at {ride.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        type="primary"
                        size="small"
                        icon={<MessageCircle className="w-4 h-4" />}
                        onClick={() => {
                          setRideHistoryVisible(false);
                          navigate('/chat', { 
                            state: { 
                              driverId: ride.driver.name,
                              driverPhone: ride.driver.phone,
                              rideId: ride.id
                            } 
                          });
                        }}
                        className="btn-primary text-xs px-4 py-2 h-8"
                      >
                        Chat
                      </Button>
                      <Button
                        type="default"
                        size="small"
                        icon={<Route className="w-4 h-4" />}
                        onClick={() => {
                          // Prefill booking preferences with the selected ride's information
                          setBookingPreferences({
                            passengers: 1, // Default to 1, user can change
                            rideType: ride.rideType as 'basic' | 'luxury',
                            destination: ride.destination,
                            pickup: ride.pickup
                          });
                          
                          // Set prefilled state and close history modal
                          setIsPrefilled(true);
                          setRideHistoryVisible(false);
                          setRideBookingVisible(true);
                          
                          message.success('Route prefilled! You can now book with the same route.');
                        }}
                        className="border-primary-red text-primary-red hover:bg-primary-red hover:text-white text-xs px-4 py-2 h-8"
                      >
                        Reuse
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Modal>

      {/* Mobile Floating Action Button for Ongoing Rides */}
      {ongoingRides.length > 0 && (
        <FloatButton
          icon={<Activity className="w-5 h-5" />}
          type="primary"
          className="lg:hidden"
          onClick={() => navigate('/ongoing-rides')}
          badge={{ count: ongoingRides.length, size: 'small' }}
          style={{
            right: 24,
            bottom: 200,
            backgroundColor: '#D32F2F',
            borderColor: '#D32F2F',
            zIndex: 1000
          }}
        />
      )}

      </div>
    </div>
  );
};

export default MapScreen;
