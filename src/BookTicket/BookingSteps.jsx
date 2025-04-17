import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'Select Seat' },
  { id: 2, name: 'Choose Area' },
  { id: 3, name: 'Payment' },
];

const BookingSteps = ({ currentStep = 1 }) => {
  const validCurrentStep = currentStep ? currentStep : 1;

  return (
    <nav className="mb-8 max-w-xl mx-auto px-4">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li key={step.id} className="relative flex-1">
            <div className="flex flex-col items-center text-center">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  step.id === validCurrentStep
                    ? 'bg-blue-600 border-blue-600 ring-2 ring-white ring-offset-2 ring-offset-gray-100'
                    : step.id < validCurrentStep
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                {step.id < validCurrentStep ? (
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                ) : (
                  <span
                    className={`text-sm font-bold ${
                      step.id === validCurrentStep ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </span>
              <span
                className={`mt-2 text-sm font-medium ${
                  step.id === validCurrentStep
                    ? 'text-blue-600'
                    : step.id < validCurrentStep
                    ? 'text-gray-800'
                    : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
            {index !== 0 && (
              <div
                className="absolute inset-0 top-5 h-0.5"
                style={{ width: 'calc(100% - 2.5rem)', left: 'calc(-50% + 1.25rem)' }}
                aria-hidden="true"
              >
                <div
                  className={`h-full w-full ${
                    step.id <= validCurrentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BookingSteps;