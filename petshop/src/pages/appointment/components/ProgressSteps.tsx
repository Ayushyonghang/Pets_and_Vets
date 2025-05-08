import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <nav className="py-6 px-4 overflow-x-auto">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="flex items-center relative">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold z-10 transition-all
                    ${
                      isCompleted
                        ? "bg-primary-600 text-white"
                        : isCurrent
                        ? "bg-primary-100 border-2 border-primary-600 text-primary-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>

                <div className="hidden md:block ml-3">
                  <div
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent
                        ? "text-primary-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </div>
                </div>
              </div>

              {!isLast && (
                <div
                  className={`w-12 md:w-20 h-0.5 mx-2 ${
                    isCompleted ? "bg-primary-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="md:hidden mt-2 flex justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`text-xs font-medium ${
              step.id <= currentStep ? "text-primary-600" : "text-gray-500"
            }`}
            style={{ width: `${100 / steps.length}%` }}
          >
            {step.name}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default ProgressSteps;
