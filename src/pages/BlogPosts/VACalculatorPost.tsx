import React from 'react';
import { BlogPost } from '../../components/BlogPost';
import { Helmet } from 'react-helmet-async';

export function VACalculatorPost() {
  return (
    <>
      <Helmet>
        <title>Understanding VA Loans - Good Loan Calculators</title>
        <meta
          name="description"
          content="Learn about VA loans, funding fees, eligibility requirements, and how to calculate your potential VA loan payments."
        />
      </Helmet>

      <BlogPost
        title="Understanding VA Loans"
        description="Learn about VA loans, funding fees, eligibility requirements, and payment calculations."
        calculatorLink="/va"
        calculatorName="VA Loan Calculator"
        content={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">What is a VA Loan?</h2>
            <p className="text-gray-600">
              VA loans are mortgage loans backed by the U.S. Department of Veterans Affairs, designed
              to help service members, veterans, and eligible surviving spouses become homeowners.
              These loans offer competitive rates and terms with no required down payment.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Key Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>No down payment required</li>
                <li>No monthly mortgage insurance</li>
                <li>Competitive interest rates</li>
                <li>Limited closing costs</li>
                <li>No prepayment penalties</li>
                <li>Flexible credit requirements</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">VA Funding Fee</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                The VA funding fee is a one-time payment that helps offset the cost of the VA loan
                program. The fee varies based on:
              </p>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">First-Time Use</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>2.3% with no down payment</li>
                  <li>1.65% with 5% down</li>
                  <li>1.4% with 10% or more down</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Subsequent Use</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>3.6% with no down payment</li>
                  <li>1.65% with 5% down</li>
                  <li>1.4% with 10% or more down</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">Funding Fee Exemptions</h2>
              <p className="text-yellow-800 mb-4">
                You may be exempt from paying the VA funding fee if you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-yellow-800">
                <li>Receive VA disability compensation</li>
                <li>Are eligible for compensation but receive retirement pay</li>
                <li>Are rated by VA as eligible to receive compensation</li>
                <li>Are a surviving spouse of a veteran who died in service</li>
                <li>Have a service-connected disability</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Eligibility Requirements</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                To qualify for a VA loan, you must meet one of these service requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>90 consecutive days of active service during wartime</li>
                <li>181 days of active service during peacetime</li>
                <li>6 years of service in the National Guard or Reserves</li>
                <li>Surviving spouse of a service member who died in the line of duty</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-green-800 mb-4">Property Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-green-800">
                <li>Must be your primary residence</li>
                <li>Must meet VA minimum property requirements</li>
                <li>Must be move-in ready</li>
                <li>Must be appraised by a VA-approved appraiser</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Using Our Calculator</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Our VA loan calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Calculate monthly payments</li>
                <li>Determine VA funding fee</li>
                <li>Compare different down payment options</li>
                <li>Include property taxes and insurance</li>
                <li>See total cash required to close</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-red-800 mb-4">Important Considerations</h2>
              <ul className="list-disc list-inside space-y-2 text-red-800">
                <li>Verify your eligibility with a Certificate of Eligibility (COE)</li>
                <li>Consider the impact of the funding fee on your loan amount</li>
                <li>Compare VA loans with other loan types</li>
                <li>Understand occupancy requirements</li>
                <li>Plan for property maintenance and repairs</li>
              </ul>
            </div>
          </div>
        }
      />
    </>
  );
}

export default VACalculatorPost;