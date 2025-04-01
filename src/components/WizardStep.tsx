import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface WizardStepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export function WizardStep({ 
  title, 
  description, 
  children, 
  currentStep, 
  totalSteps,
  onBack 
}: WizardStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <button
                onClick={onBack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}