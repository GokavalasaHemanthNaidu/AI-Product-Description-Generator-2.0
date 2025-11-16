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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main>
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
