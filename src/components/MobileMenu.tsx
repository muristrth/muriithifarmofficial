"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-farm-green-800 p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-green-100 shadow-lg z-50">
          <div className="p-4 flex flex-col space-y-4">
            <Link href="/" className="font-medium text-farm-green-800 hover:text-farm-green-600 py-2">Home</Link>
            <Link href="/products" className="font-medium text-farm-green-800 hover:text-farm-green-600 py-2">All Products</Link>

            <div className="border-t border-green-100 pt-4">
              <h3 className="font-semibold text-gray-500 text-sm uppercase mb-2">Our Farms</h3>
              <Link href="/products/andrew-poultry" className="flex items-center py-2 text-farm-green-800 hover:text-farm-green-600">
                <span className="mr-2">🐔</span> Andrew Poultry Farm
              </Link>
              <Link href="/products/kinunga-avocados" className="flex items-center py-2 text-farm-green-800 hover:text-farm-green-600">
                <span className="mr-2">🥑</span> Kinunga Avocado Orchard
              </Link>
              <Link href="/products/dairy-products" className="flex items-center py-2 text-farm-green-800 hover:text-farm-green-600">
                <span className="mr-2">🥛</span> JJ Goat n Dairy
              </Link>
              <Link href="/products/organic-vegetables" className="flex items-center py-2 text-farm-green-800 hover:text-farm-green-600">
                <span className="mr-2">🥬</span> Kilonito Kienyeji Veges
              </Link>
              <Link href="/products/fruit-orchard" className="flex items-center py-2 text-farm-green-800 hover:text-farm-green-600">
                <span className="mr-2">🍎</span> Vineyard Fruit Orchard
              </Link>
              <Link href="/products/honey-farm" className="flex items-center py-2 text-farm-green-800 hover:text-farm-green-600">
                <span className="mr-2">🌽</span> Kite11 Maize Farm
              </Link>
            </div>

            <div className="border-t border-green-100 pt-4 flex flex-col space-y-3">
              <Link
                href="#"
                className="flex items-center text-farm-green-800 hover:text-farm-green-600 font-medium py-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                View Cart
              </Link>
              <Link
                href="/products"
                className="bg-farm-green-700 hover:bg-farm-green-800 text-white font-medium py-3 px-4 rounded-lg text-center"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
