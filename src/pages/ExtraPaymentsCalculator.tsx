import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, PiggyBank } from 'lucide-react';
import { InputField } from '../components/InputField';

interface PaymentSchedule {
  totalInterestPaid: number;
  yearsToPayoff: number;
  monthsToPayoff: number;
  interestSaved: number;
  timesSaved: number;
}

export function ExtraPaymentsCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [paymentType, setPaymentType] = useState<'monthly' | 'biweekly' | 'annual'>('monthly');
  const [extraPayment, setExtraPayment] = useState(200);
  const [schedule, setSchedule] = useState<PaymentSchedule>({
    totalInterestPaid: 0,
    yearsToPayoff: 0,
    monthsToPayoff: 0,
    interestSaved: 0,
    timesSaved: 0,
  });

  const calculateAmortization = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    const regularPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                          (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    let balance = loanAmount;
    let months = 0;
    let totalInterest = 0;
    const regularSchedule = { months: 0, interest: 0 };

    // Calculate regular payment schedule first
    let tempBalance = loanAmount;
    while (tempBalance > 0) {
      const interestPayment = tempBalance * monthlyRate;
      const principalPayment = regularPayment - interestPayment;
      tempBalance -= principalPayment;
      regularSchedule.interest += interestPayment;
      regularSchedule.months++;
    }

    // Calculate with extra payments
    let extraMonthlyAmount = 0;
    switch (paymentType) {
      case 'monthly':
        extraMonthlyAmount = extraPayment;
        break;
      case 'biweekly':
        extraMonthlyAmount = (regularPayment / 2) * 26 / 12 - regularPayment;
        break;
      case 'annual':
        extraMonthlyAmount = extraPayment / 12;
        break;
    }

    while (balance > 0) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = regularPayment - interestPayment + extraMonthlyAmount;
      balance -= principalPayment;
      totalInterest += interestPayment;
      months++;
    }

    const yearsSaved = Math.floor((regularSchedule.months - months) / 12);
    const monthsSaved = (regularSchedule.months - months) % 12;

    setSchedule({
      totalInterestPaid: totalInterest,
      yearsToPayoff: Math.floor(months / 12),
      monthsToPayoff: months % 12,
      interestSaved: regularSchedule.interest - totalInterest,
      timesSaved: regularSchedule.months - months,
    });
  };

  useEffect(() => {
    calculateAmortization();
  }, [loanAmount, interestRate, loanTerm, paymentType, extraPayment]);

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
          <PiggyBank className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Extra Payments Calculator</h1>
          <p className="text-gray-200">See how much you can save with extra payments</p>
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
                    <option value={10}>10 Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Payment Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentType('monthly')}
                    className={`p-2 text-sm rounded-md ${
                      paymentType === 'monthly'
                        ? 'bg-[#022B3A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setPaymentType('biweekly')}
                    className={`p-2 text-sm rounded-md ${
                      paymentType === 'biweekly'
                        ? 'bg-[#022B3A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Bi-Weekly
                  </button>
                  <button
                    onClick={() => setPaymentType('annual')}
                    className={`p-2 text-sm rounded-md ${
                      paymentType === 'annual'
                        ? 'bg-[#022B3A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Annual
                  </button>
                </div>
              </div>

              {paymentType !== 'biweekly' && (
                <InputField
                  label={`${paymentType === 'monthly' ? 'Monthly' : 'Annual'} Extra Payment`}
                  value={extraPayment}
                  onChange={setExtraPayment}
                  icon={DollarSign}
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Summary</h2>
            
            <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white mb-6">
              <p className="text-lg opacity-90 mb-2">Time Until Payoff</p>
              <p className="text-4xl font-bold">
                {schedule.yearsToPayoff} years, {schedule.monthsToPayoff} months
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Savings Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest Saved</span>
                    <span className="font-semibold text-[#022B3A]">
                      {formatCurrency(schedule.interestSaved)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Saved</span>
                    <span className="font-semibold text-[#022B3A]">
                      {Math.floor(schedule.timesSaved / 12)} years, {schedule.timesSaved % 12} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest to Pay</span>
                    <span className="font-semibold text-[#022B3A]">
                      {formatCurrency(schedule.totalInterestPaid)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}