import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import { validationShape } from '../shapes';
import Label from './Label';
import { isRequired } from '../utils/utils';

const Textarea = ({ id, name, groupName, label, placeholder, value, disabled, update, validate, errorMessage, validation }) => (
  <div className="formField">
    <Label fieldId={id} label={label} isRequired={isRequired(validation)} />
    <textarea
      id={id}
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

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  groupName: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  update: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  validation: PropTypes.arrayOf(validationShape),
};

Textarea.defaultProps = {
  groupName: null,
  label: '',
  placeholder: '',
  value: '',
  disabled: false,
  errorMessage: null,
  validation: [],
};

export default Textarea;
