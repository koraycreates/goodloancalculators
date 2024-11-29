import React from 'react';
import { BlogPost } from '../../components/BlogPost';
import { Helmet } from 'react-helmet-async';

export function ConventionalCalculatorPost() {
  return (
    <>
      <Helmet>
        <title>Understanding Conventional Loans - Good Loan Calculators</title>
        <meta
          name="description"
          content="Learn about conventional loans, down payment requirements, PMI, and how to calculate your potential payments."
        />
      </Helmet>

      <BlogPost
        title="Understanding Conventional Loans"
        description="Learn about conventional loans, down payment requirements, PMI, and payment calculations."
        calculatorLink="/conventional"
        calculatorName="Conventional Loan Calculator"
        content={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">What is a Conventional Loan?</h2>
            <p className="text-gray-600">
              A conventional loan is a mortgage that isn't backed by a government agency like FHA, VA,
              or USDA. These loans follow guidelines set by Fannie Mae and Freddie Mac and are the
              most common type of mortgage.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Key Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>Lower mortgage insurance costs than FHA loans</li>
                <li>PMI can be removed at 20% equity</li>
                <li>More flexible property types allowed</li>
                <li>Various down payment options</li>
                <li>Multiple term options</li>
                <li>No upfront mortgage insurance fee</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Down Payment Requirements</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">First-Time Buyers</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>As low as 3% down with qualifying programs</li>
                  <li>Higher credit score requirements for low down payments</li>
                  <li>PMI required for down payments under 20%</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Repeat Buyers</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Minimum 5% down payment required</li>
                  <li>10% down often provides better rates</li>
                  <li>20% down eliminates PMI requirement</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">Private Mortgage Insurance (PMI)</h2>
              <div className="space-y-4">
                <p className="text-yellow-800">
                  PMI is required when your down payment is less than 20%. Key points about PMI:
                </p>
                <ul className="list-disc list-inside space-y-2 text-yellow-800">
                  <li>Typically costs 0.5% to 1% of loan amount annually</li>
                  <li>Can be removed at 20% equity</li>
                  <li>Automatically terminates at 22% equity</li>
                  <li>Better rates than FHA mortgage insurance</li>
                  <li>Multiple payment options available</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Qualification Requirements</h2>
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Minimum credit score of 620 (higher for better rates)</li>
                <li>Debt-to-income ratio typically below 43%</li>
                <li>Stable employment history</li>
                <li>Verifiable income and assets</li>
                <li>Clean credit history</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-green-800 mb-4">Loan Limits</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Conforming Loans</h3>
                <p className="text-green-700">
                  Must fall within Fannie Mae and Freddie Mac limits, which vary by location.
                </p>

                <h3 className="text-lg font-semibold text-green-800">Jumbo Loans</h3>
                <p className="text-green-700">
                  Exceed conforming limits and have stricter requirements for approval.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Using Our Calculator</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Our conventional loan calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Calculate monthly payments with different down payments</li>
                <li>Estimate PMI costs</li>
                <li>Compare first-time buyer options</li>
                <li>Include property taxes and insurance</li>
                <li>See total cash required to close</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-red-800 mb-4">Important Considerations</h2>
              <ul className="list-disc list-inside space-y-2 text-red-800">
                <li>Higher credit score requirements than FHA loans</li>
                <li>Stricter debt-to-income requirements</li>
                <li>May need larger down payment</li>
                <li>Property must meet conventional standards</li>
                <li>Non-occupant co-borrowers may be limited</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Comparing Loan Types</h2>
              <p className="text-gray-600">
                Consider conventional loans if you have:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Good credit (620+ score)</li>
                <li>Stable income and employment</li>
                <li>Low debt-to-income ratio</li>
                <li>Funds for down payment</li>
                <li>Standard property type</li>
              </ul>
            </div>
          </div>
        }
      />
    </>
  );
}

export default ConventionalCalculatorPost;