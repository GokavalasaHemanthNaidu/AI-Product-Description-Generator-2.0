import React from 'react';

interface ResultDisplayProps {
  description: string;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ description, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-10 p-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl flex flex-col items-center justify-center min-h-[200px] animate-pulse">
        <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center mb-4">
          <div className="w-6 h-6 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-brand-300 font-medium tracking-wide">Synthesizing brilliance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 p-8 bg-red-950/40 backdrop-blur-md border border-red-900/50 rounded-3xl shadow-[0_0_30px_rgba(220,38,38,0.1)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">!</div>
          <h3 className="font-bold text-red-400 text-lg">Oops, something went wrong</h3>
        </div>
        <p className="text-red-200/80 ml-11">{error}</p>
      </div>
    );
  }

  if (!description) {
    return null;
  }

  return (
    <div className="mt-10 p-8 sm:p-10 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-brand-500/20 shadow-[0_0_40px_rgba(14,165,233,0.1)] transition-all duration-500 animate-fade-in-up relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-bl-full blur-2xl"></div>
      
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-brand-400 to-brand-600"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Your Custom Description</h2>
      </div>
      
      <div className="text-slate-300 whitespace-pre-wrap leading-relaxed text-lg font-light prose prose-invert max-w-none">
        {description}
      </div>
    </div>
  );
};

export default ResultDisplay;
