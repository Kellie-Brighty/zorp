import { useState } from 'react';
import { Form, Input, Button, Upload, Select, DatePicker, message, Steps, Row, Col } from 'antd';
import { Upload as UploadIcon, Car, User, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const DriverRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Personal Info',
      icon: <User className="w-5 h-5" />,
    },
    {
      title: 'Vehicle Details',
      icon: <Car className="w-5 h-5" />,
    },
    {
      title: 'Documents',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: 'Review',
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const onFinish = (values: any) => {
    console.log('Driver registration values:', values);
    message.success('Application submitted successfully! We will review your application within 24-48 hours.');
    navigate('/dashboard');
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
              Personal Information
            </h2>
            
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter your first name!' }]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your last name!' }]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                  <Input placeholder="+234 800 000 0000" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please select your date of birth!' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address!' }]}
            >
              <TextArea rows={3} placeholder="Enter your full address" />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: 'Please enter your city!' }]}
                >
                  <Input placeholder="Enter your city" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: 'Please enter your state!' }]}
                >
                  <Input placeholder="Enter your state" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
              Vehicle Information
            </h2>
            
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Vehicle Make"
                  name="vehicleMake"
                  rules={[{ required: true, message: 'Please enter vehicle make!' }]}
                >
                  <Input placeholder="e.g., Toyota, Honda, Ford" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Vehicle Model"
                  name="vehicleModel"
                  rules={[{ required: true, message: 'Please enter vehicle model!' }]}
                >
                  <Input placeholder="e.g., Camry, Accord, Focus" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Vehicle Year"
                  name="vehicleYear"
                  rules={[{ required: true, message: 'Please enter vehicle year!' }]}
                >
                  <Input placeholder="e.g., 2020" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Vehicle Color"
                  name="vehicleColor"
                  rules={[{ required: true, message: 'Please enter vehicle color!' }]}
                >
                  <Input placeholder="e.g., White, Black, Silver" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="License Plate"
                  name="licensePlate"
                  rules={[{ required: true, message: 'Please enter license plate!' }]}
                >
                  <Input placeholder="e.g., ABC-123" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Vehicle Type"
                  name="vehicleType"
                  rules={[{ required: true, message: 'Please select vehicle type!' }]}
                >
                  <Select placeholder="Select vehicle type">
                    <Option value="sedan">Sedan</Option>
                    <Option value="suv">SUV</Option>
                    <Option value="hatchback">Hatchback</Option>
                    <Option value="luxury">Luxury Vehicle</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
              Required Documents
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-primary-black mb-2">Driver's License</h3>
                <Form.Item
                  name="driversLicense"
                  rules={[{ required: true, message: 'Please upload your driver\'s license!' }]}
                >
                  <Upload.Dragger
                    name="driversLicense"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadIcon className="text-primary-red" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Upload a clear photo of your driver's license</p>
                  </Upload.Dragger>
                </Form.Item>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-black mb-2">Vehicle Registration</h3>
                <Form.Item
                  name="vehicleRegistration"
                  rules={[{ required: true, message: 'Please upload vehicle registration!' }]}
                >
                  <Upload.Dragger
                    name="vehicleRegistration"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadIcon className="text-primary-red" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Upload your vehicle registration document</p>
                  </Upload.Dragger>
                </Form.Item>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-black mb-2">Insurance Certificate</h3>
                <Form.Item
                  name="insurance"
                  rules={[{ required: true, message: 'Please upload insurance certificate!' }]}
                >
                  <Upload.Dragger
                    name="insurance"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadIcon className="text-primary-red" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Upload your vehicle insurance certificate</p>
                  </Upload.Dragger>
                </Form.Item>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-black mb-2">Profile Photo</h3>
                <Form.Item
                  name="profilePhoto"
                  rules={[{ required: true, message: 'Please upload your profile photo!' }]}
                >
                  <Upload.Dragger
                    name="profilePhoto"
                    multiple={false}
                    beforeUpload={() => false}
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadIcon className="text-primary-red" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Upload a clear photo of yourself</p>
                  </Upload.Dragger>
                </Form.Item>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-6">
              Review Your Application
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-black mb-4">Application Summary</h3>
              <div className="space-y-2 text-gray-600">
                <p>Please review all your information before submitting your application.</p>
                <p>We will verify your documents and contact you within 24-48 hours.</p>
                <p>Once approved, you can start accepting ride requests immediately.</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary-black mb-2">Requirements Checklist</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Valid driver's license (minimum 2 years)</li>
                <li>✓ Vehicle registration in your name</li>
                <li>✓ Valid insurance certificate</li>
                <li>✓ Vehicle must be 2010 or newer</li>
                <li>✓ Clean driving record</li>
                <li>✓ Background check clearance</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-livvic font-bold text-primary-black mb-2">
          Become a Driver
        </h1>
        <p className="text-gray-600 font-open-sans">
          Join thousands of drivers earning with Zorp. Complete your application to get started.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Steps
          current={currentStep}
          items={steps}
          className="mb-8"
        />
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="max-w-4xl"
        >
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-8"
            >
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                onClick={nextStep}
                className="btn-primary px-8"
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="btn-primary px-8"
              >
                Submit Application
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DriverRegistration;
