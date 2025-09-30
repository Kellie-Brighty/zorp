import { useState, useEffect, useRef } from 'react';
import { Button, Input, Avatar, Card, Badge, message, Typography } from 'antd';
import { ArrowLeft, Send, Phone, MapPin, Clock, CarTaxiFront, Star, MoreVertical } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'driver';
  timestamp: Date;
  type: 'text' | 'system';
}

interface ChatData {
  driverId?: string;
  driverPhone?: string;
  rideId?: string;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your driver. I\'m on my way to pick you up. ETA: 5 minutes.',
      sender: 'driver',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      type: 'text'
    },
    {
      id: '2',
      text: 'Hi! Thanks for the update. I\'ll be waiting at the pickup location.',
      sender: 'customer',
      timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      type: 'text'
    },
    {
      id: '3',
      text: 'I\'ve arrived at the pickup location. I\'m in a white Toyota Camry.',
      sender: 'driver',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      type: 'text'
    },
    {
      id: '4',
      text: 'Perfect! I can see you. I\'m coming out now.',
      sender: 'customer',
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const { _user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const chatData: ChatData = location.state || {};
  
  // Sample driver data (in a real app, this would come from an API)
  const driverInfo = {
    name: chatData.driverId || 'John D.',
    phone: chatData.driverPhone || '+234 800 123 4567',
    rating: 4.8,
    vehicle: 'Toyota Camry - ABC 123 XY',
    avatar: 'JD',
    status: 'online'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'customer',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate driver typing and response
      setIsTyping(true);
      setTimeout(() => {
        const driverResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for the message! I\'ll respond shortly.',
          sender: 'driver',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, driverResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCallDriver = () => {
    message.info(`Calling ${driverInfo.name} at ${driverInfo.phone}`);
    // In a real app, this would initiate a phone call
  };

  const handleViewLocation = () => {
    message.info('Opening driver location on map');
    // In a real app, this would open the map with driver location
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Button
            type="text"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-primary-red flex-shrink-0"
          />
          <Avatar 
            size={45} 
            className="bg-gradient-to-br from-primary-red to-red-600 text-white font-bold text-lg shadow-lg flex-shrink-0"
          >
            {driverInfo.avatar}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Title level={5} className="!mb-0 !text-primary-black truncate">
                {driverInfo.name}
              </Title>
              <Badge 
                status={driverInfo.status === 'online' ? 'success' : 'default'} 
                text={driverInfo.status}
                className="text-xs flex-shrink-0"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
              <span className="font-medium">{driverInfo.rating}</span>
              <span className="text-gray-400">•</span>
              <span className="truncate">{driverInfo.vehicle}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 flex-shrink-0">
          <Button
            type="text"
            icon={<Phone className="w-5 h-5" />}
            onClick={handleCallDriver}
            className="text-gray-600 hover:text-primary-red hover:bg-primary-red/10 rounded-full w-10 h-10"
          />
          <Button
            type="text"
            icon={<MapPin className="w-5 h-5" />}
            onClick={handleViewLocation}
            className="text-gray-600 hover:text-primary-red hover:bg-primary-red/10 rounded-full w-10 h-10"
          />
          <Button
            type="text"
            icon={<MoreVertical className="w-5 h-5" />}
            className="text-gray-600 hover:text-primary-red hover:bg-primary-red/10 rounded-full w-10 h-10"
          />
        </div>
      </div>

      {/* Ride Info Card */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm">
        <Card 
          size="small" 
          className="shadow-sm border-0 bg-gradient-to-r from-white to-gray-50/50"
          bodyStyle={{ padding: '16px' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-red/10 rounded-full flex items-center justify-center">
                <CarTaxiFront className="w-6 h-6 text-primary-red" />
              </div>
              <div className="flex-1">
                <Text strong className="text-primary-black text-base">Ride in Progress</Text>
                <div className="space-y-1 mt-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>From: Victoria Island, Lagos</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>To: Lekki Phase 1, Lagos</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 flex items-center justify-end mb-1">
                <Clock className="w-4 h-4 mr-1 text-primary-red" />
                <span className="font-medium">ETA: 5 min</span>
              </div>
              <div className="text-xl font-bold text-primary-red">₦1,200</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === 'customer'
                  ? 'bg-gradient-to-br from-primary-red to-red-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              }`}
            >
              <div className="text-sm leading-relaxed">{message.text}</div>
              <div
                className={`text-xs mt-2 ${
                  message.sender === 'customer' ? 'text-red-100' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500">Driver is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <TextArea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="resize-none border-gray-300 rounded-2xl focus:border-primary-red focus:ring-2 focus:ring-primary-red/20 shadow-sm"
              style={{ 
                padding: '12px 16px',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            />
          </div>
          <Button
            type="primary"
            icon={<Send className="w-4 h-4" />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="h-12 w-12 btn-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
