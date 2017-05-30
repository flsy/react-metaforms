import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, type, disabled, action, onBtnClick }) => (
  <div className="formField">
    <button
      disabled={disabled}
      onClick={onBtnClick && action ? () => onBtnClick(action) : null}
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
  onBtnClick: PropTypes.func,
  action: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  onBtnClick: null,
  action: null,
};

export default Button;
