const isEmpty = value => value === null || value === undefined || value === '';

const getErrorIfDoesNotMatchRegEx = (fieldValue, patterns) => {
  if (fieldValue.length === 0) {
    return null;
  }

  const errors = patterns
    .filter(pattern => fieldValue.match(pattern.value) === null)
    .map(field => field.message);

  return (errors.length > 0) ? errors[0] : null;
};

const getErrorIfMatchesRegEx = (fieldValue, patterns) => {
  if (fieldValue.length === 0) {
    return null;
  }

  const errors = patterns
    .filter(pattern => fieldValue.match(pattern.value) !== null)
    .map(field => field.message);

  return (errors.length > 0) ? errors[0] : null;
};

const isNotEqualToExpectedValue = (fieldValue, expectedValue) => fieldValue !== expectedValue;

const isInList = (fieldValue, allowedValues) => allowedValues.indexOf(fieldValue) > -1;

const isGreaterThanMaxLength = (value, maxLength) => value.length > maxLength;

const isLessThanMinLength = (value, minLength) => value.length < minLength;

const doesNotMatch = (fieldValue, fieldName, formData) => formData[fieldName] !== fieldValue;

const isNotEqualCaseInsensitive = (fieldValue, fieldName, formData) => formData[fieldName].toLowerCase() !== fieldValue.toLowerCase();

export default (fieldValue = '', validation = [], formData = {}) => {
  const rule = validation
    .map(({ type, rules }) => {
      const ruleValue = rules[0].value;
      const errorMessage = rules[0].message;

      switch (type) {
        case 'required':
          return isEmpty(fieldValue) ? errorMessage : null;
          break;
        case 'minlength':
          return isLessThanMinLength(fieldValue, ruleValue) ? errorMessage : null;
          break;

        case 'maxlength':
          return isGreaterThanMaxLength(fieldValue, ruleValue) ? errorMessage : null;
          break;

        case 'mustbeequal':
          return isNotEqualToExpectedValue(fieldValue, ruleValue) ? errorMessage : null;
          break;

        case 'inlist':
          return !isInList(fieldValue, ruleValue) ? errorMessage : null;
          break;

        case 'pattern':
            return getErrorIfDoesNotMatchRegEx(fieldValue, rules);
          break;

        case 'notpattern':
            return getErrorIfMatchesRegEx(fieldValue, rules);
          break;

        case 'mustmatch':
          return doesNotMatch(fieldValue, ruleValue, formData) ? errorMessage : null;
          break;

        case 'mustmatchcaseinsensitive':
          return isNotEqualCaseInsensitive(fieldValue, ruleValue, formData) ? errorMessage : null;
          break;
      }
    })
    .filter(error => error !== null);

  return rule.length > 0 ? rule[0] : '';
}
