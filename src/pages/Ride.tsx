import { useState } from 'react';
import { Card, Button, Row, Col, Input, Form, Tag, Modal, message } from 'antd';
import { Car, MapPin, Clock, Star, Navigation, Phone, CreditCard, User } from 'lucide-react';

const { TextArea } = Input;

const Ride = () => {
  const [rideStep, setRideStep] = useState(0);
  const [selectedRideType, setSelectedRideType] = useState('');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [rideDetails, setRideDetails] = useState<any>(null);

  const rideTypes = [
    {
      id: 'economy',
      name: 'Economy',
      price: 1500,
      time: '5-8 min',
      icon: <Car className="w-8 h-8 text-primary-red" />,
      features: ['Affordable', 'Standard vehicle', 'Up to 4 passengers'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 2500,
      time: '3-5 min',
      icon: <Car className="w-8 h-8 text-primary-red" />,
      features: ['Luxury vehicle', 'Professional driver', 'Up to 4 passengers'],
    },
    {
      id: 'xl',
      name: 'XL',
      price: 3500,
      time: '7-10 min',
      icon: <Car className="w-8 h-8 text-primary-red" />,
      features: ['Larger vehicle', 'Up to 6 passengers', 'Extra luggage space'],
    },
  ];

  const savedLocations = [
    { id: 'home', name: 'Home', address: '123 Main St, City' },
    { id: 'work', name: 'Work', address: '456 Business Ave, Downtown' },
    { id: 'airport', name: 'Airport', address: '789 Airport Blvd' },
  ];

  const onRideTypeSelect = (rideTypeId: string) => {
    setSelectedRideType(rideTypeId);
    setRideStep(1);
  };

  const onFinishBooking = (values: any) => {
    console.log('Ride booking values:', values);
    const selectedType = rideTypes.find(type => type.id === selectedRideType);
    setRideDetails({
      ...values,
      rideType: selectedType,
      estimatedFare: selectedType?.price || 0,
      estimatedTime: selectedType?.time || '5-8 min'
    });
    setRideStep(2);
  };

  const handlePayment = () => {
    setPaymentModalVisible(true);
  };

  const confirmPayment = () => {
    message.success('Payment successful! Your ride has been confirmed.');
    setPaymentModalVisible(false);
    setRideStep(3);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-livvic font-bold text-primary-black mb-2">
          Book a Ride
        </h1>
        <p className="text-gray-600 font-open-sans">
          Get to your destination quickly and safely.
        </p>
      </div>

      {/* Step 1: Ride Type Selection */}
      {rideStep === 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
              Choose Your Ride Type
            </h2>
            <Row gutter={[16, 16]}>
              {rideTypes.map((rideType) => (
                <Col xs={24} md={8} key={rideType.id}>
                  <Card
                    className={`text-center cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                      selectedRideType === rideType.id ? 'border-primary-red bg-red-50' : 'border-gray-200'
                    }`}
                    onClick={() => onRideTypeSelect(rideType.id)}
                  >
                    <div className="flex flex-col items-center p-4">
                      <div className="mb-4">
                        {rideType.icon}
                      </div>
                      <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                        {rideType.name}
                      </h3>
                      <div className="text-3xl font-livvic font-bold text-primary-red mb-4">
                        ₦{rideType.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center text-gray-600 mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{rideType.time}</span>
                      </div>
                      <ul className="text-left space-y-2 mb-6">
                        {rideType.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Star className="w-3 h-3 text-primary-red mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        type="primary"
                        className="btn-primary w-full"
                        onClick={() => onRideTypeSelect(rideType.id)}
                      >
                        Select {rideType.name}
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}

      {/* Step 2: Booking Form */}
      {rideStep === 1 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
            Book Your Ride
          </h2>
          <Form
            layout="vertical"
            onFinish={onFinishBooking}
            className="max-w-2xl"
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Pickup Location"
                  name="pickup"
                  rules={[{ required: true, message: 'Please enter pickup location!' }]}
                >
                  <Input
                    prefix={<MapPin className="text-gray-400" size={16} />}
                    placeholder="Enter pickup address"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Drop-off Location"
                  name="dropoff"
                  rules={[{ required: true, message: 'Please enter drop-off location!' }]}
                >
                  <Input
                    prefix={<MapPin className="text-gray-400" size={16} />}
                    placeholder="Enter destination"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3">Saved Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {savedLocations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    className="p-3 border border-gray-200 rounded-lg text-left hover:border-primary-red transition-colors"
                  >
                    <div className="font-medium text-primary-black">{location.name}</div>
                    <div className="text-sm text-gray-600">{location.address}</div>
                  </button>
                ))}
              </div>
            </div>

            <Form.Item
              label="Special Instructions"
              name="instructions"
            >
              <TextArea
                rows={3}
                placeholder="Any special requests or instructions for the driver..."
              />
            </Form.Item>

            <div className="flex space-x-4">
              <Button
                onClick={() => setRideStep(0)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary flex-1"
              >
                Book Ride
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* Step 3: Ride Confirmation */}
      {rideStep === 2 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <div className="mb-6">
              <Car className="w-16 h-16 text-primary-red mx-auto mb-4" />
              <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-2">
                Confirm Your Ride
              </h2>
              <p className="text-gray-600">
                Review your ride details and proceed to payment.
              </p>
            </div>

            <Card className="max-w-md mx-auto mb-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{rideDetails?.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{rideDetails?.dropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ride Type:</span>
                  <span className="font-medium">{rideDetails?.rideType?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium">{rideDetails?.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Fare:</span>
                  <span className="font-medium text-primary-red">₦{rideDetails?.estimatedFare?.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                type="primary"
                icon={<CreditCard className="w-4 h-4" />}
                onClick={handlePayment}
                className="btn-primary w-full"
              >
                Proceed to Payment
              </Button>
              <Button
                onClick={() => setRideStep(1)}
                className="w-full"
              >
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Driver Assignment */}
      {rideStep === 3 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <div className="mb-6">
              <Car className="w-16 h-16 text-primary-red mx-auto mb-4" />
              <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-2">
                Driver Assigned!
              </h2>
              <p className="text-gray-600">
                Your driver is on the way to pick you up.
              </p>
            </div>

            <Card className="max-w-md mx-auto mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  JD
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-black">John Driver</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">4.8 (1,247 rides)</span>
                  </div>
                  <div className="text-sm text-gray-600">Toyota Camry • ABC-123</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium">3 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ride Type:</span>
                  <span className="font-medium">{rideDetails?.rideType?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fare:</span>
                  <span className="font-medium">₦{rideDetails?.estimatedFare?.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-3 mt-4">
                <Button
                  icon={<Phone className="w-4 h-4" />}
                  className="flex-1"
                >
                  Call Driver
                </Button>
                <Button
                  icon={<Navigation className="w-4 h-4" />}
                  className="flex-1"
                >
                  Track Ride
                </Button>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                danger
                className="w-full"
              >
                Cancel Ride
              </Button>
              <Button
                onClick={() => setRideStep(0)}
                className="w-full"
              >
                Book Another Ride
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Rides */}
      {rideStep === 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
            Recent Rides
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-primary-red mr-4" />
                <div>
                  <p className="font-medium text-primary-black">Downtown to Airport</p>
                  <p className="text-sm text-gray-600">Yesterday, 2:30 PM</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-primary-red">₦12,500</div>
                <Tag color="green">Completed</Tag>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-primary-red mr-4" />
                <div>
                  <p className="font-medium text-primary-black">Home to Work</p>
                  <p className="text-sm text-gray-600">Monday, 8:15 AM</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-primary-red">₦8,000</div>
                <Tag color="green">Completed</Tag>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <Modal
        title="Payment"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={400}
      >
        <div className="space-y-4">
          <div className="text-center">
            <CreditCard className="w-12 h-12 text-primary-red mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary-black mb-2">
              Choose Payment Method
            </h3>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-12 flex items-center justify-center"
              icon={<CreditCard className="w-5 h-5" />}
            >
              Credit/Debit Card
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center"
              icon={<User className="w-5 h-5" />}
            >
              Bank Transfer
            </Button>
            <Button
              className="w-full h-12 flex items-center justify-center"
            >
              Cash Payment
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-primary-red">₦{rideDetails?.estimatedFare?.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => setPaymentModalVisible(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={confirmPayment}
              className="btn-primary flex-1"
            >
              Pay Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Ride;

