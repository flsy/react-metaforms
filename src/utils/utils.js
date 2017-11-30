/* @flow */
import { propEq, prop, curry, set, lensProp, map, cond, T, identity, head } from 'ramda';

import validate from './validate';
import type { Name, Value, FormData, Validation, State, Field } from '../types';

export const isRequired = (validationRules: Validation[]): boolean => !!validationRules.find(propEq('type', 'required'));

const hasFieldError = (field: Field) => field.errorMessage && field.errorMessage !== '' && field.errorMessage !== null;

const findError = fields => fields.find(hasFieldError);

export const hasError = (fields: Field[]): boolean => !!findError(fields);

export const createFieldId = (name: Name, groupId: string) => (groupId ? `${name}-${groupId}` : name);

const filterOutButtons = (field: Field) => field.type !== 'button' && field.type !== 'submit';

export const findField = (name: Name, groupId: string, fields: Field[]): Field | null => {
  if (groupId) {
    const group = fields.find(propEq('name', groupId));
    if (group && group.fields) {
      return group.fields.find(propEq('name', name)) || null;
    }
    return null;
  }
  return fields.find(propEq('name', name)) || null;
};

export const shouldComponentFocus = (fields: Field[] = [], name: Name = ''): boolean => {
  const errorField = findError(fields);

  if (errorField && errorField.name === name) return true;

  const firstField = head(fields);
  return firstField !== null && firstField.name === name;
};

export const findFieldInFields = (name: Name, fields: Field[]): Field | null => {
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (name === field.name) return field;
    if (field.fields) {
      const f = field.fields.find(propEq('name', name));
      if (f) {
        return f;
      }
    }
  }

  return null;
};

export const getValue = (name: Name, state: State, fields: Field[]): Value | null => {
  if (state[name] && state[name].value !== null) {
    return state[name].value;
  }
  const field = findFieldInFields(name, fields);
  return (field && prop('value', field)) || null;
};

export const getErrorMessage = (name: Name, state: State, fields: Field[]): string => {
  const saved = prop(name, state);
  if (saved && hasFieldError(saved)) {
    return prop('errorMessage', saved);
  }
  const field = fields.find(propEq('name', name));
  return (field && prop('errorMessage', field)) || '';
};

const flattenFields = (fields: Field[]) => {
  const flattened = [];
  fields.forEach((field) => {
    if (field.fields) {
      field.fields.forEach((nestedField) => {
        flattened.push(nestedField);
      });
    } else {
      flattened.push(field);
    }
  });
  return flattened;
};

export const getFormData = (fields: Field[]): FormData => {
  const formData = {};

  flattenFields(fields)
    .filter(filterOutButtons)
    .forEach((field) => {
      formData[field.name] = field.value;
    });

  return formData;
};

const getFormDataWithValues = (state: State, fields: Field[]): FormData => {
  const fromState = {};
  Object.keys(state).forEach((name) => {
    fromState[name] = state[name].value;
  });

  const fromProps = {};
  flattenFields(fields).forEach((field) => {
    fromProps[field.name] = field.value;
  });

  const merged = { ...fromProps, ...fromState };
  const final = {};
  Object.keys(merged).forEach((field) => {
    if (merged[field] !== undefined) {
      final[field] = merged[field];
    }
  });

  return final;
};

export const validateField = (name: Name, groupName: string, value: Value, state: State, fields: Field[]): State => {
  const field = findField(name, groupName, fields);
  if (field) {
    const errorMessage = validate(value, field.validation, getFormDataWithValues(state, fields));
    return { ...state[name], value, errorMessage };
  }
  return state;
};

export const validateFields = (state: State, fields: Field[]) => {
  const formData = getFormDataWithValues(state, fields);
  const validated = flattenFields(fields)
    .filter(filterOutButtons)
    .map((field) => {
      const value = getValue(field.name, state, fields) || '';
      return ({
        name: field.name,
        value,
        errorMessage: validate(value, field.validation, formData),
      });
    });

  const newState = {};
  validated.forEach(({ name, value, errorMessage }) => {
    newState[name] = { value, errorMessage };
  });

  return {
    state: newState,
    hasError: hasError(validated),
  };
};

export const isFormValid = (fields: Field[]):boolean => {
  const formData = getFormData(fields);
  const errorMessages = fields
    .map(field => validate(field.value, field.validation, formData))
    .filter(field => field !== '');

  return errorMessages.length === 0;
};

export const getFields = (fields: Field[], state: State): Field[] =>
  map((field) => {
    if (state[field.name]) {
      return { ...field, value: state[field.name].value };
    }
    return field;
  }, fields);


export const setValue = curry((name: Name, value: Value, fields: Field[]): Field[] => fields
  .map(f => (f.name === name ? { ...f, value } : f)));

export const setErrorMessage = curry((name: Name, errorMessage: string, fields: Field[]): Field[] => fields
  .map(f => (f.name === name ? { ...f, errorMessage } : f)));


export const removeField = curry((name: Name, fields: Field[]): Field[] => fields
  .filter(field => field.name !== name));


const errorMessageLens = lensProp('errorMessage');
const valueLens = lensProp('value');

const updateField = (name, lens) => map(cond([
  [propEq('name', name), lens],
  [T, identity],
]));

export const setFieldErrorMessage = (name, message) => updateField(name, set(errorMessageLens, message));
export const setFieldValue = (name, value) => updateField(name, set(valueLens, value));

export const validateForm = (fields: Field[]): Field[] => {
  const formData = getFormData(fields);

  return map((field) => {
    const error = validate(field.value, field.validation, formData);
    return error === '' ? field : set(errorMessageLens, error, field);
  }, fields);
};
