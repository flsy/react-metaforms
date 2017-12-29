import * as R from 'ramda';
import { FormData } from '../types';
import { Validation } from '../validation/types';
import {
    FieldType, UpdateActionType, UpdateAndValidateActionType,
    ValidateActionType
} from '../components/fields/types';
import validateField from '../validation/validate';

const valueLens = R.lensProp('value');
const errorMessageLens = R.lensProp('errorMessage');

export const isRequired = (validationRules: Validation[] = []): boolean => !!R.find(R.propEq('type', 'required'), validationRules);

export const hasError = (fields: FieldType[]): boolean =>
    !!R.find((field => (field.fields) ? hasError(field.fields) : !!R.prop('errorMessage', field)), fields);

const hasFieldError = (field: FieldType): boolean => !!R.prop('errorMessage', field);

const findFieldWithError = (fields: FieldType[]) => R.find(hasFieldError, fields);

export const shouldComponentFocus = (fields: FieldType[], name: string): boolean => {
    const errorField = findFieldWithError(fields);

    if (errorField && errorField.name === name) {
        return true;
    }

    const firstField = R.head(fields);
    return firstField ? firstField.name === name : false;
};

export const getFormData = (fields: FieldType[]): FormData =>
    R.reduce((all, field) => {
        if (field.fields) {
            return { ...all, ...getFormData(field.fields) };
        }

        return R.assoc(field.name, field.value || null, all);
    },       {}, fields);

const clearField = (field: FieldType): FieldType => {
    if (R.propEq('errorMessage', null, field)) {
        const { errorMessage, ...rest } = field;
        return rest;
    }

    return field;
};

export const validateForm = (fields: FieldType[]): FieldType[] => {
    const formData = getFormData(fields);

    return R.map((field) => {
            const error = validateField(formData, field);
            if (field.fields) {
                return {...field, fields: validateForm(field.fields) };
            }

            return R.compose(clearField, R.set(errorMessageLens, error))(field);
        },       fields);
};

const updateField = R.curry((name: string, fn: <Value>(value: Value) => Value, fields: FieldType[]): FieldType[] =>
    R.map((field) => {
        if (field.fields) {
            return {...field, fields: updateField(name, fn, field.fields)};
        }

        if (field.name === name) {
            return fn(field);
        }

        return field;
    },    fields));

export const getFieldValue = R.curry((name: string, fields: FieldType[]): string | boolean | null =>
    R.view(R.lensProp(name), getFormData(fields)) || null);

export const setFieldValue = R.curry((name: string, value: string, fields: FieldType[]): FieldType[] => updateField(name, R.set(valueLens, value), fields));

export const update = ({ value, name, groupName }: UpdateActionType, fields: FieldType[]): FieldType[] =>
    R.map(field => {
        if (groupName && field.type === 'group') {
            return { ...field, fields: update({ value, name, groupName }, field.fields) };
        } else if (field.name === name) {
            return { ...field, value } as FieldType;
        } else {
            return field;
        }
    },    fields);

export const validate = ({ name }: ValidateActionType, fields: FieldType[]): FieldType[] => {
    const formData = getFormData(fields);
    return R.map((field) => {
        if (field.type === 'group') {
            return {...field, fields: validate({ name }, field.fields) };
        }
        if (field.name === name) {
            const errorMessage = validateField(formData, field);
            return {...field, errorMessage } as FieldType;
        }

        return field;
    },           fields);
};

export const updateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType, fields: FieldType[]): FieldType[] => {
    const formData = getFormData(fields);
    return R.map((field) => {
        if (groupName && field.type === 'group') {
            return { ...field, fields: updateAndValidate({ name, value, groupName }, field.fields) };
        } else if (field.name === name) {
            const errorMessage = validateField(formData, {...field, value } as FieldType);
            return { ...field, value, errorMessage } as FieldType;
        } else {
            return field;
        }
    },           fields);
};
