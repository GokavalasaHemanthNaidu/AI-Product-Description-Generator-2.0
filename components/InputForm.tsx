import React from 'react';
import type { ProductData } from '../types';
import LoaderIcon from './icons/LoaderIcon';

interface InputFormProps {
  productData: ProductData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ productData, onInputChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-brand-500/5">
      {/* Subtle top border glow effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>

      <div className="space-y-1.5">
        <label htmlFor="productName" className="block text-sm font-semibold text-slate-300 ml-1">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productData.productName}
          onChange={onInputChange}
          placeholder="e.g., 'SmartMug Pro'"
          className="w-full bg-slate-950/50 border border-slate-700/50 text-white rounded-xl p-4 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner placeholder-slate-600 outline-none"
        />
      </div>
      
      <div className="space-y-1.5">
        <label htmlFor="targetAudience" className="block text-sm font-semibold text-slate-300 ml-1">
          Target Audience
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={productData.targetAudience}
          onChange={onInputChange}
          placeholder="e.g., 'Tech enthusiasts and remote workers'"
          className="w-full bg-slate-950/50 border border-slate-700/50 text-white rounded-xl p-4 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner placeholder-slate-600 outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="keyFeatures" className="block text-sm font-semibold text-slate-300 ml-1">
          Key Features & Benefits <span className="text-slate-500 font-normal ml-1">(one per line)</span>
        </label>
        <textarea
          id="keyFeatures"
          name="keyFeatures"
          value={productData.keyFeatures}
          onChange={onInputChange}
          rows={5}
          placeholder="e.g., Temperature control (120-145°F)&#10;1.5-hour battery life&#10;Smartphone app integration"
          className="w-full bg-slate-950/50 border border-slate-700/50 text-white rounded-xl p-4 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner placeholder-slate-600 outline-none resize-y"
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex justify-center items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold py-4 px-6 rounded-xl hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
      >
        {/* Button hover shine effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
        
        {isLoading ? (
          <>
            <LoaderIcon className="animate-spin text-white w-5 h-5" />
            <span>Crafting Magic...</span>
          </>
        ) : (
          <span className="text-lg tracking-wide">Generate Description</span>
        )}
      </button>
    </form>
  );
};

export default InputForm;
