import React, { useState } from 'react';
import { Calculator, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-[#022B3A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <Calculator className="h-8 w-8 text-white" />
            <div className="ml-2 flex flex-col">
              <span className="text-white text-xl font-bold leading-tight">Good Loan</span>
              <span className="text-white text-xl font-bold leading-tight">Calculators</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
              >
                Calculators
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 -ml-4 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      to="/mortgage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Mortgage Calculator
                    </Link>
                    <Link
                      to="/refinance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Refinance Calculator
                    </Link>
                    <Link
                      to="/affordability"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Affordability Calculator
                    </Link>
                    <Link
                      to="/arm"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      ARM Calculator
                    </Link>
                    <Link
                      to="/rent-vs-buy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Rent vs. Buy Calculator
                    </Link>
                    <Link
                      to="/15-vs-30"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      15 vs. 30 Year Mortgage
                    </Link>
                    <Link
                      to="/buydown"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Temporary Buydown Calculator
                    </Link>
                    <Link
                      to="/biweekly"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Bi-Weekly Payments
                    </Link>
                    <Link
                      to="/property-tax"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Property Tax Calculator
                    </Link>
                    <Link
                      to="/fha"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      FHA Calculator
                    </Link>
                    <Link
                      to="/va"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      VA Calculator
                    </Link>
                    <Link
                      to="/conventional"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Conventional Calculator
                    </Link>
                    <Link
                      to="/dpa"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Down Payment Assistance
                    </Link>
                    <Link
                      to="/personal-loan"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Personal Loan Calculator
                    </Link>
                    <Link
                      to="/credit-card-refinance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Credit Card Refinance
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/blog" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Blog
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#022B3A] border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <div className="space-y-1">
              <div className="text-white px-3 py-2 text-base font-medium">Calculators:</div>
              <Link
                to="/mortgage"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Mortgage Calculator
              </Link>
              <Link
                to="/refinance"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Refinance Calculator
              </Link>
              <Link
                to="/affordability"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Affordability Calculator
              </Link>
              <Link
                to="/arm"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                ARM Calculator
              </Link>
              <Link
                to="/rent-vs-buy"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Rent vs. Buy Calculator
              </Link>
              <Link
                to="/15-vs-30"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                15 vs. 30 Year Mortgage
              </Link>
              <Link
                to="/buydown"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Temporary Buydown Calculator
              </Link>
              <Link
                to="/biweekly"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Bi-Weekly Payments
              </Link>
              <Link
                to="/property-tax"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Property Tax Calculator
              </Link>
              <Link
                to="/fha"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                FHA Calculator
              </Link>
              <Link
                to="/va"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                VA Calculator
              </Link>
              <Link
                to="/conventional"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Conventional Calculator
              </Link>
              <Link
                to="/dpa"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Down Payment Assistance
              </Link>
              <Link
                to="/personal-loan"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Personal Loan Calculator
              </Link>
              <Link
                to="/credit-card-refinance"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium pl-6"
                onClick={toggleMobileMenu}
              >
                Credit Card Refinance
              </Link>
            </div>
            <Link
              to="/blog"
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}