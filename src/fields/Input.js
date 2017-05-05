import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './ErrorMessage';
import Label from './Label';
import { validationShape } from '../shapes';
import { isRequired } from '../utils/utils';

const Input = ({ id, name, groupName, label, type, placeholder, value, disabled, update, validate, errorMessage, validation }) => (
  <div>
    {label ? <Label fieldId={id} label={label} isRequired={isRequired(validation)} /> : null }
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={value}
      disabled={disabled}
      onChange={e => update({ name, value: e.target.value })}
      onBlur={() => validate({ name, groupName })}
    />
    {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
  </div>
);

const types = ['text', 'password', 'email'];

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  groupName: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(types).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  update: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  validation: PropTypes.arrayOf(validationShape)
};

Input.defaultProps = {
  groupName: null,
  label: null,
  placeholder: '',
  value: '',
  disabled: false,
  validation: []
};

export default Input;