import { useState, useEffect } from 'react';
import { Button, Card, Divider, Badge, Modal, Progress, Avatar } from 'antd';
import { ArrowLeft, Users, Clock, Star, Wallet, CreditCard, CheckCircle, MapPin, User, Phone, CarTaxiFront, Truck, MessageCircle, Shield, Lock, } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BookingDetails {
  passengers: number;
  rideType: 'basic' | 'luxury';
  destination: string;
  pickup: string;
  selectedRide: {
    id: string;
    name: string;
    type: 'basic' | 'luxury';
    capacity: number;
    price: number;
    estimatedTime: string;
    rating: number;
    features: string[];
    iconType: 'sedan' | 'suv';
  };
  friendDetails?: {
    name: string;
    phone: string;
  };
  bookingType: 'myself' | 'friend';
}

const BookingPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Sample driver information (in a real app, this would come from an API)
  const driverInfo = {
    name: 'John D.',
    phone: '+234 800 123 4567',
    rating: 4.8,
    vehicle: 'Toyota Camry - ABC 123 XY',
    avatar: 'JD',
    status: 'online',
    responseTime: '2 min avg',
    completedRides: 1247
  };

  useEffect(() => {
    // Get booking details from location state
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      // If no booking details, redirect back to map
      navigate('/map');
    }
  }, [location.state, navigate]);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-red border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const { selectedRide, passengers, destination, pickup, friendDetails, bookingType } = bookingDetails;
  const serviceFee = 200;
  const tax = Math.round(selectedRide.price * 0.05);
  const total = selectedRide.price + serviceFee + tax;

  // Helper function to render ride icon
  const renderRideIcon = (iconType: 'sedan' | 'suv') => {
    return iconType === 'sedan' ? 
      <CarTaxiFront className="w-6 h-6" /> : 
      <Truck className="w-6 h-6" />;
  };

  const handleConfirmBooking = () => {
    setPaymentModalVisible(true);
  };

  const handlePayment = () => {
    setPaymentProgress(0);
    const interval = setInterval(() => {
      setPaymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPaymentCompleted(true);
          setTimeout(() => {
            setPaymentModalVisible(false);
            setShowConfirmation(true);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleChatWithDriver = () => {
    navigate('/chat', { 
      state: { 
        driverId: driverInfo.name,
        driverPhone: driverInfo.phone,
        rideId: 'current-ride',
        paymentCompleted: true
      } 
    });
  };

  const handleBackToMap = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<ArrowLeft className="w-5 h-5" />}
              onClick={() => navigate('/map')}
              className="text-gray-600 hover:text-primary-red"
            >
              Back
            </Button>
            <h1 className="text-2xl font-livvic font-bold text-primary-black">
              Booking Preview
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Driver Status */}
            <Card className="shadow-sm border-l-4 border-l-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar 
                    size={50} 
                    className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-lg shadow-lg"
                  >
                    {driverInfo.avatar}
                  </Avatar>
                  <div>
                    <h3 className="font-livvic font-bold text-lg text-primary-black mb-1">
                      {driverInfo.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{driverInfo.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-primary-red" />
                        <span>{driverInfo.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{driverInfo.completedRides} rides</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    status="success" 
                    text="Online" 
                    className="text-green-600 font-medium"
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    {driverInfo.vehicle}
                  </div>
                </div>
              </div>
            </Card>

            {/* Ride Details */}
            <Card className="shadow-sm">
              <div className="text-center mb-6">
                <div className="text-primary-red mb-3">{renderRideIcon(selectedRide.iconType)}</div>
                <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-2">
                  {selectedRide.name}
                </h2>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {passengers} passenger{passengers > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedRide.estimatedTime}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {selectedRide.rating}
                  </span>
                </div>
              </div>

              <Divider />

              {/* Trip Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary-black text-lg">Trip Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Pickup Location:
                    </span>
                    <span className="font-medium text-right max-w-xs">{pickup}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Destination:
                    </span>
                    <span className="font-medium text-right max-w-xs">{destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ride Type:</span>
                    <span className="font-medium capitalize">{selectedRide.type}</span>
                  </div>
                </div>
              </div>

              {/* Friend Details (if booking for friend) */}
              {bookingType === 'friend' && friendDetails && (
                <>
                  <Divider />
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary-black text-lg">Friend Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Name:
                        </span>
                        <span className="font-medium">{friendDetails.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone:
                        </span>
                        <span className="font-medium">{friendDetails.phone}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Divider />

              {/* Ride Features */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary-black text-lg">Included Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRide.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="shadow-sm">
              <h3 className="font-semibold text-primary-black text-lg mb-4">Pricing Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Base Fare</span>
                  <span>₦{selectedRide.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Service Fee</span>
                  <span>₦{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax (5%)</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
                <Divider className="my-3" />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-red">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Ride Wallet */}
            <Card className="shadow-sm">
              <h3 className="font-semibold text-primary-black text-lg mb-4">Payment & Communication</h3>
              <div className="bg-gradient-to-r from-primary-red to-red-600 p-4 rounded-lg text-white mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Ride Wallet</span>
                  </div>
                  <Badge count="NEW" color="green" />
                </div>
                <p className="text-sm text-red-100 mb-3">
                  Secure payment wallet created specifically for this ride
                </p>
                <div className="flex items-center justify-between">
                  <span>Wallet ID:</span>
                  <span className="font-mono text-sm">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
              </div>

              {/* Chat Status */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Chat with Driver</h4>
                    <p className="text-sm text-gray-600">
                      Chat will be unlocked after payment is confirmed
                    </p>
                  </div>
                  <Badge status="default" text="Locked" />
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary-black">Payment Methods</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-12 flex flex-col items-center justify-center">
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="text-sm">Card</span>
                  </Button>
                  <Button className="h-12 flex flex-col items-center justify-center">
                    <Wallet className="w-5 h-5 mb-1" />
                    <span className="text-sm">Wallet</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                type="primary"
                size="large"
                className="w-full h-12 btn-primary"
                icon={<CheckCircle className="w-5 h-5" />}
                onClick={handleConfirmBooking}
              >
                Confirm & Pay
              </Button>
              <Button
                size="large"
                className="w-full h-12"
                onClick={() => navigate('/map')}
              >
                Back to Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-red" />
            </div>
            <div>
              <h2 className="text-xl font-livvic font-bold text-primary-black mb-0">Secure Payment</h2>
              <p className="text-sm text-gray-600 mb-0">Processing your payment to ride wallet</p>
            </div>
          </div>
        }
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={500}
        className="payment-modal"
      >
        <div className="space-y-6">
          {/* Payment Progress */}
          <div className="text-center">
            <div className="mb-4">
              <Progress
                type="circle"
                percent={paymentProgress}
                strokeColor="#D32F2F"
                trailColor="#f0f0f0"
                strokeWidth={8}
                size={120}
              />
            </div>
            <h3 className="text-lg font-semibold text-primary-black mb-2">
              {paymentCompleted ? 'Payment Successful!' : 'Processing Payment...'}
            </h3>
            <p className="text-gray-600">
              {paymentCompleted 
                ? 'Your payment has been secured in the ride wallet' 
                : 'Please wait while we process your payment'
              }
            </p>
          </div>

          {/* Payment Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-primary-red">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Wallet ID:</span>
              <span className="font-mono text-sm">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </div>

          {!paymentCompleted && (
            <Button
              type="primary"
              size="large"
              className="w-full h-12 btn-primary"
              onClick={handlePayment}
            >
              Process Payment
            </Button>
          )}
        </div>
      </Modal>

      {/* Post-Payment Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-livvic font-bold text-primary-black mb-0">Ride Confirmed!</h2>
              <p className="text-sm text-gray-600 mb-0">Your ride has been sent to the driver</p>
            </div>
          </div>
        }
        open={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        footer={null}
        width={600}
        className="confirmation-modal"
      >
        <div className="space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary-black mb-2">
              Payment Confirmed & Ride Sent!
            </h3>
            <p className="text-gray-600 mb-4">
              Your payment has been secured in the ride wallet. The driver has been notified and chat is now active.
            </p>
          </div>

          {/* Driver Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <Avatar 
                size={50} 
                className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-lg"
              >
                {driverInfo.avatar}
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-primary-black">{driverInfo.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {driverInfo.rating}
                  </span>
                  <span>{driverInfo.vehicle}</span>
                </div>
              </div>
              <Badge status="success" text="Online" />
            </div>
          </div>

          {/* Payment Security Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Payment Security</h4>
                <p className="text-sm text-blue-700">
                  Your payment is held securely in the ride wallet. It will only be released to the driver after you confirm the ride is complete.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              type="primary"
              size="large"
              icon={<MessageCircle className="w-5 h-5" />}
              onClick={handleChatWithDriver}
              className="w-full h-12 btn-primary"
            >
              Chat with Driver
            </Button>
            <Button
              size="large"
              onClick={handleBackToMap}
              className="w-full h-12"
            >
              Back to Map
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPreview;
