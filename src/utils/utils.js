import validate from './validate';

export const equal = (a, b) => a === b;

export const curry = (fn) => {
  const r = (args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...secArgs) => r([...args, ...secArgs]);
  };

  return (...args) => r(args);
};

export const compose = (...args) => value => args.reduceRight(
  (result, fn) => fn(result),
  value,
);

export const prop = curry((name, object) => object[name]);

export const propEq = (property, value) => (object = {}) => equal(prop(property, object), value);
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

export const getValue = (name, state, fields) => {
  if (state[name] && state[name].value !== null) {
    return state[name].value;
  }
  const field = fields.find(propEq('name', name));
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

