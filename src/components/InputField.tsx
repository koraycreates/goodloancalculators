import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: LucideIcon;
  step?: string;
  type?: string;
  disabled?: boolean;
}

export function InputField({ 
  label, 
  value, 
  onChange, 
  icon: Icon, 
  step = "1", 
  type = "number",
  disabled = false 
}: InputFieldProps) {
  // Format the value to 2 decimal places for display
  const displayValue = Number(value.toFixed(2));

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
        <input
          type={type}
          step={step}
          value={displayValue}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 text-base"
        />
      </div>
    </div>
  );
}