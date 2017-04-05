import React, { PropTypes } from 'react';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

const Text = ({id, label, type, placeholder, value, disabled, update, validate, errorMessage}) => (
    <div>
        <Label fieldId={id} label={label} isRequired={true} />
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={e => update(id, e.target.value)}
            onBlur={() => validate(id)}
        />
        <ErrorMessage message={errorMessage}/>
    </div>
);

export default Text;