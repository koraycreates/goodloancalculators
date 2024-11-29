import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { InfoTooltip } from '../components/InfoTooltip';
import { Helmet } from 'react-helmet-async';

export function ConventionalCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [downPayment, setDownPayment] = useState(15000); // 5% default
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [monthlyMI, setMonthlyMI] = useState(0);
  const [closingCosts, setClosingCosts] = useState(9000);

  // Update down payment when purchase price or first-time buyer status changes
  useEffect(() => {
    const minDownPayment = isFirstTimeBuyer ? 0.03 : 0.05;
    setDownPayment(purchasePrice * minDownPayment);
    const estimatedClosingCosts = Math.max(8000, purchasePrice * 0.03);
    setClosingCosts(estimatedClosingCosts);
  }, [purchasePrice, isFirstTimeBuyer]);

  // Calculate loan amount
  const loanAmount = purchasePrice - downPayment;
  const downPaymentPercentage = (downPayment / purchasePrice) * 100;

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment + propertyTax / 12 + insurance / 12 + monthlyMI;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalCashRequired = downPayment + closingCosts;

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
        <title>Conventional Loan Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate conventional loan payments, including first-time homebuyer options and PMI estimates."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Calculator className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Conventional Loan Calculator</h1>
            <p className="text-gray-200">Calculate your conventional loan payments and required cash</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Details</h2>
              
              <div className="space-y-6">
                <InputField
                  label="Purchase Price"
                  value={purchasePrice}
                  onChange={setPurchasePrice}
                  icon={DollarSign}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="firstTimeBuyer"
                      checked={isFirstTimeBuyer}
                      onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                      className="h-4 w-4 text-[#022B3A] focus:ring-[#022B3A] border-gray-300 rounded"
                    />
                    <label htmlFor="firstTimeBuyer" className="ml-2 block text-sm text-gray-700">
                      First Time Home Buyer
                    </label>
                  </div>
                  <InfoTooltip content="As a first time buyer, you may qualify for as little as 3% down for your first home purchase with a conventional loan." />
                </div>

                <div className="relative flex items-center">
                  <div className="flex-grow">
                    <InputField
                      label={`Down Payment (${downPaymentPercentage.toFixed(1)}%)`}
                      value={downPayment}
                      onChange={setDownPayment}
                      icon={DollarSign}
                    />
                  </div>
                  <div className="ml-2 mt-6">
                    <InfoTooltip content={`Minimum down payment is ${isFirstTimeBuyer ? '3%' : '5%'} for conventional loans.`} />
                  </div>
                </div>

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
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Summary</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <p className="text-lg opacity-90 mb-2">Monthly Payment</p>
                  <p className="text-4xl font-bold">{formatCurrency(monthlyPayment)}</p>
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
                      <span className="text-gray-600">Purchase Price</span>
                      <span className="font-semibold">{formatCurrency(purchasePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-semibold">{formatCurrency(downPayment)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Loan Amount</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Monthly Payment Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal & Interest</span>
                      <span className="font-semibold">
                        {formatCurrency(monthlyPayment - propertyTax / 12 - insurance / 12 - monthlyMI)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Tax</span>
                      <span className="font-semibold">{formatCurrency(propertyTax / 12)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Home Insurance</span>
                      <span className="font-semibold">{formatCurrency(insurance / 12)}</span>
                    </div>
                    {monthlyMI > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">PMI</span>
                        <span className="font-semibold">{formatCurrency(monthlyMI)}</span>
                      </div>
                    )}
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