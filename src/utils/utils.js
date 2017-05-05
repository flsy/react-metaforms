export const isRequired = validationRules => !!validationRules.find(rule => rule.type === 'required');

export const hasError = fields => !!fields.find(field => field.errorMessage !== "" && field.errorMessage !== null);

export const createFieldId = (name, groupId) => groupId ? `${name}-${groupId}` : name;

export const findField = (name, groupId, fields) => {
  if (groupId) {
    const group = fields.find(f => f.name === groupId);
    return group.fields.find(f => f.name === name)
  } else {
    return fields.find(f => f.name === name);
  }
};
