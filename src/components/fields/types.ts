import * as React from 'react';
import { Validation, FieldType, Value } from 'metaforms';

export type UpdateActionType = {
    name: string;
    value: string;
    groupName?: string;
};

export type ValidateActionType = {
    name: string;
};

export type UpdateAndValidateActionType = {
    name: string;
    value: Value;
    groupName?: string;
};

export type CommonProps = {
    name: string;

    validation?: Validation[];
    label?: string;
    disabled?: boolean;
    errorMessage?: string;
    groupName?: string;
    placeholder?: string;
    fields?: FieldType[];
};

export interface CheckboxProps extends CommonProps {
    type: 'checkbox';
    value?: boolean;
}

export interface SelectProps extends CommonProps {
    type: 'select';
    value?: string;
    options: string[];
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

export interface GroupProps extends CommonProps {
    type: 'group';
    name: string;
    value?: string;
    legend?: string;
    fields: FieldType[];
}

export interface CustomComponentProps extends CommonProps {
    name: string;
    type: string;
    value?: Value;
    legend?: string;
    fields?: FieldType[];
    update: (object: UpdateActionType) => void;
    validate: (o: ValidateActionType) => void;
    updateAndValidate: (o: UpdateAndValidateActionType) => void;
    onButtonClick: () => void;
    children?: (any | null)[];
    key: string;
}

export interface InputPropsFinal extends InputProps {
    update: (object: UpdateActionType) => void;
    validate: (o: ValidateActionType) => void;
}

export interface TextAreaPropsFinal extends TextAreaProps {
    update: (object: UpdateActionType) => void;
    validate: (o: ValidateActionType) => void;
}

export interface SelectPropsFinal extends SelectProps {
    updateAndValidate: (o: UpdateAndValidateActionType) => void;
}

export interface CheckBoxPropsFinal extends CheckboxProps {
    updateAndValidate: (o: UpdateAndValidateActionType) => void;
}

export interface ButtonPropsFinal extends ButtonProps {
    onButtonClick: () => void;
}

export interface GroupPropsFinal {
    type: 'group';
    name: string;
    legend?: string;
    children: React.ReactNode;
}
