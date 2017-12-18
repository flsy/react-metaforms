import {
    compose, curry, map, set, head, find, prop, propEq, lensProp, forEach
} from 'ramda';
import { FormData } from '../types';
import { Validation } from '../validation/types';
import {
    FieldType, UpdateActionType, UpdateAndValidateActionType,
    ValidateActionType
} from '../components/fields/types';
import validateField from '../validation/validate';

const valueLens = lensProp('value');
const errorMessageLens = lensProp('errorMessage');

export const isRequired = (validationRules: Validation[] = []): boolean => !!find(propEq('type', 'required'), validationRules);

export const hasError = (fields: FieldType[]): boolean =>
    !!find((field => (field.fields) ? hasError(field.fields) : !!prop('errorMessage', field)), fields);

const hasFieldError = (field: FieldType): boolean => !!prop('errorMessage', field);

const findFieldWithError = (fields: FieldType[]) => find(hasFieldError, fields);

export const shouldComponentFocus = (fields: FieldType[], name: string): boolean => {
    const errorField = findFieldWithError(fields);

    if (errorField && errorField.name === name) {
        return true;
    }

    const firstField = head(fields);
    return firstField ? firstField.name === name : false;
};

export const getFormData = (fields: FieldType[]): FormData => {
    let formData = {};

    forEach(field => {
        if (field.fields) {
            formData = { ...formData, ...getFormData(field.fields) };
        } else {
            formData[field.name] = field.value || null;
        }
    }, fields);

    return formData;
};

const clearField = (field: FieldType): FieldType => {
    if (propEq('errorMessage', null, field)) {
        const { errorMessage, ...rest } = field;
        return rest;
    }

    return field;
};

export const validateForm = (fields: FieldType[]): FieldType[] => {
    const formData = getFormData(fields);

    return map((field) => {
            const error = validateField(formData, field);
            if (field.fields) {
                return {...field, fields: validateForm(field.fields) };
            }

            return compose(clearField, set(errorMessageLens, error))(field);
        }, fields);
};

const updateField = curry((name: string, fn: <Value>(value: Value) => Value, fields: FieldType[]): FieldType[] =>
    map((field) => {
        if (field.fields) {
            return {...field, fields: updateField(name, fn, field.fields)};
        }

        if (field.name === name) {
            return fn(field);
        }

        return field;
    }, fields));

export const setFieldValue = curry((name: string, value: string, fields: FieldType[]): FieldType[] => updateField(name, set(valueLens, value), fields));

export const update = ({ value, name, groupName }: UpdateActionType, fields: FieldType[]): FieldType[] =>
    map(field => {
        if (groupName && field.type === 'group') {
            return { ...field, fields: update({ value, name, groupName }, field.fields) };
        } else if (field.name === name) {
            return { ...field, value } as FieldType;
        } else {
            return field;
        }
    }, fields);

export const validate = ({ name }: ValidateActionType, fields: FieldType[]): FieldType[] => {
    const formData = getFormData(fields);
    return map((field) => {
        if (field.type === 'group') {
            return {...field, fields: validate({ name }, field.fields) };
        }
        if (field.name === name) {
            const errorMessage = validateField(formData, field);
            return {...field, errorMessage } as FieldType;
        }

        return field;
    }, fields);
};

export const updateAndValidate = ({ name, value, groupName }: UpdateAndValidateActionType, fields: FieldType[]): FieldType[] => {
    const formData = getFormData(fields);
    return map((field) => {
        if (groupName && field.type === 'group') {
            return { ...field, fields: updateAndValidate({ name, value, groupName }, field.fields) };
        } else if (field.name === name) {
            const errorMessage = validateField(formData, {...field, value } as FieldType);
            return { ...field, value, errorMessage } as FieldType;
        } else {
            return field;
        }
    }, fields);
};
