
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
    <form onSubmit={onSubmit} className="space-y-6 bg-slate-800 p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-slate-300 mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={productData.productName}
          onChange={onInputChange}
          placeholder="e.g., 'SmartMug 2.0'"
          className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <div>
        <label htmlFor="keyFeatures" className="block text-sm font-medium text-slate-300 mb-2">
          Key Features & Benefits (one per line)
        </label>
        <textarea
          id="keyFeatures"
          name="keyFeatures"
          value={productData.keyFeatures}
          onChange={onInputChange}
          rows={4}
          placeholder="e.g., Temperature control (120-145°F)\n1.5-hour battery life\nSmartphone app integration"
          className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-300 mb-2">
          Target Audience
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={productData.targetAudience}
          onChange={onInputChange}
          placeholder="e.g., 'Tech enthusiasts and busy professionals'"
          className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <LoaderIcon />
            Generating...
          </>
        ) : (
          'Generate Description'
        )}
      </button>
    </form>
  );
};

export default InputForm;
