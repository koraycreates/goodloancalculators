import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

interface BlogPostProps {
  title: string;
  description: string;
  content: React.ReactNode;
  calculatorLink: string;
  calculatorName: string;
}

export function BlogPost({ title, description, content, calculatorLink, calculatorName }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022B3A] to-[#1B4965]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 mb-8">{description}</p>

            <div className="prose max-w-none">
              {content}
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#022B3A] mb-2">
                    Try Our {calculatorName}
                  </h2>
                  <p className="text-gray-600">
                    Use our calculator to run your own numbers and see what works best for you.
                  </p>
                </div>
                <Link
                  to={calculatorLink}
                  className="flex items-center px-6 py-3 bg-[#022B3A] text-white rounded-lg hover:bg-[#1B4965] transition-colors"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Open Calculator
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <Link to="/blog" className="text-[#022B3A] hover:underline">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}