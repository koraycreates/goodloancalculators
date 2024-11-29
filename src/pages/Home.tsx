import React from 'react';
import { Calculator, Home as HomeIcon, RefreshCw, PiggyBank, Scale, TrendingUp, CreditCard, Clock, DollarSign, Building2, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Good Loan Calculators - Free Mortgage and Loan Calculators</title>
        <meta
          name="description"
          content="Free mortgage and loan calculators to help you make informed financial decisions. Calculate mortgage payments, compare loans, and plan your financial future."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 text-center">
              Make Better Financial Decisions
            </h1>
            <p className="text-xl text-gray-200 text-center max-w-2xl">
              Our free calculators help you understand your options and make informed choices about mortgages, loans, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link to="/mortgage" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Calculator className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Mortgage Calculator</h2>
              <p className="text-gray-600">
                Calculate your monthly mortgage payments and see detailed amortization schedules.
              </p>
            </Link>

            <Link to="/affordability" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <HomeIcon className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Affordability Calculator</h2>
              <p className="text-gray-600">
                Find out how much house you can afford based on your income and expenses.
              </p>
            </Link>

            <Link to="/refinance" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <RefreshCw className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Refinance Calculator</h2>
              <p className="text-gray-600">
                Compare your current mortgage with refinancing options to see potential savings.
              </p>
            </Link>

            <Link to="/rent-vs-buy" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Scale className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Rent vs. Buy</h2>
              <p className="text-gray-600">
                Compare the financial benefits of renting versus buying a home over time.
              </p>
            </Link>

            <Link to="/arm" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <TrendingUp className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">ARM Calculator</h2>
              <p className="text-gray-600">
                Understand how your adjustable rate mortgage payments might change over time.
              </p>
            </Link>

            <Link to="/15-vs-30" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Scale className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">15 vs 30 Year Mortgage</h2>
              <p className="text-gray-600">
                Compare 15-year and 30-year mortgages to find the best option for you.
              </p>
            </Link>

            <Link to="/biweekly" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Bi-Weekly Payments</h2>
              <p className="text-gray-600">
                See how bi-weekly payments can help you save money and pay off your mortgage faster.
              </p>
            </Link>

            <Link to="/buydown" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Percent className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Temporary Buydown Calculator</h2>
              <p className="text-gray-600">
                Calculate the costs and savings of different temporary mortgage rate buydown options.
              </p>
            </Link>

            <Link to="/property-tax" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <Building2 className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Property Tax Calculator</h2>
              <p className="text-gray-600">
                Estimate your property taxes based on your location and home value.
              </p>
            </Link>

            <Link to="/fha" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <HomeIcon className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">FHA Calculator</h2>
              <p className="text-gray-600">
                Calculate FHA loan payments including UFMIP and monthly mortgage insurance.
              </p>
            </Link>

            <Link to="/va" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <HomeIcon className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">VA Calculator</h2>
              <p className="text-gray-600">
                Calculate VA loan payments and funding fees for veterans and service members.
              </p>
            </Link>

            <Link to="/conventional" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <HomeIcon className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Conventional Calculator</h2>
              <p className="text-gray-600">
                Calculate conventional loan payments with different down payment options.
              </p>
            </Link>

            <Link to="/dpa" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <DollarSign className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Down Payment Assistance</h2>
              <p className="text-gray-600">
                Calculate how down payment assistance programs can help with your home purchase.
              </p>
            </Link>

            <Link to="/personal-loan" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <CreditCard className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Loan Calculator</h2>
              <p className="text-gray-600">
                Calculate personal loan payments and total costs with different terms.
              </p>
            </Link>

            <Link to="/credit-card-refinance" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <RefreshCw className="w-12 h-12 text-[#022B3A] mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Credit Card Refinance</h2>
              <p className="text-gray-600">
                See how much you could save by consolidating credit card debt with a personal loan.
              </p>
            </Link>
          </div>

          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Use Our Calculators?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#022B3A] mb-3">Accurate & Up-to-Date</h3>
                <p className="text-gray-600">
                  Our calculators use the latest financial formulas and market data to provide accurate results you can trust.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#022B3A] mb-3">Easy to Use</h3>
                <p className="text-gray-600">
                  Simple, intuitive interfaces make it easy to calculate complex financial scenarios in seconds.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#022B3A] mb-3">Comprehensive</h3>
                <p className="text-gray-600">
                  From basic mortgage calculations to complex refinancing scenarios, we have tools for every need.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#022B3A] mb-3">Always Free</h3>
                <p className="text-gray-600">
                  All our calculators are completely free to use, with no registration required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Choose a calculator above or explore our comprehensive guides to learn more about mortgages and loans.
            </p>
            <Link
              to="/blog"
              className="inline-block bg-white text-[#022B3A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Read Our Guides
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;