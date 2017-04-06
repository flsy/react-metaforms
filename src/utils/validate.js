const isEmpty = value => value === null || value === undefined || value === '';

export default (fieldValue = '', validation = [], formData) => {
  const errors = [];

  validation.forEach(({ type, rules }) => {
    let hasError = false;
    let validationErrorText = rules[0].message;

    switch (type) {
      case 'required':
        hasError = isEmpty(fieldValue);
        break;
      default:
        hasError = false;
    }

    if (hasError) {
      errors.push(validationErrorText);
    }
  });

  return errors.length > 0 ? errors[0] : '';
}
