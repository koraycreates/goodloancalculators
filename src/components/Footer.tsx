import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#022B3A] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-300">
              Good Loan Calculators provides free financial calculators to help you make informed decisions about mortgages, loans, and more.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-300 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-gray-300 hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-300">
              Email: hello@goodloancalculators.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2024 Good Loan Calculators. All rights reserved.
            </p>
            <p className="text-sm text-gray-300 mt-2 md:mt-0">
              Created by <a href="https://koraysgotyourmoney.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Koray's Got Your Money</a>
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            <p>Disclaimer: The calculators provided on this website are for informational purposes only. While we strive for accuracy, we make no guarantees about the results. Please consult with financial professionals for specific advice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}