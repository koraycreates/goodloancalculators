import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NetWorthData {
  year: number;
  buyingNetWorth: number;
  rentingNetWorth: number;
}

export function RentVsBuy() {
  // Home purchase inputs
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [maintenance, setMaintenance] = useState(3000);
  const [hoa, setHoa] = useState(0);
  const [appreciationRate, setAppreciationRate] = useState(4);

  // Renting inputs
  const [monthlyRent, setMonthlyRent] = useState(2000);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [rentersInsurance, setRentersInsurance] = useState(200);

  // Investment assumptions
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [inflationRate, setInflationRate] = useState(2.5);

  const [netWorthData, setNetWorthData] = useState<NetWorthData[]>([]);

  const calculateNetWorth = () => {
    const data: NetWorthData[] = [];
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = 30 * 12;

    // Calculate monthly mortgage payment
    const monthlyMortgage =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate total monthly cost of buying
    const monthlyBuyingCost = monthlyMortgage + 
                             propertyTax / 12 + 
                             insurance / 12 + 
                             maintenance / 12 + 
                             hoa;

    // Initialize values
    let currentHomeValue = homePrice;
    let currentRent = monthlyRent;
    let mortgageBalance = loanAmount;
    let rentingInvestmentBalance = downPayment; // Start with down payment invested
    
    // Calculate year by year
    for (let year = 0; year <= 30; year++) {
      // Buying scenario
      currentHomeValue *= (1 + appreciationRate / 100); // Home appreciation
      
      // Calculate interest and principal for the year
      let yearlyInterest = 0;
      for (let month = 0; month < 12; month++) {
        const interestPayment = mortgageBalance * monthlyRate;
        const principalPayment = monthlyMortgage - interestPayment;
        yearlyInterest += interestPayment;
        mortgageBalance -= principalPayment;
      }

      // Buying net worth is home value minus remaining mortgage
      const buyingNetWorth = currentHomeValue - Math.max(0, mortgageBalance);

      // Renting scenario
      const yearlyRentingCost = currentRent * 12 + rentersInsurance;
      const yearlyBuyingCost = monthlyBuyingCost * 12;
      
      // Monthly savings from renting vs buying
      const monthlySavings = yearlyBuyingCost - yearlyRentingCost;
      
      // Investment returns on both down payment and monthly savings
      const monthlyInvestmentReturn = investmentReturn / 100 / 12;
      
      // Compound returns monthly
      for (let month = 0; month < 12; month++) {
        // Existing balance grows
        rentingInvestmentBalance *= (1 + monthlyInvestmentReturn);
        // Add and invest monthly savings
        rentingInvestmentBalance += monthlySavings / 12;
      }

      // Adjust rent for next year
      currentRent *= (1 + rentIncrease / 100);

      data.push({
        year,
        buyingNetWorth,
        rentingNetWorth: rentingInvestmentBalance
      });
    }

    setNetWorthData(data);
  };

  useEffect(() => {
    calculateNetWorth();
  }, [
    homePrice,
    downPayment,
    interestRate,
    propertyTax,
    insurance,
    maintenance,
    hoa,
    appreciationRate,
    monthlyRent,
    rentIncrease,
    rentersInsurance,
    investmentReturn,
    inflationRate,
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
        <title>Rent vs. Buy Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Compare the financial benefits of renting vs. buying a home over time. See your projected net worth with our interactive calculator."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <TrendingUp className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Rent vs. Buy Calculator</h1>
            <p className="text-gray-200">Compare the financial impact of renting vs. buying over time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Home Purchase Details</h2>
                  <div className="space-y-4">
                    <InputField
                      label="Home Price"
                      value={homePrice}
                      onChange={setHomePrice}
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
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Annual Costs</h3>
                  <InputField
                    label="Property Tax"
                    value={propertyTax}
                    onChange={setPropertyTax}
                    icon={DollarSign}
                  />
                  <InputField
                    label="Home Insurance"
                    value={insurance}
                    onChange={setInsurance}
                    icon={DollarSign}
                  />
                  <InputField
                    label="Maintenance & Repairs"
                    value={maintenance}
                    onChange={setMaintenance}
                    icon={DollarSign}
                  />
                  <InputField
                    label="Monthly HOA"
                    value={hoa}
                    onChange={setHoa}
                    icon={DollarSign}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Renting Details</h2>
                  <div className="space-y-4">
                    <InputField
                      label="Monthly Rent"
                      value={monthlyRent}
                      onChange={setMonthlyRent}
                      icon={DollarSign}
                    />
                    <InputField
                      label="Annual Rent Increase"
                      value={rentIncrease}
                      onChange={setRentIncrease}
                      icon={Percent}
                      step="0.1"
                    />
                    <InputField
                      label="Annual Renters Insurance"
                      value={rentersInsurance}
                      onChange={setRentersInsurance}
                      icon={DollarSign}
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Market Assumptions</h3>
                  <InputField
                    label="Home Appreciation Rate"
                    value={appreciationRate}
                    onChange={setAppreciationRate}
                    icon={Percent}
                    step="0.1"
                  />
                  <InputField
                    label="Investment Return Rate"
                    value={investmentReturn}
                    onChange={setInvestmentReturn}
                    icon={Percent}
                    step="0.1"
                  />
                  <InputField
                    label="Inflation Rate"
                    value={inflationRate}
                    onChange={setInflationRate}
                    icon={Percent}
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Net Worth Comparison</h2>

              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={netWorthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), "Net Worth"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="buyingNetWorth"
                      stroke="#022B3A"
                      name="Buying"
                    />
                    <Line
                      type="monotone"
                      dataKey="rentingNetWorth"
                      stroke="#1B4965"
                      name="Renting"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Summary at Year 5</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Buying Net Worth</span>
                      <span className="font-semibold">
                        {formatCurrency(netWorthData[5]?.buyingNetWorth || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renting Net Worth</span>
                      <span className="font-semibold">
                        {formatCurrency(netWorthData[5]?.rentingNetWorth || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Difference</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency((netWorthData[5]?.buyingNetWorth || 0) - (netWorthData[5]?.rentingNetWorth || 0))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Summary at Year 10</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Buying Net Worth</span>
                      <span className="font-semibold">
                        {formatCurrency(netWorthData[10]?.buyingNetWorth || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Renting Net Worth</span>
                      <span className="font-semibold">
                        {formatCurrency(netWorthData[10]?.rentingNetWorth || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-800">Difference</span>
                      <span className="font-bold text-[#022B3A]">
                        {formatCurrency((netWorthData[10]?.buyingNetWorth || 0) - (netWorthData[10]?.rentingNetWorth || 0))}
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