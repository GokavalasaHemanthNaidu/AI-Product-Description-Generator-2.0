import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center my-6 md:my-10 animate-fade-in-down">
      <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
        <SparklesIcon className="w-8 h-8 text-brand-400" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-300 tracking-tight leading-tight mb-4 drop-shadow-sm">
        AI Copywriter
      </h1>
      <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
        Elevate your marketing with Gemini. Transform basic features into <span className="text-brand-300 font-medium">compelling stories</span> that sell.
      </p>
    </header>
  );
};

export default Header;
