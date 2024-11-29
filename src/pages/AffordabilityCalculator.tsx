import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calculator, Home } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';

interface AffordabilityResult {
  maxHomePrice: number;
  monthlyPayment: number;
  downPayment: number;
  loanAmount: number;
}

export function AffordabilityCalculator() {
  // Income and debt inputs
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [creditCardPayments, setCreditCardPayments] = useState(200);
  const [carPayments, setCarPayments] = useState(300);
  const [studentLoans, setStudentLoans] = useState(200);
  const [otherDebts, setOtherDebts] = useState(0);

  // Loan details
  const [interestRate, setInterestRate] = useState(7.5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);

  // Monthly expenses
  const [propertyTax, setPropertyTax] = useState(2400);
  const [insurance, setInsurance] = useState(1200);
  const [hoaDues, setHoaDues] = useState(0);

  const [result, setResult] = useState<AffordabilityResult>({
    maxHomePrice: 0,
    monthlyPayment: 0,
    downPayment: 0,
    loanAmount: 0,
  });

  const calculateAffordability = () => {
    // Calculate total monthly debt payments
    const totalMonthlyDebts = monthlyDebts + creditCardPayments + carPayments + studentLoans + otherDebts;
    
    // Calculate monthly income
    const monthlyIncome = annualIncome / 12;
    
    // Maximum monthly payment using 28/36 rule
    // Front-end ratio (28% of monthly income)
    const maxFrontEndPayment = monthlyIncome * 0.28;
    
    // Back-end ratio (36% of monthly income minus existing debts)
    const maxBackEndPayment = monthlyIncome * 0.36 - totalMonthlyDebts;
    
    // Use the lower of the two ratios
    const maxMonthlyPayment = Math.min(maxFrontEndPayment, maxBackEndPayment);
    
    // Calculate monthly taxes, insurance, and HOA
    const monthlyTaxes = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    
    // Available for P&I payment
    const availableForPI = maxMonthlyPayment - monthlyTaxes - monthlyInsurance - hoaDues;
    
    // Calculate maximum loan amount
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const maxLoanAmount = 
      availableForPI * 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
    
    // Calculate maximum home price
    const maxHomePrice = maxLoanAmount / (1 - downPaymentPercent / 100);
    const downPayment = maxHomePrice * (downPaymentPercent / 100);
    
    setResult({
      maxHomePrice,
      monthlyPayment: maxMonthlyPayment,
      downPayment,
      loanAmount: maxLoanAmount,
    });
  };

  useEffect(() => {
    calculateAffordability();
  }, [
    annualIncome,
    monthlyDebts,
    creditCardPayments,
    carPayments,
    studentLoans,
    otherDebts,
    interestRate,
    downPaymentPercent,
    loanTerm,
    propertyTax,
    insurance,
    hoaDues,
  ]);

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
        <title>Home Affordability Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate how much house you can afford based on your income, debts, and down payment with our home affordability calculator."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Home className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Home Affordability Calculator</h1>
            <p className="text-gray-200">Find out how much house you can afford</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Income & Debts</h2>
                  <div className="space-y-4">
                    <InputField
                      label="Annual Income"
                      value={annualIncome}
                      onChange={setAnnualIncome}
                      icon={DollarSign}
                    />
                    
                    <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                      <h3 className="text-lg font-semibold text-[#022B3A]">Monthly Debts</h3>
                      <InputField
                        label="Credit Card Payments"
                        value={creditCardPayments}
                        onChange={setCreditCardPayments}
                        icon={DollarSign}
                      />
                      <InputField
                        label="Car Payments"
                        value={carPayments}
                        onChange={setCarPayments}
                        icon={DollarSign}
                      />
                      <InputField
                        label="Student Loans"
                        value={studentLoans}
                        onChange={setStudentLoans}
                        icon={DollarSign}
                      />
                      <InputField
                        label="Other Monthly Debts"
                        value={otherDebts}
                        onChange={setOtherDebts}
                        icon={DollarSign}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Details</h2>
                  <div className="space-y-4">
                    <InputField
                      label="Interest Rate"
                      value={interestRate}
                      onChange={setInterestRate}
                      icon={Percent}
                      step="0.125"
                    />
                    <InputField
                      label="Down Payment Percentage"
                      value={downPaymentPercent}
                      onChange={setDownPaymentPercent}
                      icon={Percent}
                      step="1"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Term
                      </label>
                      <select
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                      >
                        <option value={30}>30 Years</option>
                        <option value={20}>20 Years</option>
                        <option value={15}>15 Years</option>
                      </select>
                    </div>
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
                    label="Monthly HOA Dues"
                    value={hoaDues}
                    onChange={setHoaDues}
                    icon={DollarSign}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Home Affordability Results</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <p className="text-lg opacity-90 mb-2">Maximum Home Price</p>
                  <p className="text-4xl font-bold">{formatCurrency(result.maxHomePrice)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Down Payment</h3>
                    <p className="text-lg font-semibold text-[#022B3A]">
                      {formatCurrency(result.downPayment)}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Loan Amount</h3>
                    <p className="text-lg font-semibold text-[#022B3A]">
                      {formatCurrency(result.loanAmount)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Monthly Payment Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum Payment</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax</span>
                      <span className="font-semibold">{formatCurrency(propertyTax / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-semibold">{formatCurrency(insurance / 12)}</span>
                    </div>
                    {hoaDues > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">HOA Dues</span>
                        <span className="font-semibold">{formatCurrency(hoaDues)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Debt-to-Income Ratios</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Housing Ratio</span>
                      <span className="font-semibold">
                        {((result.monthlyPayment / (annualIncome / 12)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Debt Ratio</span>
                      <span className="font-semibold">
                        {(((result.monthlyPayment + monthlyDebts + creditCardPayments + carPayments + studentLoans + otherDebts) / (annualIncome / 12)) * 100).toFixed(1)}%
                      </span>
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