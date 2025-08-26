import { Card, Row, Col, Statistic, Button } from 'antd';
import { Car, Sparkles, ShoppingCart, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Rides',
      value: 24,
      icon: <Car className="w-6 h-6 text-primary-red" />,
      color: 'bg-red-50',
    },
    {
      title: 'Car Washes',
      value: 8,
      icon: <Sparkles className="w-6 h-6 text-primary-red" />,
      color: 'bg-red-50',
    },
    {
      title: 'Grocery Orders',
      value: 15,
      icon: <ShoppingCart className="w-6 h-6 text-primary-red" />,
      color: 'bg-red-50',
    },
    {
      title: 'Total Spent',
      value: '₦125,000',
      icon: <DollarSign className="w-6 h-6 text-primary-red" />,
      color: 'bg-red-50',
    },
  ];

  const quickActions = [
    {
      title: 'View Overview',
      description: 'See your complete dashboard summary',
      icon: <TrendingUp className="w-8 h-8 text-primary-red" />,
      action: 'View All',
      route: '/dashboard/overview',
    },
    {
      title: 'Book a Ride',
      description: 'Get a ride to your destination',
      icon: <Car className="w-8 h-8 text-primary-red" />,
      action: 'Book Now',
      route: '/dashboard/ride',
    },
    {
      title: 'Schedule Car Wash',
      description: 'Keep your car clean and shiny',
      icon: <Sparkles className="w-8 h-8 text-primary-red" />,
      action: 'Schedule',
      route: '/dashboard/carwash',
    },
    {
      title: 'Order Groceries',
      description: 'Fresh groceries delivered to you',
      icon: <ShoppingCart className="w-8 h-8 text-primary-red" />,
      action: 'Order Now',
      route: '/dashboard/groceries',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-livvic font-bold text-primary-black mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 font-open-sans mb-2">
          Ready to ride, wash, and shop? Here's what's happening with your account.
        </p>
        <p className="text-sm text-primary-red font-medium">
          Dashboard Overview
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className={`${stat.color} border-0`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-open-sans text-sm mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-livvic font-bold text-primary-black">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-livvic font-semibold text-primary-black mb-6">
          Quick Actions
        </h2>
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="text-center hover:shadow-md transition-shadow cursor-pointer border-2 border-gray-100 hover:border-primary-red">
                <div className="flex flex-col items-center p-4">
                  <div className="mb-4">
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-livvic font-semibold text-primary-black mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 font-open-sans text-sm mb-4">
                    {action.description}
                  </p>
                  <Button 
                    type="primary" 
                    className="btn-primary"
                    onClick={() => navigate(action.route)}
                  >
                    {action.action}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-livvic font-semibold text-primary-black mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Car className="w-5 h-5 text-primary-red mr-3" />
            <div className="flex-1">
              <p className="font-medium text-primary-black">Ride completed</p>
              <p className="text-sm text-gray-600">From Downtown to Airport</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary-red mr-3" />
            <div className="flex-1">
              <p className="font-medium text-primary-black">Car wash scheduled</p>
              <p className="text-sm text-gray-600">Premium package for tomorrow</p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-primary-red mr-3" />
            <div className="flex-1">
              <p className="font-medium text-primary-black">Grocery order delivered</p>
              <p className="text-sm text-gray-600">15 items delivered to your door</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
