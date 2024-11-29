import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, ChevronDown, ChevronUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { DownPaymentInput } from '../components/DownPaymentInput';
import { PaymentSummary } from '../components/PaymentSummary';

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);
  const [propertyTax, setPropertyTax] = useState(2400);
  const [insurance, setInsurance] = useState(1200);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [pmi, setPmi] = useState(0);
  const [hoaDues, setHoaDues] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyMortgage =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;

    setMonthlyPayment(monthlyMortgage + monthlyTax + monthlyInsurance + pmi + hoaDues + otherCosts);
  };

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment, propertyTax, insurance, pmi, hoaDues, otherCosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mortgage Calculator</h1>
          <p className="text-gray-200">Plan your home loan with confidence</p>
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
                  <option value={10}>10 Years</option>
                </select>
              </div>

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

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-[#022B3A] bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span>Advanced Options</span>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showAdvanced && (
                <div className="space-y-6 pt-4">
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

                  <InputField
                    label="Other Monthly Costs"
                    value={otherCosts}
                    onChange={setOtherCosts}
                    icon={DollarSign}
                  />
                </div>
              )}
            </div>
          </div>

          <PaymentSummary
            monthlyPayment={monthlyPayment}
            propertyTax={propertyTax}
            insurance={insurance}
            loanAmount={loanAmount}
            downPayment={downPayment}
            pmi={pmi}
            hoaDues={hoaDues}
            otherCosts={otherCosts}
          />
        </div>
      </div>
    </div>
  );
}