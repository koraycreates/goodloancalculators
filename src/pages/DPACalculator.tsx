import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calculator, Info } from 'lucide-react';
import { InputField } from '../components/InputField';
import { InfoTooltip } from '../components/InfoTooltip';
import { Helmet } from 'react-helmet-async';

export function DPACalculator() {
  // First mortgage state
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(9000); // 3% default
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [monthlyMI, setMonthlyMI] = useState(150);

  // DPA loan state
  const [dpaAmount, setDpaAmount] = useState(6000);
  const [isForgivable, setIsForgivable] = useState(false);
  const [dpaInterestRate, setDpaInterestRate] = useState(9.5);
  const [forgivenessPeriod, setForgivenessPeriod] = useState(5);
  const [closingCosts, setClosingCosts] = useState(9000);

  // Calculate first mortgage payment
  const calculateFirstMortgage = () => {
    const loanAmount = purchasePrice - downPayment - dpaAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    return (loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  // Calculate DPA payment if repayable
  const calculateDPAPayment = () => {
    if (isForgivable) return 0;

    const monthlyRate = dpaInterestRate / 100 / 12;
    const numberOfPayments = 10 * 12; // 10-year term for DPA
    
    return (dpaAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const firstMortgagePayment = calculateFirstMortgage();
  const dpaPayment = calculateDPAPayment();
  const totalMonthlyPayment = firstMortgagePayment + dpaPayment + propertyTax / 12 + insurance / 12 + monthlyMI;
  const totalCashRequired = downPayment + closingCosts;

  // Update closing costs when purchase price changes
  useEffect(() => {
    const estimatedClosingCosts = Math.max(8000, purchasePrice * 0.03);
    setClosingCosts(estimatedClosingCosts);
  }, [purchasePrice]);

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
        <title>Down Payment Assistance Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate how down payment assistance programs can help reduce your upfront costs and monthly payments."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Calculator className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Down Payment Assistance Calculator</h1>
            <p className="text-gray-200">Calculate how DPA programs can help with your home purchase</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">First Mortgage Details</h2>
              
              <div className="space-y-6">
                <InputField
                  label="Purchase Price"
                  value={purchasePrice}
                  onChange={setPurchasePrice}
                  icon={DollarSign}
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  onChange={setDownPayment}
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
                    value={monthlyMI}
                    onChange={setMonthlyMI}
                    icon={DollarSign}
                  />
                </div>

                <div className="relative flex items-center">
                  <div className="flex-grow">
                    <InputField
                      label="Closing Costs"
                      value={closingCosts}
                      onChange={setClosingCosts}
                      icon={DollarSign}
                    />
                  </div>
                  <div className="ml-2 mt-6">
                    <InfoTooltip content="Closing costs typically range from 2-4% of the loan amount and include loan fees, appraisal and inspection fees, title fees, government tax and recording fees, escrows etc. These fees may vary by state and lender." />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Down Payment Assistance</h2>
                
                <div className="space-y-6">
                  <InputField
                    label="DPA Amount"
                    value={dpaAmount}
                    onChange={setDpaAmount}
                    icon={DollarSign}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isForgivable"
                        checked={isForgivable}
                        onChange={(e) => setIsForgivable(e.target.checked)}
                        className="h-4 w-4 text-[#022B3A] focus:ring-[#022B3A] border-gray-300 rounded"
                      />
                      <label htmlFor="isForgivable" className="ml-2 block text-sm text-gray-700">
                        Forgivable DPA
                      </label>
                    </div>
                    <InfoTooltip content="Forgivable DPA loans don't require repayment if you stay in the home for the required period. If you sell or refinance before the period ends, you'll need to repay the assistance." />
                  </div>

                  {!isForgivable && (
                    <InputField
                      label="DPA Interest Rate"
                      value={dpaInterestRate}
                      onChange={setDpaInterestRate}
                      icon={Percent}
                      step="0.125"
                    />
                  )}

                  {isForgivable && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Forgiveness Period (Years)
                      </label>
                      <select
                        value={forgivenessPeriod}
                        onChange={(e) => setForgivenessPeriod(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                      >
                        <option value={5}>5 Years</option>
                        <option value={10}>10 Years</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Summary</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <p className="text-lg opacity-90 mb-2">Total Monthly Payment</p>
                  <p className="text-4xl font-bold">{formatCurrency(totalMonthlyPayment)}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Cash Required</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-semibold">{formatCurrency(downPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Costs</span>
                      <span className="font-semibold">{formatCurrency(closingCosts)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Total Cash Required</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency(totalCashRequired)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Loan Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Mortgage Amount</span>
                      <span className="font-semibold">
                        {formatCurrency(purchasePrice - downPayment - dpaAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">DPA Amount</span>
                      <span className="font-semibold">{formatCurrency(dpaAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-semibold">{formatCurrency(downPayment)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Monthly Payment Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Mortgage P&I</span>
                      <span className="font-semibold">{formatCurrency(firstMortgagePayment)}</span>
                    </div>
                    {!isForgivable && dpaPayment > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">DPA Payment</span>
                        <span className="font-semibold">{formatCurrency(dpaPayment)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax</span>
                      <span className="font-semibold">{formatCurrency(propertyTax / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Home Insurance</span>
                      <span className="font-semibold">{formatCurrency(insurance / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PMI</span>
                      <span className="font-semibold">{formatCurrency(monthlyMI)}</span>
                    </div>
                  </div>
                </div>

                {isForgivable && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Forgiveness Terms</h3>
                    <p className="text-yellow-800">
                      The DPA amount of {formatCurrency(dpaAmount)} will be forgiven after {forgivenessPeriod} years 
                      if you remain in the home. If you sell or refinance before then, you'll need to repay the assistance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}