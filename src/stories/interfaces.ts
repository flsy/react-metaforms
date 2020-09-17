import { Validation } from 'metaforms';

interface CommonProps {
  type: string;
  validation?: Validation[];
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

export interface CheckboxField extends CommonProps {
  type: 'checkbox';
  value?: boolean;
}

export interface InputProps extends CommonProps {
  type: 'text' | 'password' | 'email' | 'hidden' | 'date' | 'datetime-local';
  value?: string;
}

export interface TextField extends CommonProps {
  type: 'text';
  value?: string;
}

export interface PasswordField extends CommonProps {
  type: 'password';
  value?: string;
}

export interface NumberField extends CommonProps {
  type: 'number';
  value?: number;
  min?: number;
  max?: number;
}

export interface TextAreaField extends CommonProps {
  type: 'textarea';
  value?: string;
}

export interface GroupField<T extends { [name: string]: { type: string } }> {
  type: 'group';
  legend?: string;
  fields: T;
}

export interface ButtonField {
  type: 'button';
  label?: string;
  disabled?: boolean;
}

export interface SubmitField {
  type: 'submit';
  label?: string;
  disabled?: boolean;
}

export interface SelectField {
  type: 'select';
  value?: string;
  options?: { value: string; label?: string }[];
}
