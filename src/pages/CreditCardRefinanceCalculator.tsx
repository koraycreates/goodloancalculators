import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Plus, Trash2 } from 'lucide-react';
import { InputField } from '../components/InputField';
import { Helmet } from 'react-helmet-async';

interface CreditCard {
  balance: number;
  rate: number;
  minPayment: number;
}

interface Comparison {
  currentMonthlyPayment: number;
  currentTotalInterest: number;
  currentPayoffTime: number;
  newMonthlyPayment: number;
  newTotalInterest: number;
  newPayoffTime: number;
  monthlySavings: number;
  totalSavings: number;
  timesSaved: number;
}

export function CreditCardRefinanceCalculator() {
  const [cards, setCards] = useState<CreditCard[]>([
    { balance: 5000, rate: 19.99, minPayment: 100 }
  ]);
  const [loanRate, setLoanRate] = useState(8.99);
  const [loanTerm, setLoanTerm] = useState(36);
  const [originationFee, setOriginationFee] = useState(3);
  const [comparison, setComparison] = useState<Comparison>({
    currentMonthlyPayment: 0,
    currentTotalInterest: 0,
    currentPayoffTime: 0,
    newMonthlyPayment: 0,
    newTotalInterest: 0,
    newPayoffTime: 0,
    monthlySavings: 0,
    totalSavings: 0,
    timesSaved: 0,
  });

  const addCard = () => {
    setCards([...cards, { balance: 0, rate: 0, minPayment: 0 }]);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const updateCard = (index: number, field: keyof CreditCard, value: number) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setCards(newCards);
  };

  const calculateComparison = () => {
    const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
    const originationAmount = (originationFee / 100) * totalBalance;
    const loanAmount = totalBalance + originationAmount;

    // Calculate new loan payment
    const monthlyRate = loanRate / 100 / 12;
    const numberOfPayments = loanTerm;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalInterest = monthlyPayment * numberOfPayments - totalBalance;

    // Calculate current credit card payments
    let maxMonths = 0;
    let totalCurrentInterest = 0;
    const currentPayments = cards.map(card => {
      let balance = card.balance;
      let months = 0;
      let interest = 0;
      const monthlyRate = card.rate / 100 / 12;

      while (balance > 0 && months < 360) {
        const currentMinPayment = Math.max(card.minPayment, balance * 0.02);
        const interestCharge = balance * monthlyRate;
        interest += interestCharge;
        balance = balance - (currentMinPayment - interestCharge);
        months++;
      }

      maxMonths = Math.max(maxMonths, months);
      totalCurrentInterest += interest;
      return card.minPayment;
    });

    const totalCurrentPayment = currentPayments.reduce((sum, payment) => sum + payment, 0);

    setComparison({
      currentMonthlyPayment: totalCurrentPayment,
      currentTotalInterest: totalCurrentInterest,
      currentPayoffTime: maxMonths,
      newMonthlyPayment: monthlyPayment,
      newTotalInterest: totalInterest,
      newPayoffTime: loanTerm,
      monthlySavings: totalCurrentPayment - monthlyPayment,
      totalSavings: totalCurrentInterest - totalInterest,
      timesSaved: maxMonths - loanTerm,
    });
  };

  useEffect(() => {
    calculateComparison();
  }, [cards, loanRate, loanTerm, originationFee]);

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
        <title>Credit Card Refinance Calculator - Good Loan Calculators</title>
        <meta
          name="description"
          content="Calculate how much you could save by consolidating your credit card debt with a personal loan."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <Plus className="w-12 h-12 text-white mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">Credit Card Refinance Calculator</h1>
            <p className="text-gray-200">See how much you could save by consolidating your credit card debt</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Credit Cards</h2>
              
              <div className="space-y-6">
                {cards.map((card, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-[#022B3A]">Card {index + 1}</h3>
                      {cards.length > 1 && (
                        <button
                          onClick={() => removeCard(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <InputField
                      label="Balance"
                      value={card.balance}
                      onChange={(value) => updateCard(index, 'balance', value)}
                      icon={DollarSign}
                    />
                    <InputField
                      label="Interest Rate"
                      value={card.rate}
                      onChange={(value) => updateCard(index, 'rate', value)}
                      icon={Percent}
                      step="0.01"
                    />
                    <InputField
                      label="Minimum Payment"
                      value={card.minPayment}
                      onChange={(value) => updateCard(index, 'minPayment', value)}
                      icon={DollarSign}
                    />
                  </div>
                ))}

                <button
                  onClick={addCard}
                  className="w-full flex items-center justify-center py-2 px-4 border border-[#022B3A] rounded-md text-[#022B3A] hover:bg-slate-50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Another Card
                </button>

                <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-[#022B3A]">Consolidation Loan Details</h3>
                  <InputField
                    label="Interest Rate"
                    value={loanRate}
                    onChange={setLoanRate}
                    icon={Percent}
                    step="0.01"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Months)
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#022B3A] focus:border-transparent"
                    >
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                      <option value={60}>60 months</option>
                    </select>
                  </div>
                  <InputField
                    label="Origination Fee (%)"
                    value={originationFee}
                    onChange={setOriginationFee}
                    icon={Percent}
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Savings Summary</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#022B3A] to-[#1B4965] rounded-xl p-6 text-white">
                  <p className="text-lg opacity-90 mb-2">Total Savings</p>
                  <p className="text-4xl font-bold">{formatCurrency(comparison.totalSavings)}</p>
                  <p className="text-lg mt-2">
                    {formatCurrency(comparison.monthlySavings)} monthly savings
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Current Cards</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.currentMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.currentTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payoff Time</span>
                        <span className="font-semibold">
                          {Math.floor(comparison.currentPayoffTime / 12)} years,{' '}
                          {comparison.currentPayoffTime % 12} months
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Consolidation Loan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.newMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          {formatCurrency(comparison.newTotalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payoff Time</span>
                        <span className="font-semibold">
                          {Math.floor(comparison.newPayoffTime / 12)} years,{' '}
                          {comparison.newPayoffTime % 12} months
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#022B3A] mb-4">Time Saved</h3>
                  <p className="text-xl font-semibold text-green-600">
                    {Math.floor(comparison.timesSaved / 12)} years,{' '}
                    {comparison.timesSaved % 12} months faster payoff
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreditCardRefinanceCalculator;