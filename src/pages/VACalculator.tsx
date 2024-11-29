import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { InfoTooltip } from '../components/InfoTooltip';
import { Helmet } from 'react-helmet-async';

export function VACalculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [isFirstUse, setIsFirstUse] = useState(true);
  const [isExempt, setIsExempt] = useState(false);
  const [closingCosts, setClosingCosts] = useState(9000);

  // Calculate VA Funding Fee percentage
  const getVAFundingFee = () => {
    if (isExempt) return 0;
    
    const downPaymentPercentage = (downPayment / purchasePrice) * 100;
    
    if (isFirstUse) {
      if (downPaymentPercentage < 5) return 2.3;
      if (downPaymentPercentage < 10) return 1.65;
      return 1.4;
    } else {
      if (downPaymentPercentage < 5) return 3.6;
      if (downPaymentPercentage < 10) return 1.65;
      return 1.4;
    }
  };

  // Calculate loan amount including VA Funding Fee
  const baseLoanAmount = purchasePrice - downPayment;
  const fundingFeePercentage = getVAFundingFee();
  const fundingFee = (baseLoanAmount * fundingFeePercentage) / 100;
  const totalLoanAmount = baseLoanAmount + fundingFee;

  // Update closing costs when purchase price changes
  useEffect(() => {
    const estimatedClosingCosts = Math.max(8000, purchasePrice * 0.03);
    setClosingCosts(estimatedClosingCosts);
  }, [purchasePrice]);

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment =
      (totalLoanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment + propertyTax / 12 + insurance / 12;
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
        <title>VA Loan Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate VA loan payments, including funding fee, down payment options, and monthly payments."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Calculator className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">VA Loan Calculator</h1>
            <p className="text-gray-200">Calculate your VA loan payments and required cash</p>
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
                    <option value={15}>15 Years</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="firstUse"
                        checked={isFirstUse}
                        onChange={(e) => setIsFirstUse(e.target.checked)}
                        className="h-4 w-4 text-[#022B3A] focus:ring-[#022B3A] border-gray-300 rounded"
                      />
                      <label htmlFor="firstUse" className="ml-2 block text-sm text-gray-700">
                        First Time Use of VA Loan
                      </label>
                    </div>
                    <InfoTooltip content="VA funding fee rates are different for first-time and subsequent use of VA loan benefits." />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="exempt"
                        checked={isExempt}
                        onChange={(e) => setIsExempt(e.target.checked)}
                        className="h-4 w-4 text-[#022B3A] focus:ring-[#022B3A] border-gray-300 rounded"
                      />
                      <label htmlFor="exempt" className="ml-2 block text-sm text-gray-700">
                        Exempt from VA Funding Fee
                      </label>
                    </div>
                    <InfoTooltip content="Veterans with service-connected disabilities rated 10% or higher are exempt from the VA funding fee." />
                  </div>
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
                      <span className="text-gray-600">Base Loan Amount</span>
                      <span className="font-semibold">{formatCurrency(baseLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        VA Funding Fee ({fundingFeePercentage}%)
                      </span>
                      <span className="font-semibold">{formatCurrency(fundingFee)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Total Loan Amount</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency(totalLoanAmount)}
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
                        {formatCurrency(monthlyPayment - propertyTax / 12 - insurance / 12)}
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