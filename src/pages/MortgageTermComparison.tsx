import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Scale, Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LoanComparison {
  monthlyPayment15: number;
  monthlyPayment30: number;
  totalInterest15: number;
  totalInterest30: number;
  totalPayment15: number;
  totalPayment30: number;
  equityData: Array<{
    year: number;
    equity15: number;
    equity30: number;
  }>;
}

export function MortgageTermComparison() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate15, setInterestRate15] = useState(6.5);
  const [interestRate30, setInterestRate30] = useState(7.0);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [comparison, setComparison] = useState<LoanComparison>({
    monthlyPayment15: 0,
    monthlyPayment30: 0,
    totalInterest15: 0,
    totalInterest30: 0,
    totalPayment15: 0,
    totalPayment30: 0,
    equityData: [],
  });

  const calculateComparison = () => {
    // Calculate 15-year mortgage
    const monthlyRate15 = interestRate15 / 100 / 12;
    const numberOfPayments15 = 15 * 12;
    const monthlyPayment15 =
      (loanAmount *
        (monthlyRate15 * Math.pow(1 + monthlyRate15, numberOfPayments15))) /
      (Math.pow(1 + monthlyRate15, numberOfPayments15) - 1);
    const totalPayment15 = monthlyPayment15 * numberOfPayments15;
    const totalInterest15 = totalPayment15 - loanAmount;

    // Calculate 30-year mortgage
    const monthlyRate30 = interestRate30 / 100 / 12;
    const numberOfPayments30 = 30 * 12;
    const monthlyPayment30 =
      (loanAmount *
        (monthlyRate30 * Math.pow(1 + monthlyRate30, numberOfPayments30))) /
      (Math.pow(1 + monthlyRate30, numberOfPayments30) - 1);
    const totalPayment30 = monthlyPayment30 * numberOfPayments30;
    const totalInterest30 = totalPayment30 - loanAmount;

    // Calculate equity over time
    const equityData = [];
    let balance15 = loanAmount;
    let balance30 = loanAmount;

    for (let year = 0; year <= 30; year++) {
      if (year <= 15) {
        for (let month = 0; month < 12; month++) {
          const interestPayment15 = balance15 * monthlyRate15;
          const principalPayment15 = monthlyPayment15 - interestPayment15;
          balance15 = Math.max(0, balance15 - principalPayment15);
        }
      }

      for (let month = 0; month < 12; month++) {
        const interestPayment30 = balance30 * monthlyRate30;
        const principalPayment30 = monthlyPayment30 - interestPayment30;
        balance30 = Math.max(0, balance30 - principalPayment30);
      }

      equityData.push({
        year,
        equity15: loanAmount - balance15,
        equity30: loanAmount - balance30,
      });
    }

    setComparison({
      monthlyPayment15: monthlyPayment15 + propertyTax / 12 + insurance / 12,
      monthlyPayment30: monthlyPayment30 + propertyTax / 12 + insurance / 12,
      totalInterest15,
      totalInterest30,
      totalPayment15,
      totalPayment30,
      equityData,
    });
  };

  useEffect(() => {
    calculateComparison();
  }, [loanAmount, interestRate15, interestRate30, propertyTax, insurance]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>15 vs 30 Year Mortgage Comparison - Good Loan Calculators</title>
        <meta
          name="description"
          content="Compare 15-year and 30-year mortgages to see which term is right for you. Calculate payments, interest, and build equity over time."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Scale className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">15 vs 30 Year Mortgage Comparison</h1>
            <p className="text-gray-200">Compare different mortgage terms to find the right option for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Details</h2>
              
              <div className="space-y-6">
                <InputField
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  icon={DollarSign}
                />

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Interest Rates</h3>
                  <InputField
                    label="15-Year Rate"
                    value={interestRate15}
                    onChange={setInterestRate15}
                    icon={Percent}
                    step="0.125"
                  />
                  <InputField
                    label="30-Year Rate"
                    value={interestRate30}
                    onChange={setInterestRate30}
                    icon={Percent}
                    step="0.125"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Additional Costs</h3>
                  <InputField
                    label="Annual Property Tax"
                    value={propertyTax}
                    onChange={setPropertyTax}
                    icon={DollarSign}
                  />
                  <InputField
                    label="Annual Insurance"
                    value={insurance}
                    onChange={setInsurance}
                    icon={DollarSign}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Comparison Results</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-4">15-Year Term</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.monthlyPayment15)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.totalInterest15)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-4">30-Year Term</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.monthlyPayment30)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.totalInterest30)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Monthly Payment Difference</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Additional Payment (15-Year)</span>
                    <span className="font-semibold">
                      {formatCurrency(comparison.monthlyPayment15 - comparison.monthlyPayment30)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Interest Savings</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest Saved (15-Year)</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(comparison.totalInterest30 - comparison.totalInterest15)}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Equity Build-Up Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={comparison.equityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Equity"]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="equity15"
                          stroke="#022B3A"
                          name="15-Year Equity"
                        />
                        <Line
                          type="monotone"
                          dataKey="equity30"
                          stroke="#1B4965"
                          name="30-Year Equity"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}