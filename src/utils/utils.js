import validate from './validate';

export const isRequired = validationRules => !!validationRules.find(rule => rule.type === 'required');

const hasFieldError = field => field.errorMessage && field.errorMessage !== '' && field.errorMessage !== null;

const findError = fields => fields.find(hasFieldError);

export const hasError = fields => !!findError(fields);

export const createFieldId = (name, groupId) => (groupId ? `${name}-${groupId}` : name);

const findField = (name, groupId, fields) => {
  if (groupId) {
    const group = fields.find(f => f.name === groupId);
    return group.fields.find(f => f.name === name);
  }
  return fields.find(f => f.name === name);
};

export const shouldComponentFocus = (fields = [], name = '') => {
  const errorField = findError(fields);

  return (errorField && errorField.name === name) || fields[0].name === name;
};

export const getValue = (name, state, fields) => {
  if (state[name] && state[name].value !== null) {
    return state[name].value;
  }
  const field = fields.find(f => f.name === name);
  return field ? field.value : '';
};

export const getErrorMessage = (name, state, fields) => {
  if (state[name] && hasFieldError(state[name])) {
    return state[name].errorMessage;
  }
  const field = fields.find(f => f.name === name);
  return field ? field.errorMessage : '';
};

export const getFormData = (state, fields) => {
  const fromState = {};
  Object.keys(state).forEach((name) => {
    fromState[name] = state[name].value;
  });

  const fromProps = {};
  fields.forEach((field) => {
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

export const validateField = (name, groupName, value, state, fields) => {
  const field = findField(name, groupName, fields);

  const errorMessage = validate(value, field.validation, getFormData(state, fields));

  return { ...state[name], value, errorMessage };
};

export const validateFields = (state, fields) => {
  const formData = getFormData(state, fields);
  const validated = fields
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

