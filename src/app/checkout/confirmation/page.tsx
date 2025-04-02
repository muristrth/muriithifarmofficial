"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  farm: string;
};

type Customer = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryNotes?: string;
};

type Order = {
  customer: Customer;
  items: OrderItem[];
  total: number;
  orderDate: string;
  orderNumber: string;
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Load the order from localStorage
    const lastOrder = localStorage.getItem('last-order');
    if (lastOrder) {
      try {
        setOrder(JSON.parse(lastOrder));

        // Simulate sending email notification
        setTimeout(() => {
          setEmailSent(true);
        }, 2000);
      } catch (error) {
        console.error('Error parsing order:', error);
      }
    }
  }, []);

  if (!isClient) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading confirmation...</div>;
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No order found</h2>
          <p className="text-gray-600 mb-6">We couldn't find any recent order information</p>
          <Link href="/products" className="bg-farm-green-600 hover:bg-farm-green-700 text-white font-medium py-2 px-6 rounded-lg">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Order confirmation header */}
          <div className="bg-farm-green-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Order Confirmation</h1>
                <p className="opacity-90">Thank you for your order!</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Order #{order.orderNumber}</p>
                <p className="text-sm opacity-90">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="p-6">
            {/* Order status */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-farm-green-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-farm-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-farm-green-800">Order Received</h2>
                  <p className="text-gray-600">Your order has been successfully placed</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-6 top-0 -ml-px h-full w-0.5 bg-farm-green-200"></div>
                <div className="flex items-center relative">
                  <div className="w-12 h-12 rounded-full bg-farm-green-100 flex items-center justify-center mr-4 border-2 border-white">
                    <svg className="w-6 h-6 text-farm-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-farm-green-800">Email Notification</h2>
                    <p className="text-gray-600">
                      {emailSent
                        ? `Confirmation sent to ${order.customer.email}`
                        : 'Sending confirmation email...'}
                    </p>
                    {!emailSent && (
                      <div className="mt-1 flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-farm-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm text-farm-green-600">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order notifications */}
            <div className="mb-8 bg-farm-green-50 p-4 rounded-lg border border-farm-green-100">
              <h3 className="font-semibold text-farm-green-800 mb-2">Order Notifications</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-farm-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Order confirmation email sent to: <span className="font-medium">{order.customer.email}</span></span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-farm-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Order notification sent to farm owners at: <span className="font-medium">orders@muriithi-farms.com</span></span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-farm-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>SMS notification will be sent when your order is being prepared</span>
                </li>
              </ul>
            </div>

            {/* Order details */}
            <div className="mb-8">
              <h3 className="font-semibold text-farm-green-800 mb-4 text-lg">Order Details</h3>

              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={`${item.id}-${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{item.quantity} {item.unit}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{item.farm}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right font-medium">Subtotal:</td>
                      <td className="px-6 py-4 text-right font-medium">${order.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right font-medium">Delivery Fee:</td>
                      <td className="px-6 py-4 text-right font-medium">$5.00</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td colSpan={3} className="px-6 py-4 text-right font-bold text-farm-green-800">Total:</td>
                      <td className="px-6 py-4 text-right font-bold text-farm-green-800">${(order.total + 5).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Customer information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-farm-green-800 mb-2 text-lg">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded border">
                  <p className="mb-1"><span className="font-medium">Name:</span> {order.customer.fullName}</p>
                  <p className="mb-1"><span className="font-medium">Email:</span> {order.customer.email}</p>
                  <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-farm-green-800 mb-2 text-lg">Delivery Information</h3>
                <div className="bg-gray-50 p-4 rounded border">
                  <p className="mb-1">{order.customer.address}</p>
                  <p className="mb-1">{order.customer.city}, {order.customer.zipCode}</p>
                  {order.customer.deliveryNotes && (
                    <p className="mt-2 text-sm italic border-t pt-2 border-gray-200">
                      <span className="font-medium">Notes:</span> {order.customer.deliveryNotes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-6 rounded-lg">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h3 className="font-bold text-farm-green-800 mb-1">Order Estimated Delivery</h3>
                <p className="text-gray-600">Your order will be delivered within 24-48 hours</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/products" className="bg-farm-green-600 hover:bg-farm-green-700 text-white font-medium py-2 px-6 rounded-lg">
                  Continue Shopping
                </Link>
                <button className="border border-farm-green-600 text-farm-green-600 hover:bg-farm-green-50 font-medium py-2 px-6 rounded-lg">
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
