import { Validation } from '../../validation/types';

export type UpdateActionType = {
    name: string;
    value: string;
};

export type ValidateActionType = {
    name: string;
    groupName?: string;
};

export type UpdateAndValidateActionType = {
    name: string;
    value: boolean;
    groupName?: string;
};

export type CommonProps = {
    name: string;

    validation?: Validation[];
    shouldFocus?: boolean;
    label?: string;
    disabled?: boolean;
    errorMessage?: string;
    groupName?: string;
    placeholder?: string;
};

export interface CheckboxProps extends CommonProps {
    type: 'checkbox';
    value?: boolean;
}

export interface InputProps extends CommonProps {
    type: 'text' | 'password' | 'email';
    value?: string;
}

export interface TextAreaProps extends CommonProps {
    type: 'textarea';
    value?: string;
}

export interface ButtonProps extends CommonProps {
    type: 'button';
    value?: string;
    label: string;
}

export interface SubmitProps extends CommonProps {
    type: 'submit';
    value?: string;
}

export interface CustomComponentProps {
    name: string;
    type: string;
    value: string;
    update: (object: UpdateActionType) => void;
    validate: (o: ValidateActionType) => void;
    updateAndValidate: (o: UpdateAndValidateActionType) => void;
}

export type FieldType = InputProps | TextAreaProps | CheckboxProps | ButtonProps | SubmitProps;

export interface InputPropsFinal extends InputProps {
    update: (object: UpdateActionType) => void;
    validate: (o: ValidateActionType) => void;
}

export interface TextAreaPropsFinal extends TextAreaProps {
    update: (object: UpdateActionType) => void;
    validate: (o: ValidateActionType) => void;
}

export interface CheckBoxPropsFinal extends CheckboxProps {
    updateAndValidate: (o: UpdateAndValidateActionType) => void;
}

export interface ButtonPropsFinal extends ButtonProps {
    onButtonClick: () => void;
}
