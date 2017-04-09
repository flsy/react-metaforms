import React, { PropTypes } from 'react';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

const Text = ({id, groupId, label, type, placeholder, value, disabled, update, validate, errorMessage}) => (
    <div className="formField">
        <Label fieldId={id} label={label} isRequired={true} />
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            defaultValue={value}
            disabled={disabled}
            onChange={e => update(id, e.target.value)}
            onBlur={() => validate(id, groupId)}
        />
        <ErrorMessage message={errorMessage}/>
    </div>
);

Text.propTypes = {
  id: PropTypes.string.isRequired,
  groupId: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  update: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

Text.defaultProps= {
  groupId: null,
  label: '',
  placeholder: '',
  value: '',
  disabled: false
};

export default Text;