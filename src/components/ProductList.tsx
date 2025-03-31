"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
};

type ProductListProps = {
  products: Product[];
  categoryName: string;
};

export default function ProductList({ products, categoryName }: ProductListProps) {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(`${categoryName.replace(/\s+/g, '-').toLowerCase()}-cart`);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse saved cart:", e);
          localStorage.removeItem(`${categoryName.replace(/\s+/g, '-').toLowerCase()}-cart`);
        }
      }
    }
  }, [categoryName]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `${categoryName.replace(/\s+/g, '-').toLowerCase()}-cart`,
        JSON.stringify(cart)
      );
    }
  }, [cart, categoryName]);

  const addToCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] && newCart[productId] > 0) {
        newCart[productId] -= 1;
        if (newCart[productId] === 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const getCartCount = (productId: string) => {
    return cart[productId] || 0;
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, count) => total + count, 0);
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + (product.price * quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (getTotalCartItems() === 0) return;

    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsOrderComplete(true);

      // Reset after showing success message
      setTimeout(() => {
        setIsOrderComplete(false);
        clearCart();
        router.refresh();
      }, 3000);
    }, 2000);
  };

  const getCategoryColor = () => {
    switch(categoryName) {
      case 'Andrew Poultry Farm':
        return 'bg-farm-green-600 hover:bg-farm-green-700';
      case 'Kinunga Fresh Avocados':
        return 'bg-farm-green-600 hover:bg-farm-green-700';
      case 'Dairy Products':
        return 'bg-farm-olive-500 hover:bg-farm-olive-600';
      case 'Organic Vegetables':
        return 'bg-farm-leaf-500 hover:bg-farm-leaf-600';
      case 'Fruit Orchard':
        return 'bg-farm-olive-500 hover:bg-farm-olive-600';
      case 'Honey Farm':
        return 'bg-farm-brown-500 hover:bg-farm-brown-600';
      default:
        return 'bg-farm-green-600 hover:bg-farm-green-700';
    }
  };

  const getCategoryLightColor = () => {
    switch(categoryName) {
      case 'Andrew Poultry Farm':
        return 'bg-farm-green-100 text-farm-green-800';
      case 'Kinunga Fresh Avocados':
        return 'bg-farm-green-100 text-farm-green-800';
      case 'Dairy Products':
        return 'bg-farm-olive-100 text-farm-olive-800';
      case 'Organic Vegetables':
        return 'bg-farm-leaf-100 text-farm-leaf-700';
      case 'Fruit Orchard':
        return 'bg-farm-olive-100 text-farm-olive-800';
      case 'Honey Farm':
        return 'bg-farm-brown-100 text-farm-brown-800';
      default:
        return 'bg-farm-green-100 text-farm-green-800';
    }
  };

  // Format price in KSh
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString('en-KE')}`;
  };

  // Show cart summary at the top
  const renderCartSummary = () => {
    const itemCount = getTotalCartItems();

    if (itemCount === 0) return null;

    return (
      <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Cart Summary</h2>
          <span className={`py-1 px-3 rounded-full text-sm font-medium ${getCategoryLightColor()}`}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
          <span>Total:</span>
          <span className="text-farm-green-700">{formatPrice(getTotalPrice())}</span>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut || isOrderComplete}
            className={`flex-1 cart-button text-white font-medium py-3 px-4 rounded-lg
              ${isCheckingOut || isOrderComplete
                ? 'bg-gray-400 cursor-not-allowed'
                : getCategoryColor()}`}
          >
            {isCheckingOut ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isOrderComplete ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Order Complete!
              </span>
            ) : (
              'Checkout'
            )}
          </button>

          <button
            onClick={clearCart}
            className="cart-button border border-gray-300 text-gray-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50"
          >
            Clear Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Only show cart summary if items exist and client-side rendering is active */}
      {isClient && getTotalCartItems() > 0 && renderCartSummary()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="h-48 bg-gray-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-4xl">{getCategoryIcon(categoryName)}</span>
                )}
              </div>

              {isClient && getCartCount(product.id) > 0 && (
                <div className="absolute top-2 right-2 bg-farm-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {getCartCount(product.id)}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <div className="text-farm-green-700 font-bold">{formatPrice(product.price)} <span className="text-sm text-gray-500 font-normal">/ {product.unit}</span></div>
              </div>

              <p className="text-gray-600 text-sm mt-2 mb-4">{product.description}</p>

              {product.inStock ? (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-farm-green-600 font-medium flex items-center">
                    <span className="w-2 h-2 bg-farm-green-500 rounded-full mr-1.5"></span>
                    In Stock
                  </div>

                  <div className="flex items-center space-x-2">
                    {isClient && getCartCount(product.id) > 0 && (
                      <>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded-full flex items-center justify-center"
                          aria-label="Remove from cart"
                        >
                          -
                        </button>
                        <span className="mx-2 font-medium">{getCartCount(product.id)}</span>
                      </>
                    )}

                    <button
                      onClick={() => addToCart(product.id)}
                      className={`cart-button text-white font-bold py-2 px-4 rounded-lg
                        ${isClient && getCartCount(product.id) > 0
                          ? 'w-8 h-8 flex items-center justify-center'
                          : 'flex items-center'}
                        ${getCategoryColor()}`}
                      aria-label={isClient && getCartCount(product.id) > 0 ? "Add more" : "Add to cart"}
                    >
                      {isClient && getCartCount(product.id) > 0 ? '+' : (
                        <>
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"></path>
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-red-600 font-medium flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                    Out of Stock
                  </div>
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCategoryIcon(categoryName: string) {
  switch(categoryName) {
    case 'Andrew Poultry Farm':
      return '🐔';
    case 'Kinunga Fresh Avocados':
      return '🥑';
    case 'Dairy Products':
      return '🥛';
    case 'Organic Vegetables':
      return '🥬';
    case 'Fruit Orchard':
      return '🍎';
    case 'Honey Farm':
      return '🍯';
    default:
      return '🌱';
  }
}
