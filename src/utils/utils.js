export const isRequired = validationRules => !!validationRules.find(rule => rule.type === 'required');

export const hasError = fields => !!fields.find(field => field.errorMessage !== "" && field.errorMessage !== null);
