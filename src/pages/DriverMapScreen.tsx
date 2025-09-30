import { useState, useEffect } from 'react';
  import { Button, Card, Badge, Avatar, message, Drawer, Tag } from 'antd';
  import { MapPin, Car, Menu, Bell, Settings, LogOut, Clock, Star, Phone, Navigation, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface RideRequest {
  id: string;
  customer: {
    name: string;
    phone: string;
    rating: number;
    avatar: string;
  };
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  destination: {
    address: string;
    lat: number;
    lng: number;
  };
  price: number;
  distance: string;
  estimatedTime: string;
  rideType: 'basic' | 'luxury';
  requestedAt: string;
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

const DriverMapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [rideRequestsVisible, setRideRequestsVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [_currentRide, setCurrentRide] = useState<RideRequest | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sample ride requests
  const rideRequests: RideRequest[] = [
    {
      id: '1',
      customer: {
        name: 'Sarah Johnson',
        phone: '+234 800 123 4567',
        rating: 4.8,
        avatar: 'SJ'
      },
      pickup: {
        address: 'Victoria Island, Lagos',
        lat: 6.4281,
        lng: 3.4219
      },
      destination: {
        address: 'Lekki Phase 1, Lagos',
        lat: 6.4698,
        lng: 3.5852
      },
      price: 1200,
      distance: '8.5 km',
      estimatedTime: '15 min',
      rideType: 'basic',
      requestedAt: '2 min ago'
    },
    {
      id: '2',
      customer: {
        name: 'Michael Brown',
        phone: '+234 800 234 5678',
        rating: 4.9,
        avatar: 'MB'
      },
      pickup: {
        address: 'Ikeja, Lagos',
        lat: 6.6018,
        lng: 3.3515
      },
      destination: {
        address: 'Mushin, Lagos',
        lat: 6.5244,
        lng: 3.3542
      },
      price: 1800,
      distance: '12.3 km',
      estimatedTime: '25 min',
      rideType: 'luxury',
      requestedAt: '5 min ago'
    }
  ];

  // Get driver's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            address: 'Current Location'
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation({
            lat: 6.5244,
            lng: 3.3792,
            address: 'Lagos, Nigeria'
          });
          setLocationLoading(false);
        }
      );
    } else {
      setCurrentLocation({
        lat: 6.5244,
        lng: 3.3792,
        address: 'Lagos, Nigeria'
      });
      setLocationLoading(false);
    }
  }, []);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    message.success(isOnline ? 'You are now offline' : 'You are now online and ready to receive rides');
  };

  const handleAcceptRide = (ride: RideRequest) => {
    setCurrentRide(ride);
    setRideRequestsVisible(false);
    message.success(`Ride accepted! Head to ${ride.pickup.address}`);
  };

  const handleRejectRide = (_rideId: string) => {
    message.info('Ride request declined');
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
          {/* Driver Info */}
          <div className="text-center mb-8">
            <Avatar 
              size={80} 
              className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-2xl mx-auto mb-4"
            >
              {user?.name?.charAt(0) || 'D'}
            </Avatar>
            <h3 className="text-xl font-livvic font-semibold text-primary-black mb-1">{user?.name}</h3>
            <p className="text-sm text-gray-600">Professional Driver</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-gray-500">(247 rides)</span>
            </div>
          </div>

          {/* Online Status */}
          <Card className="mb-6">
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-3 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <h4 className="font-semibold text-primary-black mb-2">
                {isOnline ? 'Online' : 'Offline'}
              </h4>
              <Button
                type={isOnline ? 'default' : 'primary'}
                onClick={handleToggleOnline}
                className={isOnline ? 'border-red-500 text-red-500 hover:bg-red-50' : 'btn-primary'}
                size="small"
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </Card>

          {/* Today's Stats */}
          <Card className="mb-6">
            <h4 className="font-semibold text-primary-black mb-4">Today's Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-red">12</div>
                <div className="text-xs text-gray-600">Rides</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-red">₦24K</div>
                <div className="text-xs text-gray-600">Earnings</div>
              </div>
            </div>
          </Card>

          {/* Menu Items */}
          <div className="space-y-2">
            <Button
              type="text"
              icon={<Bell className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left"
              onClick={() => setRideRequestsVisible(true)}
            >
              <div className="flex items-center justify-between w-full">
                <span>Ride Requests</span>
                {rideRequests.length > 0 && (
                  <Badge count={rideRequests.length} size="small" />
                )}
              </div>
            </Button>
            
            <Button
              type="text"
              icon={<Settings className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left"
            >
              Settings
            </Button>

            <Button
              type="text"
              icon={<LogOut className="w-5 h-5" />}
              className="w-full justify-start h-12 text-left text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
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
              
              {/* Driver Location Marker */}
              <Marker 
                position={[currentLocation.lat, currentLocation.lng]}
                icon={createCustomIcon(isOnline ? '#10B981' : '#6B7280')}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold text-primary-red">Your Location</div>
                    <div className="text-sm text-gray-600">{currentLocation.address}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Status: {isOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* Ride Request Markers */}
              {rideRequests.map((ride) => (
                <Marker 
                  key={ride.id}
                  position={[ride.pickup.lat, ride.pickup.lng]}
                  icon={createCustomIcon('#F59E0B')}
                >
                  <Popup>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">Ride Request</div>
                      <div className="text-sm text-gray-600">{ride.pickup.address}</div>
                      <div className="text-sm text-gray-600">₦{ride.price.toLocaleString()}</div>
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
              <h2 className="text-2xl font-livvic font-bold mb-2">Zorp Driver</h2>
              <p className="text-blue-100">Loading your location...</p>
            </div>
          </div>
        )}

        {/* Top Header - Mobile Only */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Avatar 
                size={40} 
                className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold"
              >
                {user?.name?.charAt(0) || 'D'}
              </Avatar>
              <div>
                <h1 className="text-lg font-livvic font-bold text-primary-black">{user?.name}</h1>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-gray-600">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type="text"
                icon={<Bell className="w-5 h-5" />}
                onClick={() => setRideRequestsVisible(true)}
                className="text-gray-600 hover:text-primary-red"
              >
                {rideRequests.length > 0 && (
                  <Badge count={rideRequests.length} size="small" />
                )}
              </Button>
              <Button
                type="text"
                icon={<Menu className="w-5 h-5" />}
                onClick={() => setMobileMenuVisible(true)}
                className="text-gray-600 hover:text-primary-red"
              />
            </div>
          </div>
        </div>

        {/* Bottom Status Panel */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="bg-white rounded-t-3xl shadow-2xl p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-livvic font-bold text-primary-black mb-2">
                {isOnline ? 'Ready for Rides' : 'Currently Offline'}
              </h2>
              <p className="text-gray-600">
                {isOnline ? 'You will receive ride requests here' : 'Go online to start receiving rides'}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                type={isOnline ? 'default' : 'primary'}
                size="large"
                onClick={handleToggleOnline}
                className={isOnline ? 'border-red-500 text-red-500 hover:bg-red-50' : 'btn-primary'}
                icon={isOnline ? <Car className="w-5 h-5" /> : <Car className="w-5 h-5" />}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <Drawer
          title="Driver Menu"
          placement="right"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={300}
        >
          <div className="space-y-6">
            <div className="text-center">
              <Avatar 
                size={60} 
                className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-xl mx-auto mb-3"
              >
                {user?.name?.charAt(0) || 'D'}
              </Avatar>
              <h3 className="font-semibold text-primary-black">{user?.name}</h3>
              <p className="text-sm text-gray-600">Professional Driver</p>
            </div>

            <div className="space-y-2">
              <Button
                type="text"
                icon={<Bell className="w-5 h-5" />}
                className="w-full justify-start h-12"
                onClick={() => {
                  setMobileMenuVisible(false);
                  setRideRequestsVisible(true);
                }}
              >
                Ride Requests
              </Button>
              
              <Button
                type="text"
                icon={<Settings className="w-5 h-5" />}
                className="w-full justify-start h-12"
              >
                Settings
              </Button>

              <Button
                type="text"
                icon={<LogOut className="w-5 h-5" />}
                className="w-full justify-start h-12 text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Drawer>

        {/* Ride Requests Drawer */}
        <Drawer
          title="Ride Requests"
          placement="bottom"
          onClose={() => setRideRequestsVisible(false)}
          open={rideRequestsVisible}
          height="70%"
        >
          <div className="space-y-4">
            {rideRequests.map((ride) => (
              <Card key={ride.id} className="shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        size={40} 
                        className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold"
                      >
                        {ride.customer.avatar}
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-primary-black">{ride.customer.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{ride.customer.rating}</span>
                          <span>•</span>
                          <span>{ride.requestedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-red">₦{ride.price.toLocaleString()}</div>
                      <Tag color={ride.rideType === 'luxury' ? 'gold' : 'blue'}>
                        {ride.rideType.toUpperCase()}
                      </Tag>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Pickup:</span>
                      <span className="font-medium">{ride.pickup.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">Destination:</span>
                      <span className="font-medium">{ride.destination.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Navigation className="w-4 h-4 mr-1" />
                      {ride.distance}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {ride.estimatedTime}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="primary"
                      icon={<CheckCircle className="w-4 h-4" />}
                      onClick={() => handleAcceptRide(ride)}
                      className="flex-1 btn-primary"
                    >
                      Accept
                    </Button>
                    <Button
                      icon={<Phone className="w-4 h-4" />}
                      onClick={() => message.info(`Calling ${ride.customer.name}`)}
                      className="flex-1"
                    >
                      Call
                    </Button>
                    <Button
                      type="default"
                      onClick={() => handleRejectRide(ride.id)}
                      className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default DriverMapScreen;
