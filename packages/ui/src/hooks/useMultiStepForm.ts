"use client"
import { useState, useCallback, useMemo } from 'react';
import { FormDataType, MultiStepFormConfig, StepConfig, UseMultiStepFormReturn } from '../types';
import { useForm } from './useForm';


export const useMultiStepForm = (
  config: MultiStepFormConfig,
  onSubmit: (data: FormDataType) => Promise<void> | void,
  onStepChange?: (step: number, stepConfig: StepConfig) => void,
  initialData?: Partial<FormDataType>
): UseMultiStepFormReturn => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Flatten all fields from all steps for the base useForm hook
  const allFields = useMemo(() => {
    return config.steps.flatMap(step => step.fields);
  }, [config.steps]);

  // Create a flattened config for the base useForm hook
  const flattenedConfig = useMemo(() => ({
    fields: allFields,
    sectionId: config.sectionId,
    title: config.title ?? '',
    description: config.description,
    submitButton: config.submitButton,
    layout: config.layout,
    gridCols: config.gridCols,
    className: config.className
  }), [config, allFields]);

  const formMethods = useForm(flattenedConfig, onSubmit, initialData);

  const currentStepConfig: StepConfig = config.steps[currentStep] || config.steps[0]!; 
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === config.steps.length - 1;
  const progress = ((currentStep + 1) / config.steps.length) * 100;

  // Validate current step fields
  const validateCurrentStep = useCallback((): boolean => {
    if (!currentStepConfig || currentStepConfig.validation === 'disabled') {
      return true;
    }

    const stepFieldNames = currentStepConfig.fields.map(field => field.name);
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    stepFieldNames.forEach(fieldName => {
      const fieldValue = formMethods.data[fieldName];
      if (fieldValue !== undefined) {
        const error = formMethods.validateField(fieldName, fieldValue);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    if (!isValid) {
      formMethods.setErrors({ ...formMethods.errors, ...newErrors });
    }

    return isValid;
  }, [currentStepConfig, formMethods]);

  // Check if a step has any errors
  const stepErrors = useMemo(() => {
    const errors: { [stepId: string]: boolean } = {};
    
    config.steps.forEach((step) => {
      const stepFieldNames = step.fields.map(field => field.name);
      const hasErrors = stepFieldNames.some(fieldName => 
        formMethods.errors[fieldName]
      );
      errors[step.id] = hasErrors;
    });

    return errors;
  }, [config.steps, formMethods.errors]);

  const canGoToStep = useCallback((step: number): boolean => {
    if (config.navigation?.allowSkipSteps) {
      return true;
    }
    
    // Can only go to completed steps or the next immediate step
    return step <= Math.max(...Array.from(completedSteps)) + 1 && step >= 0 && step < config.steps.length;
  }, [config.navigation?.allowSkipSteps, completedSteps, config.steps.length]);

  const nextStep = useCallback(() => {
    if (isLastStep) return;

    const shouldValidate = currentStepConfig?.validation === 'onNext' || 
                          currentStepConfig?.validation === undefined;

    if (shouldValidate && !validateCurrentStep()) {
      return;
    }

    const newStep = currentStep + 1;
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setCurrentStep(newStep);
    
    if (onStepChange && config.steps[newStep]) {
      onStepChange(newStep, config.steps[newStep]);
    }

    // Clear errors for the current step when moving forward
    const currentStepFieldNames = currentStepConfig?.fields?.map(field => field.name) || [];
    const updatedErrors = { ...formMethods.errors };
    currentStepFieldNames.forEach(fieldName => {
      delete updatedErrors[fieldName];
    });
    formMethods.setErrors(updatedErrors);
  }, [
    isLastStep, 
    currentStep, 
    currentStepConfig, 
    validateCurrentStep, 
    onStepChange, 
    config.steps,
    formMethods
  ]);

  const prevStep = useCallback(() => {
    if (isFirstStep) return;
    
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    
    if (onStepChange && config.steps[newStep]) {
      onStepChange(newStep, config.steps[newStep]);
    }
  }, [isFirstStep, currentStep, onStepChange, config.steps]);

  const goToStep = useCallback((step: number) => {
    if (!canGoToStep(step)) return;
    
    setCurrentStep(step);
    
    if (onStepChange && config.steps[step]) {
      onStepChange(step, config.steps[step]);
    }
  }, [canGoToStep, onStepChange, config.steps]);

  const handleStepSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLastStep) {
      // Final submission - validate all steps if needed
      if (!formMethods.validateForm()) {
        return;
      }
      
      await formMethods.handleSubmit(e);
    } else {
      nextStep();
    }
  }, [isLastStep, formMethods, nextStep]);

  return {
    ...formMethods,
    currentStep,
    currentStepConfig,
    isFirstStep,
    isLastStep,
    progress,
    nextStep,
    prevStep,
    goToStep,
    handleStepSubmit,
    canGoToStep,
    stepErrors,
    completedSteps,
  };
};