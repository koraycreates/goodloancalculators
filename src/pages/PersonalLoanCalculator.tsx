import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, CreditCard } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';

interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  apr: number;
}

export function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(12.99);
  const [loanTerm, setLoanTerm] = useState(36);
  const [originationFee, setOriginationFee] = useState(2);
  const [otherFees, setOtherFees] = useState(0);
  const [summary, setSummary] = useState<LoanSummary>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    apr: 0,
  });

  const calculateLoan = () => {
    const fees = (originationFee / 100 * loanAmount) + otherFees;
    const actualLoanAmount = loanAmount + fees;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const monthlyPayment =
      (actualLoanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Calculate APR (including fees)
    const apr = ((Math.pow(1 + monthlyRate, 12) - 1) + (fees / loanAmount)) * 100;

    setSummary({
      monthlyPayment,
      totalPayment,
      totalInterest,
      apr,
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, originationFee, otherFees]);

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
        <title>Personal Loan Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate personal loan payments, compare rates, and understand the total cost of borrowing with our personal loan calculator."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <CreditCard className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Personal Loan Calculator</h1>
            <p className="text-gray-200">Calculate and compare personal loan options</p>
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
                  step="0.01"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Months)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                    >
                      <option value={12}>12 months</option>
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                      <option value={72}>72 months</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Loan Fees</h3>
                  <InputField
                    label="Origination Fee (%)"
                    value={originationFee}
                    onChange={setOriginationFee}
                    icon={Percent}
                    step="0.01"
                  />
                  <InputField
                    label="Other Fees"
                    value={otherFees}
                    onChange={setOtherFees}
                    icon={DollarSign}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Summary</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <p className="text-lg opacity-90 mb-2">Monthly Payment</p>
                  <p className="text-4xl font-bold">{formatCurrency(summary.monthlyPayment)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Interest</h3>
                    <p className="text-lg font-semibold text-[#022B3A]">
                      {formatCurrency(summary.totalInterest)}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Payment</h3>
                    <p className="text-lg font-semibold text-[#022B3A]">
                      {formatCurrency(summary.totalPayment)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Cost Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal Amount</span>
                      <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origination Fee</span>
                      <span className="font-semibold">
                        {formatCurrency((originationFee / 100) * loanAmount)}
                      </span>
                    </div>
                    {otherFees > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Other Fees</span>
                        <span className="font-semibold">{formatCurrency(otherFees)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-semibold">{formatCurrency(summary.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Total Cost of Loan</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency(summary.totalPayment + (originationFee / 100 * loanAmount) + otherFees)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Loan Terms</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Term</span>
                      <span className="font-semibold">{loanTerm} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate</span>
                      <span className="font-semibold">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">APR</span>
                      <span className="font-semibold">{summary.apr.toFixed(2)}%</span>
                    </div>
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