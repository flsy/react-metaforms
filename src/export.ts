import { ButtonProps, CheckboxProps, GroupProps, InputProps, SelectProps, SubmitProps, TextAreaProps } from './components/fields/types';

export { default } from './components/Form';

// export { FieldType } from './components/fields/types';

export type FieldType = InputProps | TextAreaProps | CheckboxProps | SelectProps | ButtonProps | SubmitProps | GroupProps;

export {
//     validateField,
//     isFormValid,
    getFormData,
//     setValue,
//     setErrorMessage,
//     removeField,
//     setFieldErrorMessage,
    isRequired,
    getFieldValue,
    setFieldValue,
    validateForm,
    hasError,
} from './utils/utils';

export { FormState } from './state';
export * from './types';
