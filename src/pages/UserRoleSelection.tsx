import { useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import { Car, User, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserRoleSelection = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Book rides, car washes, and order groceries',
      icon: <User className="w-12 h-12 text-primary-red" />,
      color: 'border-primary-red',
      bgColor: 'bg-red-50',
    },
    {
      id: 'driver',
      title: 'Driver',
      description: 'Provide ride-hailing services to customers',
      icon: <Car className="w-12 h-12 text-primary-red" />,
      color: 'border-primary-red',
      bgColor: 'bg-red-50',
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell groceries and manage your store',
      icon: <Store className="w-12 h-12 text-primary-red" />,
      color: 'border-primary-red',
      bgColor: 'bg-red-50',
    },
  ];

  const handleRoleSelection = (role: 'customer' | 'driver' | 'vendor') => {
    setUserRole(role);
    const roleName = role === 'customer' ? 'Customer' : role === 'driver' ? 'Driver' : 'Vendor';
    message.success(`Welcome as a ${roleName}!`);
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-livvic font-bold text-primary-black mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 font-open-sans max-w-2xl mx-auto">
            Select how you'd like to use Zorp. You can change this later in your settings.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card
              key={role.id}
              className={`text-center cursor-pointer transition-all duration-300 hover:shadow-lg ${role.bgColor} ${role.color} border-2 hover:scale-105`}
              onClick={() => handleRoleSelection(role.id as 'customer' | 'driver' | 'vendor')}
            >
              <div className="flex flex-col items-center p-6">
                <div className="mb-4">
                  {role.icon}
                </div>
                <h3 className="text-2xl font-livvic font-semibold text-primary-black mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-600 font-open-sans leading-relaxed">
                  {role.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/login')}
            className="text-primary-red border-primary-red hover:bg-red-50"
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRoleSelection;
