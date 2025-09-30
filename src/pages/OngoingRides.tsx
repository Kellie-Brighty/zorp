import { useState } from 'react';
import { Button, Card, Badge, Avatar, message, Modal, Progress } from 'antd';
import { ArrowLeft, MapPin, Star, MessageCircle, Phone, CarTaxiFront, CheckCircle, Shield, Unlock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OngoingRide {
  id: string;
  driver: {
    name: string;
    phone: string;
    rating: number;
    avatar: string;
  };
  vehicle: string;
  pickup: string;
  destination: string;
  status: 'en_route' | 'arrived' | 'in_progress' | 'completed';
  eta: string;
  price: number;
  startTime: string;
  progress: number;
}

const OngoingRides = () => {
  const navigate = useNavigate();
  const [selectedRide, setSelectedRide] = useState<OngoingRide | null>(null);
  const [paymentReleaseModalVisible, setPaymentReleaseModalVisible] = useState(false);

  // Sample ongoing rides data
  const ongoingRides: OngoingRide[] = [
    {
      id: '1',
      driver: { name: 'John D.', phone: '+234 800 123 4567', rating: 4.8, avatar: 'JD' },
      vehicle: 'Toyota Camry - ABC 123 XY',
      pickup: 'Victoria Island, Lagos',
      destination: 'Lekki Phase 1, Lagos',
      status: 'en_route',
      eta: '5 min',
      price: 1200,
      startTime: '14:30',
      progress: 60
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
      startTime: '15:15',
      progress: 90
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route': return 'processing';
      case 'arrived': return 'warning';
      case 'in_progress': return 'success';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_route': return 'En Route';
      case 'arrived': return 'Arrived';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleChatWithDriver = (ride: OngoingRide) => {
    navigate('/chat', { 
      state: { 
        driverId: ride.driver.name,
        driverPhone: ride.driver.phone,
        rideId: ride.id,
        paymentCompleted: true
      } 
    });
  };

  const handleCallDriver = (ride: OngoingRide) => {
    message.info(`Calling ${ride.driver.name} at ${ride.driver.phone}`);
  };

  const handleReleasePayment = (ride: OngoingRide) => {
    setSelectedRide(ride);
    setPaymentReleaseModalVisible(true);
  };

  const confirmPaymentRelease = () => {
    if (selectedRide) {
      message.success(`Payment of ₦${selectedRide.price.toLocaleString()} released to ${selectedRide.driver.name}`);
      setPaymentReleaseModalVisible(false);
      setSelectedRide(null);
    }
  };

  // const renderRideIcon = (vehicle: string) => {
  //   return vehicle.toLowerCase().includes('suv') ? 
  //     <Truck className="w-6 h-6" /> : 
  //     <CarTaxiFront className="w-6 h-6" />;
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <Button
                type="text"
                icon={<ArrowLeft className="w-5 h-5" />}
                onClick={() => navigate('/map')}
                className="text-gray-600 hover:text-primary-red flex-shrink-0"
              >
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-livvic font-bold text-primary-black truncate">
                  Ongoing Rides
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Track your active rides and manage payments
                </p>
              </div>
            </div>
            <Badge count={ongoingRides.length} showZero color="#D32F2F" className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-red" />
              </div>
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {ongoingRides.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CarTaxiFront className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No Ongoing Rides</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 px-4">
              You don't have any active rides at the moment
            </p>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/map')}
              className="btn-primary w-full sm:w-auto"
            >
              Book a Ride
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {ongoingRides.map((ride) => (
              <Card
                key={ride.id}
                className="shadow-sm hover:shadow-lg transition-all duration-200 border-0"
                bodyStyle={{ padding: '16px' }}
              >
                <div className="space-y-4 sm:space-y-6">
                  {/* Header with Driver Info and Status */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <Avatar 
                        size={40} 
                        className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-base shadow-lg flex-shrink-0"
                      >
                        {ride.driver.avatar}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-livvic font-bold text-base sm:text-lg text-primary-black mb-1 truncate">
                          {ride.driver.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{ride.driver.rating}</span>
                          </div>
                          <span className="text-gray-400 hidden sm:inline">•</span>
                          <span className="truncate max-w-[150px] sm:max-w-[200px] text-xs sm:text-sm">{ride.vehicle}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge 
                          status={getStatusColor(ride.status)} 
                          text={getStatusText(ride.status)}
                          className="text-xs sm:text-sm font-medium"
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          Started at {ride.startTime}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-2xl font-bold text-primary-red">
                          ₦{ride.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route Information */}
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Pickup</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 break-words">{ride.pickup}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Destination</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 break-words">{ride.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress and ETA */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Ride Progress</span>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {ride.eta === '0 min' ? 'Arrived' : `ETA: ${ride.eta}`}
                      </span>
                    </div>
                    <Progress
                      percent={ride.progress}
                      strokeColor="#D32F2F"
                      trailColor="#f0f0f0"
                      showInfo={false}
                      size="small"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-3">
                    <Button
                      type="primary"
                      icon={<MessageCircle className="w-4 h-4" />}
                      onClick={() => handleChatWithDriver(ride)}
                      className="w-full sm:flex-1 btn-primary h-10 sm:h-auto"
                      size="small"
                    >
                      <span className="hidden sm:inline">Chat with Driver</span>
                      <span className="sm:hidden">Chat</span>
                    </Button>
                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        icon={<Phone className="w-4 h-4" />}
                        onClick={() => handleCallDriver(ride)}
                        className="flex-1 h-10 sm:h-auto"
                        size="small"
                      >
                        <span className="hidden sm:inline">Call Driver</span>
                        <span className="sm:hidden">Call</span>
                      </Button>
                      {ride.status === 'completed' && (
                        <Button
                          type="default"
                          icon={<Unlock className="w-4 h-4" />}
                          onClick={() => handleReleasePayment(ride)}
                          className="flex-1 border-green-500 text-green-600 hover:bg-green-50 h-10 sm:h-auto"
                          size="small"
                        >
                          <span className="hidden sm:inline">Release Payment</span>
                          <span className="sm:hidden">Release</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Payment Release Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Unlock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-livvic font-bold text-primary-black mb-0">Release Payment</h2>
              <p className="text-sm text-gray-600 mb-0">Confirm payment release to driver</p>
            </div>
          </div>
        }
        open={paymentReleaseModalVisible}
        onCancel={() => setPaymentReleaseModalVisible(false)}
        footer={null}
        width="90%"
        style={{ maxWidth: '500px' }}
        className="payment-release-modal"
      >
        {selectedRide && (
          <div className="space-y-6">
            {/* Driver Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar 
                  size={50} 
                  className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-lg"
                >
                  {selectedRide.driver.avatar}
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary-black">{selectedRide.driver.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {selectedRide.driver.rating}
                    </span>
                    <span>{selectedRide.vehicle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ride Amount:</span>
                <span className="font-semibold text-primary-red">₦{selectedRide.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge status="success" text="Completed" />
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Confirm Ride Completion</h4>
                  <p className="text-sm text-yellow-700">
                    Please ensure the ride has been completed satisfactorily before releasing payment. 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="large"
                onClick={() => setPaymentReleaseModalVisible(false)}
                className="w-full sm:flex-1"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<Unlock className="w-4 h-4" />}
                onClick={confirmPaymentRelease}
                className="w-full sm:flex-1 btn-primary"
              >
                Release Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OngoingRides;
