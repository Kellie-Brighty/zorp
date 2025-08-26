import { useState } from 'react';
import { Card, Button, Row, Col, Form, Select, DatePicker, TimePicker, Input, Tag, Steps } from 'antd';
import { Sparkles, Clock, MapPin, Car, Star, Calendar } from 'lucide-react';

const { Option } = Select;
const { TextArea } = Input;

const CarWash = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [bookingStep, setBookingStep] = useState(0);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Wash',
      price: 3000,
      duration: '30 min',
      features: ['Exterior wash', 'Tire cleaning', 'Window cleaning'],
      icon: <Sparkles className="w-8 h-8 text-primary-red" />,
    },
    {
      id: 'premium',
      name: 'Premium Wash',
      price: 5000,
      duration: '45 min',
      features: ['Exterior wash', 'Interior vacuum', 'Tire dressing', 'Air freshener'],
      icon: <Sparkles className="w-8 h-8 text-primary-red" />,
    },
    {
      id: 'detailing',
      name: 'Full Detailing',
      price: 15000,
      duration: '2 hours',
      features: ['Complete exterior wash', 'Interior deep clean', 'Wax treatment', 'Engine bay cleaning'],
      icon: <Sparkles className="w-8 h-8 text-primary-red" />,
    },
  ];

  const carTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'luxury', label: 'Luxury Vehicle' },
  ];

  const onPackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setBookingStep(1);
  };

  const onFinishBooking = (values: any) => {
    console.log('Booking values:', values);
    setBookingStep(2);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-livvic font-bold text-primary-black mb-2">
          Car Wash Services
        </h1>
        <p className="text-gray-600 font-open-sans">
          Keep your car clean and shiny with our professional car wash services.
        </p>
      </div>

      {/* Booking Steps */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Steps
          current={bookingStep}
          items={[
            { title: 'Choose Package' },
            { title: 'Book Appointment' },
            { title: 'Confirmation' },
          ]}
          className="mb-8"
        />
      </div>

      {/* Step 1: Package Selection */}
      {bookingStep === 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
              Choose Your Package
            </h2>
            <Row gutter={[16, 16]}>
              {packages.map((pkg) => (
                <Col xs={24} md={8} key={pkg.id}>
                  <Card
                    className={`text-center cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                      selectedPackage === pkg.id ? 'border-primary-red bg-red-50' : 'border-gray-200'
                    }`}
                    onClick={() => onPackageSelect(pkg.id)}
                  >
                    <div className="flex flex-col items-center p-4">
                      <div className="mb-4">
                        {pkg.icon}
                      </div>
                      <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                        {pkg.name}
                      </h3>
                      <div className="text-3xl font-livvic font-bold text-primary-red mb-4">
                        ₦{pkg.price.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center text-gray-600 mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <ul className="text-left space-y-2 mb-6">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Star className="w-3 h-3 text-primary-red mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        type="primary"
                        className="btn-primary w-full"
                        onClick={() => onPackageSelect(pkg.id)}
                      >
                        Select Package
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
      {bookingStep === 1 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
            Book Your Appointment
          </h2>
          <Form
            layout="vertical"
            onFinish={onFinishBooking}
            className="max-w-2xl"
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Car Type"
                  name="carType"
                  rules={[{ required: true, message: 'Please select your car type!' }]}
                >
                  <Select placeholder="Select car type">
                    {carTypes.map((type) => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: 'Please select a date!' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Time"
                  name="time"
                  rules={[{ required: true, message: 'Please select a time!' }]}
                >
                  <TimePicker className="w-full" format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true, message: 'Please enter your location!' }]}
                >
                  <Input
                    prefix={<MapPin className="text-gray-400" size={16} />}
                    placeholder="Enter your address"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Special Instructions"
              name="instructions"
            >
              <TextArea
                rows={4}
                placeholder="Any special requests or instructions..."
              />
            </Form.Item>

            <div className="flex space-x-4">
              <Button
                onClick={() => setBookingStep(0)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary flex-1"
              >
                Book Appointment
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {bookingStep === 2 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <div className="mb-6">
              <Sparkles className="w-16 h-16 text-primary-red mx-auto mb-4" />
              <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600">
                Your car wash appointment has been scheduled successfully.
              </p>
            </div>

            <Card className="max-w-md mx-auto mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">Premium Wash</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">Tomorrow, 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">123 Main St</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Tag color="blue">Scheduled</Tag>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                type="primary"
                className="btn-primary"
                onClick={() => setBookingStep(0)}
              >
                Book Another Service
              </Button>
              <Button
                onClick={() => setBookingStep(0)}
                className="block mx-auto"
              >
                Back to Packages
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      {bookingStep === 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
            Recent Bookings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-primary-red mr-4" />
                <div>
                  <p className="font-medium text-primary-black">Premium Wash</p>
                  <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <Tag color="blue">Scheduled</Tag>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Car className="w-8 h-8 text-primary-red mr-4" />
                <div>
                  <p className="font-medium text-primary-black">Basic Wash</p>
                  <p className="text-sm text-gray-600">Yesterday, 10:00 AM</p>
                </div>
              </div>
              <Tag color="green">Completed</Tag>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarWash;
