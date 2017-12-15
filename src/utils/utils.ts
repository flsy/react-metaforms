import {
    compose, curry, map, set, head, find, prop, propEq, lensProp, cond, T, identity, forEach
} from 'ramda';
import { FormData } from '../types';
import { Validation } from '../validation/types';
import { FieldType } from '../components/fields/types';
import { validateField } from '../validation/validate';

const valueLens = lensProp('value');
const errorMessageLens = lensProp('errorMessage');

export const isRequired = (validationRules: Validation[] = []): boolean => !!find(propEq('type', 'required'), validationRules);

export const hasError = (fields: FieldType[]): boolean => !!find(prop('errorMessage'), fields);

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
    const formData = {};

    forEach(field => {
        formData[field.name] = field.value || null;
    },      fields);

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

            return compose(clearField, set(errorMessageLens, error))(field);
        },     fields);
};

const updateField = curry((name: string, fn: <Value>(value: Value) => Value, fields: FieldType[]) => map(cond([
    [propEq('name', name), fn],
    [T, identity],
]),                                                                                                      fields));

export const setFieldValue = curry((name: string, value: string, fields: FieldType[]): FieldType[] => updateField(name, set(valueLens, value), fields));
