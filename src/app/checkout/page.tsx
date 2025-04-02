"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  farm: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    deliveryNotes: "",
  });

  // Form validation
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  // Set isClient to true once component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    loadAllCarts();
  }, [loadAllCarts]);

  // Load all carts from all farm categories
  const loadAllCarts = useCallback(() => {
    if (typeof window === 'undefined') return;

    const farmCategories = [
      'andrew-poultry',
      'kinunga-avocados',
      'dairy-products',
      'organic-vegetables',
      'fruit-orchard',
      'honey-farm'
    ];

    const allCartItems: CartItem[] = [];
    let total = 0;

    farmCategories.forEach(category => {
      try {
        const cartData = localStorage.getItem(`${category}-cart`);
        if (cartData) {
          const cart = JSON.parse(cartData);

          // Get product details from localStorage if available
          const productsData = localStorage.getItem(`${category}-products`);
          const products = productsData ? JSON.parse(productsData) : {};

          Object.entries(cart).forEach(([productId, quantity]) => {
            // If we have the product details in localStorage
            if (products && products[productId]) {
              const product = products[productId];
              const itemTotal = product.price * Number(quantity);
              total += itemTotal;

              allCartItems.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: Number(quantity),
                unit: product.unit || 'each',
                farm: getFarmNameFromSlug(category),
              });
            } else {
              // Fallback if we don't have product details
              allCartItems.push({
                id: productId,
                name: `Product ${productId}`,
                price: 0, // We don't know the price without product details
                quantity: Number(quantity),
                unit: 'each',
                farm: getFarmNameFromSlug(category),
              });
            }
          });
        }
      } catch (error) {
        console.error(`Error loading cart for ${category}:`, error);
      }
    });

    setCartItems(allCartItems);
    setOrderTotal(total);
  }, []);

  const getFarmNameFromSlug = (slug: string): string => {
    const farmNames: { [key: string]: string } = {
      'andrew-poultry': 'Andrew Poultry Farm',
      'kinunga-avocados': 'Kinunga Fresh Avocados',
      'dairy-products': 'Dairy Products',
      'organic-vegetables': 'Organic Vegetables',
      'fruit-orchard': 'Fruit Orchard',
      'honey-farm': 'Honey Farm'
    };

    return farmNames[slug] || 'Muriithi Empire Farms';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { ...errors };

    // Basic validation rules
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Create order object
    const order = {
      customer: formData,
      items: cartItems,
      total: orderTotal,
      orderDate: new Date().toISOString(),
      orderNumber: `MF-${Date.now().toString().slice(-6)}`,
    };

    try {
      // Simulate sending order to server
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store order in localStorage for reference
      localStorage.setItem('last-order', JSON.stringify(order));

      // Clear all carts
      const farmCategories = [
        'andrew-poultry',
        'kinunga-avocados',
        'dairy-products',
        'organic-vegetables',
        'fruit-orchard',
        'honey-farm'
      ];

      farmCategories.forEach(category => {
        localStorage.removeItem(`${category}-cart`);
      });

      setIsSuccess(true);

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        router.push('/checkout/confirmation');
      }, 2000);

    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading checkout...</div>;
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-farm-green-50 p-8 rounded-lg max-w-md mx-auto">
          <svg className="w-16 h-16 text-farm-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h2 className="text-2xl font-bold text-farm-green-800 mb-2">Order Successful!</h2>
          <p className="text-gray-600 mb-4">Your order has been received. We're redirecting you to the confirmation page...</p>
          <div className="animate-pulse text-farm-green-600">
            Please wait...
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before proceeding to checkout</p>
          <Link href="/products" className="bg-farm-green-600 hover:bg-farm-green-700 text-white font-medium py-2 px-6 rounded-lg">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-farm-green-800">Checkout</h1>
          <p className="text-gray-600">Complete your order information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order summary */}
          <div className="lg:col-span-5 lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-farm-green-800 mb-4">Order Summary</h2>

              <div className="max-h-96 overflow-y-auto mb-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="py-3 border-b border-gray-100 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit} · {item.farm}
                      </p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">$5.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200 mt-3">
                  <span>Total</span>
                  <span className="text-farm-green-700">${(orderTotal + 5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer information form */}
          <div className="lg:col-span-7 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-farm-green-800 mb-4">Customer Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5`}
                      placeholder="+254 123 456 789"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">Delivery Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5`}
                      placeholder="123 Farm Road"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5`}
                      placeholder="Nairobi"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block mb-2 text-sm font-medium text-gray-700">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`bg-gray-50 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5`}
                      placeholder="00100"
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="deliveryNotes" className="block mb-2 text-sm font-medium text-gray-700">Delivery Notes (Optional)</label>
                    <textarea
                      id="deliveryNotes"
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-farm-green-500 focus:border-farm-green-500 block w-full p-2.5"
                      placeholder="Additional delivery instructions or details"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white font-medium rounded-lg text-sm px-5 py-4 text-center ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-farm-green-600 hover:bg-farm-green-700'}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Order...
                    </span>
                  ) : (
                    'Complete Order'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
