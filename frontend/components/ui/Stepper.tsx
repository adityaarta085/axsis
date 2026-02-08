import React from 'react';
import { clsx } from 'clsx';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index + 1;
        const isActive = currentStep === index + 1;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all',
                  isCompleted ? 'bg-green-500 text-white' :
                  isActive ? 'bg-axis-purple text-white ring-4 ring-axis-purple/20' :
                  'bg-axis-gray-200 text-axis-gray-500'
                )}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className={clsx(
                'mt-2 text-xs font-medium',
                isActive ? 'text-axis-purple' : 'text-axis-gray-500'
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={clsx(
                'h-0.5 flex-1 -mt-6 mx-2',
                isCompleted ? 'bg-green-500' : 'bg-axis-gray-200'
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
