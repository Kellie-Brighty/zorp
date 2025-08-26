import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Sparkles, 
  ShoppingCart, 
  ArrowRight, 
  Star, 
  Check, 
  MapPin, 
  Clock, 
  Shield,
  Users,
  Zap,
  Heart
} from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const features = [
    {
      icon: <Car className="w-12 h-12 text-primary-red" />,
      title: 'Smart Ride Hailing',
      description: 'AI-powered matching for the fastest and most comfortable rides',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: <Sparkles className="w-12 h-12 text-primary-red" />,
      title: 'Premium Car Wash',
      description: 'Professional cleaning with eco-friendly products and attention to detail',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-primary-red" />,
      title: 'Fresh Groceries',
      description: 'Curated selection of fresh, local produce delivered to your door',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic Ride',
      price: '₦1,500',
      period: 'per ride',
      features: [
        'Standard vehicle',
        'Basic insurance',
        '24/7 support',
        'Real-time tracking'
      ],
      popular: false
    },
    {
      name: 'Premium Ride',
      price: '₦2,500',
      period: 'per ride',
      features: [
        'Luxury vehicle',
        'Premium insurance',
        'Priority support',
        'Free cancellation',
        'WiFi included'
      ],
      popular: true
    },
    {
      name: 'Car Wash',
      price: '₦8,000',
      period: 'per wash',
      features: [
        'Exterior wash',
        'Interior cleaning',
        'Tire dressing',
        'Window cleaning',
        'Air freshener'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-livvic font-bold text-primary-red cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Zorp
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-primary-red transition-colors cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-primary-red transition-colors cursor-pointer"
              >
                Pricing
              </button>
              <Button 
                type="primary" 
                className="btn-primary"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                type="text"
                className="p-2"
                onClick={() => {
                  // Simple mobile menu - could be expanded with a proper dropdown
                  scrollToSection('features');
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large gradient circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-100 to-orange-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-25 blur-3xl"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-32 right-20 w-24 h-24 border-2 border-red-200 rounded-lg rotate-12 opacity-20"></div>
          <div className="absolute bottom-32 left-20 w-16 h-16 border-2 border-blue-200 rounded-full opacity-20"></div>
          <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-gradient-to-br from-red-200 to-orange-200 rounded-lg rotate-45 opacity-15"></div>
          
          {/* Dotted patterns */}
          <div className="absolute top-40 right-1/4 w-32 h-32 opacity-10">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary-red rounded-full"></div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-40 left-1/3 w-24 h-24 opacity-10">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-gradient-to-br from-red-300 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Wave pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                fill="url(#gradient)" 
                opacity=".25"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D32F2F" />
                  <stop offset="100%" stopColor="#FF6B35" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-primary-red text-sm font-medium mb-8 backdrop-blur-sm border border-red-100">
              <Zap className="w-4 h-4 mr-2" />
              All-in-one lifestyle platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-livvic font-bold text-primary-black mb-6 leading-tight">
              Your Life,
              <span className="text-primary-red"> Simplified</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-open-sans">
              Experience the future of convenience with Zorp. From rides to car washes to groceries, 
              everything you need is just one tap away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="large"
                type="primary" 
                className="btn-primary text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => navigate('/login')}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="large"
                className="text-lg px-8 py-4 h-auto border-2 border-gray-300 hover:border-primary-red shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => scrollToSection('features')}
              >
                Explore Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-livvic font-bold text-primary-red mb-2">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-livvic font-bold text-primary-red mb-2">100K+</div>
                <div className="text-gray-600">Rides Completed</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-3xl font-livvic font-bold text-primary-red mb-2">4.9★</div>
                <div className="text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-livvic font-bold text-primary-black mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three essential services, one seamless experience. Discover how Zorp transforms your daily routine.
            </p>
          </div>

          <div className="space-y-24">
            {/* Smart Ride Hailing - Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-16 h-16 mb-6">
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <path d="M8 32h32v8H8z" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="1.5"/>
                    <path d="M12 36h24" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 24h16v8H16z" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="1.5"/>
                    <path d="M20 28h8" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="16" cy="40" r="4" fill="#D32F2F"/>
                    <circle cx="32" cy="40" r="4" fill="#D32F2F"/>
                    <circle cx="16" cy="40" r="2" fill="#121212"/>
                    <circle cx="32" cy="40" r="2" fill="#121212"/>
                    <circle cx="12" cy="28" r="1.5" fill="#FFD700"/>
                    <circle cx="36" cy="28" r="1.5" fill="#FFD700"/>
                    <circle cx="24" cy="20" r="3" fill="#D32F2F" opacity="0.8"/>
                    <path d="M24 17v6M21 20h6" stroke="#121212" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-livvic font-semibold text-primary-black mb-6">
                  Smart Ride Hailing
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  Experience intelligent ride matching with AI-powered algorithms that ensure the fastest, most comfortable, and cost-effective journeys. Our smart routing technology optimizes your trip in real-time.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Real-time driver tracking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Smart route optimization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Premium vehicle options</span>
                  </div>
                </div>
                
                <div 
                  className="flex items-center text-primary-red font-medium cursor-pointer hover:text-red-700 transition-colors group-hover:translate-x-1 duration-300"
                  onClick={() => scrollToSection('pricing')}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Modern ride hailing service with smartphone and car"
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Premium Car Wash - Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Professional car wash service"
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              
              <div className="order-2">
                <div className="w-16 h-16 mb-6">
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <path d="M8 32h32v8H8z" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="1.5"/>
                    <path d="M12 36h24" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 24h16v8H16z" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="1.5"/>
                    <path d="M20 28h8" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="16" cy="40" r="4" fill="#D32F2F"/>
                    <circle cx="32" cy="40" r="4" fill="#D32F2F"/>
                    <circle cx="16" cy="40" r="2" fill="#121212"/>
                    <circle cx="32" cy="40" r="2" fill="#121212"/>
                    <path d="M10 18c2-2 4-3 6-3s4 1 6 3" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                    <path d="M32 18c-2-2-4-3-6-3s-4 1-6 3" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                    <circle cx="14" cy="14" r="1" fill="#FFD700"/>
                    <circle cx="34" cy="14" r="1" fill="#FFD700"/>
                    <circle cx="24" cy="12" r="0.8" fill="#FFD700"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-livvic font-semibold text-primary-black mb-6">
                  Premium Car Wash
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  Professional-grade cleaning with eco-friendly products, attention to detail, and convenient scheduling that fits your lifestyle. Our certified technicians ensure your vehicle looks its best.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Eco-friendly products</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Interior & exterior cleaning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Flexible scheduling</span>
                  </div>
                </div>
                
                <div 
                  className="flex items-center text-primary-red font-medium cursor-pointer hover:text-red-700 transition-colors group-hover:translate-x-1 duration-300"
                  onClick={() => scrollToSection('pricing')}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Fresh Groceries - Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-16 h-16 mb-6">
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <path d="M8 16h32v24H8z" fill="#FEF2F2" stroke="#FEE2E2" strokeWidth="1.5"/>
                    <path d="M12 20h24M12 24h20M12 28h16" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M40 20c0-4-2-8-6-8s-6 4-6 8" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="12" cy="40" r="2" fill="#D32F2F"/>
                    <circle cx="36" cy="40" r="2" fill="#D32F2F"/>
                    <circle cx="20" cy="32" r="1.5" fill="#FFD700"/>
                    <circle cx="24" cy="30" r="1.2" fill="#D32F2F"/>
                    <circle cx="28" cy="32" r="1.3" fill="#FFD700"/>
                    <path d="M16 12l2-2 2 2" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-livvic font-semibold text-primary-black mb-6">
                  Fresh Groceries
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  Curated selection of fresh, local produce and premium groceries delivered to your doorstep with same-day availability. We partner with local farms to bring you the freshest ingredients.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Local farm partnerships</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Same-day delivery</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-red rounded-full mr-3"></div>
                    <span className="text-gray-700">Quality guarantee</span>
                  </div>
                </div>
                
                <div 
                  className="flex items-center text-primary-red font-medium cursor-pointer hover:text-red-700 transition-colors group-hover:translate-x-1 duration-300"
                  onClick={() => scrollToSection('pricing')}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
                    alt="Fresh groceries and produce delivery"
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top left semi-circle */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gray-100 rounded-full opacity-30"></div>
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gray-200 rounded-full opacity-40"></div>
          
          {/* Top right patterns */}
          <div className="absolute top-10 right-10 w-16 h-16 bg-gray-100 rounded-full opacity-25"></div>
          <div className="absolute top-32 right-32 w-24 h-24 bg-gray-200 rounded-full opacity-20"></div>
          
          {/* Bottom left patterns */}
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-gray-100 rounded-full opacity-30"></div>
          <div className="absolute bottom-40 left-40 w-8 h-8 bg-gray-200 rounded-full opacity-35"></div>
          
          {/* Bottom right semi-circle */}
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gray-100 rounded-full opacity-25"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gray-200 rounded-full opacity-30"></div>
          
          {/* Center decorative elements */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-gray-100 rounded-full opacity-20"></div>
          <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-gray-200 rounded-full opacity-25"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-livvic font-bold text-primary-black mb-4">
              Perfect For Every Lifestyle
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a busy professional, a family, or just someone who values convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-red" />
                </div>
                <div>
                  <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                    Busy Professionals
                  </h3>
                  <p className="text-gray-600">
                    Save time with our integrated services. Book rides, schedule car washes, and order groceries all from one app.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                    Families
                  </h3>
                  <p className="text-gray-600">
                    Keep your family moving with reliable rides, clean cars, and fresh groceries delivered to your door.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-livvic font-semibold text-primary-black mb-2">
                    Quality Seekers
                  </h3>
                  <p className="text-gray-600">
                    Experience premium service with our carefully curated network of providers and quality guarantees.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-livvic font-bold mb-4">
                    Join the Revolution
                  </h3>
                  <p className="text-red-100 mb-6">
                    Experience the future of convenience today
                  </p>
                  <Button 
                    size="large"
                    className="bg-white text-primary-red hover:bg-gray-100 border-0"
                    onClick={() => navigate('/login')}
                  >
                    Get Started Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-livvic font-bold text-primary-black mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprises. Just great service at fair prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-lg ${plan.popular ? 'ring-2 ring-primary-red transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-red text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-livvic font-semibold text-primary-black mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-livvic font-bold text-primary-black">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  type={plan.popular ? "primary" : "default"}
                  className={`w-full ${plan.popular ? 'btn-primary' : 'border-2 border-gray-300 hover:border-primary-red'}`}
                  onClick={() => navigate('/login')}
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* CTA Section */}
      <section className="py-20 bg-primary-red">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-livvic font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have already discovered the convenience of Zorp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="large"
              className="bg-white text-primary-red hover:bg-gray-100 border-0 text-lg px-8 py-4 h-auto"
              onClick={() => navigate('/login')}
            >
              Start Free Trial
            </Button>
            <Button 
              size="large"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-red text-lg px-8 py-4 h-auto"
              onClick={() => scrollToSection('features')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-livvic font-bold text-primary-red mb-4">Zorp</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Your all-in-one lifestyle platform for rides, car washes, and groceries. 
                Experience convenience redefined.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors cursor-pointer">
                  <span className="text-sm font-bold">F</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors cursor-pointer">
                  <span className="text-sm font-bold">T</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-red transition-colors cursor-pointer">
                  <span className="text-sm font-bold">I</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Ride Hailing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Car Wash</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Groceries</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Premium</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Zorp. All rights reserved. Made with ❤️ for convenience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SplashScreen;
