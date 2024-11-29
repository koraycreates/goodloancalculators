import React from 'react';
import { Calculator, Info, HomeIcon, Building2, Plus } from 'lucide-react';

interface PaymentSummaryProps {
  monthlyPayment: number;
  propertyTax: number;
  insurance: number;
  loanAmount: number;
  downPayment: number;
  pmi: number;
  hoaDues: number;
  otherCosts: number;
}

export function PaymentSummary({ 
  monthlyPayment, 
  propertyTax, 
  insurance, 
  loanAmount, 
  downPayment,
  pmi,
  hoaDues,
  otherCosts
}: PaymentSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const principalAndInterest = monthlyPayment - (propertyTax/12 + insurance/12 + pmi + hoaDues + otherCosts);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Summary</h2>
      
      <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white mb-6">
        <p className="text-lg opacity-90 mb-2">Estimated Monthly Payment</p>
        <p className="text-4xl font-bold">{formatCurrency(monthlyPayment)}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Calculator className="w-5 h-5 text-[#022B3A] mr-2" />
            <span className="text-gray-700">Principal & Interest</span>
          </div>
          <span className="font-semibold">{formatCurrency(principalAndInterest)}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Info className="w-5 h-5 text-[#022B3A] mr-2" />
            <span className="text-gray-700">Property Tax</span>
          </div>
          <span className="font-semibold">{formatCurrency(propertyTax/12)}</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <HomeIcon className="w-5 h-5 text-[#022B3A] mr-2" />
            <span className="text-gray-700">Home Insurance</span>
          </div>
          <span className="font-semibold">{formatCurrency(insurance/12)}</span>
        </div>

        {pmi > 0 && (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-[#022B3A] mr-2" />
              <span className="text-gray-700">PMI</span>
            </div>
            <span className="font-semibold">{formatCurrency(pmi)}</span>
          </div>
        )}

        {hoaDues > 0 && (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-[#022B3A] mr-2" />
              <span className="text-gray-700">HOA Dues</span>
            </div>
            <span className="font-semibold">{formatCurrency(hoaDues)}</span>
          </div>
        )}

        {otherCosts > 0 && (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Plus className="w-5 h-5 text-[#022B3A] mr-2" />
              <span className="text-gray-700">Other Monthly Costs</span>
            </div>
            <span className="font-semibold">{formatCurrency(otherCosts)}</span>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <p className="text-sm text-[#022B3A]">
          <span className="font-semibold">Loan Amount:</span> {formatCurrency(loanAmount - downPayment)}
        </p>
        <p className="text-sm text-[#022B3A] mt-2">
          <span className="font-semibold">Down Payment:</span> {((downPayment / loanAmount) * 100).toFixed(1)}% ({formatCurrency(downPayment)})
        </p>
      </div>
    </div>
  );
}