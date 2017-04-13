import React, { PropTypes } from 'react';
import ErrorMessage from './ErrorMessage';
import Label from './Label';
import { validationShape } from '../shapes';
import { isRequired } from '../utils/utils';

const Input = ({id, groupId, label, type, placeholder, value, disabled, update, validate, errorMessage, validation }) => (
  <div>
    {label ? <Label fieldId={id} label={label} isRequired={isRequired(validation)} /> : null }
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      disabled={disabled}
      onChange={e => update(id, e.target.value)}
      onBlur={() => validate(id, groupId)}
    />
    {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
  </div>
);

const types = ['text', 'password'];

Input.propTypes = {
  id: PropTypes.string.isRequired,
  groupId: PropTypes.string,
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
  groupId: null,
  label: null,
  placeholder: '',
  value: '',
  disabled: false,
  validation: []
};

export default Input;