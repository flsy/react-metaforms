import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, type, disabled, onButtonClick }) => (
  <div className="formField">
    <button
      disabled={disabled}
      onClick={onButtonClick}
      type={type}
    >
      {label}
    </button>
  </div>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onButtonClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  onButtonClick: null,
};

export default Button;
