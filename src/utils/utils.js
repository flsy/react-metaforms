export const isRequired = validationRules => !!validationRules.find(rule => rule.type === 'required');

const getFirstErrorField = fields => fields.find(field => field.errorMessage && field.errorMessage !== '' && field.errorMessage !== null);

export const hasError = fields => !!getFirstErrorField(fields);

export const createFieldId = (name, groupId) => (groupId ? `${name}-${groupId}` : name);

export const findField = (name, groupId, fields) => {
  if (groupId) {
    const group = fields.find(f => f.name === groupId);
    return group.fields.find(f => f.name === name);
  }
  return fields.find(f => f.name === name);
};

export const shouldComponentFocus = (fields = [], name = '') => {
  const errorField = getFirstErrorField(fields);
  return (errorField && errorField.name === name) || fields[0].name === name;
};

