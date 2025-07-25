"use client";
import { useState, useCallback } from "react";
import {
  FormConfig,
  FormDataType,
  FormErrors,
  UseFormReturn,
} from "@repo/ui/types";

export const useForm = (
  config: FormConfig,
  onSubmit: (data: FormDataType) => Promise<void> | void,
  initialData?: Partial<FormDataType>,
): UseFormReturn => {
  const [data, setData] = useState<FormDataType>(() => {
    const initialFormData: FormDataType = {};
    config.fields.forEach((field) => {
      if (initialData && field.name in initialData) {
        initialFormData[field.name] = initialData[field.name] as
          | string
          | number
          | boolean
          | File
          | null;
      } else {
        switch (field.type) {
          case "checkbox":
            initialFormData[field.name] = false;
            break;
          case "number":
            initialFormData[field.name] = 0;
            break;
          default:
            initialFormData[field.name] = "";
        }
      }
    });
    return initialFormData;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (
      name: string,
      value: string | number | boolean | File | null,
    ): string | null => {
      const field = config.fields.find((f) => f.name === name);
      if (!field) return null;

      // Required validation
      if (field.required) {
        if (field.type === "checkbox") {
          if (value !== true) {
            return `${field.label} is required`;
          }
        } else {
          if (
            value === null ||
            value === undefined ||
            value === "" ||
            (typeof value === "string" && value.trim() === "")
          ) {
            return `${field.label} is required`;
          }
        }
      }

      // Skip other validations if value is empty and not required
      if (!field.required) {
        if (value === "" || value === null || value === undefined) {
          return null;
        }
        if (field.type === "number" && value === 0) {
          return null;
        }
      }

      // Type-specific validations
      if (typeof value === "string") {
        if (
          field.validation?.minLength &&
          value.length < field.validation.minLength
        ) {
          return `${field.label} must be at least ${field.validation.minLength} characters`;
        }
        if (
          field.validation?.maxLength &&
          value.length > field.validation.maxLength
        ) {
          return `${field.label} must be no more than ${field.validation.maxLength} characters`;
        }
        if (field.validation?.pattern) {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(value)) {
            return `${field.label} format is invalid`;
          }
        }
        if (field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return `${field.label} must be a valid email address`;
          }
        }
      }

      if (typeof value === "number") {
        if (
          field.validation?.min !== undefined &&
          value < field.validation.min
        ) {
          return `${field.label} must be at least ${field.validation.min}`;
        }
        if (
          field.validation?.max !== undefined &&
          value > field.validation.max
        ) {
          return `${field.label} must be no more than ${field.validation.max}`;
        }
      }

      return null;
    },
    [config.fields],
  );

  const handleChange = useCallback(
    (name: string, value: string | number | boolean | File | null) => {
      setData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    config.fields.forEach((field) => {
      const fieldValue = data[field.name];
      if (fieldValue !== undefined) {
        const error = validateField(field.name, fieldValue);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      }
    });
    setErrors(newErrors);
    return isValid;
  }, [config.fields, data, validateField]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // Start submitting immediately
      setIsSubmitting(true);
      const isValid = validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }
      try {
        await onSubmit(data);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [data, onSubmit, validateForm],
  );

  const handleReset = useCallback(() => {
    const resetData: FormDataType = {};
    config.fields.forEach((field) => {
      switch (field.type) {
        case "checkbox":
          resetData[field.name] = false;
          break;
        case "number":
          resetData[field.name] = 0;
          break;
        default:
          resetData[field.name] = "";
      }
    });
    setData(resetData);
    setErrors({});
  }, [config.fields]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    data,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    setErrors,
    clearErrors,
    validateField,
    validateForm,
  };
};
