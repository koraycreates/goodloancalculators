import React from 'react';
import { Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function About() {
  return (
    <>
      <Helmet>
        <title>About - Good Loan Calculators</title>
        <meta
          name="description"
          content="Learn about Good Loan Calculators and our mission to help you make informed financial decisions with our free mortgage and loan calculators."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Info className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">About Good Loan Calculators</h1>
            <p className="text-gray-200">Created by <a href="https://koraysgotyourmoney.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Koray's Got Your Money</a></p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600">
                  Hi, I'm <a href="https://koraysgotyourmoney.com/" target="_blank" rel="noopener noreferrer" className="text-[#022B3A] hover:underline">Koray</a>, and I created Good Loan Calculators based on my years of experience in the financial services industry. Throughout my career, I consistently found that my clients were struggling to find reliable, informative mortgage and loan calculators to help them understand their financial options. Rather than continuing to search for the perfect tool, I decided to create my own suite of comprehensive, user-friendly calculators to help people make confident, informed financial decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  At Good Loan Calculators, we believe everyone deserves access to accurate, easy-to-use financial tools. Our mission is to empower you with transparent, reliable calculators that clearly illustrate the full impact of your financial choices, helping you navigate important decisions about mortgages, loans, and other financial products.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-2">Mortgage Calculators</h3>
                    <p className="text-gray-600">
                      Whether you need to calculate basic mortgage payments or explore complex scenarios like ARM loans and buydown options, our calculators provide crystal-clear insights into the true cost of homeownership.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-2">Financial Planning Tools</h3>
                    <p className="text-gray-600">
                      Make smarter financial decisions with tools that help you:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      <li>Compare different scenarios</li>
                      <li>Understand the impact of extra payments</li>
                      <li>Evaluate refinancing options</li>
                      <li>Make informed rent vs. buy decisions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
                <p className="text-gray-600">
                  We stand firmly behind our commitment to provide:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                  <li>Accurate, industry-standard calculations that stay current with market trends</li>
                  <li>Intuitive interfaces that make complex financial calculations simple</li>
                  <li>Comprehensive educational resources through our blog and guides</li>
                  <li>Free, unlimited access to all tools with no registration required</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimer</h2>
                <p className="text-gray-600">
                  While we strive for accuracy in all our calculators, the results should be considered estimates. Actual loan terms, payments, and costs may vary. We recommend consulting with financial professionals for specific advice about your situation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  Have questions or suggestions? We'd love to hear from you. Contact us at{' '}
                  <a href="mailto:hello@goodloancalculators.com" className="text-[#022B3A] hover:underline">
                    hello@goodloancalculators.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}