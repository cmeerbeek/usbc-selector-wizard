import React, { useState } from 'react';
import { Zap, Database, Monitor, ChevronRight } from 'lucide-react';
import { WizardStep } from './components/WizardStep';
import { ProductCard } from './components/ProductCard';
import { deviceOptions, peripheralOptions } from './data';
import { useProducts } from './hooks/useProducts';

function App() {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPeripheral, setSelectedPeripheral] = useState('');

  const { products, loading, error } = useProducts(
    selectedBrand,
    selectedModel,
    selectedPeripheral
  );

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      // Clear the selection for the current step when going back
      if (step === 4) setSelectedPeripheral('');
      if (step === 3) setSelectedModel('');
      if (step === 2) setSelectedBrand('');
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedPeripheral('');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <WizardStep
            title="Select Your Device Brand"
            description="Choose the brand of your USB-C device"
            currentStep={1}
            totalSteps={4}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deviceOptions.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => {
                    setSelectedBrand(brand.id);
                    handleNext();
                  }}
                  className={`p-4 rounded-lg border-2 text-left hover:border-blue-500 transition-colors ${
                    selectedBrand === brand.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{brand.name}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </WizardStep>
        );

      case 2:
        const selectedBrandData = deviceOptions.find((b) => b.id === selectedBrand);
        return (
          <WizardStep
            title="Select Your Device Model"
            description="Choose your specific device model"
            currentStep={2}
            totalSteps={4}
            onBack={handleBack}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedBrandData?.models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    handleNext();
                  }}
                  className={`p-4 rounded-lg border-2 text-left hover:border-blue-500 transition-colors ${
                    selectedModel === model.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{model.name}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </WizardStep>
        );

      case 3:
        return (
          <WizardStep
            title="What do you want to do?"
            description="Select your USB-C use case"
            currentStep={3}
            totalSteps={4}
            onBack={handleBack}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {peripheralOptions.map((peripheral) => {
                const Icon = peripheral.icon === 'Zap' ? Zap : 
                           peripheral.icon === 'Database' ? Database : Monitor;
                return (
                  <button
                    key={peripheral.id}
                    onClick={() => {
                      setSelectedPeripheral(peripheral.id);
                      handleNext();
                    }}
                    className={`p-6 rounded-lg border-2 text-left hover:border-blue-500 transition-colors ${
                      selectedPeripheral === peripheral.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <Icon className="w-8 h-8 mb-3 text-blue-500" />
                    <h3 className="font-medium mb-1">{peripheral.name}</h3>
                    <p className="text-sm text-gray-600">{peripheral.description}</p>
                  </button>
                );
              })}
            </div>
          </WizardStep>
        );

      case 4:
        return (
          <WizardStep
            title="Recommended Products"
            description="Here are the best USB-C products for your needs"
            currentStep={4}
            totalSteps={4}
            onBack={handleBack}
          >
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading recommendations...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <p>Error: {error}</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No recommendations found for your selection.
                </p>
              </div>
            )}
            <button
              onClick={handleReset}
              className="mt-8 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Over
            </button>
          </WizardStep>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            USB-C Cable & Charger Finder
          </h1>
          <p className="mt-2 text-gray-600">
            Find the perfect USB-C solution for your device
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderStep()}
      </main>
    </div>
  );
}

export default App;