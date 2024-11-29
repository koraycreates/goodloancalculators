import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, PiggyBank } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentComparison {
  monthlyPayment: number;
  biweeklyPayment: number;
  monthlyTotalInterest: number;
  biweeklyTotalInterest: number;
  monthlyPayoffTime: number;
  biweeklyPayoffTime: number;
  amortizationData: Array<{
    year: number;
    monthlyBalance: number;
    biweeklyBalance: number;
  }>;
}

export function BiWeeklyCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  
  const [comparison, setComparison] = useState<PaymentComparison>({
    monthlyPayment: 0,
    biweeklyPayment: 0,
    monthlyTotalInterest: 0,
    biweeklyTotalInterest: 0,
    monthlyPayoffTime: 0,
    biweeklyPayoffTime: 0,
    amortizationData: [],
  });

  const calculateComparison = () => {
    const monthlyRate = interestRate / 100 / 12;
    const biweeklyRate = monthlyRate / 2;
    const numberOfMonthlyPayments = loanTerm * 12;
    const numberOfBiweeklyPayments = loanTerm * 26;

    // Calculate monthly payment
    const monthlyPayment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonthlyPayments))) /
      (Math.pow(1 + monthlyRate, numberOfMonthlyPayments) - 1);

    // Calculate bi-weekly payment (half of monthly payment)
    const biweeklyPayment = monthlyPayment / 2;

    // Calculate amortization schedules
    let monthlyBalance = loanAmount;
    let biweeklyBalance = loanAmount;
    let monthlyTotalInterest = 0;
    let biweeklyTotalInterest = 0;
    const amortizationData = [];

    for (let year = 0; year <= loanTerm; year++) {
      // Monthly payments for the year
      for (let month = 0; month < 12; month++) {
        const monthlyInterest = monthlyBalance * monthlyRate;
        monthlyTotalInterest += monthlyInterest;
        monthlyBalance -= (monthlyPayment - monthlyInterest);
        if (monthlyBalance < 0) monthlyBalance = 0;
      }

      // Bi-weekly payments for the year
      for (let payment = 0; payment < 26; payment++) {
        const biweeklyInterest = biweeklyBalance * biweeklyRate;
        biweeklyTotalInterest += biweeklyInterest;
        biweeklyBalance -= (biweeklyPayment - biweeklyInterest);
        if (biweeklyBalance < 0) biweeklyBalance = 0;
      }

      amortizationData.push({
        year,
        monthlyBalance,
        biweeklyBalance,
      });
    }

    // Calculate payoff times
    const monthlyPayoffTime = loanTerm * 12;
    const biweeklyPayoffTime = Math.ceil(
      amortizationData.findIndex(data => data.biweeklyBalance === 0) * 12
    );

    setComparison({
      monthlyPayment: monthlyPayment + propertyTax / 12 + insurance / 12,
      biweeklyPayment: biweeklyPayment + propertyTax / 26 + insurance / 26,
      monthlyTotalInterest,
      biweeklyTotalInterest,
      monthlyPayoffTime,
      biweeklyPayoffTime,
      amortizationData,
    });
  };

  useEffect(() => {
    calculateComparison();
  }, [loanAmount, interestRate, loanTerm, propertyTax, insurance]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <>
      <Helmet>
        <title>Bi-Weekly Mortgage Payment Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate how much you can save by making bi-weekly mortgage payments instead of monthly payments."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <PiggyBank className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Bi-Weekly Payment Calculator</h1>
            <p className="text-gray-200">See how bi-weekly payments can help you save money and pay off your mortgage faster</p>
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

                <InputField
                  label="Interest Rate"
                  value={interestRate}
                  onChange={setInterestRate}
                  icon={Percent}
                  step="0.125"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                    >
                      <option value={30}>30 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={15}>15 Years</option>
                    </select>
                  </div>
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Comparison</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Monthly Payments</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Amount</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.monthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.monthlyTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payoff Time</span>
                        <span className="font-semibold">
                          {formatMonths(comparison.monthlyPayoffTime)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Bi-Weekly Payments</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Amount</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.biweeklyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.biweeklyTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payoff Time</span>
                        <span className="font-semibold">
                          {formatMonths(comparison.biweeklyPayoffTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Your Savings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Savings</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(comparison.monthlyTotalInterest - comparison.biweeklyTotalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Saved</span>
                      <span className="font-semibold text-green-600">
                        {formatMonths(comparison.monthlyPayoffTime - comparison.biweeklyPayoffTime)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Loan Balance Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={comparison.amortizationData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), "Balance"]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="monthlyBalance"
                          stroke="#022B3A"
                          name="Monthly Payments"
                        />
                        <Line
                          type="monotone"
                          dataKey="biweeklyBalance"
                          stroke="#1B4965"
                          name="Bi-Weekly Payments"
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