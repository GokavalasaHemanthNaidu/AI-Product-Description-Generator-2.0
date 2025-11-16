
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight flex items-center justify-center gap-3">
        <SparklesIcon />
        AI Product Description Generator
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
        Generate compelling product descriptions with Gemini. Fill in the details below to create marketing copy that sells.
      </p>
    </header>
  );
};

export default Header;
