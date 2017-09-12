const isEmpty = value => value === null || value === undefined || value === '';

const getErrorIfDoesNotMatchRegEx = (fieldValue, patterns) => {
  if (!fieldValue || fieldValue.length === 0) {
    return null;
  }

  const errors = patterns
    .filter(pattern => fieldValue.match(pattern.value) === null)
    .map(field => field.message);

  return (errors.length > 0) ? errors[0] : null;
};

const getErrorIfMatchesRegEx = (fieldValue, patterns) => {
  if (!fieldValue || fieldValue.length === 0) {
    return null;
  }

  const errors = patterns
    .filter(pattern => fieldValue.match(pattern.value) !== null)
    .map(field => field.message);

  return (errors.length > 0) ? errors[0] : null;
};

const isNotEqualToExpectedValue = (fieldValue, expectedValue) => fieldValue !== expectedValue;

const isInList = (fieldValue, allowedValues) => allowedValues.indexOf(fieldValue) > -1;

const isGreaterThanMaxLength = (value, maxLength) => {
  if (!value) return true;
  return value && value.length > maxLength;
};

const isLessThanMinLength = (value, minLength) => {
  if (!value) return true;
  return value.length < minLength;
};

const doesNotMatch = (fieldValue, fieldName, formData) => {
  if (!formData[fieldName] && !fieldValue) {
    return false;
  }

  return formData[fieldName] !== fieldValue;
};

const isNotEqualCaseInsensitive = (fieldValue, fieldName, formData) => formData[fieldName].toLowerCase() !== fieldValue.toLowerCase();

export default (fieldValue = '', validation = [], formData = {}): string => {
  const rule = validation
    .map(({ type, rules }) => {
      const ruleValue = rules[0].value;
      const errorMessage = rules[0].message;

      switch (type) {
        case 'required':
          return isEmpty(fieldValue) ? errorMessage : null;

        case 'minlength':
          return isLessThanMinLength(fieldValue, ruleValue) ? errorMessage : null;

        case 'maxlength':
          return isGreaterThanMaxLength(fieldValue, ruleValue) ? errorMessage : null;

        case 'mustbeequal':
          return isNotEqualToExpectedValue(fieldValue, ruleValue) ? errorMessage : null;

        case 'inlist':
          return !isInList(fieldValue, ruleValue) ? errorMessage : null;

        case 'pattern':
          return getErrorIfDoesNotMatchRegEx(fieldValue, rules);

        case 'notpattern':
          return getErrorIfMatchesRegEx(fieldValue, rules);

        case 'mustmatch':
          return doesNotMatch(fieldValue, ruleValue, formData) ? errorMessage : null;

        case 'mustmatchcaseinsensitive':
          return isNotEqualCaseInsensitive(fieldValue, ruleValue, formData) ? errorMessage : null;

        default:
          return null;
      }
    })
    .filter(error => error !== null);

  return rule.length > 0 ? rule[0] : '';
};
