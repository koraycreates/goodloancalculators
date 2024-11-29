import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, CreditCard } from 'lucide-react';
import { InputField } from '../components/InputField';
import { DownPaymentInput } from '../components/DownPaymentInput';

interface PaymentSchedule {
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
}

export function InterestOnlyCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [interestOnlyPeriod, setInterestOnlyPeriod] = useState(10);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(2400);
  const [insurance, setInsurance] = useState(1200);
  const [pmi, setPmi] = useState(0);
  const [hoaDues, setHoaDues] = useState(0);

  const [schedule, setSchedule] = useState<PaymentSchedule>({
    interestOnlyPayment: 0,
    principalAndInterestPayment: 0,
    totalInterestPaid: 0,
    totalPrincipalPaid: 0,
  });

  const calculatePayments = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate interest-only payment
    const interestOnlyPayment = principal * monthlyRate;
    
    // Calculate principal and interest payment for the remaining term
    const remainingTerm = (loanTerm - interestOnlyPeriod) * 12;
    const principalAndInterestPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, remainingTerm)) /
      (Math.pow(1 + monthlyRate, remainingTerm) - 1);
    
    // Calculate total interest paid
    const interestOnlyTotalInterest = interestOnlyPayment * (interestOnlyPeriod * 12);
    const amortizingTotalInterest = (principalAndInterestPayment * remainingTerm) - principal;
    const totalInterestPaid = interestOnlyTotalInterest + amortizingTotalInterest;

    setSchedule({
      interestOnlyPayment,
      principalAndInterestPayment,
      totalInterestPaid,
      totalPrincipalPaid: principal,
    });
  };

  useEffect(() => {
    calculatePayments();
  }, [loanAmount, downPayment, interestRate, interestOnlyPeriod, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const monthlyExpenses = propertyTax / 12 + insurance / 12 + pmi + hoaDues;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <CreditCard className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Interest-Only Mortgage Calculator</h1>
          <p className="text-gray-200">Calculate your interest-only mortgage payments</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Details</h2>
            
            <div className="space-y-6">
              <InputField
                label="Home Price"
                value={loanAmount}
                onChange={setLoanAmount}
                icon={DollarSign}
              />

              <DownPaymentInput
                loanAmount={loanAmount}
                downPayment={downPayment}
                onDownPaymentChange={setDownPayment}
              />

              <InputField
                label="Interest Rate"
                value={interestRate}
                onChange={setInterestRate}
                icon={Percent}
                step="0.125"
              />

              <InputField
                label="Interest-Only Period (Years)"
                value={interestOnlyPeriod}
                onChange={setInterestOnlyPeriod}
                icon={Calendar}
                step="1"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Loan Term
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
                <h3 className="text-lg font-semibold text-[#022B3A]">Monthly Expenses</h3>
                <InputField
                  label="Annual Property Tax"
                  value={propertyTax}
                  onChange={setPropertyTax}
                  icon={DollarSign}
                />

                <InputField
                  label="Annual Home Insurance"
                  value={insurance}
                  onChange={setInsurance}
                  icon={DollarSign}
                />

                <InputField
                  label="Monthly PMI"
                  value={pmi}
                  onChange={setPmi}
                  icon={DollarSign}
                />

                <InputField
                  label="Monthly HOA Dues"
                  value={hoaDues}
                  onChange={setHoaDues}
                  icon={DollarSign}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Summary</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg opacity-90">Interest-Only Payment</p>
                    <p className="text-3xl font-bold">
                      {formatCurrency(schedule.interestOnlyPayment + monthlyExpenses)}
                      <span className="text-sm font-normal ml-2">per month</span>
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-lg opacity-90">Principal & Interest Payment</p>
                    <p className="text-3xl font-bold">
                      {formatCurrency(schedule.principalAndInterestPayment + monthlyExpenses)}
                      <span className="text-sm font-normal ml-2">per month</span>
                    </p>
                    <p className="text-sm opacity-75 mt-1">
                      Starting year {interestOnlyPeriod + 1}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Payment Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal & Interest</span>
                      <span className="font-semibold">{formatCurrency(schedule.interestOnlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax</span>
                      <span className="font-semibold">{formatCurrency(propertyTax / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Home Insurance</span>
                      <span className="font-semibold">{formatCurrency(insurance / 12)}</span>
                    </div>
                    {pmi > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">PMI</span>
                        <span className="font-semibold">{formatCurrency(pmi)}</span>
                      </div>
                    )}
                    {hoaDues > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">HOA Dues</span>
                        <span className="font-semibold">{formatCurrency(hoaDues)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Loan Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="font-semibold">{formatCurrency(loanAmount - downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-semibold">
                        {((downPayment / loanAmount) * 100).toFixed(1)}% ({formatCurrency(downPayment)})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest-Only Period</span>
                      <span className="font-semibold">{interestOnlyPeriod} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest Paid</span>
                      <span className="font-semibold">{formatCurrency(schedule.totalInterestPaid)}</span>
                    </div>
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