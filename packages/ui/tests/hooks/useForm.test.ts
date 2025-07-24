import type { FormConfig, FormDataType, FormErrors } from '@repo/ui/types';
import { useForm } from '@repo/ui/hooks/useForm';
import { renderHook, act } from '@testing-library/react';

describe('useForm Hook', () => {
  const config: FormConfig = {
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true, validation: { minLength: 3, maxLength: 10 } },
      { name: 'age', label: 'Age', type: 'number', required: false, validation: { min: 18, max: 65 } },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'agree', label: 'Terms', type: 'checkbox', required: true }
    ]
  };

  const promiseTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  it('initializes default form data correctly', () => {
    const { result } = renderHook(() => useForm(config, vi.fn()));
    const { data, errors, isSubmitting } = result.current;

    expect(data).toEqual({ username: '', age: 0, email: '', agree: false });
    expect(errors).toEqual({});
    expect(isSubmitting).toBe(false);
  });

  it('initializes with provided initialData', () => {
    const initialData: Partial<FormDataType> = { username: 'john', age: 30, agree: true };
    const { result } = renderHook(() => useForm(config, vi.fn(), initialData));

    expect(result.current.data).toMatchObject({ username: 'john', age: 30, email: '', agree: true });
  });

  describe('validateField', () => {
    it('returns error for required fields when empty', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      const usernameError = result.current.validateField('username', '');
      expect(usernameError).toBe('Username is required');

      const emailError = result.current.validateField('email', '');
      expect(emailError).toBe('Email is required');

      const agreeError = result.current.validateField('agree', false);
      expect(agreeError).toBe('Terms is required');
    });

    it('validates string length and returns correct messages', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      const short = result.current.validateField('username', 'ab');
      expect(short).toBe('Username must be at least 3 characters');

      const long = result.current.validateField('username', 'a'.repeat(11));
      expect(long).toBe('Username must be no more than 10 characters');
    });

    it('validates email format', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      const invalid = result.current.validateField('email', 'test@');
      expect(invalid).toBe('Email must be a valid email address');
    });

    it('validates number range', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      const low = result.current.validateField('age', 17);
      expect(low).toBe('Age must be at least 18');

      const high = result.current.validateField('age', 66);
      expect(high).toBe('Age must be no more than 65');
    });

    it('returns null for valid values', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      expect(result.current.validateField('username', 'valid')).toBeNull();
      expect(result.current.validateField('age', 25)).toBeNull();
      expect(result.current.validateField('email', 'test@example.com')).toBeNull();
      expect(result.current.validateField('agree', true)).toBeNull();
    });
  });

  describe('handleChange and validateForm', () => {
    it('updates data and clears errors on change', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));

      // set an initial error
      act(() => {
        result.current.setErrors({ username: 'Some error' });
      });
      expect(result.current.errors.username).toBe('Some error');

      // change field value
      act(() => {
        result.current.handleChange('username', 'newUser');
      });

      expect(result.current.data.username).toBe('newUser');
      expect(result.current.errors.username).toBeUndefined();
    });

    it('validateForm sets all errors and returns validity', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));

      // Initially invalid
      act(() => {
        const valid = result.current.validateForm();
        expect(valid).toBe(false);
      });
      expect(Object.keys(result.current.errors)).toEqual(expect.arrayContaining(['username', 'email', 'agree']));

      // Fill valid data
      act(() => {
        result.current.handleChange('username', 'goodName');
        result.current.handleChange('email', 'ok@example.com');
        result.current.handleChange('agree', true);
      });
      act(() => {
        const valid = result.current.validateForm();
        expect(valid).toBe(true);
      });
      expect(result.current.errors).toEqual({});
    });
  });

  describe('handleSubmit', () => {
    it('does not call onSubmit when form invalid', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useForm(config, onSubmit));

      await act(async () => {
        await result.current.handleSubmit({ preventDefault: () => {} } as any);
      });

      expect(onSubmit).not.toHaveBeenCalled();
      expect(result.current.isSubmitting).toBe(false);
    });

    it('calls onSubmit with data and toggles isSubmitting', async () => {
      const onSubmit = vi.fn().mockImplementation(async () => promiseTimeout(10));
      const { result } = renderHook(() => useForm(config, onSubmit));

      // Fill valid data
      act(() => {
        result.current.handleChange('username', 'goodName');
        result.current.handleChange('email', 'ok@example.com');
        result.current.handleChange('agree', true);
      });

      await act(async () => {
        const promise = result.current.handleSubmit({ preventDefault: () => {} } as any);
        expect(result.current.isSubmitting).toBe(false);
        await promise;
      });

      expect(onSubmit).toHaveBeenCalledWith(result.current.data);
      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('handleReset and clearErrors', () => {
    it('resets data and errors', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      act(() => {
        result.current.handleChange('username', 'x');
        result.current.setErrors({ username: 'Error' });
      });
      expect(result.current.data.username).toBe('x');
      expect(result.current.errors.username).toBe('Error');

      act(() => {
        result.current.handleReset();
      });
      expect(result.current.data).toEqual({ username: '', age: 0, email: '', agree: false });
      expect(result.current.errors).toEqual({});
    });

    it('clearErrors removes all errors', () => {
      const { result } = renderHook(() => useForm(config, vi.fn()));
      act(() => {
        result.current.setErrors({ a: 'x', b: 'y' });
      });
      expect(Object.keys(result.current.errors)).toHaveLength(2);

      act(() => {
        result.current.clearErrors();
      });
      expect(result.current.errors).toEqual({});
    });
  });
});
