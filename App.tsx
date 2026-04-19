import React, { useState, useCallback } from 'react';
import type { ProductData } from './types';
import { generateDescription } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    productName: '',
    keyFeatures: '',
    targetAudience: '',
  });
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productData.productName || !productData.keyFeatures || !productData.targetAudience) {
      setError('Please fill in all fields to generate a description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedDescription('');

    try {
      const description = await generateDescription(productData);
      setGeneratedDescription(description);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [productData]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-slate-950 flex flex-col items-center p-4 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-3xl mx-auto z-10">
        <Header />
        <main className="mt-8 space-y-8">
          <InputForm
            productData={productData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResultDisplay
            description={generatedDescription}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
