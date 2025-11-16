
import React from 'react';

interface ResultDisplayProps {
  description: string;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ description, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-8 text-center p-6 bg-slate-800 rounded-lg shadow-lg">
        <p className="text-slate-300 animate-pulse">Generating your description...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-900/20 border border-red-500 text-red-300 rounded-lg shadow-lg">
        <h3 className="font-bold mb-2">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!description) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Generated Product Description:</h2>
      <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
        {description}
      </div>
    </div>
  );
};

export default ResultDisplay;
