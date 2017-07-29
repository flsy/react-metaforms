import { propEq, prop } from 'fputils';
import validate from './validate';

export const head = input => input[0] || null;

export const isRequired = validationRules => !!validationRules.find(propEq('type', 'required'));

const hasFieldError = field => field.errorMessage && field.errorMessage !== '' && field.errorMessage !== null;

const findError = fields => fields.find(hasFieldError);

export const hasError = fields => !!findError(fields);

export const createFieldId = (name, groupId) => (groupId ? `${name}-${groupId}` : name);

export const findField = (name, groupId, fields) => {
  if (groupId) {
    const group = fields.find(propEq('name', groupId));
    return group.fields.find(propEq('name', name));
  }
  return fields.find(propEq('name', name)) || null;
};

export const shouldComponentFocus = (fields = [], name = '') => {
  const errorField = findError(fields);

  return (errorField && errorField.name === name) || head(fields).name === name;
};

export const findFieldInFields = (name, fields) => {
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (name === field.name) return field;
    if (prop('fields', field)) {
      const f = field.fields.find(propEq('name', name));
      if (f) {
        return f;
      }
    }
  }

  return null;
};

export const getValue = (name, state, fields) => {
  if (state[name] && state[name].value !== null) {
    return state[name].value;
  }
  const field = findFieldInFields(name, fields);
  return (field && prop('value', field)) || null;
};

export const getErrorMessage = (name, state, fields) => {
  const saved = prop(name, state);
  if (saved && hasFieldError(saved)) {
    return prop('errorMessage', saved);
  }
  const field = fields.find(propEq('name', name));
  return (field && prop('errorMessage', field)) || '';
};

const flattenFields = (fields) => {
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

export const getFormData = (formData, fields) => {
  const fromState = {};
  Object.keys(formData).forEach((name) => {
    fromState[name] = formData[name].value;
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

export const validateField = (name, groupName, value, formData, fields) => {
  const field = findField(name, groupName, fields);

  const errorMessage = validate(value, field.validation, getFormData(formData, fields));

  return { ...formData[name], value, errorMessage };
};

export const validateFields = (state, fields) => {
  const formData = getFormData(state, fields);
  const validated = flattenFields(fields)
    .filter(field => field.type !== 'button' && field.type !== 'submit')
    .map((field) => {
      const value = getValue(field.name, state, fields);
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

