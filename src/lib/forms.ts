export type FieldErrors = Partial<Record<string, string>>;

export type FormState = {
  status: 'idle' | 'error';
  message?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: 'idle' };

export function readField(formData: FormData, key: string, max = 2000) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
export const RATE_LIMIT_MESSAGE =
  'We have received several messages from you in a short time. Please try again in a few minutes, or email info@avanayoga.com.';

export const DELIVERY_FAILED_MESSAGE =
  'Your message could not be sent just now. Please email info@avanayoga.com or call +44 7514196466. We would love to hear from you.';
