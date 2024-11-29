import React from 'react';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function Blog() {
  const blogPosts = [
    {
      id: 'mortgage-calculator',
      title: 'How to Use Our Mortgage Calculator',
      description: 'Learn how to calculate your monthly mortgage payments and understand all the factors that affect your home loan.',
      link: '/blog/mortgage-calculator',
      calculatorLink: '/mortgage',
    },
    {
      id: 'affordability-calculator',
      title: 'Understanding Home Affordability',
      description: 'Find out how much house you can afford based on your income, debts, and down payment.',
      link: '/blog/affordability-calculator',
      calculatorLink: '/affordability',
    },
    {
      id: 'refinance-calculator',
      title: 'Should You Refinance Your Mortgage?',
      description: 'Learn how to evaluate refinancing options and calculate potential savings.',
      link: '/blog/refinance-calculator',
      calculatorLink: '/refinance',
    },
    {
      id: 'rent-vs-buy',
      title: 'Renting vs. Buying: Making the Right Choice',
      description: 'Compare the financial implications of renting versus buying a home.',
      link: '/blog/rent-vs-buy',
      calculatorLink: '/rent-vs-buy',
    },
    {
      id: 'arm-calculator',
      title: 'Understanding Adjustable Rate Mortgages',
      description: 'Learn how ARMs work and calculate potential payment scenarios.',
      link: '/blog/arm-calculator',
      calculatorLink: '/arm',
    },
    {
      id: '15-vs-30',
      title: '15-Year vs. 30-Year Mortgage: Which Is Right for You?',
      description: 'Compare the pros and cons of 15-year and 30-year mortgage terms.',
      link: '/blog/15-vs-30',
      calculatorLink: '/15-vs-30',
    },
    {
      id: 'biweekly-payments',
      title: 'The Power of Bi-Weekly Mortgage Payments',
      description: 'See how making bi-weekly payments can help you save money and pay off your mortgage faster.',
      link: '/blog/biweekly-payments',
      calculatorLink: '/biweekly',
    },
    {
      id: 'buydown-calculator',
      title: 'Understanding Temporary Mortgage Rate Buydowns',
      description: 'Learn about different temporary buydown options and calculate if they make sense for you.',
      link: '/blog/buydown-calculator',
      calculatorLink: '/buydown',
    },
    {
      id: 'property-tax',
      title: 'How Property Taxes Work',
      description: 'Understand how property taxes are calculated and what factors affect your tax bill.',
      link: '/blog/property-tax',
      calculatorLink: '/property-tax',
    },
    {
      id: 'fha-loans',
      title: 'Understanding FHA Loans',
      description: 'Learn about FHA loans, their requirements, and how to calculate your potential payments.',
      link: '/blog/fha-loans',
      calculatorLink: '/fha',
    },
    {
      id: 'va-loans',
      title: 'Understanding VA Loans',
      description: 'Learn about VA loans, funding fees, eligibility requirements, and payment calculations.',
      link: '/blog/va-loans',
      calculatorLink: '/va',
    },
    {
      id: 'conventional-loans',
      title: 'Understanding Conventional Loans',
      description: 'Learn about conventional loans, down payment requirements, PMI, and payment calculations.',
      link: '/blog/conventional-loans',
      calculatorLink: '/conventional',
    },
    {
      id: 'down-payment-assistance',
      title: 'Understanding Down Payment Assistance Programs',
      description: 'Learn how down payment assistance programs can help make homeownership more affordable.',
      link: '/blog/down-payment-assistance',
      calculatorLink: '/dpa',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Blog - Good Loan Calculators</title>
        <meta
          name="description"
          content="Learn about mortgages, loans, and personal finance with our comprehensive guides and calculator tutorials."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Book className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
            <p className="text-gray-200">Learn about mortgages, loans, and personal finance</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={post.link}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex items-center text-[#022B3A]">
                  <span className="mr-2">Read more</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}