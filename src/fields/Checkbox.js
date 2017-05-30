import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';
import Label from './Label';
import { isRequired } from '../utils/utils';
import { validationShape } from '../shapes';

const Checkbox = ({ id, name, groupName, value, label, errorMessage, validation, updateAndValidate }) => (
  <div>
    {label ? <Label fieldId={id} label={label} isRequired={isRequired(validation)} /> : null }
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={value}
      onChange={event => updateAndValidate({ name, value: event.target.checked, groupName })}
    />
    {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
  </div>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.arrayOf(validationShape),
  updateAndValidate: PropTypes.func.isRequired,
  groupName: PropTypes.string,
  value: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Checkbox.defaultProps = {
  groupName: null,
  errorMessage: null,
  value: false,
  label: '',
  validation: [],
};

export default Checkbox;
