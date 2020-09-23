import { Validation } from 'metaforms';

export { default } from './components/Form';
export * from 'metaforms';

export interface GroupFieldProps<Fields> {
  legend?: string;
  fields?: Fields;
}

export interface FieldProps<Value> {
  name: string;
  type: string;
  value?: Value;
  label?: string;
  errorMessage?: string;
  validation?: Validation[];
  placeholder?: string;
  update: (path: string | string[], value: Value) => void;
  validate: (path: string | string[]) => void;
  updateAndValidate: (path: string | string[], value: any) => void;
}
