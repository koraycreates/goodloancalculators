import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Calculator } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';

interface BuydownSchedule {
  year: number;
  rate: number;
  payment: number;
  monthlyPaymentSavings: number;
}

export function BuydownCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [baseRate, setBaseRate] = useState(7.5);
  const [buydownType, setBuydownType] = useState<'1-0' | '2-1' | '3-2-1'>('2-1');
  const [propertyTax, setPropertyTax] = useState(3000);
  const [insurance, setInsurance] = useState(1200);
  const [schedule, setSchedule] = useState<BuydownSchedule[]>([]);
  const [baseMonthlyPayment, setBaseMonthlyPayment] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const calculatePayments = () => {
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyRate = baseRate / 100 / 12;
    const numberOfPayments = 30 * 12;

    // Calculate base monthly payment
    const basePrincipalAndInterest = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const basePayment = basePrincipalAndInterest + monthlyTax + monthlyInsurance;
    setBaseMonthlyPayment(basePayment);

    // Calculate buydown schedule
    const newSchedule: BuydownSchedule[] = [];
    let totalSavings = 0;

    const calculateYearlyPayment = (rate: number) => {
      const yearlyRate = rate / 100 / 12;
      const principalAndInterest =
        (loanAmount * yearlyRate * Math.pow(1 + yearlyRate, numberOfPayments)) /
        (Math.pow(1 + yearlyRate, numberOfPayments) - 1);
      return principalAndInterest + monthlyTax + monthlyInsurance;
    };

    switch (buydownType) {
      case '1-0':
        // Year 1: 1% lower
        const year1Rate = baseRate - 1;
        const year1Payment = calculateYearlyPayment(year1Rate);
        const year1Savings = basePayment - year1Payment;
        newSchedule.push({
          year: 1,
          rate: year1Rate,
          payment: year1Payment,
          monthlyPaymentSavings: year1Savings
        });
        totalSavings += year1Savings * 12;

        // Year 2+: Base rate
        newSchedule.push({
          year: 2,
          rate: baseRate,
          payment: basePayment,
          monthlyPaymentSavings: 0
        });
        break;

      case '2-1':
        // Year 1: 2% lower
        const year1Rate2_1 = baseRate - 2;
        const year1Payment2_1 = calculateYearlyPayment(year1Rate2_1);
        const year1Savings2_1 = basePayment - year1Payment2_1;
        newSchedule.push({
          year: 1,
          rate: year1Rate2_1,
          payment: year1Payment2_1,
          monthlyPaymentSavings: year1Savings2_1
        });
        totalSavings += year1Savings2_1 * 12;

        // Year 2: 1% lower
        const year2Rate2_1 = baseRate - 1;
        const year2Payment2_1 = calculateYearlyPayment(year2Rate2_1);
        const year2Savings2_1 = basePayment - year2Payment2_1;
        newSchedule.push({
          year: 2,
          rate: year2Rate2_1,
          payment: year2Payment2_1,
          monthlyPaymentSavings: year2Savings2_1
        });
        totalSavings += year2Savings2_1 * 12;

        // Year 3+: Base rate
        newSchedule.push({
          year: 3,
          rate: baseRate,
          payment: basePayment,
          monthlyPaymentSavings: 0
        });
        break;

      case '3-2-1':
        // Year 1: 3% lower
        const year1Rate3_2_1 = baseRate - 3;
        const year1Payment3_2_1 = calculateYearlyPayment(year1Rate3_2_1);
        const year1Savings3_2_1 = basePayment - year1Payment3_2_1;
        newSchedule.push({
          year: 1,
          rate: year1Rate3_2_1,
          payment: year1Payment3_2_1,
          monthlyPaymentSavings: year1Savings3_2_1
        });
        totalSavings += year1Savings3_2_1 * 12;

        // Year 2: 2% lower
        const year2Rate3_2_1 = baseRate - 2;
        const year2Payment3_2_1 = calculateYearlyPayment(year2Rate3_2_1);
        const year2Savings3_2_1 = basePayment - year2Payment3_2_1;
        newSchedule.push({
          year: 2,
          rate: year2Rate3_2_1,
          payment: year2Payment3_2_1,
          monthlyPaymentSavings: year2Savings3_2_1
        });
        totalSavings += year2Savings3_2_1 * 12;

        // Year 3: 1% lower
        const year3Rate3_2_1 = baseRate - 1;
        const year3Payment3_2_1 = calculateYearlyPayment(year3Rate3_2_1);
        const year3Savings3_2_1 = basePayment - year3Payment3_2_1;
        newSchedule.push({
          year: 3,
          rate: year3Rate3_2_1,
          payment: year3Payment3_2_1,
          monthlyPaymentSavings: year3Savings3_2_1
        });
        totalSavings += year3Savings3_2_1 * 12;

        // Year 4+: Base rate
        newSchedule.push({
          year: 4,
          rate: baseRate,
          payment: basePayment,
          monthlyPaymentSavings: 0
        });
        break;
    }

    setSchedule(newSchedule);
    setTotalSavings(totalSavings);
  };

  useEffect(() => {
    calculatePayments();
  }, [loanAmount, baseRate, buydownType, propertyTax, insurance]);

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
        <title>Temporary Buydown Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate the costs and savings of different temporary mortgage rate buydown options."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Calculator className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Temporary Buydown Calculator</h1>
            <p className="text-gray-200">Calculate your savings with a temporary rate buydown</p>
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
                  label="Base Interest Rate"
                  value={baseRate}
                  onChange={setBaseRate}
                  icon={Percent}
                  step="0.125"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buydown Type
                  </label>
                  <select
                    value={buydownType}
                    onChange={(e) => setBuydownType(e.target.value as '1-0' | '2-1' | '3-2-1')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                  >
                    <option value="1-0">1-0 Buydown</option>
                    <option value="2-1">2-1 Buydown</option>
                    <option value="3-2-1">3-2-1 Buydown</option>
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
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Summary</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg opacity-90">Regular Monthly Payment</p>
                      <p className="text-3xl font-bold">{formatCurrency(baseMonthlyPayment)}</p>
                    </div>

                    {schedule.length > 0 && (
                      <>
                        <div className="pt-4 border-t border-white/20">
                          <p className="text-lg opacity-90">First Year Payment</p>
                          <p className="text-3xl font-bold">
                            {formatCurrency(schedule[0].payment)}
                            <span className="text-sm ml-2">
                              (Save {formatCurrency(schedule[0].monthlyPaymentSavings)}/month)
                            </span>
                          </p>
                        </div>

                        {schedule.length > 1 && (
                          <div className="pt-4 border-t border-white/20">
                            <p className="text-lg opacity-90">Second Year Payment</p>
                            <p className="text-3xl font-bold">
                              {formatCurrency(schedule[1].payment)}
                              <span className="text-sm ml-2">
                                (Save {formatCurrency(schedule[1].monthlyPaymentSavings)}/month)
                              </span>
                            </p>
                          </div>
                        )}

                        {(buydownType === '2-1' || buydownType === '3-2-1') && schedule.length > 2 && (
                          <div className="pt-4 border-t border-white/20">
                            <p className="text-lg opacity-90">Third Year Payment</p>
                            <p className="text-3xl font-bold">
                              {formatCurrency(schedule[2].payment)}
                              {schedule[2].monthlyPaymentSavings > 0 && (
                                <span className="text-sm ml-2">
                                  (Save {formatCurrency(schedule[2].monthlyPaymentSavings)}/month)
                                </span>
                              )}
                            </p>
                          </div>
                        )}

                        {buydownType === '3-2-1' && schedule.length > 3 && (
                          <div className="pt-4 border-t border-white/20">
                            <p className="text-lg opacity-90">Fourth Year Payment</p>
                            <p className="text-3xl font-bold">
                              {formatCurrency(schedule[3].payment)}
                            </p>
                          </div>
                        )}

                        <div className="pt-4 border-t border-white/20">
                          <p className="text-lg opacity-90">Total Savings</p>
                          <p className="text-3xl font-bold">{formatCurrency(totalSavings)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Payment Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal & Interest</span>
                      <span className="font-semibold">
                        {formatCurrency(baseMonthlyPayment - propertyTax / 12 - insurance / 12)}
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

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Interest Rate Schedule</h3>
                  <div className="space-y-2">
                    {schedule.map((year, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">Year {year.year}</span>
                        <span className="font-semibold">{year.rate.toFixed(3)}%</span>
                      </div>
                    ))}
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

export default BuydownCalculator;