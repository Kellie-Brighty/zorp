import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown } from 'antd';
import { 
  Car, 
  // Sparkles, 
  // ShoppingCart, 
  User, 
  Menu as MenuIcon,
  LogOut,
  Settings,
  Bell,
  Home
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = AntLayout;

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigationItems = [
    {
      key: 'overview',
      label: 'Overview',
      icon: <Home className="w-5 h-5" />,
      path: '/dashboard/overview',
    },
    {
      key: 'ride',
      label: 'Ride',
      icon: <Car className="w-5 h-5" />,
      path: '/dashboard/ride',
    },
    // {
    //   key: 'carwash',
    //   label: 'Car Wash',
    //   icon: <Sparkles className="w-5 h-5" />,
    //   path: '/dashboard/carwash',
    // },
    // {
    //   key: 'groceries',
    //   label: 'Groceries',
    //   icon: <ShoppingCart className="w-5 h-5" />,
    //   path: '/dashboard/groceries',
    // },
  ];


  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => {
        logout();
        navigate('/');
      },
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
      navigate('/');
    } else {
      navigate(`/dashboard/${key}`);
    }
  };

  return (
    <AntLayout className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden md:block bg-white border-r border-gray-200"
        width={250}
      >
        <div className="p-4">
          <h1 className="text-2xl font-livvic font-bold text-primary-red">
            {collapsed ? 'Z' : 'Zorp'}
          </h1>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split('/')[2] || 'overview']}
          items={navigationItems}
          onClick={handleMenuClick}
          className="border-0"
        />
      </Sider>

      <AntLayout>
        {/* Header */}
        <Header className="bg-white border-b border-gray-200 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={<MenuIcon className="w-5 h-5" />}
              onClick={() => setCollapsed(!collapsed)}
              className="md:hidden"
            />
            <h1 className="text-xl font-livvic font-semibold text-primary-black ml-4">
              Zorp
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<Bell className="w-5 h-5" />}
              className="hidden md:block"
            />
            
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleMenuClick }}
              placement="bottomRight"
            >
              <Avatar className="cursor-pointer bg-primary-red">
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </Dropdown>
          </div>
        </Header>

        {/* Content */}
        <Content className="p-4 md:p-6 bg-gray-50">
          <Outlet />
        </Content>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around py-2">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  location.pathname.includes(item.key)
                    ? 'text-primary-red bg-red-50'
                    : 'text-gray-600 hover:text-primary-red'
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
