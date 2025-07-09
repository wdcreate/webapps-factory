import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { FormFieldConfig } from '@repo/ui/types/index.js';
import React from 'react';


interface FormFieldProps {
  field: FormFieldConfig;
  value: string | number | boolean | File | null;
  error?: string;
  onChange: (name: string, value: string | number | boolean | File | null) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, error, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(field.name, newValue);
  };

  const handleCheckboxChange = (checked: boolean) => {
    onChange(field.name, checked);
  };

  const handleSelectChange = (newValue: string) => {
    onChange(field.name, field.type === 'number' ? parseFloat(newValue) || 0 : newValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(field.name, file);
  };

  const renderField = () => {
    const baseProps = {
      id: field.name,
      disabled: field.disabled,
      className: field.className
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...baseProps}
            placeholder={field.placeholder}
            value={value as string}
            onChange={handleInputChange}
          />
        );

      case 'select':
        return (
          <Select onValueChange={handleSelectChange} value={value as string}>
            <SelectTrigger {...baseProps}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              {...baseProps}
              checked={value as boolean}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor={field.name}>{field.label}</Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup value={value as string} onValueChange={(newValue) => onChange(field.name, newValue)}>
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`${field.name}-${option.value}`} />
                <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'file':
        return (
          <Input
            {...baseProps}
            type="file"
            onChange={handleFileChange}
          />
        );

      default:
        return (
          <Input
            {...baseProps}
            type={field.type}
            placeholder={field.placeholder}
            value={value as string | number}
            onChange={handleInputChange}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${field.className || ''}`}>
      {field.type !== 'checkbox' && (
        <Label htmlFor={field.name} className={field.required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>
          {field.label}
        </Label>
      )}
      {renderField()}
      {field.description && (
        <p className="text-sm text-muted-foreground">{field.description}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};