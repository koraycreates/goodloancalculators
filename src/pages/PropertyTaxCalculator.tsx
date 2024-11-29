import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Home, Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';

interface TaxRates {
  [key: string]: number;
}

export function PropertyTaxCalculator() {
  const [propertyValue, setPropertyValue] = useState(300000);
  const [state, setState] = useState('CA');
  const [assessmentRatio, setAssessmentRatio] = useState(100);
  const [millageRate, setMillageRate] = useState(12.5); // Updated for CA default
  const [exemptions, setExemptions] = useState(0);
  const [county, setCounty] = useState('');
  
  const [annualTax, setAnnualTax] = useState(0);
  const [monthlyTax, setMonthlyTax] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);

  // Average property tax rates by state
  const stateRates: TaxRates = {
    'CA': 1.25, // Updated CA rate
    'GA': 0.93,
    'TX': 1.80,
    'FL': 0.89,
    'NY': 1.72,
  };

  // Georgia county millage rates (example rates - should be updated with actual rates)
  const georgiaCounties = {
    'Fulton': 10.2,
    'DeKalb': 11.3,
    'Gwinnett': 9.8,
    'Cobb': 8.9,
    'Clayton': 12.5,
    // Add more counties as needed
  };

  // Update assessment ratio and millage rate when state changes
  useEffect(() => {
    if (state === 'GA') {
      setAssessmentRatio(40); // Georgia's assessment ratio is 40%
      if (county && georgiaCounties[county as keyof typeof georgiaCounties]) {
        setMillageRate(georgiaCounties[county as keyof typeof georgiaCounties]);
      }
    } else if (state === 'CA') {
      setAssessmentRatio(100);
      setMillageRate(12.5); // 1.25% converted to millage rate
    }
    // Add other state-specific logic as needed
  }, [state, county]);

  const calculateTax = () => {
    // Calculate assessed value
    const assessedValue = (propertyValue * (assessmentRatio / 100)) - exemptions;
    
    // Calculate annual tax
    const calculatedAnnualTax = (assessedValue * (millageRate / 1000));
    
    // Calculate effective tax rate
    const calculatedEffectiveRate = (calculatedAnnualTax / propertyValue) * 100;

    setAnnualTax(calculatedAnnualTax);
    setMonthlyTax(calculatedAnnualTax / 12);
    setEffectiveRate(calculatedEffectiveRate);
  };

  useEffect(() => {
    calculateTax();
  }, [propertyValue, state, assessmentRatio, millageRate, exemptions, county]);

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
        <title>Property Tax Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate your estimated property taxes based on your location and property value."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Home className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Property Tax Calculator</h1>
            <p className="text-gray-200">Estimate your property taxes based on your location</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Details</h2>
              
              <div className="space-y-6">
                <InputField
                  label="Property Value"
                  value={propertyValue}
                  onChange={setPropertyValue}
                  icon={DollarSign}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setCounty('');
                      setMillageRate(stateRates[e.target.value] * 10);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                  >
                    <option value="CA">California</option>
                    <option value="GA">Georgia</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                  </select>
                </div>

                {state === 'GA' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      County
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                    >
                      <option value="">Select County</option>
                      {Object.keys(georgiaCounties).map((county) => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Assessment Details</h3>
                  <InputField
                    label="Assessment Ratio (%)"
                    value={assessmentRatio}
                    onChange={setAssessmentRatio}
                    icon={Percent}
                    step="0.1"
                  />
                  <InputField
                    label="Mill Rate (per $1,000)"
                    value={millageRate}
                    onChange={setMillageRate}
                    icon={Calculator}
                    step="0.1"
                  />
                  <InputField
                    label="Exemptions"
                    value={exemptions}
                    onChange={setExemptions}
                    icon={DollarSign}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tax Summary</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <p className="text-lg opacity-90 mb-2">Annual Property Tax</p>
                  <p className="text-4xl font-bold">{formatCurrency(annualTax)}</p>
                  <p className="text-lg mt-2">
                    {formatCurrency(monthlyTax)} per month
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Effective Tax Rate</h3>
                    <p className="text-lg font-semibold text-[#022B3A]">
                      {effectiveRate.toFixed(2)}%
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">State Average</h3>
                    <p className="text-lg font-semibold text-[#022B3A]">
                      {stateRates[state]}%
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Assessment Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Value</span>
                      <span className="font-semibold">{formatCurrency(propertyValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assessed Value</span>
                      <span className="font-semibold">
                        {formatCurrency(propertyValue * (assessmentRatio / 100))}
                      </span>
                    </div>
                    {exemptions > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exemptions</span>
                        <span className="font-semibold text-green-600">
                          -{formatCurrency(exemptions)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Taxable Value</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency((propertyValue * (assessmentRatio / 100)) - exemptions)}
                      </span>
                    </div>
                  </div>
                </div>

                {state === 'GA' && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Georgia Property Tax Info</h3>
                    <ul className="list-disc list-inside space-y-2 text-blue-800">
                      <li>40% assessment ratio statewide</li>
                      <li>Homestead exemptions vary by county</li>
                      <li>Millage rates set by local jurisdictions</li>
                      <li>Additional exemptions for seniors and disabled</li>
                    </ul>
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

export default PropertyTaxCalculator;