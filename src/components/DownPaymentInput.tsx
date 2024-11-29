import React, { useState } from 'react';
import { DollarSign, Percent } from 'lucide-react';

interface DownPaymentInputProps {
  loanAmount: number;
  downPayment: number;
  onDownPaymentChange: (value: number) => void;
}

export function DownPaymentInput({ loanAmount, downPayment, onDownPaymentChange }: DownPaymentInputProps) {
  const [isPercentage, setIsPercentage] = useState(false);
  
  const percentage = ((downPayment / loanAmount) * 100);
  
  const handleValueChange = (value: number) => {
    if (isPercentage) {
      onDownPaymentChange((value / 100) * loanAmount);
    } else {
      onDownPaymentChange(value);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Down Payment
        </label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPercentage(false)}
            className={`px-3 py-1 text-sm rounded-md ${
              !isPercentage
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Amount
          </button>
          <button
            onClick={() => setIsPercentage(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              isPercentage
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Percentage
          </button>
        </div>
      </div>
      <div className="relative">
        {isPercentage ? (
          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        ) : (
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}
        <input
          type="number"
          step={isPercentage ? "0.1" : "1000"}
          value={isPercentage ? percentage : downPayment}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {isPercentage
          ? `${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(downPayment)}`
          : `${percentage.toFixed(1)}%`}
      </p>
    </div>
  );
}