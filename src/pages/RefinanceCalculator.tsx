import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, RefreshCw } from 'lucide-react';
import { InputField } from '../components/InputField';

interface LoanSummary {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
}

export function RefinanceCalculator() {
  // Current loan state
  const [currentBalance, setCurrentBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [currentTerm, setCurrentTerm] = useState(30);
  const [remainingTerm, setRemainingTerm] = useState(25);

  // New loan state
  const [newLoanAmount, setNewLoanAmount] = useState(300000);
  const [newRate, setNewRate] = useState(6.5);
  const [newTerm, setNewTerm] = useState(30);
  
  // Refinance costs
  const [closingCosts, setClosingCosts] = useState(5000);
  const [escrowRefund, setEscrowRefund] = useState(2000);
  const [skippedPayments, setSkippedPayments] = useState(1);

  // Calculated summaries
  const [currentLoanSummary, setCurrentLoanSummary] = useState<LoanSummary>({
    monthlyPayment: 0,
    totalPayments: 0,
    totalInterest: 0
  });

  const [newLoanSummary, setNewLoanSummary] = useState<LoanSummary>({
    monthlyPayment: 0,
    totalPayments: 0,
    totalInterest: 0
  });

  const calculateLoanSummary = (
    balance: number,
    rate: number,
    term: number
  ): LoanSummary => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    const monthlyPayment =
      (balance * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayments = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayments - balance;

    return {
      monthlyPayment,
      totalPayments,
      totalInterest
    };
  };

  useEffect(() => {
    const currentSummary = calculateLoanSummary(
      currentBalance,
      currentRate,
      remainingTerm
    );
    setCurrentLoanSummary(currentSummary);

    const newSummary = calculateLoanSummary(
      newLoanAmount,
      newRate,
      newTerm
    );
    setNewLoanSummary(newSummary);
  }, [currentBalance, currentRate, remainingTerm, newLoanAmount, newRate, newTerm]);

  const monthlySavings = currentLoanSummary.monthlyPayment - newLoanSummary.monthlyPayment;
  const lifetimeSavings = currentLoanSummary.totalPayments - newLoanSummary.totalPayments;
  const breakEvenMonths = Math.ceil(
    (closingCosts - escrowRefund - (currentLoanSummary.monthlyPayment * skippedPayments)) / monthlySavings
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <RefreshCw className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Refinance Calculator</h1>
          <p className="text-gray-200">Compare your current loan with refinancing options</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Loan</h2>
            
            <div className="space-y-6">
              <InputField
                label="Current Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
                icon={DollarSign}
              />

              <InputField
                label="Current Interest Rate"
                value={currentRate}
                onChange={setCurrentRate}
                icon={Percent}
                step="0.125"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Loan Term
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={currentTerm}
                    onChange={(e) => setCurrentTerm(Number(e.target.value))}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                  >
                    <option value={30}>30 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={10}>10 Years</option>
                  </select>
                </div>
              </div>

              <InputField
                label="Years Remaining"
                value={remainingTerm}
                onChange={setRemainingTerm}
                icon={Calendar}
              />
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Current Loan Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-semibold">{formatCurrency(currentLoanSummary.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining Interest</span>
                  <span className="font-semibold">{formatCurrency(currentLoanSummary.totalInterest)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Loan</h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-[#022B3A]">New Loan Amount</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Balance</span>
                    <span className="font-semibold">{formatCurrency(currentBalance)}</span>
                  </div>
                  <InputField
                    label="New Loan Amount"
                    value={newLoanAmount}
                    onChange={setNewLoanAmount}
                    icon={DollarSign}
                  />
                  <div className="flex justify-between text-sm font-medium border-t pt-2">
                    <span className="text-gray-600">Cash Out Amount</span>
                    <span className={`${newLoanAmount - currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(newLoanAmount - currentBalance)}
                    </span>
                  </div>
                </div>
              </div>

              <InputField
                label="New Interest Rate"
                value={newRate}
                onChange={setNewRate}
                icon={Percent}
                step="0.125"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Loan Term
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={newTerm}
                    onChange={(e) => setNewTerm(Number(e.target.value))}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                  >
                    <option value={30}>30 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={10}>10 Years</option>
                  </select>
                </div>
              </div>

              <InputField
                label="Closing Costs"
                value={closingCosts}
                onChange={setClosingCosts}
                icon={DollarSign}
              />

              <InputField
                label="Escrow Refund"
                value={escrowRefund}
                onChange={setEscrowRefund}
                icon={DollarSign}
              />

              <InputField
                label="Skipped Payments"
                value={skippedPayments}
                onChange={setSkippedPayments}
                icon={Calendar}
                step="1"
              />
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Refinance Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">New Monthly Payment</span>
                  <span className="font-semibold">{formatCurrency(newLoanSummary.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Savings</span>
                  <span className={`font-semibold ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlySavings >= 0 ? '+' : ''}{formatCurrency(monthlySavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lifetime Savings</span>
                  <span className={`font-semibold ${lifetimeSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {lifetimeSavings >= 0 ? '+' : ''}{formatCurrency(lifetimeSavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Break-Even Time</span>
                  <span className="font-semibold">{breakEvenMonths} months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}