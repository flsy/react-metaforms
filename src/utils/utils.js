export const isRequired = validationRules => !!validationRules.find(rule => rule.type === 'required');
