import { useState } from 'react';
import { Card, Button, Row, Col, Input, Badge, Drawer, List, InputNumber, Divider, Tag, message } from 'antd';
import { ShoppingCart, Search, Plus, Minus, Trash2, MapPin, Clock, Star, Store, ArrowLeft } from 'lucide-react';

const { Search: SearchInput } = Input;

interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  category: string;
  isOpen: boolean;
}

interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const Groceries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [cartVisible, setCartVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);

  const categories = [
    { id: 'all', name: 'All', icon: '🛒' },
    { id: 'supermarket', name: 'Supermarket', icon: '🏪' },
    { id: 'organic', name: 'Organic Store', icon: '🌱' },
    { id: 'local', name: 'Local Market', icon: '🏘️' },
    { id: 'specialty', name: 'Specialty Store', icon: '🎯' },
  ];

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Fresh Market',
      rating: 4.8,
      reviews: 1247,
      deliveryTime: '30-45 min',
      deliveryFee: 2.99,
      image: '🏪',
      category: 'supermarket',
      isOpen: true,
    },
    {
      id: '2',
      name: 'Organic Corner',
      rating: 4.9,
      reviews: 892,
      deliveryTime: '45-60 min',
      deliveryFee: 3.99,
      image: '🌱',
      category: 'organic',
      isOpen: true,
    },
    {
      id: '3',
      name: 'Local Grocery',
      rating: 4.6,
      reviews: 567,
      deliveryTime: '20-35 min',
      deliveryFee: 1.99,
      image: '🏘️',
      category: 'local',
      isOpen: true,
    },
    {
      id: '4',
      name: 'Premium Foods',
      rating: 4.7,
      reviews: 734,
      deliveryTime: '40-55 min',
      deliveryFee: 4.99,
      image: '🎯',
      category: 'specialty',
      isOpen: true,
    },
  ];

  const products: Product[] = [
    {
      id: '1',
      vendorId: '1',
      name: 'Fresh Bananas',
      price: 800,
      image: '🍌',
      category: 'fruits',
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: '2',
      vendorId: '1',
      name: 'Organic Milk',
      price: 1200,
      image: '🥛',
      category: 'dairy',
      rating: 4.8,
      reviews: 89,
      inStock: true,
    },
    {
      id: '3',
      vendorId: '2',
      name: 'Free Range Eggs',
      price: 1500,
      image: '🥚',
      category: 'dairy',
      rating: 4.9,
      reviews: 156,
      inStock: true,
    },
    {
      id: '4',
      vendorId: '2',
      name: 'Avocados',
      price: 1000,
      image: '🥑',
      category: 'fruits',
      rating: 4.7,
      reviews: 234,
      inStock: true,
    },
    {
      id: '5',
      vendorId: '3',
      name: 'Local Honey',
      price: 2500,
      image: '🍯',
      category: 'specialty',
      rating: 4.8,
      reviews: 89,
      inStock: true,
    },
    {
      id: '6',
      vendorId: '3',
      name: 'Fresh Bread',
      price: 900,
      image: '🍞',
      category: 'bakery',
      rating: 4.6,
      reviews: 167,
      inStock: true,
    },
    {
      id: '7',
      vendorId: '4',
      name: 'Premium Coffee',
      price: 3500,
      image: '☕',
      category: 'beverages',
      rating: 4.9,
      reviews: 445,
      inStock: true,
    },
    {
      id: '8',
      vendorId: '4',
      name: 'Artisan Cheese',
      price: 2000,
      image: '🧀',
      category: 'dairy',
      rating: 4.7,
      reviews: 123,
      inStock: true,
    },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const vendorProducts = selectedVendor 
    ? products.filter(product => product.vendorId === selectedVendor.id)
    : [];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    message.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setCheckoutStep(1);
    setCartVisible(false);
  };

  const selectVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  const goBackToVendors = () => {
    setSelectedVendor(null);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {selectedVendor && (
              <Button
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={goBackToVendors}
                className="mr-4"
              >
                Back to Vendors
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-livvic font-bold text-primary-black mb-2">
                {selectedVendor ? selectedVendor.name : 'Groceries'}
              </h1>
              <p className="text-gray-600 font-open-sans">
                {selectedVendor 
                  ? `Order from ${selectedVendor.name} - ${selectedVendor.deliveryTime} delivery`
                  : 'Choose a vendor to start shopping.'
                }
              </p>
            </div>
          </div>
          <Button
            type="primary"
            icon={<ShoppingCart className="w-4 h-4" />}
            onClick={() => setCartVisible(true)}
            className="btn-primary"
          >
            Cart ({getCartItemCount()})
          </Button>
        </div>

        {/* Search */}
        <SearchInput
          placeholder={selectedVendor ? "Search products..." : "Search vendors..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Categories */}
      {!selectedVendor && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-livvic font-semibold text-primary-black mb-4">
            Vendor Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-red text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vendors List */}
      {!selectedVendor && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-livvic font-semibold text-primary-black mb-6">
            Available Vendors ({filteredVendors.length})
          </h2>
          <Row gutter={[16, 16]}>
            {filteredVendors.map((vendor) => (
              <Col xs={24} md={12} lg={6} key={vendor.id}>
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => selectVendor(vendor)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{vendor.image}</div>
                    <h3 className="font-livvic font-semibold text-primary-black mb-2">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        {vendor.rating} ({vendor.reviews})
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {vendor.deliveryTime} • ${vendor.deliveryFee} delivery
                    </div>
                    <Tag color={vendor.isOpen ? 'green' : 'red'}>
                      {vendor.isOpen ? 'Open' : 'Closed'}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Vendor Products */}
      {selectedVendor && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-livvic font-semibold text-primary-black mb-6">
            Products ({vendorProducts.length})
          </h2>
          <Row gutter={[16, 16]}>
            {vendorProducts.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  className="text-center hover:shadow-md transition-shadow"
                  cover={
                    <div className="p-6 text-6xl">
                      {product.image}
                    </div>
                  }
                  actions={[
                    <Button
                      type="primary"
                      className="btn-primary w-full"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={
                      <div className="text-left">
                        <h3 className="font-livvic font-semibold text-primary-black mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>
                    }
                    description={
                      <div className="text-left">
                        <div className="text-2xl font-livvic font-bold text-primary-red mb-2">
                          ₦{product.price.toLocaleString()}
                        </div>
                        {!product.inStock && (
                          <Tag color="red">Out of Stock</Tag>
                        )}
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Cart Drawer */}
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={() => setCartVisible(false)}
        open={cartVisible}
        width={400}
        footer={
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
                              <span>₦{getCartTotal().toFixed(0)}</span>
            </div>
            <Button
              type="primary"
              className="btn-primary w-full"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        }
      >
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <div className="flex items-center w-full">
                  <div className="text-3xl mr-4">{item.image}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-primary-black">{item.name}</h4>
                    <p className="text-primary-red font-semibold">₦{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="small"
                      icon={<Minus className="w-3 h-3" />}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="small"
                      icon={<Plus className="w-3 h-3" />}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                    <Button
                      size="small"
                      danger
                      icon={<Trash2 className="w-3 h-3" />}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Drawer>

      {/* Checkout Confirmation */}
      {checkoutStep === 1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-primary-red mx-auto mb-4" />
              <h2 className="text-2xl font-livvic font-semibold text-primary-black mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your groceries will be delivered within 1-2 hours.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Order Total:</span>
                  <span className="font-semibold">₦{getCartTotal().toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Delivery Time:</span>
                  <span className="font-semibold">1-2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Tag color="blue">Preparing</Tag>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="primary"
                  className="btn-primary w-full"
                  onClick={() => {
                    setCheckoutStep(0);
                    setCart([]);
                  }}
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={() => setCheckoutStep(0)}
                  className="w-full"
                >
                  View Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groceries;
