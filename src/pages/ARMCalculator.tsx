import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentSchedule {
  year: number;
  payment: number;
  rate: number;
  balance: number;
}

export function ARMCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [initialRate, setInitialRate] = useState(5.5);
  const [initialPeriod, setInitialPeriod] = useState(5);
  const [adjustmentCap, setAdjustmentCap] = useState(2);
  const [lifetimeCap, setLifetimeCap] = useState(5);
  const [marginRate, setMarginRate] = useState(2.75);
  const [indexRate, setIndexRate] = useState(4.5);
  
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);

  const calculatePayments = () => {
    const principal = loanAmount - downPayment;
    let balance = principal;
    let currentRate = initialRate;
    const payments: PaymentSchedule[] = [];

    for (let year = 1; year <= 30; year++) {
      if (year > initialPeriod) {
        // Calculate new rate after initial period
        const baseRate = indexRate + marginRate;
        const maxIncrease = Math.min(adjustmentCap, lifetimeCap - (currentRate - initialRate));
        currentRate = Math.min(baseRate, initialRate + lifetimeCap);
        currentRate = Math.min(currentRate, currentRate + maxIncrease);
      }

      const monthlyRate = currentRate / 100 / 12;
      const remainingMonths = (30 - year + 1) * 12;
      
      const monthlyPayment = 
        (balance * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) /
        (Math.pow(1 + monthlyRate, remainingMonths) - 1);

      const yearlyPayment = monthlyPayment * 12;
      
      payments.push({
        year,
        payment: yearlyPayment,
        rate: currentRate,
        balance,
      });

      // Calculate new balance
      for (let month = 0; month < 12; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
      }
    }

    setSchedule(payments);
  };

  useEffect(() => {
    calculatePayments();
  }, [
    loanAmount,
    downPayment,
    initialRate,
    initialPeriod,
    adjustmentCap,
    lifetimeCap,
    marginRate,
    indexRate,
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
        <title>ARM Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate adjustable rate mortgage (ARM) payments and see how your payments might change over time with our ARM calculator."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <TrendingUp className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">ARM Calculator</h1>
            <p className="text-gray-200">Understand how your adjustable rate mortgage might change over time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loan Details</h2>
              
              <div className="space-y-6">
                <InputField
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  icon={DollarSign}
                />

                <InputField
                  label="Down Payment"
                  value={downPayment}
                  onChange={setDownPayment}
                  icon={DollarSign}
                />

                <InputField
                  label="Initial Interest Rate"
                  value={initialRate}
                  onChange={setInitialRate}
                  icon={Percent}
                  step="0.125"
                />

                <InputField
                  label="Initial Fixed Period (Years)"
                  value={initialPeriod}
                  onChange={setInitialPeriod}
                  icon={Calendar}
                  step="1"
                />

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Rate Adjustment Rules</h3>
                  
                  <InputField
                    label="Periodic Adjustment Cap"
                    value={adjustmentCap}
                    onChange={setAdjustmentCap}
                    icon={Percent}
                    step="0.125"
                  />

                  <InputField
                    label="Lifetime Cap"
                    value={lifetimeCap}
                    onChange={setLifetimeCap}
                    icon={Percent}
                    step="0.125"
                  />

                  <InputField
                    label="Margin Rate"
                    value={marginRate}
                    onChange={setMarginRate}
                    icon={Percent}
                    step="0.125"
                  />

                  <InputField
                    label="Index Rate"
                    value={indexRate}
                    onChange={setIndexRate}
                    icon={Percent}
                    step="0.125"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Schedule</h2>

              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={schedule}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === 'payment' ? formatCurrency(value) : `${value}%`,
                        name === 'payment' ? 'Annual Payment' : 'Interest Rate'
                      ]}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="payment"
                      stroke="#022B3A"
                      name="Annual Payment"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rate"
                      stroke="#1B4965"
                      name="Interest Rate"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6">
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schedule.map((year) => (
                        <tr key={year.year}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {year.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {year.rate.toFixed(3)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(year.payment)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(year.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}