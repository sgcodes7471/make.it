"use client"
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Step, StepType } from '../types';
import { useState } from 'react';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {

  const [onlyShell , showOnlyShell] = useState<Boolean>(false);

  function handleCommandsToggle() {
    showOnlyShell(onlyShell => !onlyShell)
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
      <div className='flex justify-between'>
        <h2 className="text-lg font-semibold mb-4 text-gray-100">Build Steps</h2>
         <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" onClick={() => {
            handleCommandsToggle()
          }}/>

          <div className=" absolute w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>

          <div className="absolute mt-2 ml-1 w-4 h-4 bg-white rounded-full transform transition-transform peer-checked:translate-x-5 -translate-y-1"></div>
        </label>
    
      </div>
      
      <div className="space-y-4">
        {steps.filter(step => {
          return !onlyShell || step.type === StepType.RunScript
        }).map((step) => (
          <div
            key={step.id}
            className={`p-1 rounded-lg cursor-pointer transition-colors ${
              currentStep === step.id
                ? 'bg-gray-800 border border-gray-700'
                : 'hover:bg-gray-800'
            }`}
            onClick={() => onStepClick(step.id)}
          >
            <div className="flex items-center gap-2">
              {step.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : step.status === 'in-progress' ? (
                <Clock className="w-5 h-5 text-blue-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
              
              <h3 className="font-medium text-gray-100">{step.title}</h3>
            </div>
            {
                currentStep == step.id && step.type === StepType.RunScript &&
                <p className="text-sm text-gray-400 mt-2">{step.code}</p>
              }
            <p className="text-sm text-gray-400 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}