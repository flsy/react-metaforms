import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, type, disabled, action }) => (
  <div className="formField">
    <button
      disabled={disabled}
      type={type}
      onClick={() => console.log('clicked', { action })} // eslint-disable-line no-console
    >
      {label}
    </button>
  </div>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
  }),
};

Button.defaultProps = {
  disabled: false,
  action: null,
};

export default Button;
