import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        aria-label="Information"
      >
        <Info className="w-5 h-5" />
      </button>
      {isVisible && (
        <div className="absolute z-10 w-64 p-3 text-sm text-gray-600 bg-white border rounded-lg shadow-lg -right-2 top-8">
          <div className="absolute w-3 h-3 bg-white border-t border-l transform -translate-y-1/2 rotate-45 -top-0 right-3" />
          {content}
        </div>
      )}
    </div>
  );
}