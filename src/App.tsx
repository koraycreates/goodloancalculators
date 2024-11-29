import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { MortgageCalculator } from './pages/MortgageCalculator';
import { RefinanceCalculator } from './pages/RefinanceCalculator';
import { ExtraPaymentsCalculator } from './pages/ExtraPaymentsCalculator';
import { InterestOnlyCalculator } from './pages/InterestOnlyCalculator';
import { AffordabilityCalculator } from './pages/AffordabilityCalculator';
import { ARMCalculator } from './pages/ARMCalculator';
import { RentVsBuy } from './pages/RentVsBuy';
import { PersonalLoanCalculator } from './pages/PersonalLoanCalculator';
import { CreditCardRefinanceCalculator } from './pages/CreditCardRefinanceCalculator';
import { MortgageTermComparison } from './pages/MortgageTermComparison';
import { BiWeeklyCalculator } from './pages/BiWeeklyCalculator';
import { BuydownCalculator } from './pages/BuydownCalculator';
import { PropertyTaxCalculator } from './pages/PropertyTaxCalculator';
import { Contact } from './pages/Contact';
import { MortgageCalculatorPost } from './pages/BlogPosts/MortgageCalculatorPost';
import { AffordabilityCalculatorPost } from './pages/BlogPosts/AffordabilityCalculatorPost';
import { RefinanceCalculatorPost } from './pages/BlogPosts/RefinanceCalculatorPost';
import { ARMCalculatorPost } from './pages/BlogPosts/ARMCalculatorPost';
import { RentVsBuyPost } from './pages/BlogPosts/RentVsBuyPost';
import { BiWeeklyPaymentPost } from './pages/BlogPosts/BiWeeklyPaymentPost';
import { BuydownCalculatorPost } from './pages/BlogPosts/BuydownCalculatorPost';
import { PropertyTaxPost } from './pages/BlogPosts/PropertyTaxPost';
import { MortgageTermComparisonPost } from './pages/BlogPosts/MortgageTermComparisonPost';
import { InterestOnlyPost } from './pages/BlogPosts/InterestOnlyPost';
import { ExtraPaymentsPost } from './pages/BlogPosts/ExtraPaymentsPost';
import { PersonalLoanPost } from './pages/BlogPosts/PersonalLoanPost';
import { CreditCardRefinancePost } from './pages/BlogPosts/CreditCardRefinancePost';
import { FHACalculator } from './pages/FHACalculator';
import { VACalculator } from './pages/VACalculator';
import { ConventionalCalculator } from './pages/ConventionalCalculator';
import { DPACalculator } from './pages/DPACalculator';
import { FHACalculatorPost } from './pages/BlogPosts/FHACalculatorPost';
import { VACalculatorPost } from './pages/BlogPosts/VACalculatorPost';
import { ConventionalCalculatorPost } from './pages/BlogPosts/ConventionalCalculatorPost';
import { DPACalculatorPost } from './pages/BlogPosts/DPACalculatorPost';

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/mortgage-calculator" element={<MortgageCalculatorPost />} />
          <Route path="/blog/affordability-calculator" element={<AffordabilityCalculatorPost />} />
          <Route path="/blog/refinance-calculator" element={<RefinanceCalculatorPost />} />
          <Route path="/blog/arm-calculator" element={<ARMCalculatorPost />} />
          <Route path="/blog/rent-vs-buy" element={<RentVsBuyPost />} />
          <Route path="/blog/biweekly-payments" element={<BiWeeklyPaymentPost />} />
          <Route path="/blog/buydown-calculator" element={<BuydownCalculatorPost />} />
          <Route path="/blog/property-tax" element={<PropertyTaxPost />} />
          <Route path="/blog/15-vs-30" element={<MortgageTermComparisonPost />} />
          <Route path="/blog/interest-only" element={<InterestOnlyPost />} />
          <Route path="/blog/extra-payments" element={<ExtraPaymentsPost />} />
          <Route path="/blog/personal-loan" element={<PersonalLoanPost />} />
          <Route path="/blog/credit-card-refinance" element={<CreditCardRefinancePost />} />
          <Route path="/blog/fha-loans" element={<FHACalculatorPost />} />
          <Route path="/blog/va-loans" element={<VACalculatorPost />} />
          <Route path="/blog/conventional-loans" element={<ConventionalCalculatorPost />} />
          <Route path="/blog/down-payment-assistance" element={<DPACalculatorPost />} />
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/refinance" element={<RefinanceCalculator />} />
          <Route path="/extra-payments" element={<ExtraPaymentsCalculator />} />
          <Route path="/interest-only" element={<InterestOnlyCalculator />} />
          <Route path="/affordability" element={<AffordabilityCalculator />} />
          <Route path="/arm" element={<ARMCalculator />} />
          <Route path="/rent-vs-buy" element={<RentVsBuy />} />
          <Route path="/personal-loan" element={<PersonalLoanCalculator />} />
          <Route path="/credit-card-refinance" element={<CreditCardRefinanceCalculator />} />
          <Route path="/15-vs-30" element={<MortgageTermComparison />} />
          <Route path="/biweekly" element={<BiWeeklyCalculator />} />
          <Route path="/buydown" element={<BuydownCalculator />} />
          <Route path="/property-tax" element={<PropertyTaxCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fha" element={<FHACalculator />} />
          <Route path="/va" element={<VACalculator />} />
          <Route path="/conventional" element={<ConventionalCalculator />} />
          <Route path="/dpa" element={<DPACalculator />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;