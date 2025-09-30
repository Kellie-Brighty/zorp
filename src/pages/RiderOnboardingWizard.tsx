import { useState } from 'react';
import { Button, Card, Steps, Form, Input, Select, Upload, message, Progress, DatePicker } from 'antd';
import { ArrowLeft, ArrowRight, User, Car, FileText, CheckCircle, Upload as UploadIcon, Camera, Phone, Mail, Calendar, IdCard, Shield, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

interface WizardData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    plateNumber: string;
    vehicleType: string;
  };
  documents: {
    driverLicense: File | null;
    vehicleRegistration: File | null;
    insurance: File | null;
    profilePhoto: File | null;
  };
  verification: {
    agreeToTerms: boolean;
    backgroundCheck: boolean;
  };
}

const RiderOnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [_wizardData, setWizardData] = useState<WizardData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: ''
    },
    vehicleInfo: {
      make: '',
      model: '',
      year: '',
      color: '',
      plateNumber: '',
      vehicleType: ''
    },
    documents: {
      driverLicense: null,
      vehicleRegistration: null,
      insurance: null,
      profilePhoto: null
    },
    verification: {
      agreeToTerms: false,
      backgroundCheck: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Personal Info',
      description: 'Basic information',
      icon: <User className="w-5 h-5" />
    },
    {
      title: 'Vehicle Details',
      description: 'Car information',
      icon: <Car className="w-5 h-5" />
    },
    {
      title: 'Documents',
      description: 'Upload required docs',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'Review & Submit',
      description: 'Final verification',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }).catch((error) => {
      console.log('Validation failed:', error);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      message.success('Application submitted successfully! You will be notified once approved.');
      navigate('/map');
    } catch (error) {
      message.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary-red" />
        </div>
        <h2 className="text-xl sm:text-2xl font-livvic font-bold text-primary-black mb-2">
          Personal Information
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Tell us about yourself to get started
        </p>
      </div>

      <Form form={form} layout="vertical" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
            <Input
              prefix={<User className="text-gray-400" size={16} />}
              placeholder="Enter your first name"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input
              prefix={<User className="text-gray-400" size={16} />}
              placeholder="Enter your last name"
              size="large"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input
            prefix={<Mail className="text-gray-400" size={16} />}
            placeholder="Enter your email address"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number!' }]}
        >
          <Input
            prefix={<Phone className="text-gray-400" size={16} />}
            placeholder="+234 800 000 0000"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth!' }]}
        >
          <DatePicker
            placeholder="Select your date of birth"
            size="large"
            className="w-full"
            format="YYYY-MM-DD"
            disabledDate={(current) => {
              // Disable future dates and dates more than 100 years ago
              return current && (current > dayjs().endOf('day') || current < dayjs().subtract(100, 'year'));
            }}
            showToday={false}
            suffixIcon={<Calendar className="text-gray-400" size={16} />}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Home Address"
          rules={[{ required: true, message: 'Please enter your address!' }]}
        >
          <TextArea
            placeholder="Enter your complete home address"
            rows={3}
            size="large"
          />
        </Form.Item>
      </Form>
    </div>
  );

  const renderVehicleInfo = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <Car className="w-6 h-6 sm:w-8 sm:h-8 text-primary-red" />
        </div>
        <h2 className="text-xl sm:text-2xl font-livvic font-bold text-primary-black mb-2">
          Vehicle Information
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Tell us about your vehicle
        </p>
      </div>

      <Form form={form} layout="vertical" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            name="vehicleMake"
            label="Vehicle Make"
            rules={[{ required: true, message: 'Please select vehicle make!' }]}
          >
            <Select placeholder="Select make" size="large">
              <Option value="toyota">Toyota</Option>
              <Option value="honda">Honda</Option>
              <Option value="nissan">Nissan</Option>
              <Option value="hyundai">Hyundai</Option>
              <Option value="ford">Ford</Option>
              <Option value="chevrolet">Chevrolet</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicleModel"
            label="Vehicle Model"
            rules={[{ required: true, message: 'Please enter vehicle model!' }]}
          >
            <Input placeholder="e.g., Camry, Accord" size="large" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            name="vehicleYear"
            label="Year"
            rules={[{ required: true, message: 'Please select year!' }]}
          >
            <Select placeholder="Select year" size="large">
              {Array.from({ length: 15 }, (_, i) => 2024 - i).map(year => (
                <Option key={year} value={year.toString()}>{year}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicleColor"
            label="Color"
            rules={[{ required: true, message: 'Please enter vehicle color!' }]}
          >
            <Input placeholder="e.g., White, Black, Silver" size="large" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            name="plateNumber"
            label="License Plate Number"
            rules={[{ required: true, message: 'Please enter plate number!' }]}
          >
            <Input placeholder="e.g., ABC 123 XY" size="large" />
          </Form.Item>
          <Form.Item
            name="vehicleType"
            label="Vehicle Type"
            rules={[{ required: true, message: 'Please select vehicle type!' }]}
          >
            <Select placeholder="Select type" size="large">
              <Option value="sedan">Sedan</Option>
              <Option value="suv">SUV</Option>
              <Option value="hatchback">Hatchback</Option>
              <Option value="pickup">Pickup Truck</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary-red" />
        </div>
        <h2 className="text-xl sm:text-2xl font-livvic font-bold text-primary-black mb-2">
          Required Documents
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Upload the following documents for verification
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="text-center" bodyStyle={{ padding: '16px' }}>
          <div className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <IdCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-black mb-1 text-sm sm:text-base">Driver's License</h3>
              <p className="text-xs sm:text-sm text-gray-600">Front and back of your license</p>
            </div>
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file) {
                  setWizardData(prev => ({
                    ...prev,
                    documents: { ...prev.documents, driverLicense: info.file?.originFileObj as File }
                  }));
                }
              }}
              showUploadList={false}
            >
              <Button icon={<UploadIcon className="w-4 h-4" />} size="small" className="w-full sm:w-auto">
                Upload License
              </Button>
            </Upload>
          </div>
        </Card>

        <Card className="text-center" bodyStyle={{ padding: '16px' }}>
          <div className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Car className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-black mb-1 text-sm sm:text-base">Vehicle Registration</h3>
              <p className="text-xs sm:text-sm text-gray-600">Current registration document</p>
            </div>
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file) {
                  setWizardData(prev => ({
                    ...prev,
                    documents: { ...prev.documents, vehicleRegistration: info.file?.originFileObj as File }
                  }));
                }
              }}
              showUploadList={false}
            >
              <Button icon={<UploadIcon className="w-4 h-4" />} size="small" className="w-full sm:w-auto">
                Upload Registration
              </Button>
            </Upload>
          </div>
        </Card>

        <Card className="text-center" bodyStyle={{ padding: '16px' }}>
          <div className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-black mb-1 text-sm sm:text-base">Insurance Certificate</h3>
              <p className="text-xs sm:text-sm text-gray-600">Valid insurance document</p>
            </div>
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file) {
                  setWizardData(prev => ({
                    ...prev,
                    documents: { ...prev.documents, insurance: info.file?.originFileObj as File }
                  }));
                }
              }}
              showUploadList={false}
            >
              <Button icon={<UploadIcon className="w-4 h-4" />} size="small" className="w-full sm:w-auto">
                Upload Insurance
              </Button>
            </Upload>
          </div>
        </Card>

        <Card className="text-center" bodyStyle={{ padding: '16px' }}>
          <div className="space-y-3 sm:space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-black mb-1 text-sm sm:text-base">Profile Photo</h3>
              <p className="text-xs sm:text-sm text-gray-600">Clear photo of yourself</p>
            </div>
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              onChange={(info) => {
                if (info.file) {
                  setWizardData(prev => ({
                    ...prev,
                    documents: { ...prev.documents, profilePhoto: info.file?.originFileObj as File }
                  }));
                }
              }}
              showUploadList={false}
            >
              <Button icon={<UploadIcon className="w-4 h-4" />} size="small" className="w-full sm:w-auto">
                Upload Photo
              </Button>
            </Upload>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-livvic font-bold text-primary-black mb-2">
          Review & Submit
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Review your information before submitting
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <Card title="Personal Information" className="shadow-sm" bodyStyle={{ padding: '16px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-medium">John Doe</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-medium break-all">john@example.com</span>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 font-medium">+234 800 123 4567</span>
            </div>
            <div>
              <span className="text-gray-600">Date of Birth:</span>
              <span className="ml-2 font-medium">1990-01-01</span>
            </div>
          </div>
        </Card>

        <Card title="Vehicle Information" className="shadow-sm" bodyStyle={{ padding: '16px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-gray-600">Make & Model:</span>
              <span className="ml-2 font-medium">Toyota Camry</span>
            </div>
            <div>
              <span className="text-gray-600">Year:</span>
              <span className="ml-2 font-medium">2020</span>
            </div>
            <div>
              <span className="text-gray-600">Color:</span>
              <span className="ml-2 font-medium">White</span>
            </div>
            <div>
              <span className="text-gray-600">Plate Number:</span>
              <span className="ml-2 font-medium">ABC 123 XY</span>
            </div>
          </div>
        </Card>

        <Card title="Documents Status" className="shadow-sm" bodyStyle={{ padding: '16px' }}>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Driver's License</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Vehicle Registration</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Insurance Certificate</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Profile Photo</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </Card>

        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1 text-sm sm:text-base">What happens next?</h4>
              <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                Your application will be reviewed within 24-48 hours. You'll receive an email notification once approved, 
                and then you can start driving with Zorp!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderVehicleInfo();
      case 2:
        return renderDocuments();
      case 3:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Button
                type="text"
                icon={<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
                onClick={() => navigate('/map')}
                className="text-gray-600 hover:text-primary-red p-2 sm:p-1"
                size="small"
              >
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div>
                <h1 className="text-lg sm:text-2xl font-livvic font-bold text-primary-black">
                  Become a Driver
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Join thousands of drivers earning with Zorp
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end">
              <div className="text-xs sm:text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</div>
              <Progress 
                percent={((currentStep + 1) / steps.length) * 100} 
                size="small" 
                strokeColor="#D32F2F"
                className="w-16 sm:w-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <Steps
            current={currentStep}
            items={steps}
            className="hidden sm:block"
            size="small"
          />
          <div className="sm:hidden">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center space-y-1 ${
                    index <= currentStep ? 'text-primary-red' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                      index <= currentStep
                        ? 'bg-primary-red text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs text-center leading-tight">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        <Card className="shadow-sm">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8">
          <Button
            size="large"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 w-full sm:w-auto order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={isSubmitting}
              className="btn-primary flex items-center space-x-2 w-full sm:w-auto order-1 sm:order-2"
            >
              <span>Submit Application</span>
              <CheckCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2 w-full sm:w-auto order-1 sm:order-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderOnboardingWizard;
