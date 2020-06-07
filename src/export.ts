import {
  ButtonProps as ButtonPropsInternal,
  CheckboxProps as CheckboxPropsInternal,
  CommonProps,
  FieldType,
  InputProps as InputPropsInternal,
  SelectProps as SelectPropsInternal,
  TextAreaProps as TextAreaPropsInternal,
  UpdateActionType,
  UpdateAndValidateActionType,
  ValidateActionType,
  Value,
} from 'metaforms';

export { default } from './components/Form';
export * from 'metaforms';

export interface CustomComponentProps extends CommonProps {
  name: string;
  type: string;
  value?: Value;
  legend?: string;
  fields?: FieldType[];
  update: (object: UpdateActionType) => void;
  validate: (o: ValidateActionType) => void;
  updateAndValidate: (o: UpdateAndValidateActionType) => void;
  children?: (any | null)[];
  key: string;
}

export interface InputProps extends InputPropsInternal {
  update: (object: UpdateActionType) => void;
  validate: (o: ValidateActionType) => void;
}

export interface TextAreaProps extends TextAreaPropsInternal {
  update: (object: UpdateActionType) => void;
  validate: (o: ValidateActionType) => void;
}

export interface SelectProps extends SelectPropsInternal {
  updateAndValidate: (o: UpdateAndValidateActionType) => void;
}

export interface CheckBoxProps extends CheckboxPropsInternal {
  updateAndValidate: (o: UpdateAndValidateActionType) => void;
}

export interface ButtonProps extends ButtonPropsInternal {
  onButtonClick: () => void;
}
