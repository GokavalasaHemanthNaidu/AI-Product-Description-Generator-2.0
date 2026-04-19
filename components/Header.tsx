import React, { useState, useEffect } from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('GEMINI_API_KEY');
    if (saved) {
      setApiKey(saved);
      setIsSaved(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    setIsSaved(true);
    // Brief animation state
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <header className="text-center my-6 md:my-10 animate-fade-in-down relative">
      {/* Top right API Key Settings */}
      <div className="absolute top-0 right-0 flex flex-col items-end gap-2 -mt-4 sm:mt-0">
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-md shadow-lg transition-all focus-within:border-brand-500/50">
          <input
            type="password"
            placeholder="Enter Gemini API Key..."
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setIsSaved(false);
            }}
            className="bg-transparent text-xs text-slate-300 placeholder-slate-600 outline-none w-36 sm:w-48 px-3 py-1.5 rounded-full"
          />
          <button
            onClick={handleSave}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${
              isSaved 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.3)]'
            }`}
          >
            {isSaved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      <div className="inline-flex items-center justify-center p-3 mb-6 mt-8 sm:mt-0 rounded-2xl bg-brand-500/10 border border-brand-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
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
