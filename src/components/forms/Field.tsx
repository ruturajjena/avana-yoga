'use client';

import { useId, type HTMLInputTypeAttribute } from 'react';
import { cn } from '@/lib/utils';

type FieldProps = {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  as?: 'input' | 'textarea' | 'select';
  options?: readonly string[];
  required?: boolean;
  error?: string;
  hint?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
};

export function Field({
  label,
  name,
  type = 'text',
  as = 'input',
  options = [],
  required = false,
  error,
  hint,
  defaultValue,
  autoComplete,
  placeholder,
  rows = 5,
  className,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const common = {
    id,
    name,
    required,
    defaultValue,
    autoComplete,
    className: 'field__input',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  } as const;

  return (
    <div className={cn('field', className)}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      {as === 'textarea' ? (
        <textarea {...common} rows={rows} placeholder={placeholder} />
      ) : as === 'select' ? (
        <select {...common} key={defaultValue ?? 'empty'}>
          <option value="">Select one</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={type} placeholder={placeholder} />
      )}
      {hint ? (
        <p id={hintId} className="text-sm opacity-70">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormStatus({ id, message, tone = 'light' }: { id: string; message?: string; tone?: 'light' | 'dark' }) {
  return (
    <p id={id} role="status" aria-live="polite" className={cn('max-w-[48ch] text-[0.95rem]', message ? (tone === 'dark' ? 'text-cream' : 'text-error') : 'sr-only')}>
      {message}
    </p>
  );
}
